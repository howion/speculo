import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPrettier from 'eslint-config-prettier'
import eslintReactRecommended from 'eslint-plugin-react/configs/recommended.js'

export default [
    {
        ignores: ['.next/', 'bin/', 'node_modules/', 'dist/', 'public/']
    },
    js.configs.recommended,

    // ...tseslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,

    {
        name: 'eslint-react',
        ...eslintReactRecommended,
        files: ['**/*.{jsx,tsx}']
    },

    eslintPrettier,

    {
        rules: {
            '@typescript-eslint/triple-slash-reference': 'off'
        }
    }
]
