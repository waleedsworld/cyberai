import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import Seo from "./Seo";

function meta(selector: string): string | null {
  return document.head
    .querySelector<HTMLMetaElement>(selector)
    ?.getAttribute("content") ?? null;
}

describe("Seo", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    document.title = "";
  });

  it("renders no visible DOM output", () => {
    const { container } = render(
      <Seo title="Test" description="A description" path="/x" />,
    );
    expect(container.innerHTML).toBe("");
  });

  it("sets the document title and description meta", () => {
    render(<Seo title="My Title" description="My description" path="/about" />);
    expect(document.title).toBe("My Title");
    expect(meta('meta[name="description"]')).toBe("My description");
  });

  it("writes Open Graph and Twitter card tags", () => {
    render(<Seo title="OG Title" description="OG desc" path="/og" />);
    expect(meta('meta[property="og:title"]')).toBe("OG Title");
    expect(meta('meta[property="og:description"]')).toBe("OG desc");
    expect(meta('meta[name="twitter:card"]')).toBe("summary_large_image");
    expect(meta('meta[name="twitter:title"]')).toBe("OG Title");
  });

  it("emits an absolute canonical URL derived from the path", () => {
    render(<Seo title="T" description="D" path="/pricing" />);
    const canonical = document.head
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.getAttribute("href");
    expect(canonical).toBe(`${window.location.origin}/pricing`);
  });

  it("defaults robots to index,follow and honors noIndex", () => {
    const { unmount } = render(<Seo title="A" description="B" path="/a" />);
    expect(meta('meta[name="robots"]')).toBe("index,follow");
    unmount();
    render(<Seo title="C" description="D" path="/c" noIndex />);
    expect(meta('meta[name="robots"]')).toBe("noindex,nofollow");
  });

  it("does not duplicate meta tags when re-rendered", () => {
    const { rerender } = render(<Seo title="One" description="d1" path="/1" />);
    rerender(<Seo title="Two" description="d2" path="/2" />);
    expect(
      document.head.querySelectorAll('meta[name="description"]').length,
    ).toBe(1);
    expect(meta('meta[name="description"]')).toBe("d2");
  });
});
