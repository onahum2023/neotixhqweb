import { readFile, writeFile, rm } from "node:fs/promises";
import { publicPaths, renderPage } from "../.prerender/prerender.js";

// Render the same React components as the browser, once at build time.
// The deployment contains HTML/CSS/JS assets only; no server bundle is deployed.
const template = await readFile("dist/index.html", "utf8");
for (const path of [...publicPaths, "/404"]) {
  const { head, html } = renderPage(path);
  const file = path === "/" ? "index" : path.slice(1);
  await writeFile(
    `dist/${file}.html`,
    template.replace("<!--head-->", () => head).replace("<!--app-->", () => html),
  );
}
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicPaths.map((path) => `  <url><loc>https://neotixhq.com${path}</loc></url>`).join("\n")}
</urlset>\n`,
);
await rm("dist/.vite", { recursive: true, force: true });
await rm(".prerender", { recursive: true, force: true });
console.log(`Generated ${publicPaths.length} public pages and a 404 page.`);
