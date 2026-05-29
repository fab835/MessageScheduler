import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/spec",
  testMatch: /.*\.e2e\.spec\.ts/,
  timeout: 30_000,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3333"
  }
});

