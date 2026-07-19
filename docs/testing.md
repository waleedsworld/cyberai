# Testing

This project has two automated test layers, both wired into CI
(`.github/workflows/ci.yml`).

## Unit / component tests (Vitest)

Fast tests that run in jsdom via [Vitest](https://vitest.dev) and
[Testing Library](https://testing-library.com/).

```bash
npm test            # run once
npm run test:watch  # watch mode
npm run test:coverage
```

Config: `vitest.config.ts` · global setup: `src/test/setup.ts` · provider
render helper: `src/test/render.tsx`.

Covered:

- `src/lib/utils.ts` — `cn()` class merging.
- `src/lib/url.ts` — `normalizeUrl()` / `isLikelyValidUrl()` (used by the
  compliance intake flow).
- `src/lib/api-base.ts` — API base URL resolution.
- `src/data/services.ts` — catalog integrity (unique slugs, valid categories,
  no dangling `relatedServices` references) and the lookup helpers.
- `src/data/navigation.ts` — mega-nav structure and `/services/*` link
  integrity against the service catalog.
- `src/hooks/use-auth.ts`, `src/hooks/use-mobile.tsx` — hook behavior.
- `src/components/Seo.tsx`, `src/pages/NotFound.tsx`, `src/pages/ServicePage.tsx`
  — render smoke tests.

## End-to-end smoke tests (Playwright)

Drives the built app served by `vite preview` on port **8098** with headless
Chromium.

```bash
npm run test:e2e
```

Config: `playwright.config.ts` · specs: `e2e/`. The config builds the app and
starts the preview server automatically, then exercises the landing page,
service pages, the 404 route, and both tool pages (compliance-check and
api-test), including advancing the compliance intake to region selection.
