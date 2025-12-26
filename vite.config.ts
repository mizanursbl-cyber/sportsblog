import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: ".",       // <- ENSURE root is project root
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app"),
    },
  },
  publicDir: "static",  // optional
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
