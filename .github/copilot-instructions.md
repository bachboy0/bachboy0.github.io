# Copilot Instructions for bachboy0.github.io

## Project Overview

This is a personal website and blog built with **Astro 5**, Tailwind CSS 4, and deployed to GitHub Pages. The site features a blog with MDX support, dark mode, and responsive design.

## Tech Stack

- **Astro 5.16+** - Static site generator (refer to [Astro Documentation](https://docs.astro.build/))
- **Tailwind CSS 4.1+** - Utility-first CSS framework
- **MDX** - Markdown with JSX components
- **TypeScript** - Type safety

## Important: Always Refer to Astro Documentation

When working with this project, **always consult the official Astro documentation** for:
- Component syntax and patterns
- Content Collections API
- Routing conventions
- Image optimization
- SSR vs SSG considerations
- Integration usage

Use the `mcp_astro_docs_search_astro_docs` tool to search Astro docs when needed.

## Project Structure

```
src/
├── assets/        # Images, icons (optimized by Astro)
├── components/    # Reusable .astro components
├── content/       # Content Collections (blog posts)
├── layouts/       # Page layouts
├── pages/         # File-based routing
└── styles/        # Global CSS
```

## Coding Guidelines

### Astro Components

- Use `.astro` files for components with minimal interactivity
- Prefer Astro's component syntax over JSX where possible
- Use TypeScript for type safety in component props
- Follow Astro's scoped styling patterns

```astro
---
// Component script (runs at build time)
interface Props {
  title: string;
}
const { title } = Astro.props;
---
<h1>{title}</h1>
<style>
  h1 { /* Scoped by default */ }
</style>
```

### Content Collections

- Blog posts are stored in `src/content/blog/`
- Use proper frontmatter schema defined in `src/content.config.ts`
- Support both `.md` and `.mdx` formats

### Styling

- Use Tailwind CSS utility classes as the primary styling method
- Use `@apply` for reusable patterns if needed
- Keep global styles minimal in `src/styles/global.css`
- Respect dark mode classes (likely using `dark:` prefix)
- Do not use inline styles unless absolutely necessary

### TypeScript

- Enable strict type checking
- Define interfaces for component props
- Use type imports where appropriate

### Performance

- Leverage Astro's zero-JS by default architecture
- Use `client:*` directives only when necessary
- Optimize images using Astro's `<Image />` component
- Minimize bundle size

## Development Workflow

1. Run `npm run dev` for local development
2. Test builds with `npm run build` and `npm run preview`
3. Changes to `main` branch auto-deploy via GitHub Actions
4. Current development happens on `develop` branch

## Best Practices

### When Adding New Features

- Check Astro docs first for native solutions
- Consider build-time vs runtime execution
- Maintain file-based routing conventions
- Keep components small and focused

### When Creating Blog Posts

- Use Content Collections schema
- Place in `src/content/blog/`
- Include proper frontmatter (title, description, pubDate)
- Use kebab-case for filenames

### When Styling

- Mobile-first approach with Tailwind
- Use semantic HTML
- Maintain dark mode compatibility
- Keep accessibility in mind

## Common Patterns

### Importing Content
```typescript
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
```

### Using Layouts
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Page Title">
  <!-- content -->
</BaseLayout>
```

### Responsive Images
```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/image.png';
---
<Image src={myImage} alt="Description" />
```

## Troubleshooting

- If encountering Astro-specific issues, search Astro docs first
- Check Astro version compatibility for integrations
- Verify Tailwind CSS 4 syntax (note: v4 has different syntax than v3)
- Ensure TypeScript types are properly imported from `astro:content`

## Deployment

- Builds automatically deploy to GitHub Pages on push to `main`
- Uses `withastro/action@v5` for builds
- Verify build succeeds locally before merging

## Keep Updated

- Regularly check Astro release notes for breaking changes
- Update dependencies with care, test builds thoroughly
- Astro 5 may have different APIs than earlier versions
