module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        "airbnb",
        "airbnb-typescript",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
    ],
    ignorePatterns: [
        "dist",
        ".eslintrc.cjs",
        "node_modules",
        "vite.config.ts",
        "tailwind.config.cjs",
        "tailwind.config.js",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
    },
    plugins: ["react-refresh", "prettier", "import", "@typescript-eslint"],
    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "jsx-a11y/control-has-associated-label": "off",
        "react/button-has-type": "off",
        "func-style": "off",
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
        // Disable the comma-dangle rule if you prefer not to use trailing commas
        "@typescript-eslint/comma-dangle": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "import/no-unresolved": "off",
        "react/react-in-jsx-scope": 0,
        "eslint react/require-default-props": "off",
        "react/prop-types": "off",
        "import/prefer-default-export": "off",
        "react/jsx-props-no-spreading": "off",
        "import/extensions": "off",
        "react/require-default-props": "off",
        "no-param-reassign": [2, { props: false }],
        "unicorn/filename-case": "off",
        "filenames/match-regex": "off",
        "filenames/match-exported": "off",
        "filenames/no-index": "off",
    },
}
