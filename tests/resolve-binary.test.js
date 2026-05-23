// SPDX-License-Identifier: MIT
// Copyright 2026 Grégoire Favreau
'use strict';

const { test } = require('node:test');
const assert   = require('node:assert/strict');
const path     = require('node:path');

const { resolveBinary, PLATFORM_PACKAGES } = require('../scripts/addlicense.js');

const FAKE_PKG_DIR  = '/fake/node_modules/@gregoiref/addlicense-linux-x64';
const FAKE_PKG_JSON = `${FAKE_PKG_DIR}/package.json`;

test('PLATFORM_PACKAGES covers all six supported platforms', () => {
  const expected = [
    'linux-x64', 'linux-arm64',
    'darwin-x64', 'darwin-arm64',
    'win32-x64', 'win32-arm64',
  ].sort();
  assert.deepStrictEqual(Object.keys(PLATFORM_PACKAGES).sort(), expected);
});

test('resolves package binary when package is installed and binary exists', () => {
  const result = resolveBinary({
    platform:       'linux-x64',
    fsExistsSync:   () => true,
    resolvePackage: () => FAKE_PKG_JSON,
  });
  assert.strictEqual(result, path.join(FAKE_PKG_DIR, 'bin', 'addlicense'));
});

test('falls back to bare binary name when package is installed but binary is absent', () => {
  const result = resolveBinary({
    platform:       'linux-x64',
    fsExistsSync:   () => false,
    resolvePackage: () => FAKE_PKG_JSON,
  });
  assert.strictEqual(result, 'addlicense');
});

test('falls back to bare binary name when package is not installed', () => {
  const result = resolveBinary({
    platform:       'linux-x64',
    fsExistsSync:   () => true,
    resolvePackage: () => { throw Object.assign(new Error('MODULE_NOT_FOUND'), { code: 'MODULE_NOT_FOUND' }); },
  });
  assert.strictEqual(result, 'addlicense');
});

test('falls back to bare binary name for an unsupported platform', () => {
  const result = resolveBinary({
    platform:       'freebsd-x64',
    fsExistsSync:   () => true,
    resolvePackage: () => { throw new Error('should not be called'); },
  });
  assert.strictEqual(result, 'addlicense');
});

test('returns addlicense.exe on win32', () => {
  const FAKE_WIN_DIR = '/fake/node_modules/@gregoiref/addlicense-win32-x64';
  const result = resolveBinary({
    platform:       'win32-x64',
    fsExistsSync:   () => true,
    resolvePackage: () => `${FAKE_WIN_DIR}/package.json`,
  });
  assert.strictEqual(result, path.join(FAKE_WIN_DIR, 'bin', 'addlicense.exe'));
});

test('returns plain addlicense (no .exe) on all non-win32 platforms', () => {
  for (const platform of ['linux-x64', 'linux-arm64', 'darwin-x64', 'darwin-arm64']) {
    const result = resolveBinary({
      platform,
      fsExistsSync:   () => true,
      resolvePackage: () => FAKE_PKG_JSON,
    });
    assert.ok(
      !result.endsWith('.exe'),
      `Expected no .exe for ${platform}, got: ${result}`
    );
  }
});
