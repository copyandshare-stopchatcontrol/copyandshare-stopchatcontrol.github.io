# StopChatControl – Copy & Share Campaign Site

A multilingual static website designed to help people rapidly copy and share authoritative information, petitions, and media resources opposing EU-wide mass scanning proposals ("Chat Control"). The site focuses on simplicity, speed, accessibility, and ease of translation.

## Key Goals
- Lower friction to spreading trustworthy sources
- Provide neutral, verifiable official references first
- Offer clear action items (petitions, education, nuance videos)
- Enable fast language switching with consistent structure
- Preserve privacy (no invasive analytics / tracking)

## Live Site
Production: https://copyandshare-stopchatcontrol.github.io/

## Supported Languages
| Code | Folder      | Language    |
|------|-------------|-------------|
| fr   | francais/   | French      |
| en   | english/    | English     |
| de   | deutsch/    | German      |
| es   | espanol/    | Spanish     |
| it   | italiano/   | Italian     |
| pl   | polski/     | Polish      |
| pt   | portugues/  | Portuguese  |

Each language has its own `index.html` with:
- `<link rel="canonical">`
- Full `<link rel="alternate" hreflang="...">` cluster (including `x-default`)
- A standardized message block with a self-language link hint ("For links targeting another language" translated)

## Project Structure (Excerpt)
```
copyshare-stopchatcontrol.github.io/
  index.html (root landing / fallback)
  francais/index.html
  english/index.html
  deutsch/index.html
  espanol/index.html
  italiano/index.html
  polski/index.html
  portugues/index.html
  about/index.html
  assets/
    css/ (layout + animations + variables)
    js/  (copy logic, helper libs)
  reflexion/ (internal notes, drafts, releases, AI prompts)
  PRD/ (product/resource docs)
```

## Front-End Stack
Pure static HTML + CSS + minimal vanilla JavaScript (no framework). Optimized for fast loading and easy fork / remix.

## Core Features
- One-click copy button (`copy.js`) for the curated message list
- Language navigation bar (`nav.language-nav`)
- Harmonized heading IDs for predictable deep-linking
- Accessibility improvements (semantic headings, link targets, ARIA labels)
- External links: `target="_blank"` + descriptive text where useful
- SEO / i18n: canonical + hreflang matrix in every language file

## Editing Content Safely
- Keep official sources section first.
- Avoid adding unverified claims; prefer neutral phrasing.
- When adding media (YouTube, TikTok, etc.), ensure they provide context not fear.
- Maintain heading order (h1 → h2) for accessibility.

## SEO & Internationalization Notes
- `hreflang` cluster prevents wrong-language ranking & duplicate content penalties.
- `canonical` clarifies the authoritative URL (especially important on GitHub Pages due to possible alternate access paths).
- Optional (future): `sitemap.xml` + `robots.txt` referencing it.
- Consider adding `og:title`, `og:description`, and `og:url` if social preview optimization is desired.

## Copy Button Logic
`assets/js/copy.js` selects the `#message-content` container, strips control UI, and copies the textual block for pasting into chats or posts.

## Local Development
You can preview locally with any static server, e.g. Python:
```
python3 -m http.server 4000
# Open http://localhost:4000/
```
Or Node:
```
npx serve .
```

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/new-language`.
3. Commit changes with clear messages.
4. Open a Pull Request summarizing:
   - What changed
   - Language(s) touched
   - Any SEO / structural adjustments

## Quality Checklist Before PR
- [ ] No broken links (run a link checker if possible)
- [ ] Headings remain logical (no skipped levels)

## Roadmap Ideas
- Generate `sitemap.xml` automatically via a small script
- Provide a compressed share-ready plain text file
- Add optional integrity hash for JS/CSS (subresource integrity)
- Add visitors badge when the website will be ready(when frenchs Links Youtube will be adapted for others languages)

## Privacy / Analytics
No invasive tracking. Only a simple hit counter badge (can be removed if desired). No cookies, no fingerprinting.

## License
MIT License. Feel free to fork, adapt, and redistribute with attribution.

## Attribution
Campaign initiative & curation: community contributors. Repository owner: whoamitty.

## Disclaimer
This site aggregates publicly accessible resources for civic awareness. Always verify legal and policy developments through official EU publications.

---
Feel free to open an issue for translation improvements, accessibility refinements, or additional vetted sources.