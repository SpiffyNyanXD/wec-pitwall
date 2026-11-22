import json,pathlib,uuid
R=pathlib.Path(__file__).resolve().parents[1];data=json.loads((R/'src/data/verifiedMaster.json').read_text());rev='20261122';parts=['''-- WEC Pitwall verified archive, 2024–2026. Prepared, not run against Supabase.
-- Standalone additive, replayable upsert. Does not delete/overwrite live legacy tables.
-- Apply as database owner only after a backup and staging review.
-- Frontend uses this exact published static revision. Legacy core views are deprecated.
BEGIN;
CREATE TABLE IF NOT EXISTS public.wec_archive (
 revision text NOT NULL,
 resource text NOT NULL CHECK (resource IN ('season','race','driver','entry','result','standing','comparison','circuit','alias','calendar_history')),
 entity_key text NOT NULL,
 season integer CHECK (season BETWEEN 2024 AND 2026),
 payload jsonb NOT NULL CHECK (jsonb_typeof(payload)='object'),
 PRIMARY KEY (revision,resource,entity_key)
);
ALTER TABLE public.wec_archive ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS wec_archive_read ON public.wec_archive;
CREATE POLICY wec_archive_read ON public.wec_archive FOR SELECT TO anon, authenticated USING (true);
REVOKE ALL ON public.wec_archive FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.wec_archive TO anon, authenticated;
CREATE INDEX IF NOT EXISTS wec_archive_season_resource ON public.wec_archive(season,resource);
''']
rows=[]
def add(kind,key,season,payload):rows.append((rev,kind,key,season,payload))
for year in [2024,2025,2026]:
 add('season',str(year),year,{'year':year,'status':'completed','revision':rev,'source_count':8})
 for r in data[f'races{year}']:add('race',r['id'],year,r)
 for d in data[f'drivers{year}']:add('driver',d['id'],year,d)
 for e in data[f'teams{year}']:add('entry',e['id'],year,e)
for r in data['raceResults']:
 for e in r['results']:add('result',r['raceId']+'-'+e['carNumber'][1:],int(r['raceId'][:4]),dict(e,race_id=r['raceId']))
for i,s in enumerate(data['verifiedStandings']):add('standing',f"{s['year']}-{s['cls']}-{s['type']}-{s.get('driver_key')or s.get('car_number')or s['name']}",s['year'],s)
for c in data['comparison']:add('comparison',c['season']+'-'+c['driver_slug'],int(c['season'])if c['season']!='ALL'else None,c)
for c in data['circuits']:add('circuit',c['id'],None,{k:v for k,v in c.items()if k in['id','name','location','country','flag']})
for kind in ['driver','team','race']:
 for a,target in data[kind+'Aliases'].items():add('alias',kind+':'+a,None,{'kind':kind,'alias':a,'canonical':target})
for h in data['cancelledCalendar']:add('calendar_history','2026-'+h['circuit'],2026,h)
def q(v):return 'NULL'if v is None else str(v)if isinstance(v,int)else"'"+str(v).replace("'","''")+"'"
for offset in range(0,len(rows),50):
 batch=rows[offset:offset+50];parts.append('INSERT INTO public.wec_archive(revision,resource,entity_key,season,payload) VALUES\n'+',\n'.join('('+','.join(q(x)for x in [rev,kind,key,season,json.dumps(payload,ensure_ascii=False,separators=(',',':'))])+ '::jsonb)'for rev,kind,key,season,payload in batch)+'\nON CONFLICT(revision,resource,entity_key) DO UPDATE SET season=excluded.season,payload=excluded.payload;\n')
parts.append('''
-- PostgreSQL 15+ / Supabase: invoker views retain underlying RLS and grants.
CREATE OR REPLACE VIEW public.wec_published_races WITH(security_invoker=true) AS
SELECT entity_key AS slug,season AS year,(payload->>'round')::integer AS round_number,payload
FROM public.wec_archive WHERE revision='20261122' AND resource='race';
CREATE OR REPLACE VIEW public.wec_published_standings WITH(security_invoker=true) AS
SELECT entity_key AS id,season AS year,payload->>'cls' AS class,payload->>'type' AS championship_type,(payload->>'position')::integer AS position,(payload->>'points')::numeric AS points,payload
FROM public.wec_archive WHERE revision='20261122' AND resource='standing';
CREATE OR REPLACE VIEW public.wec_published_driver_comparison WITH(security_invoker=true) AS
SELECT entity_key AS id,payload->>'season' AS scope,payload->>'driver_slug' AS driver_slug,payload
FROM public.wec_archive WHERE revision='20261122' AND resource='comparison';
GRANT SELECT ON public.wec_published_races,public.wec_published_standings,public.wec_published_driver_comparison TO anon,authenticated;
COMMIT;
-- Rollback of this additive revision, after owner approval:
-- DELETE FROM public.wec_archive WHERE revision='20261122';
''')
path=R/'supabase/migrations/20261122000001_verified_archive.sql';path.write_text(''.join(parts));(R/'20261122_verified_2024_2026_data.sql').write_text(path.read_text());print('archive rows',len(rows),'bytes',path.stat().st_size)
# Remove the invalid/unverified historical seed, preserving its migration slot.
(R/'supabase/migrations/20260503000002_seed_imola_2026.sql').write_text('-- Deprecated unverified seed intentionally removed.\n-- It contained non-UUID identifiers and stale calendar/results.\n-- Verified additive archive is in 20261122000001_verified_archive.sql.\n-- Never rewrite an already-applied production migration without reconciliation.\n')
