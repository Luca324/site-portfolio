// JSX is ignored: the built-in indent rule mis-counts markup,
// and eslint-plugin-react crashes on the current ESLint.
const jsxNodes = [
    'JSXElement',
    'JSXElement > *',
    'JSXAttribute',
    'JSXIdentifier',
    'JSXNamespacedName',
    'JSXMemberExpression',
    'JSXSpreadAttribute',
    'JSXExpressionContainer',
    'JSXOpeningElement',
    'JSXClosingElement',
    'JSXFragment',
    'JSXOpeningFragment',
    'JSXClosingFragment',
    'JSXText',
    'JSXEmptyExpression',
    'JSXSpreadChild',
]

export default [
    {
        ignores: ['dist/**', 'node_modules/**'],
    },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        rules: {
            indent: ['error', 4, { SwitchCase: 1, ignoredNodes: jsxNodes }],
            'padding-line-between-statements': ['warn', {
                blankLine: 'always',
                prev: '*',
                next: 'return',
            }],
        },
    },
]
