#!/usr/bin/env python3
"""Generate supabase/migrations/20261122000001_verified_2024_2026_schema_and_seed.sql
from src/data/verifiedMaster.json. Deterministic RFC-4122 UUIDv5 identifiers."""
import json, uuid, unicodedata, pathlib

R = pathlib.Path(__file__).resolve().parents[1]
D = json.loads((R / 'src/data/verifiedMaster.json').read_text())
NS = uuid.UUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')  # RFC-4122 DNS namespace
def u5(*parts): return str(uuid.uuid5(NS, 'wec-pitwall/verified/' + '/'.join(str(p) for p in parts)))
def q(s):
    if s is None: return 'NULL'
    return "'" + str(s).replace("'", "''") + "'"
def num(v):
    return str(int(v)) if isinstance(v, (int, float)) and not isinstance(v, bool) else 'NULL'
def flag_code(flag):
    pts = [chr(ord(c) - 127397) for c in flag] if flag else []
    return ''.join(pts) if len(pts) == 2 and all(p.isalpha() for p in pts) else None
def norm(name):  # accent/case-insensitive name key for participation matching
    return ''.join(c for c in unicodedata.normalize('NFKD', name) if not unicodedata.combining(c)).lower().strip()

out = []
out.append("""-- WEC Pitwall verified 2024-2026 schema and seed. Single clean forward migration.
-- Deterministic RFC-4122 UUIDv5 identifiers throughout; no invalid placeholder prefixes.
-- Replayable: every statement is idempotent (IF NOT EXISTS / OR REPLACE / ON CONFLICT).
-- Source of truth: WEC_2026_Verified_Dataset and WEC_2024_2025_2026_Master_Dataset (2026-11-22).
-- Genuine zero statistics are stored as zero. Prepared for review; not yet applied to production.
BEGIN;

-- ============ Verified relational schema ============
CREATE TABLE IF NOT EXISTS public.wec_seasons (
  id uuid PRIMARY KEY, year integer NOT NULL UNIQUE, status text NOT NULL CHECK (status IN ('completed','cancelled','scheduled')));
CREATE TABLE IF NOT EXISTS public.wec_circuits (
  id uuid PRIMARY KEY, slug text NOT NULL UNIQUE, name text NOT NULL, location text, country_code text);
CREATE TABLE IF NOT EXISTS public.wec_manufacturers (
  id uuid PRIMARY KEY, name text NOT NULL UNIQUE);
CREATE TABLE IF NOT EXISTS public.wec_driver_profiles (
  id uuid PRIMARY KEY, slug text NOT NULL UNIQUE, full_name text NOT NULL,
  nationality text, country_code text);  -- nationality/country_code contract
CREATE TABLE IF NOT EXISTS public.wec_team_profiles (
  id uuid PRIMARY KEY, name text NOT NULL, class text NOT NULL, UNIQUE (name, class));
CREATE TABLE IF NOT EXISTS public.wec_entries (  -- one row per car per season
  id uuid PRIMARY KEY, entry_key text NOT NULL UNIQUE, season_id uuid NOT NULL REFERENCES public.wec_seasons(id),
  car_number text NOT NULL, team_profile_id uuid REFERENCES public.wec_team_profiles(id),
  team_name text NOT NULL, manufacturer_id uuid REFERENCES public.wec_manufacturers(id),
  class text NOT NULL, UNIQUE (season_id, car_number, class));
CREATE TABLE IF NOT EXISTS public.wec_races (
  id uuid PRIMARY KEY, race_key text NOT NULL UNIQUE, season_id uuid NOT NULL REFERENCES public.wec_seasons(id),
  round_number integer, circuit_id uuid REFERENCES public.wec_circuits(id),  -- relational circuit contract
  name text NOT NULL, scheduled_date date NOT NULL, duration_hours integer NOT NULL,
  status text NOT NULL CHECK (status IN ('completed','cancelled','scheduled')),  -- cancelled vs completed contract
  winner_entry_key text, source_url text);
CREATE TABLE IF NOT EXISTS public.wec_drivers (  -- one row per driver per season
  id uuid PRIMARY KEY, season_driver_key text NOT NULL UNIQUE, profile_id uuid NOT NULL REFERENCES public.wec_driver_profiles(id),
  season_id uuid NOT NULL REFERENCES public.wec_seasons(id), entry_id uuid REFERENCES public.wec_entries(id),
  class text NOT NULL, car_number text, points integer NOT NULL DEFAULT 0, position integer NOT NULL DEFAULT 0,
  starts integer NOT NULL DEFAULT 0, wins integer NOT NULL DEFAULT 0, poles integer NOT NULL DEFAULT 0,
  podiums integer NOT NULL DEFAULT 0, fastest_laps integer NOT NULL DEFAULT 0,
  le_mans_wins integer NOT NULL DEFAULT 0, wec_titles integer NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS public.wec_race_results (
  id uuid PRIMARY KEY, race_id uuid NOT NULL REFERENCES public.wec_races(id),
  entry_id uuid REFERENCES public.wec_entries(id), car_number text NOT NULL, team_name text NOT NULL,
  class text NOT NULL, class_position integer, overall_position integer, laps integer, gap text,
  points numeric, status text NOT NULL, fastest_lap_time text, is_fastest_lap boolean NOT NULL DEFAULT false,
  source_url text, UNIQUE (race_id, car_number, class));
CREATE TABLE IF NOT EXISTS public.wec_race_driver_participation (  -- race-specific driver participation contract
  race_id uuid NOT NULL REFERENCES public.wec_races(id), entry_id uuid REFERENCES public.wec_entries(id),
  profile_id uuid REFERENCES public.wec_driver_profiles(id), driver_name text NOT NULL,
  PRIMARY KEY (race_id, entry_id, driver_name));
CREATE TABLE IF NOT EXISTS public.wec_season_standings (
  id uuid PRIMARY KEY, season_id uuid NOT NULL REFERENCES public.wec_seasons(id),  -- season_id contract
  class text NOT NULL, type text NOT NULL, title text, position integer NOT NULL,
  name text NOT NULL, car_number text, points numeric NOT NULL DEFAULT 0,
  UNIQUE (season_id, class, type, position, name));
CREATE TABLE IF NOT EXISTS public.wec_driver_comparison (
  scope text NOT NULL CHECK (scope IN ('2024','2025','2026','ALL')), profile_id uuid NOT NULL REFERENCES public.wec_driver_profiles(id),
  class text, team text, manufacturer text, car_number text,
  starts integer NOT NULL DEFAULT 0, points integer NOT NULL DEFAULT 0, wins integer NOT NULL DEFAULT 0,
  poles integer NOT NULL DEFAULT 0, podiums integer NOT NULL DEFAULT 0, fastest_laps integer NOT NULL DEFAULT 0,
  best_finish text, le_mans_wins integer NOT NULL DEFAULT 0, wec_titles integer NOT NULL DEFAULT 0,
  PRIMARY KEY (scope, profile_id));

-- Read-only public access; writes stay owner-only.
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['wec_seasons','wec_circuits','wec_manufacturers','wec_driver_profiles','wec_team_profiles','wec_entries','wec_races','wec_drivers','wec_race_results','wec_race_driver_participation','wec_season_standings','wec_driver_comparison'] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', t || '_read', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR SELECT TO anon, authenticated USING (true)', t || '_read', t);
    EXECUTE format('REVOKE ALL ON public.%I FROM PUBLIC, anon, authenticated', t);
    EXECUTE format('GRANT SELECT ON public.%I TO anon, authenticated', t);
  END LOOP;
END $$;
""")

