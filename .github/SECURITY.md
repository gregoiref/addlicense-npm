# Security Policy

## Supported Versions

Only the latest published version receives security fixes.

| Version | Supported |
|---|---|
| latest | ✅ |
| older | ❌ |

## Reporting a Vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

1. **[GitHub private security advisory](https://github.com/GregoireF/addlicense-npm/security/advisories/new)** _(preferred)_
2. **Email** — [gfavreau.wrprojects@gmail.com](mailto:gfavreau.wrprojects@gmail.com) — subject: `[SECURITY] @gregoiref/addlicense`

**Response SLA:** acknowledgement within 48 h · triage within 7 days · fix timeline within 14 days for confirmed issues.

## Supply-Chain Controls

| Control | Trigger |
|---|---|
| All action `uses:` pinned to commit SHA | Every workflow run |
| Dependabot (GitHub Actions) | Weekly |
| Binary integrity verified via checksums from GoReleaser | Every publish |
