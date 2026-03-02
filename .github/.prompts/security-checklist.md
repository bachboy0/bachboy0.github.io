## Security Measures Checklist (for Websites / Web Applications)

---

### 0. How to Use (Operational Rules)

Record each item using one of the following statuses. This is also how the IPA appendix checklist is operated.

- □ Implemented
- □ Not implemented
- □ Not applicable (write the reason)
- Owner / Due date / Notes (ticket number)

At the end, there is an execution check section formatted for management using `Implemented / Not implemented / Not applicable`.

---

### 1. Common Policy (Fundamental Design/Implementation Principles)

- □ Prioritize “root-cause fixes” first, and treat “insurance-style controls” as supplementary
- □ For new development, incorporate controls at the design stage (minimize retrofitting)
- □ List “critical processes” (auth, payments, personal data updates, etc.) and address them first
- □ Add security requirements to code review criteria
- □ Define exception logs, audit logs, and alerting policy (who checks what and when)

IPA also explicitly states a philosophy of focusing on root-cause fixes and using insurance-style measures as a safety net.

---

## A. Web Application Implementation (by Vulnerability Type)

### 2. SQL Injection

#### Root-cause fixes

- □ Build SQL using placeholders (Prepared Statements)
- □ Prohibit building SQL via string concatenation, or manage exceptions explicitly
- □ If string concatenation is unavoidable, use a safe literal-escaping API appropriate to the DB engine/API
- □ Do not implement anything that accepts raw SQL directly from request parameters (prohibited)

IPA also treats placeholders as the primary/root measure, and requires proper DB-engine-specific APIs when string concatenation is unavoidable.

#### Insurance-style controls

- □ Do not display DB error details (SQL statements, DB type, stack traces) in the browser
- □ Apply least privilege to the DB account (only the minimum SELECT/UPDATE/etc. needed)
- □ Separate user-facing error messages from internal logs

These appear as-is as supplemental measures in IPA guidance.

#### SQL Appendix (additional implementation checks)

- □ Confirm driver settings that enable static placeholders (prefer static if possible)
- □ Standardize DB connection character encoding to UTF-8 family
- □ For MySQL-family DBs, confirm settings such as `useServerPrepStmts=true` (e.g., Java/JDBC)
- □ Understand driver constraints and version differences when using dynamic placeholders
- □ Avoid Shift_JIS-family encodings, or strictly manage them with risk fully understood

The appendix explains that static placeholders are safer, and highlights the importance of specifying encoding (UTF-8 recommended) and verifying driver settings.

---

### 3. OS Command Injection

#### Root-cause fixes

- □ Avoid using shell-spawning functions (system/exec/shell_exec, etc.)
- □ Keep external command execution to the absolute minimum and replace with alternative APIs

#### Insurance-style controls

- □ Validate arguments using a whitelist approach
- □ Strictly validate type/format/length for numbers, IDs, filenames, etc.
- □ Do not rely only on blacklist-based validation
- □ Abort processing and log when dangerous characters are detected

IPA recommends avoiding shell execution and using whitelist validation when it cannot be avoided.

---

### 4. Path Traversal (Unchecked Pathname Parameters)

#### Root-cause fixes

- □ Do not use user input directly as a file path
- □ Use IDs for file selection and resolve via server-side mapping
- □ Fix the base directory + normalize paths + verify the resolved path stays within allowed scope

#### Insurance-style controls

- □ Log detection of dangerous patterns such as `../`
- □ Minimize accessible scope using web server / OS permissions

---

### 5. Broken Session Management

#### Root-cause fixes

- □ Make session IDs sufficiently long and hard to guess
- □ Regenerate session ID after login success (prevent fixation)
- □ Invalidate the session on logout
- □ Do not place session IDs in URLs (use cookies)

#### Insurance-style controls

- □ Set `Secure` / `HttpOnly` / `SameSite` on cookies
- □ Set session expiration (absolute and idle timeouts)
- □ Have detection policies for multiple logins, abnormal IPs, or user-agent changes

IPA’s CWE mapping table also lists session-related issues such as insufficient randomness, insufficient protection of authentication info, missing Secure attribute, and session fixation.

---

### 6. XSS (Cross-Site Scripting)

IPA’s appendix checklist includes very concrete items. Converting them directly into operational checks is often fastest.

#### Root-cause fixes

- □ Perform output escaping for every output location (context-specific)
- □ Allow URL output only if it starts with `http://` or `https://`
- □ Do not dynamically generate the content inside `<script>...</script>`
- □ Do not allow importing stylesheets from arbitrary sites
- □ If HTML input is allowed, extract only permitted elements using parsing-based sanitization
- □ Explicitly specify charset in `Content-Type`

#### Insurance-style controls

- □ Validate input (format, length, allowed characters, etc.)
- □ If allowing HTML input, do not rely solely on “dangerous string removal” (treat only as a supplement)
- □ Add HttpOnly to cookies and disable TRACE
- □ Return response headers that enable browser defenses (manage policies such as CSP)

Many of the above correspond to IPA appendix items 5-(i) through 5-(ix).

---

### 7. CSRF

#### Root-cause fixes

- □ Introduce CSRF tokens for critical operations
- □ Restrict critical operations to POST/PUT/DELETE, etc.
- □ Bind tokens to session/user and set expiration

#### Additional checks (practical items in IPA appendix)

- □ Require re-authentication (password re-entry) immediately before critical operations
- □ (Supplement) Implement Referer/Origin checks

#### Insurance-style controls

- □ Notify the registered email address when a critical operation is performed (post-fact detection)

These correspond to IPA appendix items 6-(i)-a to c and 6-(ii).

---

### 8. HTTP Header Injection

#### Root-cause fixes

