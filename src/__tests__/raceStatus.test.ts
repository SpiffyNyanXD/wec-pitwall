import { computeAllRaceStatuses, RaceBadgeStatus } from '../utils/raceStatus';

describe('computeAllRaceStatuses', () => {
  it('correctly sets cancelled status for cancelled races', () => {
    const races = [
      {
        id: 'race-1',
        scheduled_date: '2026-10-18',
        duration_hours: 6,
        status: 'cancelled',
      },
      {
        id: 'race-2',
        scheduled_date: '2026-04-19',
        duration_hours: 6,
        status: 'completed',
      },
      {
        id: 'race-3',
        scheduled_date: '2099-01-01',
        duration_hours: 6,
        status: 'scheduled',
      },
    ];

    const result = computeAllRaceStatuses(races);
    expect(result.get('race-1')).toBe('cancelled');
    expect(result.get('race-2')).toBe('done');
    expect(result.get('race-3')).toBe('next');
  });
});