# Seasons
for y in (2024, 2025, 2026):
    out.append(f"INSERT INTO public.wec_seasons (id, year, status) VALUES ({q(u5('season', y))}, {y}, 'completed') ON CONFLICT (year) DO NOTHING;")
# Circuits
for c in D['circuits']:
    out.append(f"INSERT INTO public.wec_circuits (id, slug, name, location, country_code) VALUES ({q(u5('circuit', c['id']))}, {q(c['id'])}, {q(c['name'])}, {q(c.get('location'))}, {q(flag_code(c.get('flag')))}) ON CONFLICT (slug) DO NOTHING;")
# Manufacturers
mfrs = sorted({t['manufacturer'] for y in (2024,2025,2026) for t in D['teams'+str(y)] if t.get('manufacturer')})
for m in mfrs:
    out.append(f"INSERT INTO public.wec_manufacturers (id, name) VALUES ({q(u5('manufacturer', m))}, {q(m)}) ON CONFLICT (name) DO NOTHING;")
# Driver profiles (296, from ALL-scope comparison rows)
profiles = {}
for row in D['comparison']:
    if row['season'] == 'ALL':
        profiles[row['driver_slug']] = row
for slug, r in sorted(profiles.items()):
    nat = r['nationality'] if r['nationality'] and not r['nationality'].startswith('N/A') else None
    cc = r['country_code'] if r['country_code'] and r['country_code'] != 'N/A' else None
    out.append(f"INSERT INTO public.wec_driver_profiles (id, slug, full_name, nationality, country_code) VALUES ({q(u5('profile', slug))}, {q(slug)}, {q(r['full_name'])}, {q(nat)}, {q(cc)}) ON CONFLICT (slug) DO NOTHING;")
