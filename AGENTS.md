# AGENTS.md

This file provides context and instructions for AI coding agents (Jules, Claude, Codex, etc.)
working on the WEC Pitwall codebase.

---

## Project Overview

**WEC Pitwall** is a professional-grade web application for FIA World Endurance Championship fans.
It competes directly with Box Box Club as a race strategy and analytics companion.
Live at: `https://wec-pitwall.vercel.app`

Fan-made. Not affiliated with FIA or WEC.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Deployment | Vercel |
| Auth | Supabase Auth |
| Error tracking | Sentry (via `src/instrument.ts`) |
| SEO | react-helmet-async + JSON-LD |
| Cookie consent | Termly CMP |

---

## Setup Commands

```bash
npm install          # install dependencies
npm run dev          # start dev server (requires PC — see Constraints)
npm run build        # production build
npm run lint         # ESLint check
npm run typecheck    # TypeScript check (if available)
```

---

## Project Structure

```
src/
  components/        # shared UI components
    seo/             # JsonLd.tsx — JSON-LD structured data
    widgets/         # dashboard widgets (LastRaceWidget, QuickStatsWidget, etc.)
    SEOHead.tsx      # per-page SEO — use this, NOT raw <Helmet> blocks in pages
  data/
    wecData.ts       # STATIC historical data (2024, 2025 seasons + driver profiles)
  hooks/
    useWecData.ts    # main data hook — Supabase queries for 2026 live season
    useActiveSeasonId.ts  # returns { seasonId, loading } — always destructure
  pages/             # one file per route
  utils/
    seo.ts           # BASE_URL + buildTitle — single source of truth for SEO utils
public/
  robots.txt         # configured — do not modify
  sitemap.xml        # update when adding new routes
  BingSiteAuth.xml   # Bing Webmaster verification — do not touch
  og-image.svg       # placeholder — PNG to be added manually
supabase/
  migrations/        # DB schema migrations — do not touch without explicit instruction
```

---

## Data Architecture

**Two data sources — understand which to use:**

### 1. `src/data/wecData.ts` — Static file
Used for:
- 2024 and 2025 historical season data
- Driver profile cards (career highlights, biography, stats)
- Driver comparison feature (2025 head-to-head stats)
- Championship battle chart data (round-by-round points progression)
- Manufacturer color definitions

Rules:
- Edit this file for any historical data corrections
- Driver comparison stats fields: `wins`, `poles`, `podiums`, `fastestLaps`
- Manufacturer colors must be defined for ALL 8 Hypercar manufacturers

### 2. Supabase — Live 2026 season data
Tables: `seasons`, `races`, `cars`, `drivers`, `manufacturers`, `race_results`, `points_scales`

Rules:
- Current season: 2026 (8 rounds)
- 2 completed rounds: Imola (Round 2) + Spa (Round 3)
- Qatar (Round 1) rescheduled to Oct 17, 2026 — `scheduled_date = '2026-10-17'`
- Race status values: `completed` | `scheduled` | `postponed` | `cancelled`
- Calendar display: ORDER BY `scheduled_date`, NOT `round_number`
- Points scale (Hypercar + LMGT3 6h): P1=25, P2=18, P3=15, P4=12, P5=10, P6=8, P7=6, P8=4, P9=2, P10=1
- Points scale (8h race): P1=38, P2=25, P3=20... (verify from `points_scales` table)
- LMGT3 cars: `points_manufacturers = 0` always (no manufacturers championship)
- `useActiveSeasonId()` returns `{ seasonId, loading }` — ALWAYS destructure, never pass whole object

---

## Design System

| Token | Value |
|---|---|
| Background | `#000000` (true black — never `#0a0a0a` or `#111`) |
| Primary accent | `#E8002D` (WEC Red) |
| Text primary | `#ffffff` |
| Text secondary | `#999999` |
| Card background | `#0d0d0d` or `#111111` |

**Font rules (strict):**
- `Orbitron` — numbers, times, lap data, race positions ONLY
- Body sans-serif (app default) — all other text: headings, labels, descriptions
- Do NOT use Orbitron for team names, driver names, or paragraph text
- Every page must use the same font conventions — no page-specific overrides

**Component rules:**
- All pages use `<SEOHead />` for meta — never add raw `<Helmet>` blocks in pages
- `SEOHead` accepts: `title`, `description`, `url`, `ogTitle`, `ogDescription`
- `JsonLd` component: always escape `<` as `\u003c` in `dangerouslySetInnerHTML`

---

## Supabase IDs

```
Project ID:  anwseucontumcwncsqnf
```

