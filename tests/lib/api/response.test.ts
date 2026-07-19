import { describe, expect, it } from "vitest";
import { notImplemented, ok } from "@/lib/api/response";

describe("api response helpers", () => {
  it("returns ok json", async () => {
    const res = ok({ hello: "world" });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ hello: "world" });
  });

  it("returns not implemented", async () => {
    const res = notImplemented("test");
    expect(res.status).toBe(501);
    const body = await res.json();
    expect(body.error.code).toBe("NOT_IMPLEMENTED");
  });
});
