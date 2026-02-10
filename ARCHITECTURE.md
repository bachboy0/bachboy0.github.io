# Architecture

This document describes the architecture of **bachboy0.github.io**, a multilingual personal website and blog built with Astro 5, Tailwind CSS 4, and deployed to GitHub Pages.

## Table of Contents

- [High-Level Overview](#high-level-overview)
- [Build Pipeline](#build-pipeline)
- [Directory Structure](#directory-structure)
- [Configuration Layer](#configuration-layer)
- [Component Architecture](#component-architecture)
- [Layout System](#layout-system)
- [Routing and Pages](#routing-and-pages)
- [Internationalization (i18n)](#internationalization-i18n)
- [Content Collections and Blog System](#content-collections-and-blog-system)
- [Styling Architecture](#styling-architecture)
- [Dark Mode System](#dark-mode-system)
- [Client-Side JavaScript](#client-side-javascript)
- [Image Handling](#image-handling)
- [SEO and Meta Tags](#seo-and-meta-tags)
- [Security](#security)
- [Deployment](#deployment)
- [Data Flow Diagram](#data-flow-diagram)
- [Key Design Decisions](#key-design-decisions)

---

## High-Level Overview

```
┌──────────────────────────────────────────────────────┐
│                   Build Time (Astro)                  │
│                                                      │
│  Content Collections ─► Pages ─► Static HTML/CSS     │
│  (Markdown/MDX)        (Astro)   (dist/)             │
│                                                      │
│  Tailwind CSS 4 ──────► Optimized CSS                │
│  Sharp ───────────────► Optimized Images              │
│  @astrojs/sitemap ────► sitemap.xml                  │
│  @astrojs/rss ────────► rss.xml                      │
└──────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────┐
│              GitHub Actions (CI/CD)                   │
│  main branch push ──► astro build ──► GitHub Pages   │
└──────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────┐
│              Runtime (Browser)                        │
│  Static HTML + Minimal JS (theme, menu, lang detect) │
│  Zero framework runtime shipped                      │
└──────────────────────────────────────────────────────┘
```

The architecture follows Astro's **zero-JS by default** philosophy. All pages are statically generated at build time. Client-side JavaScript is limited to four concerns: theme toggling, mobile menu interaction, language detection/redirect, and code block copy buttons.

---

## Build Pipeline

```
Source Files
    │
    ├── src/content/blog/*.{md,mdx}  ──► Astro Content Collections (glob loader)
    ├── src/pages/**/*.astro          ──► File-based routing → Static HTML
    ├── src/styles/global.css         ──► Tailwind CSS 4 (via @tailwindcss/vite)
    ├── src/assets/**                 ──► Image optimization (Sharp)
    └── public/**                     ──► Copied as-is to dist/
                                             │
                                             ▼
                                         dist/ (static output)
                                             │
                                             ▼
                                      GitHub Pages deployment
```

**Key integrations** registered in `astro.config.mjs`:
- `@astrojs/mdx` — MDX support for blog posts
- `@astrojs/sitemap` — Automatic sitemap generation
- `@tailwindcss/vite` — Tailwind CSS 4 as a Vite plugin (not PostCSS)

---

## Directory Structure

```
/
├── .github/
│   ├── copilot-instructions.md     # AI pair programming guidelines
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deployment workflow
├── public/
│   ├── fonts/                      # Self-hosted Atkinson font files
│   └── robots.txt                  # Crawler directives
├── src/
│   ├── assets/
│   │   └── icons/                  # SVG icon assets (imported as components)
│   ├── components/                 # Reusable UI components (9 files)
│   ├── content/
│   │   └── blog/                   # Blog posts in Markdown/MDX
│   ├── i18n/
│   │   ├── ui.ts                   # Translation dictionaries
│   │   └── utils.ts                # i18n utility functions
│   ├── layouts/                    # Page layout templates (2 files)
│   ├── pages/                      # File-based routes
│   │   ├── *.astro                 # English (default locale) pages
│   │   ├── blog/                   # English blog routes
│   │   ├── ja/                     # Japanese locale routes
│   │   └── ko/                     # Korean locale routes
│   ├── styles/
│   │   └── global.css              # Tailwind imports, custom fonts, dark mode
│   ├── consts.ts                   # Global constants
│   └── content.config.ts           # Content collection schema definitions
├── astro.config.mjs                # Astro framework configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies and scripts
```

---

## Configuration Layer

### `astro.config.mjs`

| Setting | Value | Purpose |
| --- | --- | --- |
| `output` | `'static'` | Full static site generation (SSG) |
| `site` | `'https://bachboy0.github.io'` | Canonical site URL for sitemap, RSS, OGP |
| `integrations` | `[mdx(), sitemap()]` | MDX content support + auto sitemap |
| `i18n.defaultLocale` | `'en'` | English as the default language |
| `i18n.locales` | `['en', 'ja', 'ko']` | Supported languages |
| `i18n.routing.prefixDefaultLocale` | `false` | English pages have no `/en/` prefix |
| `vite.plugins` | `[tailwindcss()]` | Tailwind CSS 4 via Vite plugin |

### `tsconfig.json`

Extends `astro/tsconfigs/base` with `strictNullChecks: true`. No path aliases are configured.

### `src/consts.ts`

Exports two global constants used across the site:
- `SITE_TITLE` — `'Kang Daewook'`
- `SITE_DESCRIPTION` — `'Welcome to my website!'`

---

## Component Architecture

Components are all `.astro` files (no React/Vue/Svelte). They execute at build time and produce static HTML.

### Component Hierarchy

```
BaseHead.astro
    └── Used by: BaseLayout.astro, BlogPost.astro

Header.astro
    ├── HeaderLink.astro      (navigation links with active state)
    ├── LanguagePicker.astro  (language dropdown)
    └── ThemeIcon.astro       (dark/light toggle button)

Footer.astro
    └── SVG icons from src/assets/icons/

BaseLayout.astro
    ├── BaseHead.astro
    ├── Header.astro
    └── Footer.astro

BlogPost.astro
    ├── BaseHead.astro
    ├── Header.astro
    ├── Footer.astro
    └── CodeCopyButton.astro

FormattedDate.astro        (standalone, used in blog listings/posts)
ProjectCard.astro          (standalone, used on home pages)
```

### Component Details

| Component | Props | Responsibility |
| --- | --- | --- |
| **BaseHead** | `title`, `description`, `image?` | `<head>` section: meta tags, OGP, fonts, CSS, security headers, FOUC prevention script |
| **Header** | none | Sticky navigation bar with desktop/mobile layouts, hamburger menu animation, event delegation for interactivity |
| **HeaderLink** | `...HTMLAttributes<'a'>` | Navigation link with active state detection via `Astro.url.pathname` comparison |
| **Footer** | none | Copyright with dynamic year, social links (Instagram, GitHub) with accessible SVG icons |
| **ThemeIcon** | none | SVG with sun/moon paths; visibility toggled via `dark:` Tailwind classes |
| **LanguagePicker** | none | Dropdown to switch between en/ja/ko; detects current locale, builds localized URLs |
| **CodeCopyButton** | none | Injects copy buttons into all `<pre>` blocks at runtime via `DOMContentLoaded` |
| **FormattedDate** | `date: Date` | Renders `<time>` element with `en-us` locale formatting |
| **ProjectCard** | `title`, `description`, `tag`, `href?` | Project showcase card with tag-based gradient colors and optional link wrapping |

---

## Layout System

### BaseLayout

The default page layout used by all non-blog pages.

```
<!doctype html>
<html lang="{detected locale}">
  <head>
    <BaseHead title={title} description={description} />
  </head>
  <body class="bg-gradient-to-b ... dark:bg-gradient-to-b ...">
    <Header />
    <main class="w-[720px] max-w-[calc(100%-2rem)] mx-auto {mainClass}">
      <slot />  ← Page content injected here
    </main>
    <Footer />
  </body>
</html>
```

- `<html lang>` is dynamically set using `getLangFromUrl(Astro.url)`
- `<main>` width is constrained to 720px with responsive fallback
- Optional `mainClass` prop allows pages to override default main styling

### BlogPost

A standalone layout for individual blog articles. It does **not** extend BaseLayout — it builds its own complete HTML document.

```
<!doctype html>
<html lang="{detected locale}">
  <head>
    <BaseHead title={title} description={description} />
  </head>
  <body>
    <Header />
    <main>
      <article class="prose prose-lg dark:prose-invert">
        {heroImage && <Image ... />}
        <FormattedDate date={pubDate} />
        {updatedDate && <FormattedDate date={updatedDate} />}
        <h1>{title}</h1>
        <slot />  ← Rendered Markdown/MDX content
      </article>
    </main>
    <Footer />
    <CodeCopyButton />
  </body>
</html>
```

- Uses `@tailwindcss/typography` via `prose` classes for rich text styling
- `CodeCopyButton` is placed after the article to inject copy functionality

---

## Routing and Pages

Astro uses **file-based routing**. Each `.astro` file in `src/pages/` maps to a URL path.

### Route Map

| File | URL | Description |
| --- | --- | --- |
| `pages/index.astro` | `/` | English home with auto language redirect |
| `pages/about.astro` | `/about` | English about page |
| `pages/blog/index.astro` | `/blog` | English blog listing |
| `pages/blog/[...slug].astro` | `/blog/:slug` | English blog post (dynamic) |
| `pages/rss.xml.js` | `/rss.xml` | RSS feed (all languages) |
| `pages/ja/index.astro` | `/ja/` | Japanese home |
| `pages/ja/about.astro` | `/ja/about` | Japanese about |
| `pages/ja/blog/index.astro` | `/ja/blog` | Japanese blog listing |
| `pages/ja/blog/[...slug].astro` | `/ja/blog/:slug` | Japanese blog post |
| `pages/ko/index.astro` | `/ko/` | Korean home |
| `pages/ko/about.astro` | `/ko/about` | Korean about |
| `pages/ko/blog/index.astro` | `/ko/blog` | Korean blog listing |
| `pages/ko/blog/[...slug].astro` | `/ko/blog/:slug` | Korean blog post |

### Dynamic Blog Routes

Blog post pages use `getStaticPaths()` to generate routes at build time:

```typescript
// pages/blog/[...slug].astro
export async function getStaticPaths() {
  const posts = (await getCollection('blog'))
    .filter(post => post.data.lang === 'en');
  return posts.map(post => ({
    params: { slug: post.id },
    props: post,
  }));
}
```

For Japanese/Korean, the slug is cleaned by removing the locale suffix:
```typescript
// pages/ja/blog/[...slug].astro
params: { slug: post.id.replace(/\.?ja$/, '') }
```

### Home Page Language Redirect

The English home page (`pages/index.astro`) includes a client-side script that checks `navigator.language` and redirects to `/ja/` or `/ko/` if the browser language matches. `sessionStorage` prevents redirect loops.

---

## Internationalization (i18n)

The i18n system is a **hybrid approach** combining Astro's built-in i18n configuration with custom translation utilities.

### Architecture

```
astro.config.mjs (i18n config)
    │
    ├── Tells Astro about locales and default locale
    └── Controls URL prefix behavior

src/i18n/ui.ts (translation data)
    │
    ├── languages: { en: 'English', ja: '日本語', ko: '한국어' }
    ├── defaultLang: 'en'
    └── ui: { en: { ... }, ja: { ... }, ko: { ... } }

src/i18n/utils.ts (utility functions)
    │
    ├── getLangFromUrl(url)         → Extract locale from URL path
    ├── useTranslations(lang)      → Returns t(key) function
    ├── getLocalizedPath(path, locale) → Build locale-prefixed URL
    └── removeLocalePath(path)     → Strip locale prefix from URL
```

### Translation Keys

The `ui` object in `ui.ts` contains keys for:
- Navigation: `nav.home`, `nav.blog`, `nav.about`, `nav.osaka`
- Site metadata: `site.title`, `site.description`
- Hero section: `hero.greeting`, `hero.title`, `hero.subtitle`, `hero.description`, `hero.cta`, `hero.blogCta`, `hero.aboutCta`

### Page-Level i18n Pattern

Each locale has its own set of page files (`pages/ja/*.astro`, `pages/ko/*.astro`) that:
1. Import `useTranslations` and `getLangFromUrl` from `src/i18n/utils.ts`
2. Call `useTranslations('ja')` (or `'ko'`) to get the `t()` function
3. Use `t('key')` for UI strings
4. Filter content collections by `lang` field

This is a **manual file-based approach** — not Astro's dynamic middleware-based i18n routing.

---

## Content Collections and Blog System

### Schema Definition (`content.config.ts`)

```typescript
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: image().optional(),
    lang: z.enum(['en', 'ja', 'ko']).default('en'),
  }),
});
```

### Key Design Points

- **Loader**: Uses `glob` to scan `src/content/blog/` for `.md` and `.mdx` files
- **Language field**: Each post declares its language via `lang` frontmatter. Default is `'en'`
- **Image validation**: `heroImage` uses Astro's `image()` schema for build-time optimization
- **Date coercion**: `z.coerce.date()` allows string dates in frontmatter (e.g., `'Feb 10 2026'`)

### Multilingual Blog Post Convention

| File | Language | ID |
| --- | --- | --- |
| `second-post.md` | English | `second-post` |
| `second-post.ja.md` | Japanese | `second-post.ja` |
| `second-post.ko.md` | Korean | `second-post.ko` |

- Default language posts have no locale suffix
- Translated posts use `{slug}.{locale}.md` naming
- Blog listing pages filter by `post.data.lang === '{locale}'`
- Dynamic route pages strip the locale suffix from the ID to generate clean slugs

---

## Styling Architecture

### Tailwind CSS 4 Setup

The project uses **Tailwind CSS 4** with the new Vite plugin approach (not PostCSS):

```css
/* src/styles/global.css */
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@variant dark (&:is(.dark *));
```

Key differences from Tailwind CSS 3:
- `@import "tailwindcss"` replaces `@tailwind base/components/utilities`
- `@plugin` replaces `plugins: [...]` in config
- `@variant` replaces `darkMode: 'class'` in config
- `@theme` replaces `theme.extend` in config

### Custom Fonts

Atkinson Hyperlegible font is self-hosted in `public/fonts/` and declared via `@font-face` in `global.css`. It's set as the default sans-serif font through `@theme { --font-family-sans: ... }`.

Font files are preloaded in `BaseHead.astro` for performance.

### Styling Patterns

| Pattern | Usage |
| --- | --- |
| Tailwind utility classes | Primary method, applied directly in component templates |
| `<style>` scoped blocks | Used in components like `HeaderLink.astro` for complex effects |
| `<style is:global>` | Only in `CodeCopyButton.astro` for runtime-injected elements |
| `prose` classes | Blog post content via `@tailwindcss/typography` |
| `dark:` prefix | All dark mode variants |
| Gradient utilities | Extensive use for backgrounds, text, and hover effects |

---

## Dark Mode System

```
┌─────────────────────┐
│  Page Load           │
│  (BaseHead.astro)    │
│                      │
│  is:inline script    │──► Read localStorage('theme')
│  runs immediately    │──► Apply .dark class to <html>
│  (FOUC prevention)   │──► Prevents flash of wrong theme
└─────────────────────┘

┌─────────────────────┐
│  User Interaction    │
│  (Header.astro)      │
│                      │
│  #themeToggle click  │──► Toggle .dark on <html>
│                      │──► Save to localStorage
│                      │──► ThemeIcon auto-updates via CSS
└─────────────────────┘
```

- **Storage**: `localStorage` key `'theme'` with values `'dark'` or `'light'`
- **CSS Strategy**: Class-based via `.dark` on `<html>`, configured with `@variant dark (&:is(.dark *))`
- **Toggle UI**: `ThemeIcon.astro` uses CSS `dark:fill-transparent` / `dark:fill-white` to swap sun/moon SVG paths
- **FOUC Prevention**: An `is:inline` script in `BaseHead.astro` runs before paint to read `localStorage` and apply the class synchronously

---

## Client-Side JavaScript

The site ships **zero framework runtime JavaScript**. All client scripts use vanilla JS with `is:inline` (bypasses Astro's module processing):

| Script Location | Purpose | Pattern |
| --- | --- | --- |
| `BaseHead.astro` | Theme initialization (FOUC prevention) | Synchronous inline, reads `localStorage` |
| `Header.astro` | Mobile menu toggle, theme toggle, language picker | Event delegation on `document`, `astro:page-load` listener |
| `CodeCopyButton.astro` | Inject copy buttons into `<pre>` blocks | `DOMContentLoaded`, `navigator.clipboard` API |
| `pages/index.astro` | Browser language detection and redirect | `sessionStorage` guard, `navigator.language` check |

All scripts are `is:inline` meaning they:
- Are not bundled or processed by Astro/Vite
- Execute immediately in the browser
- Cannot import modules
- Are duplicated if the component is used multiple times (mitigated by component structure)

---

## Image Handling

- **Build-time optimization**: Astro's `<Image>` component with Sharp for format conversion and resizing
- **Hero images**: Blog posts can declare `heroImage` in frontmatter; validated at build time by Astro's `image()` schema
- **SVG icons**: Imported as Astro components from `src/assets/icons/` (e.g., `InstagramIcon`, `GitHubIcon`)
- **OGP images**: Default `ogp.png` in assets, overridable per page via `BaseHead` props
- **Font preloading**: Atkinson font files preloaded via `<link rel="preload">` in `BaseHead.astro`

---

## SEO and Meta Tags

`BaseHead.astro` generates comprehensive meta tags for every page:

- **Basic**: `charset`, `viewport`, `title`, `description`, canonical URL
- **Favicon**: `/favicon.svg`
- **Open Graph**: `og:type`, `og:url`, `og:title`, `og:description`, `og:image`
- **Twitter Card**: `twitter:card` (summary_large_image), `twitter:url`, `twitter:title`, `twitter:description`, `twitter:image`
- **Feeds**: RSS feed link (`/rss.xml`), sitemap link (`/sitemap-index.xml`)

---

## Security

Security headers are implemented as `<meta http-equiv>` tags in `BaseHead.astro`:

| Header | Value | Purpose |
| --- | --- | --- |
| Content-Security-Policy | `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'` | Restrict resource loading origins |
| X-Frame-Options | `DENY` | Prevent embedding in iframes |
| X-Content-Type-Options | `nosniff` | Prevent MIME type sniffing |
| Referrer-Policy | `strict-origin-when-cross-origin` | Control referrer information |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` | Disable unnecessary browser APIs |

> Note: `<meta http-equiv>` security headers are **advisory** and less effective than server-sent HTTP headers. For GitHub Pages static hosting, this is the available mechanism. See [SECURITY.md](SECURITY.md) for more details.

---

## Deployment

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

```
Trigger: push to main / manual dispatch
    │
    ▼
Job: build
    ├── actions/checkout@v5
    └── withastro/action@v5  ──► Runs astro build, uploads artifact
    │
    ▼
Job: deploy
    └── actions/deploy-pages@v4  ──► Deploys to GitHub Pages
```

- **Permissions**: `contents: read`, `pages: write`, `id-token: write`
- **Environment**: `github-pages` with URL output
- **Concurrency**: Only one deployment runs at a time; in-progress builds are cancelled

### Branch Strategy

| Branch | Purpose |
| --- | --- |
| `main` | Production — triggers deployment |
| `develop` | Active development |
| `feature/*` | Feature branches off `develop` |

---

## Data Flow Diagram

```
┌─────────────┐     ┌──────────────┐     ┌──────────┐
│ Blog Posts   │     │ i18n Strings │     │ Assets   │
│ (md/mdx)    │     │ (ui.ts)      │     │ (images) │
└──────┬──────┘     └──────┬───────┘     └────┬─────┘
       │                   │                   │
       ▼                   ▼                   ▼
┌──────────────────────────────────────────────────────┐
│               Astro Build Pipeline                    │
│                                                      │
│  Content Collections ◄── Schema validation           │
│  Page Components     ◄── i18n utils + translations   │
│  Image Pipeline      ◄── Sharp optimization          │
│  CSS Pipeline        ◄── Tailwind CSS 4 (Vite)       │
└──────────────────────────┬───────────────────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   dist/      │
                    │              │
                    │  *.html      │
                    │  *.css       │
                    │  *.xml       │
                    │  images/     │
                    │  fonts/      │
                    └──────────────┘
```

---

## Key Design Decisions

### Why File-Based i18n Instead of Dynamic Routing?

Each locale has its own set of page files rather than using Astro's dynamic i18n middleware. This approach:
- Keeps each page self-contained and independently editable
- Avoids middleware complexity for a static site
- Allows locale-specific content differences beyond simple string translation
- Trade-off: some code duplication across locale directories

### Why No Frontend Framework?

The site uses zero React/Vue/Svelte/Solid components:
- All content is static and rendered at build time
- Interactive features (theme toggle, mobile menu) are simple enough for vanilla JS
- Eliminates framework runtime overhead entirely
- Aligns with Astro's "zero-JS by default" philosophy

### Why Tailwind CSS 4 via Vite Plugin?

- Tailwind CSS 4 uses a Vite plugin instead of PostCSS for faster builds
- Enables new features: `@theme`, `@variant`, `@plugin` directives
- Better integration with Astro's Vite-based build pipeline

### Why Self-Hosted Fonts?

- Eliminates external requests to Google Fonts
- Improves privacy (no third-party tracking)
- Enables font preloading for faster rendering
- Consistent with the CSP `font-src 'self'` policy

### Why `is:inline` Scripts?

- Scripts need to run synchronously (theme initialization must happen before paint)
- Scripts are small and don't benefit from bundling
- Avoids Astro's module processing overhead
- Trade-off: no tree-shaking or code splitting for these scripts
