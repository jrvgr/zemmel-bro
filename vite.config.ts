import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { typescriptPaths } from "rollup-plugin-typescript-paths";

import alias from "@rollup/plugin-alias";
// @ts-expect-error
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [svelte(), alias(), typescriptPaths()],
  optimizeDeps: { exclude: ["tino"] },
});
