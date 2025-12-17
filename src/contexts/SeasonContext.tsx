import { createContext, useContext, useState, ReactNode } from 'react';

export type SeasonYear = 2024 | 2025 | 2026;

export interface SeasonInfo {
  year: SeasonYear;
  status: 'completed' | 'in-progress' | 'upcoming';
  label: string;
}

export const SEASONS: Record<SeasonYear, SeasonInfo> = {
  2024: { year: 2024, status: 'completed', label: '2024 Season' },
  2025: { year: 2025, status: 'completed', label: '2025 Season' },
  2026: { year: 2026, status: 'upcoming', label: '2026 Season' },
};

interface SeasonContextType {
  currentSeason: SeasonYear;
  setCurrentSeason: (season: SeasonYear) => void;
  seasonInfo: SeasonInfo;
  availableSeasons: SeasonYear[];
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export const SeasonProvider = ({ children }: { children: ReactNode }) => {
  const [currentSeason, setCurrentSeason] = useState<SeasonYear>(2025);
  
  const seasonInfo = SEASONS[currentSeason];
  const availableSeasons: SeasonYear[] = [2024, 2025, 2026];

  return (
    <SeasonContext.Provider value={{ currentSeason, setCurrentSeason, seasonInfo, availableSeasons }}>
      {children}
    </SeasonContext.Provider>
  );
};

export const useSeason = () => {
  const context = useContext(SeasonContext);
  if (!context) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }
  return context;
};
