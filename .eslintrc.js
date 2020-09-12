module.exports = {
  root: true,
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
  },
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["react"],
}
