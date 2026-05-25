# Contributing

## Repository structure

```
addlicense-npm/
├── package.json                  # root @gregoiref/addlicense package
├── scripts/
│   └── addlicense.js             # wrapper that resolves the platform binary
├── packages/
│   ├── linux-x64/package.json    # os/cpu-filtered stub (bin/ added at publish)
│   ├── linux-arm64/package.json
│   ├── darwin-x64/package.json
│   ├── darwin-arm64/package.json
│   ├── win32-x64/package.json
│   └── win32-arm64/package.json
└── .github/workflows/
    ├── ci.yml                    # validate + license-headers + commitlint
    └── publish.yml               # repository_dispatch → download binaries → npm publish
```

## packages/*/bin/ — why only .gitkeep?

The `bin/` directories contain only a `.gitkeep` placeholder. The actual platform binaries are downloaded by `publish.yml` at release time and included in the npm tarball. They are never committed to git — the repository is a build source, not a binary store.

## Release process

Releases are **fully automated** — do not publish manually.

When `addlicense` core publishes a new version:
1. A `repository_dispatch(addlicense-released)` event is sent to this repo.
2. `publish.yml` downloads the binaries from the GitHub Release, bumps all `package.json` versions, publishes the 7 packages to **GitHub Packages** (`npm.pkg.github.com`), and commits the version bump.

Authentication uses `GITHUB_TOKEN` — no extra secret needed.

## Adding a new platform

1. Create `packages/<platform>/package.json` with the correct `os` and `cpu` fields.
2. Add the package to `optionalDependencies` in the root `package.json`.
3. Add the platform entry to the `PLATFORMS` array in `publish.yml`.
4. Update `PLATFORM_PACKAGES` in `scripts/addlicense.js`.

## Running tests

```bash
node --test tests/resolve-binary.test.js
```

Uses the Node.js built-in test runner (Node 18+) — no extra dependencies. Tests cover all branches of `resolveBinary()` in `scripts/addlicense.js` using injectable dependencies (no filesystem or registry access at test time).

> **Note:** `node --test <glob>` only expands globs in Node 21+. List test files explicitly for Node 18 compatibility.

## Commit conventions

Uses `@gregoiref/commitlint-config`. Allowed scopes: `npm`, `scripts`, `packages`, `tests`, `ci`, `deps`, `release`, `docs`.
