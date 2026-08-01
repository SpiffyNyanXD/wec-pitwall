---
# WEC Pitwall — Product Roadmap
**Last updated:** 2026-07-23
**Deadline:** 2026 WEC season finale (Bahrain, 7 Nov 2026)
**Launch target:** 2027 WEC season opener (~March 2027)

## Phase 1 — Stabilize (by COTA, 6 Sep)
- [ ] Heal main runtime crash (PR #123)
- [ ] Close superseded PRs (#121, #122)
- [ ] Remove auth gating for beta (feature flag)
- [ ] Set up BetterStack monitoring + public status page
- [ ] Retire empty statuspage.io
- [ ] Verify all pages render on mobile

## Phase 2 — Complete Data + Features (COTA → Fuji, 6–27 Sep)
- [ ] Enter 2026 Le Mans (R4) full results into Supabase
- [ ] Enter 2026 São Paulo (R5) full results into Supabase
- [ ] Fix 2026 schedule (round numbers, Qatar status)
- [ ] Delete static 2026 data from wecData.ts (Supabase only)
- [ ] Fix 2024 points contradictions (drivers2024[], teams2024[])
- [ ] Add standings2024.hypercars.teams
- [ ] Enter 2025 R5–R8 results into wecData.ts
- [ ] Fix standings2025.lmgt3 → .hypercars accessors
- [ ] Wire parseMarginToSeconds into RaceProfile
- [ ] Fix duration_hours usage (no parseInt on string)
- [ ] Open Driver Comparison / Championship Battle (no auth)
- [ ] SEO: llms.txt, sitemap routes, canonicals

## Phase 3 — Launch-Ready (Fuji → Bahrain → 2027)
- [ ] Re-enable auth + premium tier (AUTH_ENABLED = true)
- [ ] Account deletion UI (re-land on healed main)
- [ ] Custom domain: wecpitwall.com + status.wecpitwall.com
- [ ] OG image (1200×630)
- [ ] PWA/service worker decision (keep or kill)
- [ ] EU compliance final (Termly + processors + deletion)
- [ ] Performance audit + cache hardening
- [ ] Full mobile QA
- [ ] Content freeze before 2027 R1

## Data Sources
- 2026: Supabase (source of truth)
- 2024/2025: src/data/wecData.ts (static)
- Standings 2026: Supabase views (auto-calc from race_results)
- Standings 2024/2025: static objects in wecData.ts

## Rules
- No merge without preview-verify on phone
- One Jules session at a time; merge before next
- 2026 data ONLY in Supabase; never duplicate in wecData.ts
- duration_hours for all time math; never parseInt(duration)
---
