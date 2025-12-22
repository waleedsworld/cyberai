import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
};

const SITE_NAME = "PointBlank";

const upsertMeta = (selector: string, attributes: Record<string, string>, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
};

const Seo = ({ title, description, path = "/", image = "/og.svg", noIndex = false }: SeoProps) => {
  useEffect(() => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const origin = window.location.origin;
    const canonicalUrl = `${origin}${normalizedPath}`;
    const imageUrl = image.startsWith("http") ? image : `${origin}${image}`;

    document.title = title;

    upsertMeta('meta[name="description"]', { name: "description" }, description);
    upsertMeta('meta[name="author"]', { name: "author" }, SITE_NAME);
    upsertMeta(
      'meta[name="robots"]',
      { name: "robots" },
      noIndex ? "noindex,nofollow" : "index,follow"
    );
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, title);
    upsertMeta('meta[property="og:description"]', { property: "og:description" }, description);
    upsertMeta('meta[property="og:type"]', { property: "og:type" }, "website");
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, SITE_NAME);
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, imageUrl);
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, title);
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, description);
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, imageUrl);
    upsertLink("canonical", canonicalUrl);
  }, [description, image, noIndex, path, title]);

  return null;
};

export default Seo;
