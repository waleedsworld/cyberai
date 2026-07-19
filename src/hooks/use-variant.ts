import { useEffect, useState } from "react";

/**
 * Landing-page A/B variant selector.
 *
 * Variant is chosen from the `?variant=` query string (only `a` and `b`
 * are recognised; anything else falls back to `a`). The choice is echoed
 * to `sessionStorage` so client-side navigations within the same tab keep
 * the same variant even if the query param is dropped, without leaking the
 * assignment across browser sessions.
 */
export type LandingVariant = "a" | "b";

const STORAGE_KEY = "pointblank_landing_variant";

const normalize = (value: string | null | undefined): LandingVariant | null => {
  if (value === "a" || value === "b") return value;
  return null;
};

const readVariant = (): LandingVariant => {
  if (typeof window === "undefined") return "a";

  const fromQuery = normalize(
    new URLSearchParams(window.location.search).get("variant")
  );
  if (fromQuery) {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, fromQuery);
    } catch {
      /* ignore */
    }
    return fromQuery;
  }

  try {
    return normalize(window.sessionStorage.getItem(STORAGE_KEY)) ?? "a";
  } catch {
    return "a";
  }
};

export const useLandingVariant = (): LandingVariant => {
  const [variant, setVariant] = useState<LandingVariant>(readVariant);

  useEffect(() => {
    // Re-evaluate on back/forward navigation, which can swap the query string
    // without remounting the component.
    const onPopState = () => setVariant(readVariant());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  return variant;
};
