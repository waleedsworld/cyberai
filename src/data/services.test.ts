import { describe, it, expect } from "vitest";
import {
  services,
  getServiceBySlug,
  getServicesByCategory,
  getRelatedServices,
  type Service,
} from "./services";

const VALID_CATEGORIES: Service["category"][] = [
  "Offensive Security",
  "Defensive Operations",
  "Governance & Compliance",
  "Incident & Investigation",
  "Infrastructure & Cloud",
];

describe("services data integrity", () => {
  it("exposes a non-empty catalog", () => {
    expect(Array.isArray(services)).toBe(true);
    expect(services.length).toBeGreaterThan(0);
  });

  it("has unique slugs", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has unique ids", () => {
    const ids = services.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses url-safe slugs", () => {
    for (const s of services) {
      expect(s.slug, `slug "${s.slug}"`).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("populates all required copy fields for every service", () => {
    for (const s of services) {
      expect(s.title, `${s.slug}.title`).toBeTruthy();
      expect(s.aiTitle, `${s.slug}.aiTitle`).toBeTruthy();
      expect(s.shortDescription, `${s.slug}.shortDescription`).toBeTruthy();
      expect(s.problem, `${s.slug}.problem`).toBeTruthy();
      expect(s.approach, `${s.slug}.approach`).toBeTruthy();
      expect(s.bullets.length, `${s.slug}.bullets`).toBeGreaterThan(0);
      expect(s.deliverables.length, `${s.slug}.deliverables`).toBeGreaterThan(0);
      expect(s.process.length, `${s.slug}.process`).toBeGreaterThan(0);
    }
  });

  it("assigns every service a known category", () => {
    for (const s of services) {
      expect(VALID_CATEGORIES, `${s.slug}.category`).toContain(s.category);
    }
  });

  it("only references existing slugs in relatedServices", () => {
    const known = new Set(services.map((s) => s.slug));
    for (const s of services) {
      for (const rel of s.relatedServices) {
        expect(known.has(rel), `${s.slug} -> "${rel}"`).toBe(true);
      }
    }
  });

  it("never lists a service as related to itself", () => {
    for (const s of services) {
      expect(s.relatedServices, `${s.slug}`).not.toContain(s.slug);
    }
  });
});

describe("getServiceBySlug", () => {
  it("returns the matching service", () => {
    const first = services[0];
    expect(getServiceBySlug(first.slug)).toBe(first);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getServiceBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("getServicesByCategory", () => {
  it("returns only services in the requested category", () => {
    const result = getServicesByCategory("Offensive Security");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((s) => s.category === "Offensive Security")).toBe(true);
  });

  it("returns an empty array for a category with no services", () => {
    // Cast because we intentionally probe an unused-but-valid category value.
    const result = getServicesByCategory(
      "Nonexistent Category" as Service["category"],
    );
    expect(result).toEqual([]);
  });

  it("partitions the catalog exactly across all categories", () => {
    const total = VALID_CATEGORIES.reduce(
      (sum, cat) => sum + getServicesByCategory(cat).length,
      0,
    );
    expect(total).toBe(services.length);
  });
});

describe("getRelatedServices", () => {
  it("resolves related slugs into full service objects", () => {
    const withRelated = services.find((s) => s.relatedServices.length > 0);
    expect(withRelated).toBeDefined();
    const related = getRelatedServices(withRelated!.slug);
    expect(related.length).toBe(withRelated!.relatedServices.length);
    for (const r of related) {
      expect(withRelated!.relatedServices).toContain(r.slug);
    }
  });

  it("returns an empty array for an unknown slug", () => {
    expect(getRelatedServices("does-not-exist")).toEqual([]);
  });

  it("never returns undefined entries", () => {
    for (const s of services) {
      const related = getRelatedServices(s.slug);
      expect(related.every((r) => r !== undefined)).toBe(true);
    }
  });
});
