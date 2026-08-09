import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { HypercardDriverStanding, RaceResult, SeasonStats } from '@/types/wec';

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


// Module-level map to track season year by season ID
const seasonYearMap: Record<string, number> = {};

export function getStaleTimeForSeason(seasonId: string | null, defaultStaleTime: number): number {
  if (!seasonId) return defaultStaleTime;
  const year = seasonYearMap[seasonId];
  if (year === 2024 || year === 2025) {
    return Infinity;
  }
  return defaultStaleTime;
}

// Active season ID hook
export function useActiveSeasonId() {
  const [seasonId, setSeasonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('seasons').select('id, year').eq('is_active', true).single()
      .then(({ data }) => {
        if (data) {
          seasonYearMap[data.id] = data.year;
          setSeasonId(data.id);
        }
        setTimeout(() => setLoading(false), 0);
      });
  }, []);
  return { seasonId, loading };
}

// Season by year hook
export function useSeasonByYear(year: number | null) {
  const [seasonId, setSeasonId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [prevYear, setPrevYear] = useState<number | null>(null);

  if (year !== prevYear) {
    setPrevYear(year);
    setSeasonId(null);
    setLoading(!!year);
  }

  useEffect(() => {
    if (!year) return;
    supabase.from('seasons').select('id').eq('year', year).maybeSingle()
      .then(({ data }) => {
        if (data) {
          seasonYearMap[data.id] = year;
          setSeasonId(data.id);
        } else {
          setSeasonId(null);
        }
        setLoading(false);
      });
  }, [year]);
  return { seasonId, loading };
}

// Races hook
export function useRaces(seasonId: string | null) {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['races', seasonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('races')
        .select('*')
        .eq('season_id', seasonId!)
        .order('scheduled_date');
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!seasonId,
    staleTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 60 * 24),
    gcTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 60 * 48),
  });
  return { data, loading: isLoading, error: error?.message ?? null };
}

// Hypercar Drivers standings hook
export function useHypercarDriversStandings(seasonId: string | null) {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['hypercar-drivers', seasonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('v_hypercar_drivers_standings')
        .select('*')
        .eq('season_id', seasonId!)
        .order('position');
      if (error) throw error;
      return (data ?? []).map((r: Record<string, unknown>) => ({ ...r, total_points: Number(r.total_points) }));
    },
    enabled: !!seasonId,
    staleTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 10),
    gcTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 60),
  });
  return { data, loading: isLoading, error: error?.message ?? null };
}

// Hypercar Manufacturers standings hook
export function useHypercarManufacturersStandings(seasonId: string | null) {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['manufacturers', seasonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('v_hypercar_manufacturers_standings')
        .select('*')
        .eq('season_id', seasonId!)
        .order('position');
      if (error) throw error;
      return (data ?? []).map((r: Record<string, unknown>) => ({ ...r, total_points: Number(r.total_points) }));
    },
    enabled: !!seasonId,
    staleTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 10),
    gcTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 60),
  });
  return { data, loading: isLoading, error: error?.message ?? null };
}

// LMGT3 Teams standings hook
export function useLmgt3TeamsStandings(seasonId: string | null) {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['lmgt3-teams', seasonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('v_lmgt3_teams_standings')
        .select('*')
        .eq('season_id', seasonId!)
        .order('position');
      if (error) throw error;
      return (data ?? []).map((r: Record<string, unknown>) => ({ ...r, total_points: Number(r.total_points) }));
    },
    enabled: !!seasonId,
    staleTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 10),
    gcTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 60),
  });
  return { data, loading: isLoading, error: error?.message ?? null };
}

// LMGT3 Drivers standings hook
export function useLmgt3DriversStandings(seasonId: string | null) {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['lmgt3-drivers', seasonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('v_lmgt3_drivers_standings')
        .select('*')
        .eq('season_id', seasonId!)
        .order('position');
      if (error) throw error;
      return (data ?? []).map((r: Record<string, unknown>) => ({ ...r, total_points: Number(r.total_points) }));
    },
    enabled: !!seasonId,
    staleTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 10),
    gcTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 60),
  });
  return { data, loading: isLoading, error: error?.message ?? null };
}

// Race results hook (for a specific race)
export function useRaceResults(raceId: string | null) {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['race-results', raceId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('race_results')
        .select(`*, cars!inner(car_number, team_name, category, manufacturers!inner(name))`)
        .eq('race_id', raceId!)
        .order('finish_position', { ascending: true, nullsFirst: false });
      if (error) throw error;

      const typed = (data ?? []) as unknown as RawRaceResultRow[];
      return typed.map(r => ({
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
      }));
    },
    enabled: !!raceId,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });
  return { data, loading: isLoading, error: error?.message ?? null };
}