Do NOT hardcode these in source files — use environment variables:
```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Access via `env.VITE_SUPABASE_URL` (using `loadEnv` in vite.config.ts), NOT `process.env`.

---

## Vercel

```
Team ID:    team_aRyQGCuvtwToIHRwsGlm0ON6
Project ID: prj_YQIxV5KmI3TIxLnyUMpQIJwiLG2k
```

Deployments are triggered automatically on merge to `main`.

---

## Code Style

- TypeScript strict mode — no `any` without justification
- Functional components only — no class components
- React Query for all Supabase data fetching
- `staleTime` for live data queries: `5 * 60 * 1000` (5 minutes) minimum
- Error handling: always check Supabase errors — throw real errors (not PGRST116), log + degrade gracefully for PGRST116
- No hardcoded season IDs, race IDs, or car IDs in components — always derive from hooks
- Race count stat = `races.length` with NO status filter — all 8 rounds count regardless of postponed status

---

## PR and Commit Rules

**CRITICAL: One Jules session at a time. Merge PR before starting next session.**
Parallel Jules sessions create cascading GitHub conflicts.

Commit message format:
```
type(scope): short description

Types: feat | fix | refactor | chore | fix(data) | feat(seo) | fix(security) | fix(db)
```

PR title format: matches the main commit message.

Every PR must:
1. Pass build (`npm run build`) with zero TypeScript errors
2. Not break existing routes or pages
3. Only touch files stated in the task

---

## Do NOT Touch (without explicit instruction)

| File/Directory | Reason |
|---|---|
| `src/instrument.ts` | Sentry config — fragile |
| `vite.config.ts` | Build config — breaks deploy if wrong |
| `supabase/migrations/` | Schema migrations — destructive if wrong |
| `public/robots.txt` | Already correctly configured |
| `public/BingSiteAuth.xml` | Bing verification — do not modify |
| Any Supabase RLS policies | Auth security — never modify without explicit instruction |

---

## SEO Rules

- All pages must have unique `<title>` and `<meta name="description">`
- Use `SEOHead` component — never raw `<Helmet>` in page files
- `BASE_URL = 'https://wec-pitwall.vercel.app'` — import from `src/utils/seo.ts`
- `buildTitle(pageTitle)` returns `"${pageTitle} | WEC Pitwall"`
- JSON-LD: `JsonLd` component always escapes `<` characters
- Sitemap: only include confirmed routes from React Router config
- Canonical URL: every page must have one via `SEOHead`

---

## Security Rules

- Never expose Supabase service role key in client code
- `dangerouslySetInnerHTML`: always sanitize — replace `</` with `\u003c/`
- Auth routes (`/auth`, `/login`, `/reset-password`): Cache-Control `no-store` (already configured in `vercel.json`)
- Supabase RLS: all public tables must have RLS policies — never disable RLS

---

## Known Constraints

- **Developer is mobile-only** (Samsung Galaxy M05) — no local `npm run dev` access
- **Boneyard skeleton screens** pending PC access — do not attempt without `npm run dev`
- **Static data vs live data**: 2026 = Supabase, 2024/2025 = wecData.ts — never mix
- **Le Mans 2026 = June 13** — always highest priority for data completeness near this date
- **Vercel subdomain**: `wec-pitwall.vercel.app` — cannot add DNS TXT/CNAME records (use HTML meta tag for Google Search Console)

---

## Current Season Reference (2026)

| Round | Race | Date | Status |
|---|---|---|---|
| 1 | 1812 km of Qatar | Oct 17, 2026 | Rescheduled |
| 2 | 6 Hours of Imola | Apr 19, 2026 | ✅ Completed |
| 3 | 6 Hours of Spa | May 9, 2026 | ✅ Completed |
| 4 | 24 Hours of Le Mans | Jun 13, 2026 | Upcoming |
| 5 | 6 Hours of São Paulo | Jul 12, 2026 | Upcoming |
| 6 | Lone Star Le Mans | Sep 6, 2026 | Upcoming |
| 7 | 6 Hours of Fuji | Sep 13, 2026 | Upcoming |
| 8 | 8 Hours of Bahrain | Nov 7, 2026 | Upcoming |

2026 Hypercar manufacturers (8): Toyota, Ferrari, BMW, Alpine, Aston Martin, Cadillac, Peugeot, Genesis

---

## Agent-Specific Notes

### For Jules (Google)
- Always merge previous PR before starting new session
- Supabase SQL execution does NOT create GitHub commits — keep it out of PR commit lists
- If a session completes work but fails to create a PR, the work is likely in a branch — check GitHub Branches tab and open PR manually
- End every session by explicitly creating a PR — do not just summarise

### For Claude (Anthropic)
- Has direct Supabase MCP access — can verify and fix data issues without Jules
- Has Vercel MCP access — can inspect deployments and fetch live HTML
- Use caveman mode when communicating with the developer (Anshul)
- Refer to this file for project context before making suggestions
## Supabase Direct Operations (not in migration files)
- start_time_utc column added manually via SQL
- pg_cron job 'mark-completed-races' runs every hour to mark past races as completed
