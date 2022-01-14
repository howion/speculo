module.exports = {
    //--------------------------------------------------------------------------
    // Environment
    //--------------------------------------------------------------------------
    env: {
        browser: true,
        node: true,
        es2021: true
    },

    //--------------------------------------------------------------------------
    // Parser
    //--------------------------------------------------------------------------
    parser: '@typescript-eslint/parser',

    //--------------------------------------------------------------------------
    // Parser Options
    //--------------------------------------------------------------------------
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        ecmaVersion: 12
    },

    //--------------------------------------------------------------------------
    // Extends
    //--------------------------------------------------------------------------
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],

    //--------------------------------------------------------------------------
    // Plugins
    //--------------------------------------------------------------------------
    plugins: ['react', '@typescript-eslint'],

    //--------------------------------------------------------------------------
    // Settings
    //--------------------------------------------------------------------------
    settings: {
        react: { version: 'detect' }
    },

    //--------------------------------------------------------------------------
    // Rules
    //--------------------------------------------------------------------------
    rules: {
        // DISABLE
        '@typescript-eslint/no-empty-interface': [0],
        '@typescript-eslint/no-explicit-any': [0],
        '@typescript-eslint/no-var-requires': [0],
        '@typescript-eslint/no-non-null-assertion': [0],
        'react/prop-types': [0],
        'no-control-regex': [0],

        // WARN
        '@typescript-eslint/ban-ts-comment': [
            1,
            {
                'ts-expect-error': 'allow-with-description',
                'ts-ignore': 'allow-with-description',
                'ts-nocheck': 'allow-with-description',
                'minimumDescriptionLength': 2
            }
        ],
        'indent': [1, 4, { SwitchCase: 1 }],
        'max-len': [1, { code: 120 }],

        // ERROR
        'linebreak-style': [2, 'windows'],
        'quotes': [2, 'single'],
        'semi': [2, 'never'],
        '@typescript-eslint/explicit-module-boundary-types': [
            1,
            {
                allowArgumentsExplicitlyTypedAsAny: true
            }
        ]
    }
}
