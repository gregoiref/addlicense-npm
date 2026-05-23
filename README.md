# @gregoiref/addlicense

> npm package — [addlicense](https://github.com/GregoireF/addlicense) CLI for Node.js projects and CI.

[![npm](https://img.shields.io/npm/v/@gregoiref/addlicense)](https://www.npmjs.com/package/@gregoiref/addlicense)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Distributes the [addlicense](https://github.com/GregoireF/addlicense) Go binary via npm. Each supported platform ships as an optional dependency — npm resolves the correct one automatically at install time. No Go toolchain required.

---

## Installation

```bash
# Local dev dependency (recommended)
npm install --save-dev @gregoiref/addlicense

# Global
npm install --global @gregoiref/addlicense

# Without install (one-off)
npx @gregoiref/addlicense --check .
```

---

## Usage

```bash
# Check all files have a license header (CI mode — exits 1 if any missing)
npx @gregoiref/addlicense --check .

# Add MIT headers
npx @gregoiref/addlicense --license MIT --author "Acme Corp" .

# npm scripts integration
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

## Full CLI reference

See [GregoireF/addlicense](https://github.com/GregoireF/addlicense#flags) for all flags and configuration options.

---

## License

MIT — see [LICENSE](LICENSE).
