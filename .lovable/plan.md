## Goal

Make the NeotixHQ page feel less flat, less uniformly black, and more architecturally designed — without losing the premium, calm, dark direction. No copy changes.

## 1. Section atmosphere system (depth, not brightness)

Add new design tokens in `src/styles.css`:

- `--surface-deep` — slightly darker than background (graphite-violet)
- `--surface-warm` — graphite with a faint warm tint (for Field Notes)
- `--gradient-atmos-violet` — large, soft violet radial, very low opacity
- `--gradient-atmos-cyan` — soft cyan radial for mid-page accents
- `--gradient-band` — subtle vertical gradient band between sections
- `--noise-overlay` — inline SVG fractal-noise data URI as a CSS var for quiet texture
- `--mask-fade-y` — top/bottom fade mask utility

Add utilities: `.bg-noise`, `.bg-atmos-violet`, `.bg-atmos-cyan`, `.bg-grid-soft` (lower-opacity grid), `.mask-fade-y`.

Apply per section (all using semantic tokens, dark throughout):

- Hero: keep current violet radial, dial down grid, add faint oversized Core motif behind text
- Vision: editorial, add one oversized faint Neotix N fragment top-right at ~4% opacity
- Principles (`Positioning`): raised cards on `surface-deep`, cyan glow on hover only; add quiet grid panel behind grid
- Products: lab/studio band — `surface-deep` with a single violet ambient glow on the left
- Field Notes: switch surface to `surface-warm` graphite for editorial contrast
- Philosophy/Company: minimal, with one large faint diagonal beam motif
- Closing CTA: existing violet/cyan atmosphere, slightly intensified
- Footer: structured panel on `surface-deep` with hairline top gradient band (not flat black)

Reduce vertical padding from `py-28 lg:py-44` → `py-24 lg:py-36` across sections to tighten rhythm without crowding.

## 2. Branded divider system

Replace `CoreDivider` with a small family in `src/components/neotix/dividers/`:

- `SignalDivider` — segmented hairline that breaks into 3–5 small nodes mid-line, asymmetric placement
- `BeamDivider` — soft violet→cyan gradient band, ~80px tall, very low opacity, no hard line
- `FragmentDivider` — two short hairlines + a faint oversized Core fragment crossing the seam

Use them alternately between sections instead of the same divider everywhere. Keep `border-t` off the sections that get a divider above them (avoid double lines).

## 3. Hero signal refinement (no missiles)

Rewrite `SignalConverge.tsx` signal elements:

- Remove straight horizontal line segments with leading dots (read as arrows/missiles)
- Replace with: small floating fragments — short curved arcs, tiny circles, 2–3 micro "data glyphs" (dot + bracket, hairline cross, broken square)
- Trails become longer, gently curved Bezier paths with very low opacity, fading into the Core (no arrowheads, no sharp convergence vectors)
- Add slow parallax-style drift via existing `animate-drift`/`animate-dash`
- Keep the Core geometry (N + waypoint) but soften the entry waypoint so signals appear absorbed, not aimed

Metaphor target: fragments being organized into structure.

## 4. Visual system reuse

Extract a single `CoreMotif` SVG component (oversized faint N + diagonal beam) usable as a background element. Drop low-opacity instances into:

- Hero background (behind text column)
- Vision (top-right corner, rotated)
- Philosophy (left side, large, ~3% opacity)
- Footer (centered watermark, very faint)
- Principles cards (tiny corner mark on hover)

Also wire the existing `Glyph` style into a shared visual vocabulary by reusing its gradient id pattern.

## 5. Cards & surfaces

Principle cards (`Positioning`):
- `bg-surface-deep` base, `border-white/[0.06]`
- Hover: `border-primary/40`, subtle inner cyan glow via `box-shadow`, faint Core mark fades in top-right
- Add a thin gradient hairline at the top of each card

Product cards: same surface treatment, plus a quiet left-edge violet beam accent.

Field Notes cards: `surface-warm` token, hairline divider between meta and body.

## Files

- Edit: `src/styles.css` (tokens + utilities)
- Edit: `src/components/neotix/SignalConverge.tsx` (signals rework)
- Edit: `src/components/neotix/Hero.tsx`, `Vision.tsx`, `Positioning.tsx`, `Products.tsx`, `ProductCard.tsx`, `FieldNotes.tsx`, `Philosophy.tsx`, `ClosingCTA.tsx`, `Footer.tsx` (apply atmosphere + motif)
- Edit: `src/routes/index.tsx` (swap dividers in alternating pattern)
- New: `src/components/neotix/CoreMotif.tsx`
- New: `src/components/neotix/dividers/SignalDivider.tsx`, `BeamDivider.tsx`, `FragmentDivider.tsx`
- Keep `CoreDivider.tsx` for back-compat or delete after swap (will delete)

## Guardrails

- No new colors outside the design tokens
- All effects via semantic tokens; nothing brighter than current accent
- No new animations beyond existing keyframes (drift, pulse, dash)
- No copy changes
- Page stays dark; success = visible tonal rhythm scrolling top→bottom, branded transitions, calmer hero signals