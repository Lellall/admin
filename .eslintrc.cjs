module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],

  rules: {
    "no-console": "error", // Disallow console.log
    // "no-duplicate-imports": "error", // Detect double imports
    // "no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Allows ignoring unused function arguments prefixed with "_"
    // "@typescript-eslint/no-unused-vars": ["error"],
    // "no-duplicate-imports": ["error"],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",

    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
