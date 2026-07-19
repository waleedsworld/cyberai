/**
 * URL helpers shared by the compliance and API tooling pages.
 */

/**
 * Normalize a user-entered website address into a canonical `https://` URL.
 *
 * - Trims surrounding whitespace.
 * - Strips an existing `http://` or `https://` prefix (case-insensitive).
 * - Re-applies a single `https://` prefix.
 *
 * Returns an empty string when the input is empty/whitespace so callers can
 * cheaply validate before submitting.
 */
export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";

  const withoutProtocol = trimmed.replace(/^https?:\/\//i, "");
  if (!withoutProtocol) return "";

  return `https://${withoutProtocol}`;
}

/**
 * Best-effort check that a normalized URL has a plausible hostname
 * (contains a dot and at least one non-dot character on each side).
 */
export function isLikelyValidUrl(input: string): boolean {
  const normalized = normalizeUrl(input);
  if (!normalized) return false;
  try {
    const host = new URL(normalized).hostname;
    return /^[^.\s]+(\.[^.\s]+)+$/.test(host);
  } catch {
    return false;
  }
}