# Team profiles + entries
seen_tp = set()
for y in (2024, 2025, 2026):
    for t in D['teams'+str(y)]:
        tp = (t['name'], t['class'])
        if tp not in seen_tp:
            seen_tp.add(tp)
            out.append(f"INSERT INTO public.wec_team_profiles (id, name, class) VALUES ({q(u5('teamprofile', *tp))}, {q(t['name'])}, {q(t['class'])}) ON CONFLICT (name, class) DO NOTHING;")
        out.append(f"INSERT INTO public.wec_entries (id, entry_key, season_id, car_number, team_profile_id, team_name, manufacturer_id, class) VALUES ({q(u5('entry', t['id']))}, {q(t['id'])}, {q(u5('season', y))}, {q(t['carNumber'].lstrip('#'))}, {q(u5('teamprofile', *tp))}, {q(t['name'])}, {q(u5('manufacturer', t['manufacturer']))}, {q(t['class'])}) ON CONFLICT (entry_key) DO NOTHING;")
# Season drivers
for y in (2024, 2025, 2026):
    for dr in D['drivers'+str(y)]:
        slug = dr['id'].replace('-'+str(y), '')
        out.append(f"INSERT INTO public.wec_drivers (id, season_driver_key, profile_id, season_id, entry_id, class, car_number, points, position, starts, wins, poles, podiums, fastest_laps, le_mans_wins, wec_titles) VALUES ({q(u5('seasondriver', dr['id']))}, {q(dr['id'])}, {q(u5('profile', slug))}, {q(u5('season', y))}, {q(u5('entry', dr['teamId']))}, {q(dr['class'])}, {q(dr['carNumber'].lstrip('#'))}, {num(dr['points'])}, {num(dr['position'])}, {num(dr.get('starts'))}, {num(dr.get('wins'))}, {num(dr.get('poles'))}, {num(dr.get('podiums'))}, {num(dr.get('fastestLaps'))}, {num(dr.get('leMansWins'))}, {num(dr.get('championships'))}) ON CONFLICT (season_driver_key) DO NOTHING;")
# Races incl. cancelled history
for y in (2024, 2025, 2026):
    for r in D['races'+str(y)]:
        out.append(f"INSERT INTO public.wec_races (id, race_key, season_id, round_number, circuit_id, name, scheduled_date, duration_hours, status, winner_entry_key, source_url) VALUES ({q(u5('race', r['id']))}, {q(r['id'])}, {q(u5('season', y))}, {num(r['round_number'])}, {q(u5('circuit', r['circuitId']))}, {q(r['name'])}, {q(r['scheduled_date'])}, {num(r['duration_hours'])}, 'completed', {q('entry-%d-%s' % (y, r['winner'].split()[0].lstrip('#')) if r.get('winner') else None)}, {q(r.get('sourceUrl'))}) ON CONFLICT (race_key) DO NOTHING;")
for c in D.get('cancelledCalendar', []):
    slug = c['circuit'].lower()
    out.append(f"INSERT INTO public.wec_races (id, race_key, season_id, round_number, circuit_id, name, scheduled_date, duration_hours, status) VALUES ({q(u5('race', 'cancelled', c['season'], slug))}, {q('cancelled-%s-%s' % (c['season'], slug))}, {q(u5('season', c['season']))}, NULL, {q(u5('circuit', slug))}, {q('%d %s (cancelled)' % (c['season'], c['circuit']))}, {q(str(c['season']) + '-01-01')}, 0, 'cancelled') ON CONFLICT (race_key) DO NOTHING;")
# Race results + participation
name2slug = {}
for y in (2024, 2025, 2026):
    for dr in D['drivers'+str(y)]:
        name2slug.setdefault(norm(dr['name']), dr['id'].replace('-'+str(y), ''))
