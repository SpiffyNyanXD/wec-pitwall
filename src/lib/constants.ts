// Centralized constants for consistent terminology across the app

export const CHAMPIONSHIPS = {
  HYPERCAR_DRIVERS: 'FIA World Endurance Drivers\' Championship',
  HYPERCAR_TEAMS: 'FIA World Cup for Hypercar Teams',
  HYPERCAR_MANUFACTURERS: 'FIA World Endurance Manufacturers\' Championship',
  LMGT3_DRIVERS: 'FIA Endurance Trophy for LMGT3 Drivers',
  LMGT3_TEAMS: 'FIA Endurance Trophy for LMGT3 Teams',
  LMP2: 'Le Mans 24 Hours Only',
} as const;

export const SEASON_STATUS = {
  COMPLETED: 'Season Completed',
  IN_PROGRESS: 'Season In Progress',
  UPCOMING: 'Coming Soon',
  NOT_AVAILABLE: 'Standings Not Available',
} as const;

export const CLASS_LABELS = {
  HYPERCAR: 'Hypercar',
  LMP2: 'LMP2',
  LMGT3: 'LMGT3',
} as const;

export const CLASS_BADGES = {
  HYPERCAR: 'World Championship',
  LMGT3: 'FIA World Cup',
  LMP2: 'Le Mans 24h Only',
} as const;

export const POINTS_INFO = {
  DRIVERS_SHARED: 'Points shared between co-drivers',
  ENTRIES_INDEPENDENT: 'Each car entry scores independently',
  MANUFACTURERS_COMBINED: 'Combined points from all entries',
  LMP2_NOTE: 'LMP2 competes only at the 24 Hours of Le Mans since 2024',
} as const;

export const EMPTY_STATES = {
  NO_DATA: 'No data available',
  COMING_SOON: 'Coming soon',
  NO_STANDINGS: 'Championship standings will be available once the season begins',
  NO_RACES: 'No races scheduled',
} as const;

export const APP_INFO = {
  NAME: 'WECHub',
  DISCLAIMER: 'Not affiliated with FIA or WEC.',
  MOCK_DATA_NOTE: 'Fan-made application using mock data. Not an official FIA WEC product.',
} as const;
