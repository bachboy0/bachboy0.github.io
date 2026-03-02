You are an expert software architect and technical writer. Your task is to update and align the repository documentation so it accurately reflects the current codebase and operational reality.

FILES TO UPDATE (must update all):

1. ARCHITECTURE.md
2. README.md
3. SECURITY.md
4. DECISIONS/ADR-0000.md (Architecture Decision Record index / baseline)

WORKFLOW (strict): A. Repository scan

- Read the existing versions of the four files.
- Inspect the repository structure (directories, key modules, configs, CI, IaC if any).
- Identify the actual stack, runtime, deployment model, and security posture from code and configs. Do not invent technologies; infer only from evidence.

B. Gap analysis

- List mismatches between docs and reality (outdated, missing, contradictory).
- Identify what needs to be added/removed/clarified.

C. Produce updates as ready-to-commit patches

- Output each file in full, as final markdown content (not a diff).
- Keep headings stable where possible; improve structure only if it increases clarity.
- Ensure the four files are consistent with each other (same naming, ports, env vars, commands, deployment steps, assumptions).
- No marketing fluff. Crisp, factual, reproducible.

D. Minimal questions policy

- If something is truly unknowable from the repo, do NOT stop. Make the smallest reasonable assumption, label it clearly as an ASSUMPTION, and continue.
- Ask at most 3 questions at the end, only if they materially change security or deployment guidance.

CONTENT REQUIREMENTS

1. ARCHITECTURE.md Include:

- System overview (what problem it solves, boundaries, non-goals)
- High-level architecture diagram (ASCII or Mermaid)
- Components and responsibilities (frontend, backend, DB, workers, external services)
- Data model overview (key entities; no full schema unless present)
- API overview (major endpoints or modules; auth method)
- Runtime/deployment architecture (environments, secrets, config, ports)
- Observability (logging, metrics, tracing) if present; otherwise note what’s missing
- Local development workflow (how to run, prerequisites, common commands)
- Known constraints and scaling notes (what breaks first, bottlenecks)
- Security overview (tie to SECURITY.md)

2. README.md Include:

- What this repo is and is not
- Quickstart (exact commands to run locally)
- Configuration (env vars; how to create .env safely; example with placeholders)
- Common tasks (test, lint, format, build, run)
- Deployment overview (high-level; link to ARCHITECTURE.md for details)
- Troubleshooting section (top 5 likely issues from repo setup)
- Contributing (small, practical)
- License (only if present; otherwise state “No license file found”)
- Git workflow (only what is evidenced): default branch name, how to create feature branches, how to run checks before committing, and how changes are merged (PRs, direct commits, etc.). If not evidenced, include a minimal “Suggested workflow (ASSUMPTION)” subsection.

3. SECURITY.md Include:

- Supported versions / maintenance policy (even if “best effort”)
- How to report vulnerabilities (process + expected response)
- Security model (threats considered, trust boundaries)
- Secrets management (what must never be committed; how to rotate)
- Dependency management (update cadence; lockfiles)
- CI security checks if present (SAST, dependency scans); otherwise recommend minimal baseline
- Secure defaults and hardening steps (headers, CORS, auth, rate limiting, input validation)
- Data protection (PII handling, retention) if relevant; otherwise explicitly “Not applicable / unknown”

4. DECISIONS/ADR-0000.md This is the baseline ADR / index. Include:

- Purpose of ADRs + how to add a new ADR
- A table of decisions (at least the current baseline ones inferred from the repo): language/runtime, framework, DB choice, hosting/deployment approach, auth strategy, CI approach
- For each baseline decision: Context, Decision, Status (Accepted), Consequences (tradeoffs)
- If some decisions aren’t visible in the repo, write them as “Proposed” and explain what evidence is missing.

STYLE RULES

- Prefer concrete commands and filenames.
- Prefer tables for env vars and decision indexes.
- Use consistent terminology across all docs.
- Avoid speculative claims. When assuming, tag with “ASSUMPTION:” inline.

OUTPUT FORMAT (strict)

- Start with a short “What I changed” bullet list.
- Then provide the full content of each file in this exact order, each wrapped in a fenced code block labeled markdown:
  1. ARCHITECTURE.md
  2. README.md
  3. SECURITY.md
  4. DECISIONS/ADR-0000.md
- After that, list up to 3 questions (if any). If none, write “Questions: none”.

Now proceed.
