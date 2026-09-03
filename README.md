# DB_JOLBZIE

Spanish portfolio and commissions homepage for DB_JOLBZIE, a creative collective offering UGC, custom faces, drawings, illustrations, icons, banners, and digital art. The hero and collective introduction use the official uploaded banner, and the portfolio includes 2 real UGC projects, 24 real custom face artworks, and 21 distinct drawings/illustrations. No stock or generated imagery is included.

## Development

Use the installed Node.js runtime and pnpm. Run `pnpm dev` to start the local preview and `pnpm build` to produce the deployment build.

## Temporary public preview

This publication is for preview and testing only, not the final launch. Current copy, design, and SEO remain provisional. Reuse the existing Sites URL and project for updates; do not configure the final custom domain, production analytics, or payment systems at this stage.

`app/layout.tsx` identifies the page as a temporary preview and supplies `noindex, nofollow` robots metadata, verified in the deployed page response. Do not add a robots.txt crawl block that would prevent search engines from reading these directives. Remove the preview indexing restrictions and configure final SEO only after the user approves the final design and content.

## Content handoff

- `app/page.tsx` contains the hero, four services, collective introduction, terms, commission CTA, and portfolio integration. Use a plural group voice throughout. The lower sections expand to 1240px with larger text. About reuses the complete real banner, and the final CTA has a single direct Discord link. Existing commission dialogs also explain the Discord ticket flow.
- `data/commissions.ts` holds the Discord invitation and eight concise process/terms topics. The guidance asks visitors to confirm project-specific payment, revision, timing, usage, and refund conditions in their ticket; it does not invent prices, deadlines, or refund policies.
- `components/portfolio-gallery.tsx` contains the responsive gallery, filters, progressive category loading in batches of 9, and accessible lightbox. UGC uses a dedicated two-column editorial layout with project images, video previews, and official Roblox links; drawings and the curated overview use a masonry layout with natural image proportions; faces use a regular grid. The lightbox supports previous/next buttons, arrow keys, Escape, outside click, and restoring focus to the opening thumbnail. A consistent DB_JOLBZIE signature overlays the bottom-right of each displayed artwork and video, including the lightbox. Source media files remain unchanged.
- `data/faces.json` and `data/drawings.json` hold the artwork metadata separately from the UI. Add new entries with a stable ID, neutral title, Spanish description, thumbnail/full-image paths, and both sets of dimensions. In `data/portfolio.ts`, `featuredPortfolioIds` defines the eight-entry Todos selection independently of the complete collections: four drawings, three faces, and the existing UGC placeholder. Todos never expands into the full collection; individual category filters retain every artwork with progressive loading.
- `public/portfolio/faces/` contains 480px WebP thumbnails and lossless WebP previews at the original 1024px or 1124px resolution. Only the selected full-size preview loads when opening the lightbox. Source: https://drive.google.com/drive/folders/1zbb2RCW5HFWOCA8mqHIr89-FB4BLW0UG.
- `public/portfolio/drawings/` contains WebP thumbnails within 720 × 900px and lossless WebP previews within 2560 × 2560px, without enlargement or cropping. Original transparency is retained. Source: https://drive.google.com/drive/folders/1ugSNva9V_H3aoHEAZmft81g68A5nf0PG. The folder contained 22 PNGs (one exact duplicate) and one MP4; this still-image gallery includes the 21 distinct PNGs. No production image requests depend on Drive. Raw filenames are not displayed; illustrations have neutral titles and descriptive Spanish alt text.
- `components/social-links.tsx` contains the seven official social links, shown as accessible icons in the desktop header and the mobile/tablet menu. Discord comes first; all links open in a new tab with `noopener noreferrer`.
- `app/globals.css` contains the purple theme, organic framing, responsive layouts, hover effects, and reduced-motion handling.
- `public/images/db-jolbzie-hero.png` is the official uploaded banner, preserved without edits at its original 1440 × 476 aspect ratio. The hero displays the complete artwork with no text overlays or cropping.
- `data/ugc.ts` keeps the two UGC projects and their media, labels, descriptions, and official Roblox URLs separate from the gallery UI. `public/portfolio/ugc/` contains their supplied renders and compact MP4 previews.
- Commission requests are handled through tickets at the official Discord invitation in `data/commissions.ts`. External links open in a new tab with `noopener noreferrer`. Official social profile URLs are configured in `components/social-links.tsx`.
- Social preview image metadata is not configured.

The original project directory was empty. The reference's section structure was therefore implemented directly, rather than modifying an existing source homepage.
