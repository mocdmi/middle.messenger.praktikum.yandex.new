import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierRules from 'eslint-config-prettier';
import globals from 'globals';

export default [
    {
        files: ['**/*.{js,ts}'],
        ignores: ['/node_modules', '/dist'],
        languageOptions: {
            parser: tsParser,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            prettier,
            '@typescript-eslint': ts,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...ts.configs.recommended.rules,
            ...prettierRules.rules,
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    useTabs: false,
                    semi: true,
                    trailingComma: 'all',
                    bracketSpacing: true,
                    printWidth: 100,
                    endOfLine: 'auto',
                    bracketSameLine: true,
                    tabWidth: 4,
                },
            ],
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/ban-types': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-require-imports': 'off',
        },
    },
];
