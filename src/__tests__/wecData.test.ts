/**
 * Smoke tests for WEC data integrity
 */
import { races2025, races2026, standings2025 } from '../data/wecData';

describe('WEC Data — 2025 Season', () => {
  it('has races defined', () => {
    expect(races2025).toBeDefined();
    expect(Array.isArray(races2025)).toBe(true);
  });

  it('each race has required fields', () => {
    races2025.forEach((race) => {
      expect(race).toHaveProperty('id');
      expect(race).toHaveProperty('name');
      expect(race).toHaveProperty('date');
      expect(race).toHaveProperty('circuit');
    });
  });

  it('has standings defined', () => {
    expect(standings2025).toBeDefined();
  });
});

describe('WEC Data — 2026 Season', () => {
  it('has 2026 calendar defined', () => {
    expect(races2026).toBeDefined();
    expect(Array.isArray(races2026)).toBe(true);
    expect(races2026.length).toBeGreaterThan(0);
  });

  it('Le Mans is in the 2026 calendar', () => {
    const leMans = races2026.find((r) =>
      r.name.toLowerCase().includes('le mans')
    );
    expect(leMans).toBeDefined();
  });
});