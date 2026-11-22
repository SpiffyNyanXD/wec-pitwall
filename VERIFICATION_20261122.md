# Verification log, WEC Pitwall local overhaul

22 November 2026. Base main: 86366281c2639ba5cce2555e8519b66a38b53de4.

## Passed on the final local release candidate

| Check | Actual result |
|---|---|
| `tsc --noEmit` | Passed |
| Application and build-config TypeScript projects | Passed |
| `npm run build` | Passed, including 817 public prerendered pages |
| Jest | 4 suites, 34 tests passed |
| Chromium route sweep, 1440 x 900 | 1,001 URLs, 0 console errors, 0 crashes, 0 page overflow |
| Chromium route sweep, 390 x 844 | 1,001 URLs, 0 console errors, 0 crashes, 0 page overflow |
| Functional regression checks | 301 assertions passed, 0 console errors |
| Initial public HTML | 817 pages checked for heading, one route-specific canonical and meaningful content |
| Dependency audit | 0 reported vulnerabilities, full lockfile scan |
| Prepared SQL upsert | Imported twice in embedded PostgreSQL, 3,483 records retained |
| Migration replay | All six migrations replayed in embedded PostgreSQL with local auth stub |
| Access-policy checks | Anonymous archive read allowed; anonymous write denied; cross-user profile update affected 0 rows; cross-user favorite insert denied |
| Visual inspection | Desktop and mobile screenshots in light/dark; checked homepage, comparison, race and driver pages, flag images and branded preview image |

The route sweep covers all canonical driver/entry/race/circuit URLs, captured aliases, numeric team URLs, invalid IDs and every fixed application route. Invalid numeric driver IDs safely show not-found rather than guessing a driver from a car number. The callback route is tested as a redirect, not as a stationary page. Wide race/championship tables scroll inside their own containers, not the page.

Functional checks exercise all season/class/manufacturer combinations, all four comparison scopes, 296 choices per scope, representative real-zero and multi-word-name driver metrics, eight-round schedule labels, stable homepage stats, light/dark image loading and callback behavior. They do not click account or external forms. Screenshots are evidence of the checked states, not proof every possible visual state was inspected.

## Boundaries and remaining caveats

- No GitHub push, PR or issue. No deployed-app, account or live Supabase mutation.
- SQL is prepared and locally tested only. It creates an additive versioned archive/read model, not an in-place conversion of legacy live racing tables. Production migration reconciliation, live RLS, Auth provider redirects and deployment headers/status still need staging checks before rollout.
- Account features remain disabled. Notification delivery and account deletion are explicitly unavailable. Existing account code is preserved but was not tested with real sign-in or account writes.
- An earlier external Termly iframe returned HTTP 429. It was not repeatedly retried. The app now opens that external form only on demand with an availability notice. The external form itself remains unverified and no form was submitted.
- Automatic tracing/replay/Clarity/Vercel telemetry is disabled. Optional PostHog is consent-gated; no real analytics token was used in tests.
- Vite still warns about the large verified-data chunk, approximately 345 KB gzipped. Build succeeds; further data splitting is a performance follow-up.
- Report-only CSP requires deployment review before enforcement. Static 404 routing is configured but production HTTP semantics are not claimed from a local preview.
- Public racing pages use verified season statistics, not unverified lifetime biographies, technical specifications or circuit records. Genuine zeros remain zero.

Raw JSONL route evidence, functional assertions, SQL replay results, build/typecheck/unit logs and screenshots are included in the bundle. The patch includes all changed and new files, including binary assets.
