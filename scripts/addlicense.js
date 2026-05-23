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
const fs   = require('fs');

/** Maps `${platform}-${arch}` to the optional npm package that ships the binary. */
const PLATFORM_PACKAGES = {
  'linux-x64':    '@gregoiref/addlicense-linux-x64',
  'linux-arm64':  '@gregoiref/addlicense-linux-arm64',
  'darwin-x64':   '@gregoiref/addlicense-darwin-x64',
  'darwin-arm64': '@gregoiref/addlicense-darwin-arm64',
  'win32-x64':    '@gregoiref/addlicense-win32-x64',
  'win32-arm64':  '@gregoiref/addlicense-win32-arm64',
};

/**
 * Resolves the addlicense binary path.
 * Accepts injectable deps so unit tests can run without filesystem/registry side-effects.
 *
 * @param {object} [opts]
 * @param {string}   [opts.platform]       - defaults to `${process.platform}-${process.arch}`
 * @param {Function} [opts.fsExistsSync]   - defaults to `fs.existsSync`
 * @param {Function} [opts.resolvePackage] - defaults to `require.resolve`
 * @returns {string} Absolute binary path, or bare binary name as PATH fallback.
 */
function resolveBinary({
  platform       = `${process.platform}-${process.arch}`,
  fsExistsSync   = (p) => fs.existsSync(p),
  resolvePackage = (pkg) => require.resolve(`${pkg}/package.json`),
} = {}) {
  const pkgName = PLATFORM_PACKAGES[platform];
  const isWin   = platform.startsWith('win32');
  const binName = isWin ? 'addlicense.exe' : 'addlicense';

  if (pkgName) {
    try {
      const pkgDir = path.dirname(resolvePackage(pkgName));
      const bin    = path.join(pkgDir, 'bin', binName);
      if (fsExistsSync(bin)) return bin;
    } catch {
      // package not installed — fall through to PATH
    }
  }

  return binName;
}

if (require.main === module) {
  const currentPlatform = `${process.platform}-${process.arch}`;
  const bin  = resolveBinary();
  const args = process.argv.slice(2);

  try {
    execFileSync(bin, args, { stdio: 'inherit' });
  } catch (err) {
    if (err.status !== undefined) {
      process.exit(err.status);
    }
    console.error(
      `addlicense: binary not found for ${currentPlatform}.\n` +
      `Install @gregoiref/addlicense or download a binary from ` +
      `https://github.com/GregoireF/addlicense/releases`
    );
    process.exit(1);
  }
}

module.exports = { resolveBinary, PLATFORM_PACKAGES };
