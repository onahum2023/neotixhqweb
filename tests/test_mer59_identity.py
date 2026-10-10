"""Validate crawler-visible identity relationships without browser or database access.

Run: python3 -m unittest discover -s tests -p 'test_mer59_identity.py' -v
"""

import json
import unittest
from html.parser import HTMLParser
from urllib.request import urlopen


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
        with urlopen("http://localhost:8080/", timeout=30) as response:
            cls.status = response.status
            html = response.read().decode("utf-8")
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


if __name__ == "__main__":
    unittest.main()