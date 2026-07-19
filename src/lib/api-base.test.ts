import { describe, it, expect } from "vitest";
import { API_BASE_URL } from "./api-base";

describe("API_BASE_URL", () => {
  it("resolves to a non-empty absolute https URL", () => {
    expect(typeof API_BASE_URL).toBe("string");
    expect(API_BASE_URL.length).toBeGreaterThan(0);
    expect(API_BASE_URL).toMatch(/^https:\/\//);
  });

  it("has no trailing slash so path concatenation is predictable", () => {
    expect(API_BASE_URL.endsWith("/")).toBe(false);
  });

  it("falls back to the production API host when no env override is set", () => {
    // In the test environment VITE_API_BASE_URL is unset, so the default applies.
    expect(API_BASE_URL).toBe(
      "https://cyberaiapi.digitalsoftwaremarket.online",
    );
  });
});
