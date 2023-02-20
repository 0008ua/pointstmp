module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
      },
      extends: [
        'plugin:@angular-eslint/ng-cli-compat',
        'plugin:@angular-eslint/ng-cli-compat--formatting-add-on',
        'plugin:@angular-eslint/template/process-inline-templates',
        'plugin:ngrx/recommended',
        'plugin:prettier/recommended',
      ],
      rules: {
        '@angular-eslint/component-class-suffix': [
          'error',
          {
            suffixes: ['Page', 'Component'],
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'app',
            style: 'kebab-case',
          },
        ],
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'app',
            style: 'camelCase',
          },
        ],
        'arrow-body-style': 'off',
        '@typescript-eslint/naming-convention': 'off',
        //  [
        //   'warn',
        //   {
        //     selector: 'objectLiteralProperty',
        //     format: ['camelCase'],
        //     filter: {
        //       regex: '^Content-Type$',
        //       match: false,
        //     },
        //   },
        //   {
        //     selector: ['variableLike', 'property', 'memberLike'],
        //     format: ['camelCase', 'strictCamelCase'],
        //     // filter: {
        //     //   regex: '^(_|_id)$',
        //     //   match: false,
        //     // },
        //   },
        // ],
        'no-underscore-dangle': 'off',
        'prettier/prettier': [
          'warn',
          {
            printWidth: 80,
            tabWidth: 2,
            useTabs: false,
            semi: true,
            singleQuote: true,
            trailingComma: 'all',
            bracketSpacing: true,
            jsxBracketSameLine: false,
            arrowParens: 'always',
            proseWrap: 'always',
            endOfLine: 'auto',
          },
        ],
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {},
    },
  ],
};
