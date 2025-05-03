module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react'],
    rules: {
        'no-debugger': 'off',
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': [
            'warn',
            {
                ednOfLine: 'auto',
            },
        ],
    },
};
