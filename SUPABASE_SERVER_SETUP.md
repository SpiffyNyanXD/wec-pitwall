# WEC Pitwall data and account setup

This repository is a Vite client-rendered app with build-time public prerendering. It does not contain a Supabase server SDK or a deletion endpoint.

The 22 November 2026 public racing release reads `src/data/verifiedMaster.json`. It never combines an unavailable live query with a different season's static data. The matching prepared SQL is `20261122_verified_2024_2026_data.sql`, also in `supabase/migrations/20261122000001_verified_archive.sql`.

The SQL creates a versioned, public-read, write-restricted `wec_archive` read model and invoker views. It does not overwrite or backfill existing live `races`, `cars`, `drivers` or `race_results` tables. Legacy aggregate views are deprecated and are not consumed by the app. Review any other clients before retiring them. Reconcile an existing deployment's migration history before applying these files. The invalid historical demo seed is removed for clean local replay, not an instruction to rewrite an already-applied production migration.

## Local build

1. Use Node 20 or later and `npm ci --ignore-scripts`.
2. Run `npm run typecheck` and `npm test -- --runInBand`.
3. Run `npm run build`. Build-time prerendering requires Chromium, either from Playwright or `PLAYWRIGHT_CHROMIUM_EXECUTABLE`.
4. Run `npm run preview`. Public snapshots have route-specific initial HTML; account pages are excluded.

Optional public browser configuration is listed in `.env.example`. The Vite build reads `.env` through one validated environment source. Do not put service-role credentials or upload tokens in `VITE_*` variables. No source maps or bundle analysis are uploaded by this build.

## Account features

`AUTH_ENABLED` remains false. Public racing pages do not need an account. The account contract migration supplies the profile fields and bounded username-availability function referenced by the preserved account code. Deletion is disabled until a separately reviewed, authorized server flow and reauthentication exist. No auth form, account mutation, notification delivery or live Supabase RLS was tested. Local embedded PostgreSQL replay uses a small `auth` schema stub to test table policies, not Supabase Auth itself.

Enable account features only after staging verification of provider redirect URLs, recovery events, owner/cross-user policies, session lifecycle and approved server endpoints. A successful local read model import is not approval to change a live database.
