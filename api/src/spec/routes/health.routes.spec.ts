import { buildApp } from "../../app.js";

describe("GET /v1/health", () => {
  it("returns the API health payload", async () => {
    const app = buildApp();
    const response = await app.inject({
      method: "GET",
      url: "/v1/health"
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({
      status: "ok",
      service: "api"
    });

    await app.close();
  });
});

