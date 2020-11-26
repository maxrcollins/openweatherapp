const { any } = require("bluebird");

module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    //'@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-use-before-define': 'off',
       "array-bracket-spacing": "warn",
       "arrow-spacing": "warn",
       "block-spacing": "warn",
       "brace-style": [
          "warn",
          "stroustrup",
          {
             "allowSingleLine": true
          }
       ],
       "comma-dangle": [
          "warn",
          "always-multiline"
       ],
       "comma-spacing": "warn",
       "computed-property-spacing": "warn",
       "eqeqeq": [
          "warn",
          "smart"
       ],
       "func-call-spacing": "warn",
       "indent": [
          "warn",
          2,
          {
             "SwitchCase": 1,
             "VariableDeclarator": {
                "const": 3,
                "let": 2,
                "var": 2
             }
          }
       ],
       "key-spacing": "warn",
       "keyword-spacing": "warn",
       "linebreak-style": [
          "warn",
          "unix"
       ],
       "max-len": [
          "warn",
          {
             "code": 120,
             "tabWidth": 2
          }
       ],
       "max-params": [
          "warn",
          5
       ],
       "new-parens": "warn",
       "no-console": "warn",
       "no-debugger": "warn",
       "no-empty": "warn",
       "no-extra-semi": "warn",
       "no-multi-spaces": [
          "warn",
          {
             "ignoreEOLComments": true
          }
       ],
       "no-use-before-define": [
          "warn",
          "nofunc"
       ],
       "no-unused-vars": "warn",
       "no-var": "warn",
       "no-whitespace-before-property": "warn",
       "prefer-const": "warn",
       "object-curly-spacing": [
          "warn",
          "always"
       ],
       "quotes": [
          "warn",
          "single",
          {
             "allowTemplateLiterals": true,
             "avoidEscape": true
          }
       ],
       "rest-spread-spacing": "warn",
       "semi": [
          "warn",
          "always",
          {
             "omitLastInOneLineBlock": true
          }
       ],
       "semi-spacing": "warn",
       "space-before-blocks": "warn",
       "space-before-function-paren": [
          "warn",
          {
             "anonymous": "never",
             "asyncArrow": "always",
             "named": "never"
          }
       ],
       "space-in-parens": "warn",
       "space-infix-ops": "warn",
       "space-unary-ops": "warn",
       "switch-colon-spacing": "warn",
       "template-curly-spacing": "warn",
       "template-tag-spacing": "warn"
    }
  }


