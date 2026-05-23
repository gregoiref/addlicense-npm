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

## Release process

Releases are **fully automated** — do not publish manually.

When `addlicense` core publishes a new version:
1. A `repository_dispatch(addlicense-released)` event is sent to this repo.
2. `publish.yml` downloads the binaries from the GitHub Release, bumps all `package.json` versions, publishes the 7 npm packages, and commits the version bump.

**Prerequisite:** The `NPM_TOKEN` secret must be configured (npm automation token for `@gregoiref` scope).

## Adding a new platform

1. Create `packages/<platform>/package.json` with the correct `os` and `cpu` fields.
2. Add the package to `optionalDependencies` in the root `package.json`.
3. Add the platform entry to the `PLATFORMS` array in `publish.yml`.
4. Update `PLATFORM_PACKAGES` in `scripts/addlicense.js`.

## Commit conventions

Uses `@gregoiref/commitlint-config`. Allowed scopes: `npm`, `scripts`, `packages`, `ci`, `deps`, `release`, `docs`.
