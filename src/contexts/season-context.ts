import { createContext, useContext } from 'react';

export type SeasonYear = 2024 | 2025 | 2026;

export interface SeasonInfo {
  year: SeasonYear;
  status: 'completed' | 'in-progress' | 'upcoming';
  label: string;
}

export const SEASONS: Record<SeasonYear, SeasonInfo> = {
  2024: { year: 2024, status: 'completed', label: '2024 Season' },
  2025: { year: 2025, status: 'completed', label: '2025 Season' },
  2026: { year: 2026, status: 'completed', label: '2026 Season' },
};

export interface SeasonContextType {
  currentSeason: SeasonYear;
  setCurrentSeason: (season: SeasonYear) => void;
  seasonInfo: SeasonInfo;
  availableSeasons: SeasonYear[];
}

export const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export const useSeason = () => {
  const context = useContext(SeasonContext);
  if (!context) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }
  return context;
};
