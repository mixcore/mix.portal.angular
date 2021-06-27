exports.default = {
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
  rules: {
    // Eslint
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: 'block-like', next: '*' }
    ],
    // Custom for @typescript-eslint/recommended-requiring-type-checking
    '@typescript-eslint/no-floating-promises': 'off',
    //  Eztool recommended strict rules
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'explicit', overrides: { constructors: 'off' } }],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'signature',
          'public-static-field',
          'protected-static-field',
          'private-static-field',
          'public-decorated-field',
          'protected-decorated-field',
          'private-decorated-field',
          'public-instance-field',
          'protected-instance-field',
          'private-instance-field',
          'public-abstract-field',
          'protected-abstract-field',
          'private-abstract-field',
          'public-field',
          'protected-field',
          'private-field',
          'static-field',
          'instance-field',
          'abstract-field',
          'decorated-field',
          'field',
          'public-constructor',
          'protected-constructor',
          'private-constructor',
          'constructor',
          'public-static-method',
          'protected-static-method',
          'private-static-method',
          'public-decorated-method',
          'protected-decorated-method',
          'private-decorated-method',
          'public-instance-method',
          'protected-instance-method',
          'private-instance-method',
          'public-abstract-method',
          'protected-abstract-method',
          'private-abstract-method',
          'public-method',
          'protected-method',
          'private-method',
          'static-method',
          'instance-method',
          'abstract-method',
          'decorated-method',
          'method'
        ]
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true
        }
      },
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T', 'R', 'U', 'V', 'K']
      },
      {
        selector: ['variable', 'parameter', 'classProperty', 'typeProperty'],
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'are', 'should', 'has', 'have', 'can', 'did', 'will', 'any'],
        filter: {
          regex: '^(production|readonly|disabled)$',
          match: false
        }
      },
      {
        selector: ['classProperty'],
        types: ['boolean'],
        format: ['PascalCase'],
        modifiers: ['private'],
        prefix: ['_is', '_are', '_should', '_has', '_have', '_can', '_did', '_will', '_any'],
        filter: {
          regex: '^(production|readonly|disabled)$',
          match: false
        }
      },
      {
        selector: ['variable', 'property', 'parameter', 'function', 'classMethod', 'objectLiteralMethod', 'typeMethod'],
        format: ['camelCase']
      },
      {
        selector: ['classProperty'],
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require'
      },
      {
        selector: 'variable',
        types: ['string', 'boolean', 'number', 'array'],
        modifiers: ['exported', 'const', 'global'],
        format: ['UPPER_CASE'],
        filter: {
          regex: '^(environment)$',
          match: false
        }
      },
      {
        selector: 'variable',
        modifiers: ['const', 'global'],
        format: ['camelCase', 'UPPER_CASE']
      },
      { selector: ['typeLike', 'enumMember'], format: ['PascalCase'] }
    ],
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-magic-numbers': [
      'error',
      {
        ignore: [0, 1],
        ignoreArrayIndexes: false,
        ignoreDefaultValues: true,
        enforceConst: false,
        detectObjects: false,
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true
      }
    ],
    '@typescript-eslint/prefer-enum-initializers': ['error'],
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: true,
        arrowParameter: true,
        memberVariableDeclaration: true,
        objectDestructuring: true,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: true,
        variableDeclarationIgnoreFunction: true
      }
    ]
  }
};
