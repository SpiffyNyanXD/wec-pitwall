import { PGlite } from '@electric-sql/pglite';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const db=new PGlite();const file='supabase/migrations/20261122000001_verified_2024_2026_schema_and_seed.sql';const sql=fs.readFileSync(file,'utf8');const report={file};
async function verifyPodiumsFromSource() {
  const master = JSON.parse(fs.readFileSync('src/data/verifiedMaster.json', 'utf8'));
  const expected = new Map();
  const rawResults = new Map(master.verifiedResults.map(row => [`${row.year}-${row.round}/${String(row.car_number).replace(/^#/, '')}/${row.cls.toUpperCase()}`, row]));
  let results = 0;
  let zeroPositionResults = 0;
  for (const race of master.raceResults) {
    const year = Number(race.raceId.split('-')[0]);
    for (const result of race.results) {
      const key = `entry-${year}-${result.carNumber.replace(/^#/, '')}`;
      if (!expected.has(key)) expected.set(key, 0);
      const position = result.position;
      const source = rawResults.get(`${race.raceId}/${result.carNumber.replace(/^#/, '')}/${result.class.toUpperCase()}`);
      assert.ok(source, `Missing classification source for ${race.raceId}/${result.carNumber}`);
      assert.equal(result.status === 'Finished', source.status === 'Classified', `Classification mapping for ${race.raceId}/${result.carNumber}`);
      if (Number.isInteger(position) && position >= 1 && position <= 3 && source.status === 'Classified') {
        expected.set(key, expected.get(key) + 1);
      }
      if (position === 0) zeroPositionResults++;
      results++;
    }
  }
  const { rows } = await db.query('SELECT entry_key, class_podiums::int AS podiums FROM public.v_car_season_stats ORDER BY entry_key');
  const actualKeys = new Set(rows.map(row => row.entry_key));
  for (const key of expected.keys()) assert.ok(actualKeys.has(key), `Missing car-season ${key}`);
  for (const row of rows) {
    assert.equal(row.podiums, expected.get(row.entry_key) ?? 0, `Podium mismatch for ${row.entry_key}`);
  }
  const stored = (await db.query('SELECT count(*)::int AS results, count(*) FILTER (WHERE class_position = 0)::int AS zero_positions FROM public.wec_race_results')).rows[0];
  assert.equal(stored.results, results, 'Source result count changed');
  assert.equal(stored.zero_positions, zeroPositionResults, 'Stored source zeros changed');
  return { carSeasonsChecked: rows.length, zeroPodiumCarSeasons: rows.filter(row => row.podiums === 0).length, totalPodiums: rows.reduce((sum, row) => sum + row.podiums, 0), storedResults: stored.results, preservedZeroPositions: stored.zero_positions };
}

async function verifyPodiumBoundaries() {
  // Exercise the actual view with disposable rows. Roll back all fixture changes.
  await db.exec('BEGIN');
  try {
    const fixture = (await db.query('SELECT entry_id FROM public.wec_race_results GROUP BY entry_id HAVING count(*) >= 7 ORDER BY entry_id LIMIT 1')).rows[0];
    assert.ok(fixture, 'Boundary fixture needs an entry with at least seven results');
    const before = (await db.query('SELECT starts::int, points FROM public.v_car_season_stats WHERE entry_key = (SELECT entry_key FROM public.wec_entries WHERE id = $1)', [fixture.entry_id])).rows[0];
    const ids = (await db.query('SELECT id FROM public.wec_race_results WHERE entry_id = $1 ORDER BY id LIMIT 7', [fixture.entry_id])).rows;
    await db.query("UPDATE public.wec_race_results SET class_position = NULL, status = 'Finished' WHERE entry_id = $1", [fixture.entry_id]);
    const positions = [-1, 0, 1, 2, 3, 4, null];
    for (let i = 0; i < positions.length; i++) {
      await db.query('UPDATE public.wec_race_results SET class_position = $1 WHERE id = $2', [positions[i], ids[i].id]);
    }
    const after = (await db.query('SELECT starts::int, points, class_podiums::int, class_wins::int FROM public.v_car_season_stats WHERE entry_key = (SELECT entry_key FROM public.wec_entries WHERE id = $1)', [fixture.entry_id])).rows[0];
    assert.equal(after.class_podiums, 3, 'Only positions 1, 2 and 3 are podiums');
    assert.equal(after.class_wins, 1, 'Only position 1 is a class win');
    assert.equal(after.starts, before.starts, 'Position validation must not change starts');
    assert.equal(after.points, before.points, 'Position validation must not change points');
    const excludedStatuses = ['DNF', 'DSQ', 'Unknown'];
    for (const status of excludedStatuses) {
      await db.query('UPDATE public.wec_race_results SET status = $1 WHERE id = $2', [status, ids[4].id]);
      const podiums = (await db.query('SELECT class_podiums::int FROM public.v_car_season_stats WHERE entry_key = (SELECT entry_key FROM public.wec_entries WHERE id = $1)', [fixture.entry_id])).rows[0].class_podiums;
      assert.equal(podiums, 2, `Unclassified status ${status} must not count despite positive position`);
    }
    return { positions, expectedPodiums: 3, actualPodiums: after.class_podiums, excludedPositivePositionStatuses: excludedStatuses, startsUnchanged: true, pointsUnchanged: true };
  } finally {
    await db.exec('ROLLBACK');
  }
}

try{
  await db.exec('CREATE ROLE anon; CREATE ROLE authenticated;');
  await db.exec(sql);
  report.podiumsFirstImport = await verifyPodiumsFromSource();
  report.podiumBoundariesFirstImport = await verifyPodiumBoundaries();
  report.firstImport=await db.query('SELECT s.year, r.status, count(*)::int AS races FROM public.wec_races r JOIN public.wec_seasons s ON s.id=r.season_id GROUP BY 1,2 ORDER BY 1,2');
  // Idempotent replay: the same migration applies a second time without error or duplication.
  await db.exec(sql);
  report.podiumsRepeatImport = await verifyPodiumsFromSource();
  report.podiumBoundariesRepeatImport = await verifyPodiumBoundaries();
  report.podiumsAfterFixtureRollback = await verifyPodiumsFromSource();
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
}catch(e){report.success=false;report.error=String(e);report.stack=e.stack;process.exitCode=1;}
finally{await db.close();fs.mkdirSync('verification',{recursive:true});fs.writeFileSync('verification/sql-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));}
