module.exports = {
    root: true,
    env: {browser: true, es2020: true, node:true},
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOption: {ecmaVersion: 'latest', sourceType: 'module'},
    settings: { React: { version: '18.2'} },
    plugin: ['react-refresh'],
    rules: {
        'react-refresh/onlu-esport-components':[
            'warn',
            {allowConstantExport: true},
        ],
        'no-unused-vars': 0
    }
}