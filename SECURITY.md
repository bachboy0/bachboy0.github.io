# Security Policy

## Overview

This is a **static website** hosted on GitHub Pages. It contains no server-side code, databases, authentication systems, or user data collection. The attack surface is inherently minimal.

## Supported Versions

| Version | Supported |
| --- | --- |
| Latest (main branch) | Yes |
| Older versions | No |

## Security Measures

### Content Security Policy (CSP)

The site implements CSP via `<meta http-equiv>` tags in `BaseHead.astro`:

- `default-src 'self'` — Only allow resources from the same origin
- `script-src 'self' 'unsafe-inline'` — Scripts restricted to same origin and inline (required for theme/menu scripts)
- `style-src 'self' 'unsafe-inline'` — Styles restricted to same origin and inline (required for Tailwind)
- `img-src 'self' data: https:` — Images from same origin, data URIs, and HTTPS sources
- `font-src 'self'` — Self-hosted fonts only

### Additional Headers

- **X-Frame-Options**: `DENY` — Prevents clickjacking via iframe embedding
- **X-Content-Type-Options**: `nosniff` — Prevents MIME type sniffing
- **Referrer-Policy**: `strict-origin-when-cross-origin` — Limits referrer leakage
- **Permissions-Policy**: `camera=(), microphone=(), geolocation=()` — Disables unnecessary browser APIs

### Limitations

These headers are implemented as `<meta http-equiv>` tags, which are **less effective** than HTTP response headers. GitHub Pages does not allow custom HTTP headers, so meta tags are the best available mechanism for this hosting platform.

### Other Measures

- **No external scripts**: No analytics, tracking, or third-party JavaScript
- **Self-hosted fonts**: No requests to external font services
- **Minimal client-side JS**: Only vanilla JavaScript for theme toggle, mobile menu, language detection, and code copy
- **No user input handling**: No forms, APIs, or data processing

## Reporting a Vulnerability

If you discover a security issue with this site, please report it through one of the following channels:

1. **GitHub Security Advisories**: Use the [Security tab](https://github.com/bachboy0/bachboy0.github.io/security/advisories) to privately report a vulnerability
2. **Email**: Contact the repository owner through their [GitHub profile](https://github.com/bachboy0)

Please **do not** open a public issue for security vulnerabilities.

### What to Expect

- Acknowledgment within 7 days
- Assessment and response within 30 days
- Given the static nature of this site, most security concerns will be limited to the CSP configuration or dependency vulnerabilities
