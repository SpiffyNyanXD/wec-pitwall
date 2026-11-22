# WEC Pitwall local overhaul

Base: main at `86366281c2639ba5cce2555e8519b66a38b53de4`.
Data revision: 22 November 2026. This is a local release candidate, not a deployment.

## Racing pages

- One published static read model supplies every public racing page. No cross-season database fallback, unversioned profile enrichment or invented career totals.
- Complete 24-round archive, 938 car classifications, 582 season-driver records and 186 season entries, including Le Mans guests.
- All 296 identities appear in each comparison scope: 2024, 2025, 2026 and ALL (only 2024–2026). Genuine zeros remain zero. Official sporting nationality is not inferred from team nationality.
- Revised 2026 calendar, with Barcelona round 7 and Monza round 8. Full 2025 rounds 5–8 and official championship points are available throughout the app.
- Race, driver, team and circuit routes have safe fallbacks. Numeric car identifiers remain strings, so 7 and 007 are distinct. Existing driver/team aliases and six captured race UUID aliases resolve without inventing mappings for unknown IDs.
- Existing navigation, themes, fonts and card treatment retained. Several broken or duplicated page implementations were replaced with season-scoped pages. Championship progression is an official round-points table rather than the old fabricated chart series. Unverified biography, session, engine and circuit-record claims are omitted; existing reviewed birth fields remain in the data.
- Homepage summary is one final 2026 snapshot. Flags are bundled SVGs, not surname/team-country parsing or platform-dependent emoji. Class, manufacturer, season and search filters work together.

## Build and data delivery

- Build produces 817 public HTML snapshots, with route-specific titles, canonical links and content. Private/account pages are excluded. Sitemap is generated from the same canonical entity set.
- Vercel configuration uses explicit known SPA/alias routes rather than an all-path rewrite, plus a generated custom 404. Production HTTP status and headers still require deployment verification; a local Vite preview is not a Vercel deployment.
- The additive SQL upserts 3,483 versioned archive records and public-read invoker views. It does not overwrite or backfill live legacy racing tables. Legacy aggregate views are deprecated and no longer used by the app. Reconcile existing clients and migration history before rollout.
- The invalid historical demo seed is removed for clean replay. Do not rewrite an already-applied production migration without reconciliation.
- Full SQL replay and repeated archive imports were tested in embedded PostgreSQL. The local `auth` schema stub verifies policy mechanics, not Supabase Auth or deployed policy configuration.
- Targeted dependency updates remove reported audit findings. Optional Codecov/Sentry upload plugins are removed. No sourcemaps or bundle reports are uploaded.

## Account and telemetry boundaries

`AUTH_ENABLED` stays false. Account changes, notification delivery and account deletion are not represented as working features. Reset-password code requires a recovery event. No auth form, external request form, saved account setting or live database write was submitted. The external data-request form opens on demand instead of automatically embedding a rate-limited third-party page.

Automatic tracing, replay, Clarity and Vercel analytics are disabled. Optional PostHog initializes only after explicit consent. Report-only CSP is supplied for deployment review, not claimed as a fully enforced or production-tested policy.

## Reproduce

```
npm ci --ignore-scripts
npm run typecheck
npm test -- --runInBand
npm audit --audit-level=moderate
npm run build
node scripts/verify-routes.mjs 1440
node scripts/verify-routes.mjs 390
node scripts/verify-functional.mjs
node scripts/verify-sql.mjs
node scripts/verify-migrations.mjs
```

Chromium is required for build-time prerendering and browser checks. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` or install Playwright Chromium. Verification evidence is under `verification/`. The large verified-data chunk still produces a Vite size warning, approximately 345 KB gzipped. This is a remaining performance tradeoff, not a failing build or hidden error.

GitHub, the deployed app and live Supabase were not changed. The patch is intended for review and local application before any separately authorized rollout.
