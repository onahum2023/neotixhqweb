
## NeotixHQ — Premium single-page site

A dark, architectural, product-studio site. Single route at `/`, no backend, no images — all visuals built from SVG + CSS so it feels precise and on-brand (no stock photography, no generic AI imagery).

### Design system (src/styles.css)

Replace tokens with the brand palette in `oklch`:

- background `#090A0F`, surface `#12141C`, surface-alt `#191C26`
- foreground `#F4F1EA`, muted-foreground `#A8ABB8`
- primary = violet `#8B5CF6`, accent = cyan `#22D3EE`
- border `rgba(255,255,255,0.10)`
- Default to dark — apply `.dark` on `<html>` in `__root.tsx`
- Typography: Inter (via Google Fonts link in `__root.tsx` head). Tight tracking on display sizes, generous line-height on body.
- Custom tokens: `--gradient-radial`, `--shadow-elevated`, `--glow-violet`, `--glow-cyan`.

### Logo / icon

Build `src/components/NeotixMark.tsx` — an abstract SVG "N" formed by three vertices connected by signal paths with two small node dots at converging points. Stroke uses violet→cyan gradient. Reused in nav, footer, and as a glowing element in the hero. Also write `public/favicon.svg` with the same mark.

### Page structure

Single route `src/routes/index.tsx` composing section components in `src/components/neotix/`:

1. `Nav.tsx` — slim sticky bar: mark + "NeotixHQ", right side "Products / Philosophy / Contact" + small Contact button.
2. `Hero.tsx` — left: eyebrow "NeotixHQ — Cognitive systems", H1 headline, subhead, two CTAs (Explore products → `#products`, Contact → `mailto:`). Right: `SignalConverge.tsx` — animated SVG of ~20 fragmented short line segments on the left slowly drifting and converging into a structured hexagonal/geometric core on the right. Pure SVG + CSS `@keyframes` (slow, 12–20s loops, low opacity). Background: faint grid + radial violet glow.
3. `Products.tsx` — section title, intro, two large cards (`ProductCard.tsx`) with subtle border, hover lifts + cyan border glow:
   - Meridian — custom SVG visual: stacked horizontal "temporal" lines with offset dots marking memory points, slow horizontal drift.
   - Augment-Labs — custom SVG visual: branching decision tree / structured nodes with signal weights.
   Each card: label, name (large), short line, description, "Explore <name> →" link (anchor for now).
4. `Philosophy.tsx` — editorial: oversized headline left, two short paragraphs right, thin top border, lots of whitespace.
5. `Positioning.tsx` — title + body, then 3 principle cards in a grid (Context / Workflows / Decisions), each with a tiny abstract glyph and short copy.
6. `ClosingCTA.tsx` — centered headline, body, single violet button.
7. `Footer.tsx` — mark + "NeotixHQ / Cognitive systems for better decisions." left; links right (Meridian, Augment-Labs, Contact).

### Motion

- Background lines: SVG path drift via CSS `@keyframes` (transform translateX/Y, 20s linear infinite).
- Hero mark glow: subtle pulsing `box-shadow`/filter drop-shadow (4s ease-in-out).
- Cards: `transition-all` on transform + border + shadow; small `-translate-y-1` on hover.
- No framer-motion needed; keeps it restrained.

### SEO / head

Update `index.tsx` `head()` with title "NeotixHQ — Cognitive systems for better decisions", description from positioning, og tags. Update `__root.tsx` default title + add Inter font `<link>` and `className="dark"` on `<html>`.

### Files to create/modify

- modify `src/styles.css` — palette + tokens
- modify `src/routes/__root.tsx` — dark class, Inter font link, default meta
- modify `src/routes/index.tsx` — compose sections, page meta
- create `src/components/NeotixMark.tsx`
- create `src/components/neotix/{Nav,Hero,SignalConverge,Products,ProductCard,MeridianVisual,AugmentVisual,Philosophy,Positioning,ClosingCTA,Footer}.tsx`
- create `public/favicon.svg`

### Out of scope (can add later)

Separate product subpages, contact form backend (Contact CTA uses `mailto:` placeholder — confirm address or leave as `hello@neotixhq.com`), real analytics, blog.

### One open question

Contact email for the CTAs / footer link — use `hello@neotixhq.com` as placeholder, or do you have a real address?
