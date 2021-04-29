module.exports = {
  root: true,
  rules: {
    "no-restricted-globals": ["error", "event", "fdescribe"],
    "no-tabs": "off",
  },
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
    parser: "babel-eslint",
    sourceType: "module",
  },
  extends: ["plugin:vue/recommended", "eslint:recommended"],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
};
