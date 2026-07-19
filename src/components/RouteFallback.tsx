/**
 * Suspense fallback shown while a code-split route chunk is loading.
 * Uses role="status" + aria-live so assistive tech announces the transition,
 * and an aria-hidden spinner that respects prefers-reduced-motion via the
 * global stylesheet (the `animate-spin` class is stripped when the user
 * requests reduced motion).
 */
const RouteFallback = () => (
  <div
    role="status"
    aria-live="polite"
    className="flex min-h-screen items-center justify-center bg-[#030303] text-white"
  >
    <div className="flex flex-col items-center gap-4">
      <div
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-[#d02030]"
      />
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
        Loading
      </span>
    </div>
    <span className="sr-only">Loading page</span>
  </div>
);

export default RouteFallback;
