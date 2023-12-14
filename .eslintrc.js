module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["simple-import-sort"],
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
};
