import verified from './verifiedMaster.json';
export interface Driver {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  nationality: string;
  countryFlag: string;
  team: string;
  teamId: string;
  carNumber: string;
  class: 'HYPERCAR' | 'LMP2' | 'LMGT3';
  points: number;
  position: number;
  dateOfBirth?: string;
  placeOfBirth?: string;
  biography: string;
  careerHighlights: string[];
  facts: string[];
  championships: number;
  leMansWins: number;
  wecWins: number;
  wins?: number;
  poles?: number;
  podiums?: number;
  fastestLaps?: number;
  imageUrl?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
}

export interface Team {
  id: string;
  name: string;
  manufacturer: string;
  carNumber: string;
  class: 'HYPERCAR' | 'LMP2' | 'LMGT3';
  points: number;
  position: number;
  color: string;
  country: string;
  countryFlag: string;
  drivers: string[];
  // Extended team profile data
  fullName?: string;
  chassis?: string;
  engine?: string;
  teamPrincipal?: string;
  base?: string;
  founded?: string;
  wecDebut?: string;
  championships?: number;
  leMansWins?: number;
  wecWins?: number;
  poles?: number;
  fastestLaps?: number;
  about?: string;
  facts?: string[];
}

export interface Session {
  type: 'FP1' | 'FP2' | 'Qualifying' | 'Hyperpole' | 'Warm Up' | 'Race';
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
  duration_hours?: number;
}

export interface RaceResult {
  position: number;
  carNumber: string;
  team: string;
  manufacturer: string;
  drivers: string[];
  class: 'HYPERCAR' | 'LMP2' | 'LMGT3';
  laps: number;
  gap: string; // '+1:23.456' or 'Leader' or '+1 Lap'
  fastestLap?: string; // '1:34.567'
  isFastestLap?: boolean;
  status: 'Finished' | 'DNF' | 'DSQ';
  color: string;
  flag: string;
}

export interface RaceResultSet {
  raceId: string;
  polePosition: string;
  poleTime: string;
  fastestLap: string;
  fastestLapTime: string;
  fastestLapDriver: string;
  results: RaceResult[];
}

export interface Race {
  id: string;
  name: string;
  circuit: string;
  country: string;
  date: string;
  endDate?: string;
  duration: string;
  duration_hours?: number;
  status: 'upcoming' | 'live' | 'completed' | 'postponed' | 'cancelled';
  flag: string;
  season: number;
  round: number | null;
  roundNote?: string;
  round_number?: number;
  scheduled_date?: string;
  season_id?: string;
  country_code?: string;
  circuitId?: string;
  sourceUrl?: string;
  winner?: string;
  winningTeam?: string;
  polePosition?: string;
  fastestLap?: string;
  trackLength?: string;
  laps?: number;
  sessions?: Session[];
}


export const drivers2024 = verified.drivers2024 as unknown as Driver[];
export const drivers2025 = verified.drivers2025 as unknown as Driver[];
export const drivers2026 = verified.drivers2026 as unknown as Driver[];
export const teams2024 = verified.teams2024 as unknown as Team[];
export const teams2025 = verified.teams2025 as unknown as Team[];
export const teams2026 = verified.teams2026 as unknown as Team[];
export const races2024 = verified.races2024 as unknown as Race[];
export const races2025 = verified.races2025 as unknown as Race[];
export const races2026 = verified.races2026 as unknown as Race[];
export const drivers = verified.drivers as unknown as Driver[];
export const teams = verified.teams as unknown as Team[];
export const races = verified.races as unknown as Race[];
export const hypercars2026 = verified.hypercars2026 as unknown as Team[];
export const lmgt3Teams2026 = verified.lmgt3Teams2026 as unknown as Team[];
export const raceResults = verified.raceResults as unknown as RaceResultSet[];
export const circuits = verified.circuits;
export const standings2024 = verified.standings2024;
export const standings2025 = verified.standings2025;
export const standings2026 = verified.standings2026;
export const comparison = verified.comparison;
export const verifiedStandings = verified.verifiedStandings;
export const verifiedResults = verified.verifiedResults;
export const weather = null; // No verified live weather source.

export const getDriversBySeason = (year: number): Driver[] => year === 2024 ? drivers2024 : year === 2025 ? drivers2025 : drivers2026;
export const getTeamsBySeason = (year: number): Team[] => year === 2024 ? teams2024 : year === 2025 ? teams2025 : teams2026;
export const getRacesBySeason = (year: number): Race[] => races.filter(r => r.season === year);
export const getDriverById = (id: string): Driver | undefined => {
 const aliases = verified.driverAliases as Record<string, string>;
 const candidates = [...drivers2026, ...drivers2025, ...drivers2024];
 return candidates.find(d => d.id === (aliases[id] ?? id)) ?? candidates.find(d => d.id.replace(/-20\d\d$/, '') === id);
};
export const getTeamById = (id: string): Team | undefined => {
 const candidates = [...teams2026, ...teams2025, ...teams2024];
 const aliases = verified.teamAliases as Record<string,string>;
 return candidates.find(t => t.id === (aliases[id] ?? id)) ?? candidates.find(t => t.carNumber.slice(1) === id) ?? candidates.find(t => `${t.manufacturer.toLowerCase().split(' ')[0]}-${t.carNumber.slice(1)}` === id);
};
export const getDriversByClass = (cls: Driver['class']) => drivers.filter(d => d.class === cls);
export const getTeamsByClass = (cls: Team['class']) => teams.filter(t => t.class === cls);
export const getNextRace = (): Race | undefined => races.filter(r => r.status === 'upcoming' && new Date(r.date) > new Date()).sort((a,b) => a.date.localeCompare(b.date))[0];
export const isRaceWeek = (r: Race): boolean => r.status !== 'completed' && r.status !== 'cancelled' && Date.now() >= +new Date(r.date) - 7 * 86400000 && Date.now() <= +new Date(r.date);
export const getCurrentOrNextRaceWeekRace = () => races.find(isRaceWeek) ?? getNextRace();

export const getRaceById = (id: string): Race | undefined => { const aliases = verified.raceAliases as Record<string,string>; return races.find(r => r.id === (aliases[id] ?? id)); };