# Participation-name variants resolved to profile slugs. Each mapping is grounded in the
# verified master data: identical car number, team and class in the same season/race
# (e.g. 'Marco SORENSEN' #009 Aston Martin Thor Hypercar == marco-sorensen #009; o vs ø
# transliteration; 'Roman DE ANGELIS' == 'Roman Senna De Angelis' #009; 'Alexander QUINN'
# == 'Alex Quinn' #45 Algarve Pro 2025 and #4 Crowdstrike/APR Le Mans 2026; 'Nicholas
# YELLOLY' == 'Nick Yelloly' #43 Inter Europol). No fuzzy matching is performed.
PARTICIPATION_NAME_ALIASES = {
    'marco sorensen': 'marco-sorensen',
    'roman de angelis': 'roman-senna-de-angelis',
    'alexander quinn': 'alex-quinn',
    'nicholas yelloly': 'nick-yelloly',
}
for rr in D['raceResults']:
    y = int(rr['raceId'].split('-')[0])
    for e in rr['results']:
        ek = 'entry-%d-%s' % (y, e['carNumber'].lstrip('#'))
        out.append(f"INSERT INTO public.wec_race_results (id, race_id, entry_id, car_number, team_name, class, class_position, overall_position, laps, gap, points, status, fastest_lap_time, is_fastest_lap, source_url) VALUES ({q(u5('result', rr['raceId'], e['carNumber'], e['class']))}, {q(u5('race', rr['raceId']))}, {q(u5('entry', ek))}, {q(e['carNumber'].lstrip('#'))}, {q(e['team'])}, {q(e['class'])}, {num(e.get('position'))}, {num(e.get('overallPosition'))}, {num(e.get('laps'))}, {q(e.get('gap'))}, {num(e.get('points')) if e.get('points') is not None else 'NULL'}, {q(e.get('status') or 'Unknown')}, {q(e.get('fastestLap'))}, {'true' if e.get('isFastestLap') else 'false'}, {q(e.get('sourceUrl'))}) ON CONFLICT (race_id, car_number, class) DO NOTHING;")
        for dn in e.get('drivers', []):
            slug = name2slug.get(norm(dn)) or PARTICIPATION_NAME_ALIASES.get(norm(dn))
            out.append(f"INSERT INTO public.wec_race_driver_participation (race_id, entry_id, profile_id, driver_name) VALUES ({q(u5('race', rr['raceId']))}, {q(u5('entry', ek))}, {q(u5('profile', slug)) if slug else 'NULL'}, {q(dn)}) ON CONFLICT DO NOTHING;")
# Season standings
for s in D['verifiedStandings']:
    out.append(f"INSERT INTO public.wec_season_standings (id, season_id, class, type, title, position, name, car_number, points) VALUES ({q(u5('standing', s['year'], s['cls'], s['type'], s['position'], s['name']))}, {q(u5('season', s['year']))}, {q(s['cls'])}, {q(s['type'])}, {q(s.get('title'))}, {num(s['position'])}, {q(s['name'])}, {q(s.get('car_number') or None)}, {num(s['points'])}) ON CONFLICT (season_id, class, type, position, name) DO NOTHING;")
# Comparison stats
for r in D['comparison']:
    out.append(f"INSERT INTO public.wec_driver_comparison (scope, profile_id, class, team, manufacturer, car_number, starts, points, wins, poles, podiums, fastest_laps, best_finish, le_mans_wins, wec_titles) VALUES ({q(r['season'])}, {q(u5('profile', r['driver_slug']))}, {q(None if r['class']=='N/A' else r['class'])}, {q(None if r['team']=='N/A' else r['team'])}, {q(None if r['manufacturer']=='N/A' else r['manufacturer'])}, {q(None if r['car_number']=='N/A' else r['car_number'])}, {num(r['starts'])}, {num(r['points'])}, {num(r['wins'])}, {num(r['poles'])}, {num(r['podiums'])}, {num(r['fastest_laps'])}, {q(None if r['best_finish']=='N/A' else r['best_finish'])}, {num(r['le_mans_wins'])}, {num(r['wec_titles'])}) ON CONFLICT (scope, profile_id) DO NOTHING;")

