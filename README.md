# DB_JOLBZIE

Spanish portfolio and commissions homepage for DB_JOLBZIE, a creative collective offering UGC, custom faces, drawings, illustrations, icons, banners, and digital art. The hero uses the official uploaded banner. The other four media areas remain placeholders. No stock or generated imagery is included.

## Development

Use the installed Node.js runtime and pnpm. Run `pnpm dev` to start the local preview and `pnpm build` to produce the deployment build.

## Content handoff

- `app/page.tsx` contains the hero, four services, category-filtered gallery, collective introduction, terms, and commission CTA. Use a plural group voice throughout.
- `components/social-links.tsx` contains the seven official social links, shown as accessible icons in the desktop header and the mobile/tablet menu. Discord comes first; all links open in a new tab with `noopener noreferrer`.
- `app/globals.css` contains the purple theme, organic framing, responsive layouts, hover effects, and reduced-motion handling.
- `public/images/db-jolbzie-hero.png` is the official uploaded banner, preserved without edits at its original 1440 × 476 aspect ratio. The hero displays the complete artwork with no text overlays or cropping.
- Remaining media placeholders: three portfolio previews and one collective artwork/avatar area. Replace them only when real media is supplied.
- Commission links, prices, and terms were not supplied. Their controls show explicit coming-soon information, without sending enquiries or inventing business policies. Official social profile URLs are configured in `components/social-links.tsx`.
- The supplied banner is used only in the hero; social preview image metadata is not configured.

The original project directory was empty. The reference's section structure was therefore implemented directly, rather than modifying an existing source homepage.
