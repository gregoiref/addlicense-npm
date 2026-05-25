# @gregoiref/addlicense

> npm package — [addlicense](https://github.com/GregoireF/addlicense) CLI for Node.js projects and CI.

[![CI](https://github.com/GregoireF/addlicense-npm/actions/workflows/ci.yml/badge.svg)](https://github.com/GregoireF/addlicense-npm/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fnpm.pkg.github.com%2F%40gregoiref%2Faddlicense&query=%24.version&label=version&color=orange)](https://github.com/GregoireF/addlicense-npm/packages)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/GregoireF/addlicense-npm/badge)](https://securityscorecards.dev/viewer/?uri=github.com/GregoireF/addlicense-npm)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Distributes the [addlicense](https://github.com/GregoireF/addlicense) Go binary via npm. Each supported platform ships as an optional dependency — npm resolves the correct one automatically at install time. No Go toolchain required.

> **Registry:** packages are published to [GitHub Packages](https://github.com/GregoireF?tab=packages). Add the registry entry below to your `.npmrc` before installing.

---

## Installation

Add to your project `.npmrc`:

```ini
@gregoiref:registry=https://npm.pkg.github.com
```

Then install:

```bash
# Local dev dependency (recommended)
npm install --save-dev @gregoiref/addlicense

# Global
npm install --global @gregoiref/addlicense

# Without install (one-off)
npx @gregoiref/addlicense --check .
```

Works with **npm**, **pnpm**, **yarn**, and **bun** — verified in CI on every push.

---

## Usage

```bash
# Check all files have a license header (CI mode — exits 1 if any missing)
npx @gregoiref/addlicense --check .

# Add MIT headers
npx @gregoiref/addlicense --license MIT --author "Acme Corp" .
```

```json
{
  "scripts": {
    "license:check": "addlicense --check .",
    "license:add":   "addlicense --license MIT --author \"Acme Corp\" ."
  }
}
```

```bash
npm run license:check
```

---

## lint-staged integration

```json
{
  "lint-staged": {
    "*.{ts,js,go,py}": "addlicense --check"
  }
}
```

---

## Supported platforms

| Platform | Architecture |
|---|---|
| Linux | x64, arm64 |
| macOS | x64, arm64 |
| Windows | x64, arm64 |

---

## How it works

`@gregoiref/addlicense` declares one `optionalDependency` per platform. npm (≥ v7) and yarn (≥ v2) resolve the correct package based on `os` and `cpu` fields and skip incompatible ones. The wrapper script (`scripts/addlicense.js`) resolves the binary path from the installed platform package.

This is the same pattern used by [@biomejs/biome](https://github.com/biomejs/biome) and [@tailwindcss/standalone](https://github.com/tailwindlabs/tailwindcss).

---

## Development

```bash
# Run unit tests (Node built-in test runner — no dependencies)
npm test
```

Tests cover all `resolveBinary()` branches: package installed, package missing, binary absent, unknown platform, win32 `.exe` suffix.

---

## Full CLI reference

See [GregoireF/addlicense](https://github.com/GregoireF/addlicense#flags) for all flags and configuration options.

---

## Ecosystem

| Package | Description |
|---|---|
| [addlicense](https://github.com/GregoireF/addlicense) | Core CLI — the Go binary |
| [addlicense-action](https://github.com/GregoireF/addlicense-action) | GitHub Action |
| **addlicense-npm** | This repo — npm package |
| [addlicense-winget](https://github.com/GregoireF/addlicense-winget) | WinGet — `winget install GregoireF.addlicense` |
| [homebrew-tap](https://github.com/GregoireF/homebrew-tap) | Homebrew — `brew install GregoireF/tap/addlicense` |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](.github/SECURITY.md).

---

## License

MIT — see [LICENSE](LICENSE).