out.append("""
-- ============ Views ============
-- v_car_season_stats contract: per car per season aggregates from verified results.
CREATE OR REPLACE VIEW public.v_car_season_stats AS
SELECT e.entry_key, s.year AS season_year, e.season_id, e.car_number, e.team_name, e.class,
  COUNT(r.id) AS starts,
  COUNT(*) FILTER (WHERE r.class_position = 1) AS class_wins,
  COUNT(*) FILTER (WHERE r.class_position BETWEEN 1 AND 3 AND r.status = 'Finished') AS class_podiums,
  COALESCE(SUM(r.points), 0) AS points
FROM public.wec_entries e
JOIN public.wec_seasons s ON s.id = e.season_id
LEFT JOIN public.wec_race_results r ON r.entry_id = e.id
GROUP BY e.id, e.entry_key, s.year, e.season_id, e.car_number, e.team_name, e.class;

CREATE OR REPLACE VIEW public.wec_published_races AS
SELECT s.year, r.race_key, r.round_number, r.name, c.slug AS circuit, r.scheduled_date, r.duration_hours, r.status, r.winner_entry_key, r.source_url
FROM public.wec_races r JOIN public.wec_seasons s ON s.id = r.season_id LEFT JOIN public.wec_circuits c ON c.id = r.circuit_id;

CREATE OR REPLACE VIEW public.wec_published_driver_comparison AS
SELECT dc.scope, p.slug AS driver_slug, p.full_name, p.nationality, p.country_code, dc.class, dc.team, dc.manufacturer, dc.car_number,
  dc.starts, dc.points, dc.wins, dc.poles, dc.podiums, dc.fastest_laps, dc.best_finish, dc.le_mans_wins, dc.wec_titles
FROM public.wec_driver_comparison dc JOIN public.wec_driver_profiles p ON p.id = dc.profile_id;

GRANT SELECT ON public.v_car_season_stats TO anon, authenticated;
GRANT SELECT ON public.wec_published_races TO anon, authenticated;
GRANT SELECT ON public.wec_published_driver_comparison TO anon, authenticated;

-- Legacy core-schema contracts when the legacy tables exist (forward-migration path).
DO $$
BEGIN
  IF to_regclass('public.drivers') IS NOT NULL THEN
    ALTER TABLE public.drivers ADD COLUMN IF NOT EXISTS nationality text;
    ALTER TABLE public.drivers ADD COLUMN IF NOT EXISTS country_code text;
  END IF;
  IF to_regclass('public.races') IS NOT NULL AND to_regclass('public.circuits') IS NULL THEN
    CREATE TABLE public.circuits (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE, name text NOT NULL, country_code text);
  END IF;
  IF to_regclass('public.races') IS NOT NULL THEN
    ALTER TABLE public.races ADD COLUMN IF NOT EXISTS circuit_id uuid;
    INSERT INTO public.circuits (id, slug, name, country_code)
      SELECT w.id, w.slug, w.name, w.country_code FROM public.wec_circuits w ON CONFLICT (slug) DO NOTHING;
    UPDATE public.races lr SET circuit_id = wc.id
      FROM public.wec_races wr JOIN public.wec_circuits wc ON wc.id = wr.circuit_id
      JOIN public.wec_seasons ws ON ws.id = wr.season_id
      JOIN public.seasons ls ON ls.year = ws.year
      WHERE lr.season_id = ls.id AND lr.round_number = wr.round_number AND lr.circuit_id IS NULL;
  END IF;
  IF to_regclass('public.cars') IS NOT NULL THEN
    EXECUTE 'CREATE OR REPLACE VIEW public.v_hypercar_drivers_standings AS SELECT c.car_number, c.team_name, m.name AS manufacturer, COALESCE(SUM(rr.points_drivers),0) AS total_points, COUNT(rr.id) AS races_entered, RANK() OVER (ORDER BY COALESCE(SUM(rr.points_drivers),0) DESC) AS position, c.season_id FROM public.cars c JOIN public.manufacturers m ON m.id = c.manufacturer_id LEFT JOIN public.race_results rr ON rr.car_id = c.id WHERE c.category = ''Hypercar'' GROUP BY c.id, c.car_number, c.team_name, m.name, c.season_id ORDER BY total_points DESC';
  END IF;
END $$;

COMMIT;
""")

target = R / 'supabase/migrations/20261122000001_verified_2024_2026_schema_and_seed.sql'
target.write_text('\n'.join(out) + '\n')
print("written", target, target.stat().st_size, "bytes")
