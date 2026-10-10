import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { App } from "./App";
import { identityGraph } from "./identity";

export const publicPaths = ["/"];

export function renderPage(path: string) {
  const isHome = path === "/";
  const isNotFound = !publicPaths.includes(path);
  const title = isNotFound
    ? "Page not found — NeotixHQ"
    : "NeotixHQ — AI exploration, products, and practical applications";
  const description = "NeotixHQ is an AI-focused studio and a brand operated by NuCielo ICT B.V. We explore, design, and build practical AI applications, including Meridian — AI History Explorer.";
  const url = `https://neotixhq.com${isHome ? "/" : path}`;
  const head = renderToStaticMarkup(
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {isNotFound ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="NeotixHQ" />
      {!isNotFound && <meta property="og:url" content={url} />}
      <meta property="og:image" content="https://neotixhq.com/social-card.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="NeotixHQ — Building the cognitive layer of work" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://neotixhq.com/social-card.png" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(identityGraph).replace(/</g, "\\u003c") }}
      />
    </>,
  );
  return { head, html: renderToString(<App path={path} />) };
}
