module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["chore", "version", "docs", "feature", "fixed", "refactor", "revert", "perf", "test"]],
  },
};
