# Brand reference

Artwork for Corredor by Tokeico, used as the source of truth for the app's
colour, type and imagery.

| File | What it is |
|---|---|
| `landing-reference-v1.jpeg` | First landing comp. Source of `web/public/coverage-map.png`. |
| `landing-reference-v2.jpeg` | Landing comp with the horse lockup. Source of the brand yellow (`#ecf038`) and `web/public/corredor-mark.png`. |
| `landing-reference-v3.jpeg` | Landing comp with the gold token hero. Source of `web/public/hero-coin.png`. |

The assets in `web/public/` were extracted from these with
`web/tools/brand-extract.mjs` and `web/tools/crop-hero.mjs`. They are demo
resolution, not final exports — replacing them with the real files at the same
paths needs no code change.
