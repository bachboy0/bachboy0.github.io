# bachboy0.github.io

Personal website and blog built with Astro and Tailwind CSS, deployed on GitHub Pages.

## 🚀 Features

- 📝 Blog with MDX support
- 🎨 Modern design with Tailwind CSS
- 🌙 Dark mode support
- 📱 Responsive layout
- 🔍 RSS feed support
- 🗺️ Sitemap generation
- ⚡ Fast performance with Astro

## 📦 Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [MDX](https://mdxjs.com/) - Markdown with JSX
- GitHub Actions - CI/CD for automated deployment

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/bachboy0/bachboy0.github.io.git
cd bachboy0.github.io

# Install dependencies
npm install
```

## 🧞 Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Start local development server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview your build locally before deploying |
| `npm run astro` | Run Astro CLI commands |

## 📁 Project Structure

```
/
├── public/          # Static assets
│   └── fonts/
├── src/
│   ├── assets/      # Images and icons
│   ├── components/  # Astro components
│   ├── content/     # Blog posts and content collections
│   │   └── blog/
│   ├── layouts/     # Page layouts
│   ├── pages/       # Routes and pages
│   │   ├── about.astro
│   │   ├── index.astro
│   │   └── blog/
│   └── styles/      # Global styles
├── astro.config.mjs # Astro configuration
└── package.json
```

## 🚀 Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch using GitHub Actions.

The deployment workflow is defined in `.github/workflows/deploy.yml`.

## 📝 Adding New Blog Posts

Create a new `.md` or `.mdx` file in `src/content/blog/`:

```markdown
---
title: 'My New Post'
description: 'Post description'
pubDate: 'Jan 01 2026'
---

Your content here...
```

## 📄 License

This project is open source and available under the MIT License.
