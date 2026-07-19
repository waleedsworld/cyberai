import { describe, it, expect } from "vitest";
import { normalizeUrl, isLikelyValidUrl } from "./url";

describe("normalizeUrl", () => {
  it("adds https:// to a bare hostname", () => {
    expect(normalizeUrl("example.com")).toBe("https://example.com");
  });

  it("keeps an existing https:// URL canonical", () => {
    expect(normalizeUrl("https://example.com")).toBe("https://example.com");
  });

  it("upgrades http:// to https://", () => {
    expect(normalizeUrl("http://example.com")).toBe("https://example.com");
  });

  it("is case-insensitive about the protocol", () => {
    expect(normalizeUrl("HTTPS://example.com")).toBe("https://example.com");
    expect(normalizeUrl("HtTp://example.com")).toBe("https://example.com");
  });

  it("trims surrounding whitespace", () => {
    expect(normalizeUrl("   example.com  ")).toBe("https://example.com");
  });

  it("preserves paths and query strings", () => {
    expect(normalizeUrl("example.com/path?a=1")).toBe(
      "https://example.com/path?a=1",
    );
  });

  it("returns an empty string for empty or whitespace-only input", () => {
    expect(normalizeUrl("")).toBe("");
    expect(normalizeUrl("   ")).toBe("");
  });

  it("returns an empty string when only a protocol is supplied", () => {
    expect(normalizeUrl("https://")).toBe("");
  });

  it("does not double the protocol on repeated calls (idempotent)", () => {
    const once = normalizeUrl("example.com");
    expect(normalizeUrl(once)).toBe(once);
  });
});

describe("isLikelyValidUrl", () => {
  it("accepts a normal domain", () => {
    expect(isLikelyValidUrl("example.com")).toBe(true);
    expect(isLikelyValidUrl("https://sub.example.co.uk")).toBe(true);
  });

  it("rejects empty input", () => {
    expect(isLikelyValidUrl("")).toBe(false);
    expect(isLikelyValidUrl("   ")).toBe(false);
  });

  it("rejects hostnames without a dot", () => {
    expect(isLikelyValidUrl("localhost")).toBe(false);
  });
});
