import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
const db=new PGlite();const file='supabase/migrations/20261122000001_verified_2024_2026_schema_and_seed.sql';const sql=fs.readFileSync(file,'utf8');const report={file};
try{
  await db.exec('CREATE ROLE anon; CREATE ROLE authenticated;');
  await db.exec(sql);
  report.firstImport=await db.query('SELECT s.year, r.status, count(*)::int AS races FROM public.wec_races r JOIN public.wec_seasons s ON s.id=r.season_id GROUP BY 1,2 ORDER BY 1,2');
  // Idempotent replay: the same migration applies a second time without error or duplication.
  await db.exec(sql);
  report.secondImport=await db.query('SELECT count(*)::int AS races FROM public.wec_races');
  report.rounds=await db.query('SELECT s.year, count(*)::int AS completed_rounds FROM public.wec_races r JOIN public.wec_seasons s ON s.id=r.season_id WHERE r.status=\'completed\' GROUP BY 1 ORDER BY 1');
  report.scopes=await db.query('SELECT scope,count(*)::int AS drivers FROM public.wec_driver_comparison GROUP BY scope ORDER BY scope');
  report.entities=await db.query(`SELECT (SELECT count(*)::int FROM public.wec_drivers) AS season_drivers,(SELECT count(*)::int FROM public.wec_race_results) AS results,(SELECT count(*)::int FROM public.wec_entries) AS entries,(SELECT count(*)::int FROM public.wec_driver_profiles) AS profiles,(SELECT count(*)::int FROM public.wec_season_standings) AS standings,(SELECT count(*)::int FROM public.wec_circuits) AS circuits`);
  report.champions2026=await db.query(`SELECT class, type, name, points FROM public.wec_season_standings WHERE position=1 AND season_id=(SELECT id FROM public.wec_seasons WHERE year=2026) AND ((class='Hypercar' AND type='Drivers') OR (class='Hypercar' AND type ILIKE 'Manufactur%') OR (class='LMGT3' AND type='Drivers')) ORDER BY 1,2`);
  report.invalidUuids=await db.query(`SELECT count(*)::int AS invalid FROM public.wec_races WHERE id::text !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'`);
  report.invalidRounds=await db.query(`SELECT count(*)::int AS invalid FROM public.wec_published_races WHERE status='completed' AND (round_number IS NULL OR round_number NOT BETWEEN 1 AND 8)`);
  report.carSeasonStats=await db.query(`SELECT count(*)::int AS rows FROM public.v_car_season_stats`);
  await db.exec('SET ROLE anon');
  report.anonRead=await db.query('SELECT count(*)::int AS races FROM public.wec_published_races');
  try{await db.exec("INSERT INTO public.wec_seasons VALUES ('00000000-0000-4000-8000-000000000099',2099,'scheduled')");report.anonWriteDenied=false;}catch(e){report.anonWriteDenied=true;report.denialCode=e.code;}
  await db.exec('RESET ROLE');
  report.success=true;
}catch(e){report.success=false;report.error=String(e);report.stack=e.stack}
finally{await db.close();fs.mkdirSync('verification',{recursive:true});fs.writeFileSync('verification/sql-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));}