- □ Do not output headers by direct string writing; use framework/language header APIs
- □ If the API does not guarantee newline handling, implement CR/LF prohibition in the application

#### Insurance-style controls

- □ Remove or reject newline characters from all external inputs (as appropriate to use)
- □ Prioritize review of Location header, Set-Cookie, and mail-related headers

These correspond to IPA appendix items 7-(i)-a, 7-(i)-b, and 7-(ii).

---

### 9. Mail Header Injection

#### Root-cause fixes

- □ Prevent insertion of newlines into To/Subject/From, etc. in mail sending
- □ Use mail-sending APIs/libraries and do not hand-build header strings
- □ Prioritize review of “contact form” style message sending flows

#### Insurance-style controls

- □ Remove newlines from inputs and validate formats (email address, subject length, etc.)
- □ Set monitoring and rate limits for send failures/abnormal sending

---

### 10. Clickjacking

#### Root-cause fixes

- □ Set `X-Frame-Options` or `frame-ancestors` (CSP)
- □ As a rule, forbid framing for admin/payment/settings-change screens
- □ If embedding is necessary, explicitly specify allowed origins

#### Supplement (interaction design items in IPA appendix)

- □ Ask for password input again immediately before critical actions
- □ Do not design critical actions to be completed solely by mouse operations (e.g., require confirmation input)

IPA appendix has related items under 9-(i)-a and 9-(ii).

---

### 11. Buffer Overflow

#### Root-cause fixes

- □ Prefer languages that do not allow direct memory manipulation (PHP/Java/Perl, etc.)
- □ Minimize parts implemented in C/C++
- □ Use vulnerability-fixed versions of native extensions/external libraries

This corresponds to IPA main text and appendix items 10-(i)-a, 10-(i)-b, and 10-(ii).

---

### 12. Missing Access Control / Authorization

#### Root-cause fixes

- □ Add authentication (secret input) where required
- □ Implement authorization so users cannot access others’ data/features
- □ Enforce authorization server-side, not only at the UI layer
- □ Implement IDOR countermeasures (prevent specifying another user’s ID)
- □ Separate admin functions from general user functionality

This corresponds to IPA appendix items 11-(i) and 11-(ii).

---

## B. Improving Overall Website Security (Operations / Infrastructure)

This section expands IPA Chapter 2 into practical checklist items. It includes “web server,” “DNS,” “eavesdropping countermeasures,” “anti-phishing,” “passwords,” “WAF,” etc.

### 13. Web Server

- □ Have procedures for applying OS/middleware patches
- □ Disable unnecessary modules and ports
- □ Restrict exposure of admin screens (IP allowlist/VPN)
- □ Do not disclose product names/versions on error pages
- □ Define retention and preservation policies for access/error logs

### 14. DNS

- □ Define owners and change procedures for DNS record management
- □ Remove unnecessary records
- □ Monitor domain renewal/expiration deadlines
- □ Use dual approval or keep records for DNS changes

### 15. Eavesdropping Countermeasures (HTTPS)

- □ Enforce HTTPS across all pages
- □ Implement HTTP→HTTPS redirects
- □ Monitor certificate expiration
- □ Set Secure attribute on cookies
- □ Eliminate mixed content (HTTP assets)

### 16. Preventing Facilitation of Phishing

- □ Standardize how the official domain is displayed
- □ Make login URLs explicit in user flows
- □ Avoid suspicious URL shorteners or ambiguous wording in email templates
- □ Configure domain spoofing protections (SPF/DKIM/DMARC)

### 17. Password Management

- □ Do not store passwords in plaintext
- □ Hash passwords (with salt)
- □ Prohibit “initial password” operations or force change on first login
- □ Ensure password reset is secure (one-time, time-limited)
- □ Implement brute-force protections (rate limit/lockout/notification)

### 18. WAF

- □ Clearly define whether a WAF is deployed and what scope it covers
- □ Understand detection-only vs blocking modes
- □ Have an operational flow for false positives (exception requests)
- □ Do not rely solely on the WAF; continue root-cause fixes in the application

---

## C. Development / Operations Process (Practical Controls to Reduce Incidents)

If this is missing, the checklist becomes an annual ritual.

### 19. During Development

- □ Include security review items in PR templates
- □ Define a “dangerous API list” (exec, eval, raw SQL, direct header output, etc.)
- □ Use shared utilities for input validation and output escaping
- □ Define a library update policy (regular updates + emergency response)

### 20. During Testing

- □ Perform malicious-input testing for critical functions
- □ Perform authorization tests (other user IDs, different roles)
- □ Automate regression tests for CSRF/XSS/SQLi
- □ Test for error-message exposure

### 21. During Operations

- □ Define what vulnerability sources you monitor (OS, frameworks, language, DB, libraries)
- □ Have an incident initial response procedure (triage, blocking, communication)
- □ Periodically validate backups and restoration procedures
- □ Prevent tampering with audit logs

---

## D. Minimum Prioritization (What to Do First)

Time and staffing are usually limited, so set priorities in advance.

1. **Authentication & Authorization** (prevent access/operations on others’ data)
2. **SQLi / XSS / CSRF** (the main battlefield for typical incidents)
3. **Session management** (cookie attributes, fixation, expiration)
4. **HTTP/Mail header injection**
5. **Infrastructure operations** (HTTPS, patching, logs, WAF)
6. **Recheck clickjacking / buffer overflow controls**

IPA presents 11 types but also states that “the item numbers are not priorities,” so you should decide priorities based on your service reality.

---

## Requirements

1. Perform a security check and write the results to `security-check.md`.
2. Do not modify any existing code.
3. The security check must consider the scope of existing functionality.
4. `security-check.md` is a markdown file that should be created in the project root directory, and it must be written in English.
