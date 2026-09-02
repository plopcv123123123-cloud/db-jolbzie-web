# DB_JOLBZIE

Artist portfolio homepage based on the approved reference composition. All five media areas are intentionally empty placeholders. No stock, generated, or reference imagery is included.

## Development

Use the installed Node.js runtime and pnpm. Run `pnpm dev` to start the local preview and `pnpm build` to produce the deployment build.

## Content handoff

- `app/page.tsx` contains the hero, four services, category-filtered gallery, artist introduction, terms, and commission CTA.
- `app/globals.css` contains the purple theme, organic framing, responsive layouts, hover effects, and reduced-motion handling.
- Media slots: one hero banner, three portfolio previews, and one artist/avatar area. Replace `MediaPlaceholder` content with supplied real media while retaining the surrounding frames. The hero composition deliberately permits future artwork to overlap its frame.
- Commission links, prices, terms, and social profile URLs were not supplied. Their controls show explicit coming-soon information, without sending enquiries or inventing business policies.
- No social preview image is included, in accordance with the placeholder-only media requirement.

The original project directory was empty. The reference's section structure was therefore implemented directly, rather than modifying an existing source homepage.
