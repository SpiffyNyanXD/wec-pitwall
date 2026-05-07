import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Race, HypercardDriverStanding, ManufacturerStanding, Lmgt3Standing, RaceResult, SeasonStats } from '@/types/wec';

interface RawRaceResultRow {
  id: string;
  race_id: string;
  car_id: string;
  finish_position: number | null;
  classified: boolean;
  status: 'finished' | 'dnf' | 'dsq' | 'dns';
  laps_completed: number | null;
  points_drivers: string | number;
  points_teams: string | number;
  points_manufacturers: string | number;
  created_at: string;
  cars: {
    car_number: string;
    team_name: string;
    category: 'Hypercar' | 'LMGT3';
    manufacturers: {
      name: string;
    };
  };
}

// Active season ID hook
export function useActiveSeasonId() {
  const [seasonId, setSeasonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('seasons').select('id').eq('is_active', true).single()
      .then(({ data }) => { if (data) setSeasonId(data.id); setLoading(false); });
  }, []);
  return { seasonId, loading };
}

// Races hook
export function useRaces(seasonId: string | null) {
  const [data, setData] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!seasonId) return;
    supabase.from('races').select('*').eq('season_id', seasonId).order('round_number')
      .then(({ data: rows, error: err }) => {
        if (err) setError(err.message);
        else setData(rows ?? []);
        setLoading(false);
      });
  }, [seasonId]);
  return { data, loading, error };
}

// Hypercar Drivers standings hook
export function useHypercardDriversStandings(seasonId: string | null) {
  const [data, setData] = useState<HypercardDriverStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!seasonId) return;
    supabase.from('v_hypercar_drivers_standings').select('*').eq('season_id', seasonId).order('position')
      .then(({ data: rows, error: err }) => {
        if (err) setError(err.message);
        else setData((rows ?? []).map((r: Record<string, unknown>) => ({ ...r, total_points: Number(r.total_points) })));
        setLoading(false);
      });
  }, [seasonId]);
  return { data, loading, error };
}

// Hypercar Manufacturers standings hook
export function useHypercarManufacturersStandings(seasonId: string | null) {
  const [data, setData] = useState<ManufacturerStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!seasonId) return;
    supabase.from('v_hypercar_manufacturers_standings').select('*').eq('season_id', seasonId).order('position')
      .then(({ data: rows, error: err }) => {
        if (err) setError(err.message);
        else setData((rows ?? []).map((r: Record<string, unknown>) => ({ ...r, total_points: Number(r.total_points) })));
        setLoading(false);
      });
  }, [seasonId]);
  return { data, loading, error };
}

// LMGT3 Teams standings hook
export function useLmgt3TeamsStandings(seasonId: string | null) {
  const [data, setData] = useState<Lmgt3Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!seasonId) return;
    supabase.from('v_lmgt3_teams_standings').select('*').eq('season_id', seasonId).order('position')
      .then(({ data: rows, error: err }) => {
        if (err) setError(err.message);
        else setData((rows ?? []).map((r: Record<string, unknown>) => ({ ...r, total_points: Number(r.total_points) })));
        setLoading(false);
      });
  }, [seasonId]);
  return { data, loading, error };
}

// LMGT3 Drivers standings hook
export function useLmgt3DriversStandings(seasonId: string | null) {
  const [data, setData] = useState<Lmgt3Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!seasonId) return;
    supabase.from('v_lmgt3_drivers_standings').select('*').eq('season_id', seasonId).order('position')
      .then(({ data: rows, error: err }) => {
        if (err) setError(err.message);
        else setData((rows ?? []).map((r: Record<string, unknown>) => ({ ...r, total_points: Number(r.total_points) })));
        setLoading(false);
      });
  }, [seasonId]);
  return { data, loading, error };
}

// Race results hook (for a specific race)
export function useRaceResults(raceId: string | null) {
  const [data, setData] = useState<RaceResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!raceId) return;
    supabase
      .from('race_results')
      .select(`*, cars!inner(car_number, team_name, category, manufacturers!inner(name))`)
      .eq('race_id', raceId)
      .order('finish_position', { ascending: true, nullsFirst: false })
      .then(({ data: rows, error: err }) => {
        if (err) {
          setError(err.message);
        } else {
          // Cast to RawRaceResultRow[] — shape guaranteed by the select query above
          const typed = (rows ?? []) as unknown as RawRaceResultRow[];
          setData(typed.map(r => ({
            id: r.id,
            race_id: r.race_id,
            car_id: r.car_id,
            finish_position: r.finish_position,
            classified: r.classified,
            status: r.status,
            points_drivers: Number(r.points_drivers),
            points_teams: Number(r.points_teams),
            points_manufacturers: Number(r.points_manufacturers),
            car_number: r.cars.car_number,
            team_name: r.cars.team_name,
            category: r.cars.category,
            manufacturer: r.cars.manufacturers.name,
          })));
        }
        setLoading(false);
      });
  }, [raceId]);
  return { data, loading, error };
}

// Season stats hook
export function useSeasonStats(seasonId: string | null) {
  const [data, setData] = useState<SeasonStats | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!seasonId) return;
    Promise.all([
      supabase.from('races').select('id, duration_hours', { count: 'exact' }).eq('season_id', seasonId),
      supabase.from('cars').select('id', { count: 'exact' }).eq('season_id', seasonId),
      supabase.from('cars').select('manufacturer_id').eq('season_id', seasonId),
    ]).then(([racesRes, carsRes, mfrsRes]) => {
      const seasonHours = (racesRes.data ?? []).reduce((sum, r) => sum + r.duration_hours, 0);
      const uniqueMfrs = new Set((mfrsRes.data ?? []).map(c => c.manufacturer_id)).size;
      setData({
        totalRaces: racesRes.count ?? 0,
        totalTeams: carsRes.count ?? 0,
        totalManufacturers: uniqueMfrs,
        seasonHours,
      });
      setLoading(false);
    });
  }, [seasonId]);
  return { data, loading };
}
