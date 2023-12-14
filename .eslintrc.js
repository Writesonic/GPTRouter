module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort"],
  rules: {
    "simple-import-sort/imports": [
      2,
      {
        groups: [
          // Node.js builtins prefixed with `node:`.
          ["^node:"],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ["^@?\\w"],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ["^"],
          // Absolute imports
          ["^src(/.*|$)"],
          // Relative imports.
          // Anything that starts with a dot.
          ["^\\."],
          // Side effect imports.
          ["^\\u0000"],
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
      rules: {
        "@typescript-eslint/interface-name-prefix": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/no-unused-vars": 2,
        "@typescript-eslint/no-explicit-any": [
          1,
          {
            ignoreRestArgs: true,
          },
        ],
        "@typescript-eslint/naming-convention": [2, { selector: "typeLike", format: ["PascalCase"] }],
        "@typescript-eslint/ban-types": [
          2,
          {
            extendDefaults: true,
            types: {
              "{}": false,
            },
          },
        ],
      },
    },
  ],
};
