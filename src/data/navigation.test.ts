import { describe, it, expect } from "vitest";
import { megaNavSections, type MegaNavItem } from "./navigation";
import { services } from "./services";

function allItems(): MegaNavItem[] {
  return megaNavSections.flatMap(
    (section) => section.columns?.flatMap((col) => col.items) ?? [],
  );
}

describe("mega navigation data integrity", () => {
  it("exposes a non-empty set of top-level sections", () => {
    expect(megaNavSections.length).toBeGreaterThan(0);
    for (const section of megaNavSections) {
      expect(section.label, "section.label").toBeTruthy();
    }
  });

  it("gives every section either a direct href or non-empty columns", () => {
    for (const section of megaNavSections) {
      const hasColumns = !!section.columns && section.columns.length > 0;
      const hasHref = !!section.href;
      expect(hasColumns || hasHref, `section "${section.label}"`).toBe(true);
    }
  });

  it("populates title and items for every column", () => {
    for (const section of megaNavSections) {
      for (const col of section.columns ?? []) {
        expect(col.title, "column.title").toBeTruthy();
        expect(col.items.length, `column "${col.title}"`).toBeGreaterThan(0);
      }
    }
  });

  it("requires a title, description, and href for every item", () => {
    for (const item of allItems()) {
      expect(item.title, "item.title").toBeTruthy();
      expect(item.description, `${item.title}.description`).toBeTruthy();
      expect(item.href, `${item.title}.href`).toBeTruthy();
    }
  });

  it("only uses in-app anchors, absolute paths, or hash targets as hrefs", () => {
    for (const item of allItems()) {
      expect(
        item.href.startsWith("/") || item.href.startsWith("#"),
        `${item.title} -> "${item.href}"`,
      ).toBe(true);
    }
  });

  it("points every /services/* link at a real service slug", () => {
    const known = new Set(services.map((s) => s.slug));
    const serviceLinks = allItems().filter((i) =>
      i.href.startsWith("/services/"),
    );
    expect(serviceLinks.length).toBeGreaterThan(0);
    for (const item of serviceLinks) {
      const slug = item.href.replace("/services/", "");
      expect(known.has(slug), `${item.title} -> "${item.href}"`).toBe(true);
    }
  });

  it("marks at most one featured item per column", () => {
    for (const section of megaNavSections) {
      for (const col of section.columns ?? []) {
        const featured = col.items.filter((i) => i.featured).length;
        expect(featured, `column "${col.title}"`).toBeLessThanOrEqual(1);
      }
    }
  });
});
