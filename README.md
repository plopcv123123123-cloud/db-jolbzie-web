# DB_JOLBZIE

Spanish portfolio and commissions homepage for DB_JOLBZIE, a creative collective offering UGC, custom faces, drawings, illustrations, icons, banners, and digital art. The hero uses the official uploaded banner, and the portfolio includes 24 real custom face artworks. UGC, drawings, and the collective portrait retain placeholders. No stock or generated imagery is included.

## Development

Use the installed Node.js runtime and pnpm. Run `pnpm dev` to start the local preview and `pnpm build` to produce the deployment build.

## Content handoff

- `app/page.tsx` contains the hero, four services, collective introduction, terms, commission CTA, and portfolio integration. Use a plural group voice throughout.
- `components/portfolio-gallery.tsx` contains the responsive gallery, filters, progressive loading, and accessible lightbox. The lightbox supports previous/next buttons, arrow keys, Escape, outside click, and restoring focus to the opening thumbnail.
- `data/faces.json` holds the artwork metadata separately from the UI. Add new entries with a stable ID, neutral title, Spanish description, thumbnail/full-image paths, and both sets of dimensions. `data/portfolio.ts` combines these artworks with the remaining category placeholders.
- `public/portfolio/faces/` contains 480px WebP thumbnails and lossless WebP previews at the original 1024px or 1124px resolution. Only the selected full-size preview loads when opening the lightbox. Source: https://drive.google.com/drive/folders/1zbb2RCW5HFWOCA8mqHIr89-FB4BLW0UG.
- `components/social-links.tsx` contains the seven official social links, shown as accessible icons in the desktop header and the mobile/tablet menu. Discord comes first; all links open in a new tab with `noopener noreferrer`.
- `app/globals.css` contains the purple theme, organic framing, responsive layouts, hover effects, and reduced-motion handling.
- `public/images/db-jolbzie-hero.png` is the official uploaded banner, preserved without edits at its original 1440 × 476 aspect ratio. The hero displays the complete artwork with no text overlays or cropping.
- Remaining media placeholders: UGC, drawings, and one collective artwork/avatar area. Replace them only when real media is supplied.
- Commission links, prices, and terms were not supplied. Their controls show explicit coming-soon information, without sending enquiries or inventing business policies. Official social profile URLs are configured in `components/social-links.tsx`.
- The supplied banner is used only in the hero; social preview image metadata is not configured.

The original project directory was empty. The reference's section structure was therefore implemented directly, rather than modifying an existing source homepage.
