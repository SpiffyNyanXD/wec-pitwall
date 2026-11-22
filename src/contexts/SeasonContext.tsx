import { useState, ReactNode } from 'react';
import { SeasonContext, SeasonYear, SeasonInfo, SEASONS } from './season-context';


export const SeasonProvider = ({ children }: { children: ReactNode }) => {
  const [currentSeason, setCurrentSeason] = useState<SeasonYear>(2026);
  
  const seasonInfo = SEASONS[currentSeason];
  const availableSeasons: SeasonYear[] = [2024, 2025, 2026];

  return (
    <SeasonContext.Provider value={{ currentSeason, setCurrentSeason, seasonInfo, availableSeasons }}>
      {children}
    </SeasonContext.Provider>
  );
};

