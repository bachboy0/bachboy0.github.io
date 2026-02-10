# bachboy0.github.io

[![Deploy to GitHub Pages](https://github.com/bachboy0/bachboy0.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/bachboy0/bachboy0.github.io/actions/workflows/deploy.yml)

Personal website and blog for **Kang Daewook**, built with [Astro 5](https://astro.build/), [Tailwind CSS 4](https://tailwindcss.com/), and deployed to [GitHub Pages](https://bachboy0.github.io).

## Features

- **Multilingual (i18n)** — English, Japanese (日本語), and Korean (한국어) with automatic browser language detection
- **Blog** — Markdown and MDX content with Astro Content Collections, syntax highlighting, and code copy buttons
- **Dark Mode** — Class-based theme toggle with FOUC prevention and `localStorage` persistence
- **Responsive Design** — Mobile-first layout with hamburger menu and adaptive grid
- **RSS Feed** — Auto-generated RSS feed at `/rss.xml`
- **Sitemap** — Auto-generated sitemap via `@astrojs/sitemap`
- **Image Optimization** — Astro `<Image>` component with Sharp processing
- **Security Headers** — CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy via meta tags
- **Zero JavaScript by Default** — Minimal client-side scripts; no frontend framework runtime

## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | [Astro 5.17+](https://astro.build/) |
| Styling | [Tailwind CSS 4.1+](https://tailwindcss.com/) with Typography plugin |
| Content | Markdown / [MDX](https://mdxjs.com/) via Content Collections |
| Image Processing | [Sharp](https://sharp.pixelplumbing.com/) |
| Deployment | GitHub Actions → GitHub Pages |
| Language | TypeScript (strict null checks) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/bachboy0/bachboy0.github.io.git
cd bachboy0.github.io
npm install
```

### Development

```bash
npm run dev        # Start dev server at localhost:4321
```

### Build & Preview

```bash
npm run build      # Build production site to ./dist/
npm run preview    # Preview the build locally
```

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start local development server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview your build locally before deploying |
| `npm run astro` | Run Astro CLI commands |

## Project Structure

```
/
├── public/
│   ├── fonts/              # Self-hosted Atkinson font files
│   └── robots.txt
├── src/
│   ├── assets/icons/       # SVG icons (Instagram, GitHub, etc.)
│   ├── components/         # Reusable Astro components
│   │   ├── BaseHead.astro        # <head> with SEO, OGP, security headers
│   │   ├── Header.astro          # Sticky nav with mobile menu
│   │   ├── Footer.astro          # Footer with social links
│   │   ├── ThemeIcon.astro       # Dark/light mode toggle
│   │   ├── LanguagePicker.astro  # i18n language switcher
│   │   ├── CodeCopyButton.astro  # Copy button for code blocks
│   │   ├── FormattedDate.astro   # Consistent date formatting
│   │   ├── HeaderLink.astro      # Nav link with active state
│   │   └── ProjectCard.astro     # Project showcase card
│   ├── content/blog/       # Blog posts (Markdown/MDX)
│   ├── i18n/               # Translation strings and utilities
│   │   ├── ui.ts                 # Translation keys for en/ja/ko
│   │   └── utils.ts              # getLangFromUrl, useTranslations, etc.
│   ├── layouts/
│   │   ├── BaseLayout.astro      # Default page layout
│   │   └── BlogPost.astro        # Blog article layout with prose styling
│   ├── pages/              # File-based routing
│   │   ├── index.astro           # English home (/)
│   │   ├── about.astro           # English about (/about)
│   │   ├── rss.xml.js            # RSS feed (/rss.xml)
│   │   ├── blog/                 # English blog routes
│   │   ├── ja/                   # Japanese routes (/ja/*)
│   │   └── ko/                   # Korean routes (/ko/*)
│   ├── styles/global.css   # Tailwind imports, dark mode variant, custom fonts
│   └── consts.ts           # Global constants (site title, description)
├── astro.config.mjs        # Astro config (i18n, integrations, Tailwind)
├── tsconfig.json
└── package.json
```

> For a detailed architectural breakdown, see [ARCHITECTURE.md](ARCHITECTURE.md).

## i18n (Internationalization)

The site supports three languages using file-based routing:

| Language | URL Prefix | Example |
| --- | --- | --- |
| English (default) | none | `/`, `/blog`, `/about` |
| Japanese | `/ja` | `/ja/`, `/ja/blog`, `/ja/about` |
| Korean | `/ko` | `/ko/`, `/ko/blog`, `/ko/about` |

Translation strings are defined in `src/i18n/ui.ts`. Blog posts use a `lang` field in frontmatter and a naming convention of `{slug}.{locale}.md` for translated versions.

## Adding Blog Posts

Create a new `.md` or `.mdx` file in `src/content/blog/`:

```markdown
---
title: 'My New Post'
description: 'A brief description'
pubDate: 'Feb 10 2026'
heroImage: './optional-hero.jpg'
lang: 'en'
---

Your content here...
```

For translated versions, use the locale suffix: `my-new-post.ja.md`, `my-new-post.ko.md`.

## Deployment

The site automatically deploys to GitHub Pages on push to `main` via GitHub Actions.

- **Workflow**: `.github/workflows/deploy.yml`
- **Build action**: [`withastro/action@v5`](https://github.com/withastro/action)
- **Deploy action**: [`actions/deploy-pages@v4`](https://github.com/actions/deploy-pages)

## Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Test locally with `npm run build && npm run preview`
4. Open a pull request to `develop`

## License

This project is licensed under the [MIT License](LICENSE).

Copyright (c) 2025 Kang Daewook
