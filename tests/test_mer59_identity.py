"""Validate crawler-visible identity relationships without browser or database access.

Run after npm run build: npm test
"""

import json
import unittest
import os
import subprocess
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlparse
from html.parser import HTMLParser
from urllib.request import urlopen


BASE_URL = os.environ.get("SITE_BASE_URL", "").rstrip("/")
SERVER = None


def setUpModule():
    global BASE_URL, SERVER
    if not BASE_URL:
        SERVER = subprocess.Popen(
            ["node", "scripts/serve.mjs"], stdout=subprocess.PIPE, text=True,
            env={**os.environ, "PORT": "0"},
        )
        BASE_URL = SERVER.stdout.readline().strip().removeprefix("Static preview: ")
        if not BASE_URL.startswith("http://127.0.0.1:"):
            raise RuntimeError("Build the static site before running tests")


def tearDownModule():
    if SERVER:
        SERVER.terminate()
        SERVER.wait(timeout=5)
        SERVER.stdout.close()


def get(path):
    try:
        response = urlopen(BASE_URL + path, timeout=30)
    except HTTPError as error:
        response = error
    with response:
        return response.status, response.read().decode("utf-8"), response.headers


class IdentityParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_graph = False
        self.graph_text = []

    def handle_starttag(self, tag, attrs):
        if tag == "script" and dict(attrs).get("type") == "application/ld+json":
            self.in_graph = True

    def handle_endtag(self, tag):
        if tag == "script":
            self.in_graph = False

    def handle_data(self, data):
        if self.in_graph:
            self.graph_text.append(data)


class IdentityRelationshipsTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.status, html, _ = get("/")
        parser = IdentityParser()
        parser.feed(html)
        graph = json.loads(parser.graph_text[0])["@graph"]
        cls.nodes = {node["@id"]: node for node in graph}

    def test_operator_is_legal_organization(self):
        operator = self.nodes["https://nucielo.io/#organization"]
        self.assertEqual(operator["@type"], "Organization")
        self.assertEqual(operator["legalName"], "NuCielo ICT B.V.")
        self.assertEqual(operator["url"], "https://nucielo.io/")

    def test_operator_brand_relationship(self):
        operator = self.nodes["https://nucielo.io/#organization"]
        self.assertEqual(operator["brand"], {"@id": "https://neotixhq.com/#brand"})
        self.assertEqual(self.nodes[operator["brand"]["@id"]]["@type"], "Brand")

    def test_website_identity_relationships(self):
        site = self.nodes["https://neotixhq.com/#website"]
        self.assertEqual(site["url"], "https://neotixhq.com/")
        self.assertEqual(site["publisher"], {"@id": "https://nucielo.io/#organization"})
        self.assertEqual(site["about"], {"@id": "https://neotixhq.com/#brand"})
        self.assertEqual(site["mentions"], {"@id": "https://meridian.neotixhq.com/#software"})

    def test_software_publisher_is_not_brand(self):
        software = self.nodes["https://meridian.neotixhq.com/#software"]
        self.assertEqual(software["@type"], "SoftwareApplication")
        self.assertEqual(software["url"], "https://meridian.neotixhq.com/")
        self.assertEqual(software["publisher"], {"@id": "https://nucielo.io/#organization"})
        self.assertNotIn("brand", software)

    def test_no_unverified_claim_properties(self):
        prohibited = {"sameAs", "address", "aggregateRating", "offers", "taxID", "vatID"}
        for node in self.nodes.values():
            self.assertTrue(prohibited.isdisjoint(node), node["@id"])


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()
        self.meta = {}
        self.titles = 0
        self.h1s = 0
        self.canonicals = []
        self.assets = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.add(attrs["id"])
        if tag == "a":
            self.links.append(attrs.get("href", ""))
        if tag == "meta":
            key = attrs.get("name", attrs.get("property"))
            self.meta.setdefault(key, []).append(attrs.get("content"))
        if tag == "title":
            self.titles += 1
        if tag == "h1":
            self.h1s += 1
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonicals.append(attrs["href"])
        if tag == "script" and "src" in attrs:
            self.assets.append(attrs["src"])
        if tag == "link" and attrs.get("rel") in {"stylesheet", "icon"}:
            self.assets.append(attrs["href"])


class StaticPagesTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pages = {}
        for path in ("/", "/field-notes"):
            status, html, _ = get(path)
            parser = PageParser()
            parser.feed(html)
            cls.pages[path] = (status, html, parser)

    def test_public_routes_have_initial_content(self):
        for path, (status, html, parser) in self.pages.items():
            with self.subTest(path=path):
                self.assertEqual(status, 200)
                self.assertEqual(parser.h1s, 1)
                self.assertNotIn("<!--app-->", html)
                self.assertIn("NuCielo ICT B.V.", html)
                self.assertIn("AI History Explorer", html)
        self.assertIn("No notes published yet", self.pages["/field-notes"][1])
        self.assertIn("From ideas to practical applications", self.pages["/"][1])

    def test_unique_metadata_and_canonical(self):
        for path, (_, html, parser) in self.pages.items():
            with self.subTest(path=path):
                self.assertEqual(parser.titles, 1)
                self.assertEqual(parser.canonicals, ["https://neotixhq.com" + path])
                for key in ("description", "og:title", "og:description", "og:url", "og:image", "twitter:title"):
                    self.assertEqual(len(parser.meta[key]), 1)
                self.assertEqual(parser.meta["og:url"], parser.canonicals)
                graph_parser = IdentityParser()
                graph_parser.feed(html)
                self.assertEqual(len(graph_parser.graph_text), 1)
                self.assertEqual(json.loads(graph_parser.graph_text[0])["@context"], "https://schema.org")

    def test_all_internal_links_and_anchors(self):
        home_ids = self.pages["/"][2].ids
        for _, (_, _, parser) in self.pages.items():
            for link in parser.links:
                url = urlparse(link)
                if url.scheme or url.netloc:
                    continue
                self.assertIn(url.path or "/", self.pages)
                if url.fragment:
                    self.assertIn(url.fragment, home_ids)

    def test_local_assets_exist(self):
        for _, (_, _, parser) in self.pages.items():
            for asset in parser.assets:
                if asset.startswith("/"):
                    with urlopen(BASE_URL + asset, timeout=30) as response:
                        self.assertEqual(response.status, 200)
        with urlopen(BASE_URL + "/social-card.png", timeout=30) as response:
            self.assertEqual(response.status, 200)
            self.assertEqual(response.read(8), b"\x89PNG\r\n\x1a\n")

    def test_unknown_and_retired_routes_are_404(self):
        for path in ("/not-a-page", "/field-notes/missing", "/login", "/studio", "/reset-password", "/unsubscribe", "/email/unsubscribe", "/lovable/email/queue/process"):
            with self.subTest(path=path):
                status, html, _ = get(path)
                self.assertEqual(status, 404)
                self.assertIn("Page not found", html)
                parser = PageParser()
                parser.feed(html)
                self.assertEqual(parser.meta["robots"], ["noindex"])
                self.assertFalse(parser.canonicals)

    def test_discovery_files(self):
        import xml.etree.ElementTree as ET
        status, sitemap, _ = get("/sitemap.xml")
        self.assertEqual(status, 200)
        root = ET.fromstring(sitemap)
        locations = {e.text for e in root.iter("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")}
        self.assertEqual(locations, {"https://neotixhq.com/", "https://neotixhq.com/field-notes"})
        for file in ("/robots.txt", "/llms.txt"):
            status, body, _ = get(file)
            self.assertEqual(status, 200)
            self.assertIn("https://neotixhq.com/", body)

    def test_no_backend_or_inactive_products_in_output(self):
        import re
        for file in Path("dist").rglob("*"):
            if file.suffix in {".js", ".html", ".txt", ".xml"}:
                text = file.read_text()
                self.assertIsNone(re.search(r"\b(?:Orin|Calix)\b|supabase\.co|lovable\.app|lovable\.dev|/_server|service_role", text, re.I), str(file))
        package = json.loads(Path("package.json").read_text())
        deps = {**package["dependencies"], **package["devDependencies"]}
        self.assertFalse(any("supabase" in d or "lovable" in d or "tanstack" in d or d == "nitro" for d in deps))

    def test_contact_is_email_without_form(self):
        _, html, parser = self.pages["/"]
        self.assertIn("mailto:hello@neotixhq.com", parser.links)
        self.assertNotIn("<form", html)

    def test_environment_file_not_tracked(self):
        tracked = subprocess.check_output(["git", "ls-files", "--", ".env", ".env.*"], text=True)
        # A migration deletion may still be in the index before its commit.
        for file in tracked.splitlines():
            self.assertFalse(Path(file).exists())
        self.assertIn("\n.env\n", Path(".gitignore").read_text())


if __name__ == "__main__":
    unittest.main()
