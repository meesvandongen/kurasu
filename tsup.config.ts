import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/kurasu.tsx"],
  sourcemap: true,
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
});
