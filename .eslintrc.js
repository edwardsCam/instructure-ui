module.exports = {
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
    "mocha"
  ],
  "env": {
    "browser": true,
    "mocha": true,
    "es6": true
  },
  "globals": {
    "expect": true,
    "sinon": true,
    "Testbed": true
  },
  "parser": "babel-eslint",
  "rules": {
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "mocha/no-exclusive-tests": "error",
    "semi": ['error', 'never'],
    "comma-dangle": ["error", "never"],
    "max-len": [2, 120, 2],
    "space-before-function-paren": ["error", "always"],

    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
    "react/sort-comp": 0,
    "react/no-unused-prop-types": 0,
    "react/prefer-stateless-function": 0,
    "import/prefer-default-export": 0,

    "prefer-rest-params": 0,
    "arrow-parens": 0,
    "arrow-body-style": 0,
    "no-lonely-if": 0,
    "no-else-return": 0,
    "no-shadow": 0,
    "no-unused-vars": 0,
    "no-use-before-define": 0,
    "no-underscore-dangle": 0,
    "no-useless-escape": 0,
    "no-useless-concat": 0,
    "no-multi-assign": 0,
    "no-plusplus": 0,
    "no-unused-expressions": 0,
    "no-confusing-arrow": 0,
    "no-cond-assign": 0,
    "func-names": 0,
    "radix": 0,
    "one-var": 0,
    "one-var-declaration-per-line": 0,
    "key-spacing": 0,
    "dot-notation": 0,
    "global-require": 0,
    "object-shorthand": 0,
    "object-curly-spacing": 0,
    "quotes": 0,
    "array-bracket-spacing": 0,
    "class-methods-use-this": 0,
    "consistent-return": 0,
    "guard-for-in": 0,
    "operator-assignment": 0,
    "default-case": 0
  }
};
