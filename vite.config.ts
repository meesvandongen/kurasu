import { defineConfig, lazyPlugins } from "vite-plus";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // The repo has no formatter; mirror its existing style for `vp fmt`.
  fmt: { singleQuote: false, semi: true, trailingComma: "es5" },
  lint: {
    ignorePatterns: ["dist/**"],
  },
  pack: {
    entry: ["src/kurasu.tsx"],
    sourcemap: true,
    clean: true,
    dts: true,
    format: ["esm", "cjs"],
    target: false,
    // Keep the published file names: kurasu.js (ESM), kurasu.cjs (CJS), kurasu.d.ts.
    fixedExtension: false,
    // Keep the CJS shape tsup produced: `exports.default` with `__esModule`.
    cjsDefault: false,
  },
  plugins: lazyPlugins(() => [react()]),
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test-setup.ts",
  },
});
