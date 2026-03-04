# bachboy0.github.io

[![Deploy to GitHub Pages](https://github.com/bachboy0/bachboy0.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/bachboy0/bachboy0.github.io/actions/workflows/deploy.yml)

Personal website and blog built with Astro 5, Tailwind CSS 4, and Markdown/MDX content.

## What this repository is

- A static multilingual personal site (`en`, `ja`, `ko`) — each locale served at `/{locale}/`
- A language-selection landing page at `/`
- A blog powered by Astro Content Collections
- A GitHub Pages deployment target via GitHub Actions

## What this repository is not

- Not a backend service
- Not a user-authenticated web application
- Not a database-backed system

## Quickstart

### Option 1: local Node.js

Prerequisites: Node.js LTS and npm.

```bash
git clone https://github.com/bachboy0/bachboy0.github.io.git
cd bachboy0.github.io
npm install
npm run dev
```

Open `http://localhost:4321`.

### Option 2: container/devcontainer

Prerequisites: Docker (and optionally VS Code Dev Containers).

```bash
docker compose up
```

Then run `npm run dev` in the container workspace if not already running.

## Configuration

No required `.env` file is currently documented for core site functionality.

### Environment variables observed in repository configuration

| Variable        | Example       | Scope      | Notes                      |
| --------------- | ------------- | ---------- | -------------------------- |
| `HOST`          | `0.0.0.0`     | Dockerfile | Container host binding     |
| `PORT`          | `4321`        | Dockerfile | Astro port                 |
| `NODE_ENV`      | `development` | compose    | Development container mode |
| `SSH_AUTH_SOCK` | `/ssh-agent`  | compose    | SSH agent forwarding path  |

Safe `.env` guidance:

- Do not commit `.env*` files with secrets.
- Use placeholder values in documentation only.
- Rotate any accidentally exposed credentials immediately.

ASSUMPTION: if future features require API keys, add `.env.example` with non-secret placeholders.

## Common tasks

| Task | Command | Notes |
| --- | --- | --- |
| Install dependencies | `npm install` | Uses `package-lock.json` |
| Start development server | `npm run dev` | Serves on port `4321` |
| Build production output | `npm run build` | Outputs to `dist/` |
| Preview production build | `npm run preview` | Local preview server |
| Run Astro CLI | `npm run astro -- <args>` | Example: `npm run astro -- check` |

There are currently no dedicated `test`, `lint`, or `format` npm scripts in `package.json`.

## Git workflow

Documented and evidenced workflow:

- Pushes to `main` trigger deployment workflow (`.github/workflows/deploy.yml`).

Suggested workflow (ASSUMPTION):

1. Create a feature branch.
2. Commit small, focused changes.
3. Open a pull request.
4. Merge to `main` after review.

## Deployment overview

- Deployment target: GitHub Pages
- Build/deploy workflow: `.github/workflows/deploy.yml`
- Trigger: push to `main` or manual workflow dispatch

For architecture details, see `ARCHITECTURE.md`.

## Troubleshooting

1. **Dev server not reachable from host**
   - Confirm port `4321` is free and forwarded.
   - Verify `server.host: true` in `astro.config.mjs`.

2. **CSP warnings in local dev tools**
   - Astro dev tooling may inject inline styles/scripts.
   - Check production behavior with `npm run build && npm run preview`.

3. **Blog route slug looks unexpected**
   - Route slug comes from `post.id` with locale suffix stripped in `src/pages/{en,ja,ko}/blog/[...slug].astro`.
   - Review locale suffix handling (`post.id.replace(/${locale}$/, '')`) in each locale route file.
   - See ADR-0005 for the locales-all-prefixed routing policy.

4. **Build fails on content schema**
   - Validate frontmatter fields against `src/content.config.ts`.
   - Ensure `lang` is one of `en`, `ja`, `ko`.

5. **Container starts but site not serving**
   - Confirm `npm run dev` is running in container shell.
   - `docker compose up` alone may not start Astro dev server automatically.

## Contributing

- Keep changes scoped and documented.
- For docs/security/architecture changes, update relevant markdown files in the same PR.
- Verify local build before opening a PR:

```bash
npm run build
npm run preview
```

## License

MIT License. See `LICENSE`.
