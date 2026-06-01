/**
 * Smoke tests for WEC data integrity
 */
import {
  drivers2025,
  getDriverById,
  races2025,
  races2026,
  standings2025,
  standings2026,
} from '../data/wecData';

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

  it('does not keep empty placeholder birth values on driver profiles', () => {
    drivers2025.forEach((driver) => {
      expect(driver.dateOfBirth).not.toBe('');
      expect(driver.placeOfBirth).not.toBe('');
    });
  });

  it('keeps reviewed driver profile birth details populated', () => {
    expect(getDriverById('vanthoor-dries-2025')).toMatchObject({
      dateOfBirth: '1998-04-20',
      placeOfBirth: 'Heusden-Zolder, Belgium',
    });
    expect(getDriverById('schumacher-2025')).toMatchObject({
      dateOfBirth: '1999-03-22',
      placeOfBirth: 'Vufflens-le-Château, Switzerland',
    });
    expect(getDriverById('nato-2025')).toMatchObject({
      dateOfBirth: '1992-05-17',
      placeOfBirth: 'Cannes, France',
    });
    expect(getDriverById('sorensen-2025')).toMatchObject({
      dateOfBirth: '1990-07-16',
      placeOfBirth: 'Hillerød, Denmark',
    });
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

  it('uses the Kevin Magnussen profile id in 2026 standings', () => {
    const magnussenEntry = standings2026.hypercars.drivers.find((driver) =>
      driver.drivers.includes('Magnussen')
    );

    expect(magnussenEntry?.id).toBe('kevin-magnussen');
    expect(getDriverById(magnussenEntry?.id || '')?.name).toBe('Kevin Magnussen');
  });
});
