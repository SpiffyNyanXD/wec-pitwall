export interface Driver {
  id: string;
  name: string;
  nationality: string;
  team: string;
  points: number;
  position: number;
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
}

export interface Race {
  id: string;
  name: string;
  circuit: string;
  country: string;
  date: string;
  duration: string;
  status: 'upcoming' | 'live' | 'completed';
  flag: string;
}

export interface LiveTiming {
  position: number;
  carNumber: string;
  team: string;
  class: string;
  driver: string;
  gap: string;
  lastLap: string;
  bestLap: string;
  status: 'running' | 'pit' | 'out';
}

export const drivers: Driver[] = [
  { id: '1', name: 'Sébastien Buemi', nationality: 'SUI', team: 'Toyota Gazoo Racing', points: 123, position: 1 },
  { id: '2', name: 'Brendon Hartley', nationality: 'NZL', team: 'Toyota Gazoo Racing', points: 123, position: 1 },
  { id: '3', name: 'Ryo Hirakawa', nationality: 'JPN', team: 'Toyota Gazoo Racing', points: 123, position: 1 },
  { id: '4', name: 'Kevin Estre', nationality: 'FRA', team: 'Porsche Penske', points: 115, position: 4 },
  { id: '5', name: 'André Lotterer', nationality: 'GER', team: 'Porsche Penske', points: 115, position: 4 },
  { id: '6', name: 'Laurens Vanthoor', nationality: 'BEL', team: 'Porsche Penske', points: 115, position: 4 },
];

export const teams: Team[] = [
  { id: '1', name: 'Toyota Gazoo Racing', manufacturer: 'Toyota', carNumber: '#7', class: 'HYPERCAR', points: 186, position: 1, color: '#E60012' },
  { id: '2', name: 'Porsche Penske', manufacturer: 'Porsche', carNumber: '#6', class: 'HYPERCAR', points: 172, position: 2, color: '#C4A747' },
  { id: '3', name: 'Ferrari AF Corse', manufacturer: 'Ferrari', carNumber: '#50', class: 'HYPERCAR', points: 158, position: 3, color: '#DC0000' },
  { id: '4', name: 'Cadillac Racing', manufacturer: 'Cadillac', carNumber: '#2', class: 'HYPERCAR', points: 134, position: 4, color: '#1E1E1E' },
  { id: '5', name: 'Peugeot TotalEnergies', manufacturer: 'Peugeot', carNumber: '#93', class: 'HYPERCAR', points: 98, position: 5, color: '#0066B1' },
  { id: '6', name: 'Alpine Endurance', manufacturer: 'Alpine', carNumber: '#35', class: 'HYPERCAR', points: 87, position: 6, color: '#0090FF' },
];

export const races: Race[] = [
  { id: '1', name: '1000 Miles of Sebring', circuit: 'Sebring International Raceway', country: 'USA', date: '2024-03-15', duration: '8 Hours', status: 'completed', flag: '🇺🇸' },
  { id: '2', name: '6 Hours of Imola', circuit: 'Autodromo Enzo e Dino Ferrari', country: 'Italy', date: '2024-04-21', duration: '6 Hours', status: 'completed', flag: '🇮🇹' },
  { id: '3', name: '6 Hours of Spa', circuit: 'Circuit de Spa-Francorchamps', country: 'Belgium', date: '2024-05-11', duration: '6 Hours', status: 'completed', flag: '🇧🇪' },
  { id: '4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France', date: '2024-06-15', duration: '24 Hours', status: 'upcoming', flag: '🇫🇷' },
  { id: '5', name: '6 Hours of São Paulo', circuit: 'Interlagos', country: 'Brazil', date: '2024-07-14', duration: '6 Hours', status: 'upcoming', flag: '🇧🇷' },
  { id: '6', name: '6 Hours of Fuji', circuit: 'Fuji Speedway', country: 'Japan', date: '2024-09-15', duration: '6 Hours', status: 'upcoming', flag: '🇯🇵' },
  { id: '7', name: '8 Hours of Bahrain', circuit: 'Bahrain International Circuit', country: 'Bahrain', date: '2024-11-02', duration: '8 Hours', status: 'upcoming', flag: '🇧🇭' },
];

export const liveTiming: LiveTiming[] = [
  { position: 1, carNumber: '#7', team: 'Toyota Gazoo Racing', class: 'HYPER', driver: 'Buemi', gap: 'LEADER', lastLap: '3:24.567', bestLap: '3:23.891', status: 'running' },
  { position: 2, carNumber: '#6', team: 'Porsche Penske', class: 'HYPER', driver: 'Estre', gap: '+2.341', lastLap: '3:24.892', bestLap: '3:24.102', status: 'running' },
  { position: 3, carNumber: '#50', team: 'Ferrari AF Corse', class: 'HYPER', driver: 'Fuoco', gap: '+5.678', lastLap: '3:25.123', bestLap: '3:24.456', status: 'running' },
  { position: 4, carNumber: '#8', team: 'Toyota Gazoo Racing', class: 'HYPER', driver: 'Hartley', gap: '+8.901', lastLap: '3:25.456', bestLap: '3:24.789', status: 'pit' },
  { position: 5, carNumber: '#5', team: 'Porsche Penske', class: 'HYPER', driver: 'Campbell', gap: '+12.345', lastLap: '3:25.789', bestLap: '3:25.012', status: 'running' },
  { position: 6, carNumber: '#51', team: 'Ferrari AF Corse', class: 'HYPER', driver: 'Pier Guidi', gap: '+15.678', lastLap: '3:26.012', bestLap: '3:25.345', status: 'running' },
  { position: 7, carNumber: '#2', team: 'Cadillac Racing', class: 'HYPER', driver: 'Bamber', gap: '+23.456', lastLap: '3:26.789', bestLap: '3:25.890', status: 'running' },
  { position: 8, carNumber: '#93', team: 'Peugeot TotalEnergies', class: 'HYPER', driver: 'Jensen', gap: '+34.567', lastLap: '3:27.123', bestLap: '3:26.456', status: 'running' },
];

export const weather = {
  location: 'Le Mans, France',
  temperature: 22,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12,
  trackTemp: 38,
  rainChance: 15,
};
