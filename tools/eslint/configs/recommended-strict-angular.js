'use strict';

exports.default = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: ['@angular-eslint'],
  extends: ['plugin:@angular-eslint/recommended'],
  rules: {
    '@angular-eslint/prefer-on-push-component-change-detection': ['error']
  }
};
