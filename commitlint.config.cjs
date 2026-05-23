// SPDX-License-Identifier: MIT
// Copyright 2026 Grégoire Favreau
'use strict';

/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@gregoiref/commitlint-config'],
  rules: {
    'scope-enum': [2, 'always', ['npm', 'scripts', 'packages', 'tests', 'ci', 'deps', 'release', 'docs']],
  },
};
