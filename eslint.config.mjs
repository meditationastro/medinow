import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: true
});

export default [
  {
    ignores: ["**/node_modules/**", ".next/**", "dist/**"]
  },
  ...compat.extends(
    "next/core-web-vitals"
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin")
    },
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        project: "./tsconfig.json"
      }
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_|adminCode|resolvedSearchParams",
        "ignoreRestSiblings": true
      }],
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-img-element": "warn"
    }
  }
];
