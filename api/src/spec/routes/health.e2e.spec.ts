import { test, expect } from "@playwright/test";

test("health endpoint responds", async ({ request, baseURL }) => {
  const response = await request.get(`${baseURL}/v1/health`);
  const body = await response.json();

  expect(response.ok()).toBeTruthy();
  expect(body).toEqual({
    status: "ok",
    service: "api"
  });
});
