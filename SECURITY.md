# Security Policy

## Supported versions

| Version scope                         | Supported        |
| ------------------------------------- | ---------------- |
| `main` branch (latest deployed state) | Yes              |
| Older commits/tags                    | Best effort only |

Maintenance policy: best effort for a personal static site repository.

## Reporting a vulnerability

Please avoid opening public issues for unpatched vulnerabilities.

Preferred channels:

1. GitHub Security Advisories (private report)
2. Direct contact through repository owner GitHub profile

Expected response targets (best effort):

- Acknowledgement: within 7 days
- Triage update: within 30 days

## Security model

### Threats considered

- Content/script injection in delivered pages
- Clickjacking and framing abuse
- Supply-chain risk from npm dependencies
- Accidental secret disclosure in repository history

### Trust boundaries

- Trusted: repository source, local build process, GitHub Actions workflow definitions
- Semi-trusted: npm dependency ecosystem
- Untrusted: browsers, networks, external request origins

## Secrets management

Current site operation does not require application secrets in repo configuration.

Rules:

- Never commit credentials, private keys, or tokens
- Keep `.env*` files out of Git (already covered by ignore rules)
- Rotate credentials immediately if leaked

ASSUMPTION: if future integrations need secrets, use GitHub Actions secrets for CI/CD and local `.env` files excluded from version control.

## Dependency management

- Package manager: npm with `package-lock.json`
- Core dependencies: Astro, Tailwind CSS, Astro integrations, Sharp
- Update cadence: best effort, with preference for periodic updates and security patches

Recommended baseline:

- Run `npm audit` during maintenance windows
- Keep lockfile changes reviewed in pull requests

## CI security checks

Current CI (`.github/workflows/deploy.yml`) focuses on build and deploy. There are no dedicated security scanning jobs configured.

Recommended minimum baseline additions:

- Dependency vulnerability scan (e.g., `npm audit` or equivalent)
- Code scanning / static analysis workflow
- Branch protection with required status checks

## Secure defaults and hardening

### Implemented

- Content Security Policy via `<meta http-equiv="Content-Security-Policy">` in `src/components/BaseHead.astro`
  - Dev and production policies differ to support local tooling
- `Referrer-Policy` via `<meta name="referrer" content="strict-origin-when-cross-origin">`
- Self-hosted fonts under `public/fonts`
- Minimal client-side scripts and no server-side runtime

### Not currently implemented or not applicable

- Custom HTTP response headers (hosting constraints in current setup)
- CORS policy (no API endpoints to configure)
- Rate limiting (no backend request handlers)
- Authentication/authorization layer (not part of this project)

Input validation posture:

- Content frontmatter is validated at build time by `src/content.config.ts`

## Data protection

- No user account system
- No application database
- No documented collection of personal user-submitted data

PII handling and retention: not applicable based on current repository evidence.
