export interface Race {
  id: string;
  season_id: string;
  round_number: number;
  name: string;
  circuit: string;
  country_code: string; // ISO 3166-1 alpha-2: "IT", "BE", "FR" etc.
  scheduled_date: string;
  duration_hours: number;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface HypercardDriverStanding {
  season_id: string;
  car_number: string;
  team_name: string;
  manufacturer: string;
  total_points: number;
  races_entered: number;
  position: number;
}

export interface ManufacturerStanding {
  season_id: string;
  manufacturer: string;
  total_points: number;
  position: number;
}

export interface Lmgt3Standing {
  season_id: string;
  car_number: string;
  team_name: string;
  total_points: number;
  races_entered: number;
  position: number;
}

export interface RaceResult {
  id: string;
  race_id: string;
  car_id: string;
  finish_position: number | null;
  classified: boolean;
  status: 'finished' | 'dnf' | 'dsq' | 'dns';
  points_drivers: number;
  points_teams: number;
  points_manufacturers: number;
  car_number: string;
  team_name: string;
  category: 'Hypercar' | 'LMGT3';
  manufacturer: string;
}

export interface SeasonStats {
  totalRaces: number;
  totalTeams: number;
  totalManufacturers: number;
  seasonHours: number;
}
