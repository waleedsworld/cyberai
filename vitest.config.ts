import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// Dedicated Vitest config so the production Vite build config stays untouched.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: false,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["e2e/**", "node_modules/**", "dist/**"],
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      include: ["src/lib/**", "src/data/**", "src/hooks/**"],
      reporter: ["text", "html"],
    },
  },
});
