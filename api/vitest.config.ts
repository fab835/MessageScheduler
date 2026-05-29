import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["src/spec/**/*.spec.ts"],
    exclude: ["src/spec/**/*.e2e.spec.ts"],
    coverage: {
      reporter: ["text", "html"]
    }
  }
});
