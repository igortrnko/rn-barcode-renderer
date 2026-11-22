import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import { importX } from "eslint-plugin-import-x";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import reactX from "eslint-plugin-react-x";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["**/node_modules/", "**/dist/", "example/.expo/"]),
  js.configs.recommended,
  tseslint.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  importX.flatConfigs["react-native"],
  reactX.configs["recommended-typescript"],
  prettierRecommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.es2021
    },
    settings: {
      "import-x/resolver-next": [createTypeScriptImportResolver()]
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ],
      "import-x/named": "off",
      "import-x/namespace": "off",
      "import-x/order": [
        "error",
        { groups: ["builtin", "external", "internal"] }
      ]
    }
  },
  {
    // RN static assets are loaded via require()
    files: ["example/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-require-imports": [
        "error",
        { allow: ["\\.(png|jpe?g|gif|webp|svg|ttf|otf)$"] }
      ]
    }
  },
  {
    files: ["**/*.{js,cjs,mjs}"],
    languageOptions: { globals: globals.node }
  }
]);
