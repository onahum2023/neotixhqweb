# NeotixHQ

The NeotixHQ public website: an AI-focused studio and brand operated by
[NuCielo ICT B.V.](https://www.nucielo.io/). Its active product is
[Meridian — AI History Explorer](https://meridian.neotixhq.com/).

## Local development

Use Node.js 22.12 or later and npm. No environment variables, account, database,
or external service credentials are required.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm test
npm run lint
npm run preview
```

The preview server serves the production `dist` directory at
`http://127.0.0.1:4173`. Set `PORT` to change the port. Tests start their own
temporary static server; set `SITE_BASE_URL` to validate an accessible deployed
site instead.

## Static architecture and content

React components preserve the site's original typography, dark palette, SVG
motifs, CSS animation, and responsive layout. Vite builds browser assets and a
temporary render bundle. `scripts/generate.mjs` renders the same components into
complete HTML documents and a sitemap, then removes the render bundle. Only
`dist` is deployed. There are no runtime server functions or data APIs.

- `src/pages/Home.tsx`: homepage composition.
- `src/pages/FieldNotes.tsx`: static journal index. The public journal was empty
  when reviewed for migration; no published articles needed migration. Add future
  editorial content as reviewed source changes, with a page, route, metadata, and
  tests. Draft/admin data is not part of the website.
- `src/identity.ts` and `src/prerender.tsx`: operator/brand/product graph and
  route metadata. The operator's canonical URL is `https://nucielo.io/`; visible
  links use its public `www` URL, which redirects there.
- `public`: favicon, social image, robots policy, and machine-readable summary.

Navigation uses ordinary links and a native mobile menu. Contact opens an email
client at `hello@neotixhq.com`; the site does not submit or store messages.
The existing Google Fonts stylesheet remains the only external runtime resource.

The migration removes TanStack Start/Router/Query, Nitro, Lovable cloud auth/email/
webhooks/error reporting, Supabase clients and migrations, Studio/CMS, login and
password-reset flows, email queue/unsubscribe endpoints, and unused UI packages.
Retired routes return 404. Existing hosted backend data/services are not deleted
or modified by this repository change.

Environment files are ignored. Never commit credentials or personal data.
Removing a file does not erase its Git history; exposed privileged credentials
must be revoked by their owner rather than merely deleted from source.

## Vercel Preview

Import `onahum2023/neotixhqweb` into the intended Vercel team. Use the Vite preset,
`npm run build`, and output directory `dist`; these settings are also specified in
`vercel.json`. Deploy the feature branch to **Preview** for review. Git integration
can provide subsequent PR previews; keep production release separate from Preview
acceptance. Do not connect the production domains during implementation.

`cleanUrls` serves `/field-notes` from `field-notes.html`. There is deliberately no
SPA catch-all rewrite: unknown and retired routes return a real HTTP 404 using
`404.html`. Canonicals and sitemap entries describe the eventual public domain.
Vercel's deployment protection/Preview indexing policy can differ from production.

## Domain cutover and rollback (separate approval required)

1. Accept an exact-commit Preview after desktop/mobile, initial HTML, links,
   metadata, and network checks. Recheck the published journal for any new posts
   immediately before cutover; migrate them before release if any appear.
2. Record the existing authoritative DNS provider, apex and `www` records and
   TTLs, Lovable domain settings, and current working responses. Preserve email
   MX/TXT, verification records, and the Meridian subdomains.
3. After production approval, stage and verify the production build, add
   `neotixhq.com` and `www.neotixhq.com` to the intended Vercel project, and select
   the apex as the canonical domain with `www` redirecting to it. Use the exact DNS
   targets Vercel supplies for this project at cutover time; do not substitute a
   remembered IP or change nameservers merely to move this site.
4. Change only the approved apex/`www` records. Verify TLS, redirects, homepage,
   Field Notes, 404s, sitemap, robots, canonicals, and external links from fresh
   sessions. Allow for the recorded TTL and resolver caches.
5. Keep Lovable hosting and its domain association available during the rollback
   window. If validation fails, restore the recorded DNS records/TTLs and verify
   traffic resolves to Lovable. Retain the Vercel deployment for investigation.
   Disconnect Lovable only after a separately approved stable period.

No DNS change, production release, or Lovable disconnection is part of Preview
acceptance.
