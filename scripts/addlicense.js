#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright 2026 Grégoire Favreau
//
// Resolves the platform-specific binary from optionalDependencies and
// exec-replaces the process. Falls back to a binary on PATH if the
// platform package is not installed (e.g. manual PATH install).

'use strict';

const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PLATFORM_PACKAGES = {
  'linux-x64':    '@gregoiref/addlicense-linux-x64',
  'linux-arm64':  '@gregoiref/addlicense-linux-arm64',
  'darwin-x64':   '@gregoiref/addlicense-darwin-x64',
  'darwin-arm64': '@gregoiref/addlicense-darwin-arm64',
  'win32-x64':    '@gregoiref/addlicense-win32-x64',
  'win32-arm64':  '@gregoiref/addlicense-win32-arm64',
};

const platform = `${process.platform}-${process.arch}`;
const pkgName  = PLATFORM_PACKAGES[platform];
const binName  = process.platform === 'win32' ? 'addlicense.exe' : 'addlicense';

function resolveBinary() {
  // 1. Try the optional platform package.
  if (pkgName) {
    try {
      const pkgDir = path.dirname(require.resolve(`${pkgName}/package.json`));
      const bin    = path.join(pkgDir, 'bin', binName);
      if (fs.existsSync(bin)) return bin;
    } catch {
      // package not installed — fall through
    }
  }

  // 2. Fall back to binary on PATH (manual install, Docker, CI cache).
  return binName;
}

const bin  = resolveBinary();
const args = process.argv.slice(2);

try {
  execFileSync(bin, args, { stdio: 'inherit' });
} catch (err) {
  if (err.status !== undefined) {
    process.exit(err.status);
  }
  // Binary not found — emit a clear message instead of a Node stack trace.
  console.error(
    `addlicense: binary not found for ${platform}.\n` +
    `Install @gregoiref/addlicense or download a binary from ` +
    `https://github.com/GregoireF/addlicense/releases`
  );
  process.exit(1);
}