// Season stats hook
export function useSeasonStats(seasonId: string | null) {
  const { data = null, isLoading } = useQuery({
    queryKey: ['season-stats', seasonId],
    queryFn: async () => {
      const [racesRes, carsRes, mfrsRes] = await Promise.all([
        supabase.from('races').select('id, duration_hours', { count: 'exact' }).eq('season_id', seasonId!),
        supabase.from('cars').select('id', { count: 'exact' }).eq('season_id', seasonId!),
        supabase.from('cars').select('manufacturer_id').eq('season_id', seasonId!),
      ]);
      const seasonHours = (racesRes.data ?? []).reduce((sum, r) => sum + r.duration_hours, 0);
      const uniqueMfrs = new Set((mfrsRes.data ?? []).map(c => c.manufacturer_id)).size;
      return {
        totalRaces: racesRes.count ?? 0,
        totalTeams: carsRes.count ?? 0,
        totalManufacturers: uniqueMfrs,
        seasonHours,
      };
    },
    enabled: !!seasonId,
    staleTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 60 * 24),
    gcTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 60 * 48),
  });
  return { data, loading: isLoading };
}

// Helper to abbreviate driver names: "Sébastien Buemi" -> "S. Buemi"
function abbreviateName(fullName: string) {
  if (!fullName) return '';
  const parts = fullName.trim().split(' ');
  if (parts.length === 1) return parts[0];
  return `${parts[0][0]}. ${parts.slice(1).join(' ')}`;
}

// Season drivers hook - fetches drivers, joins cars, groups by car_number and returns abbreviated names
export function useSeasonDrivers(seasonId: string | null) {
  const { data = {}, isLoading, error } = useQuery({
    queryKey: ['drivers', seasonId],
    queryFn: async () => {
      const { data: rows, error: err } = await supabase
        .from('drivers')
        .select('full_name, cars!inner(season_id, car_number, team_name)')
        .eq('cars.season_id', seasonId!);
      if (err) throw err;

      const map: Record<string, string[]> = {};
      (rows as Record<string, unknown>[] ?? []).forEach((r) => {
        const num = (r?.cars as Record<string, unknown>)?.car_number;
        if (!num) return;
        if (!map[num]) map[num] = [];
        if (r?.full_name) {
          map[num].push(abbreviateName(r.full_name as string));
        }
      });

      const result: Record<string, string> = {};
      for (const num in map) {
        result[num] = map[num].join(' / ');
      }
      return result;
    },
    enabled: !!seasonId,
    staleTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 60 * 6),
    gcTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 60 * 24),
  });

  return { data, loading: isLoading, error: error?.message ?? null };
}

// Car season stats hook - fetches from v_car_season_stats
export function useCarSeasonStats(seasonId: string | null) {
  const { data = [], isLoading, error } = useQuery({
    queryKey: ['car-season-stats', seasonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('v_car_season_stats')
        .select('*')
        .eq('season_id', seasonId!);
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!seasonId,
    staleTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 10),
    gcTime: getStaleTimeForSeason(seasonId, 1000 * 60 * 60),
  });
  return { data, loading: isLoading, error: error?.message ?? null };
}

// Last race hook
export function useLastRace() {
  const { data = null, isLoading, error } = useQuery({
    queryKey: ['last-race'],
    queryFn: async () => {
      // Find the most recent completed race
      const { data: raceData, error: raceError } = await supabase
        .from('races')
        .select('*')
        .eq('status', 'completed')
        .order('scheduled_date', { ascending: false })
        .limit(1)
        .single();

      if (raceError && raceError.code !== 'PGRST116') throw raceError;
      if (!raceData) return null;

      // Find the winner (first position) for this race
      const { data: resultData, error: resultError } = await supabase
        .from('race_results')
        .select(`
          finish_position,
          cars!inner (
            car_number,
            team_name,
            category,
            manufacturers!inner(name)
          )
        `)
        .eq('race_id', raceData.id)
        .eq('cars.category', 'Hypercar')
        .order('finish_position', { ascending: true })
        .limit(1)
        .single();

      if (resultError && resultError.code !== 'PGRST116') {
        throw new Error(`Winner query failed: ${resultError.message}`);
      }

      const winnerCar = resultData?.cars as Record<string, unknown> | null;
      const mfrName = winnerCar?.manufacturers ? (winnerCar.manufacturers as Record<string, unknown>).name : '';
      const winnerName = winnerCar?.car_number ? `${mfrName} #${winnerCar.car_number}`.trim() : null;
      const winningTeam = winnerCar?.team_name as string | null;

      return {
        id: raceData.id,
        name: raceData.name,
        date: raceData.scheduled_date,
        flag: raceData.country_code ? getFlagEmoji(raceData.country_code) : '🏁',
        winner: winnerName,
        winningTeam: winningTeam,
      };
    },
    staleTime: 5 * 60 * 1000,
  });

  return { data, loading: isLoading, error: error?.message ?? null };
}

function getFlagEmoji(countryCode: string) {
  if (!countryCode) return '🏁';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char =>  127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
