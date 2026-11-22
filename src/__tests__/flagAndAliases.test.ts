import { getFlagEmoji, primaryCountryCode, countryCodeFromFlag, NEUTRAL_FLAG } from '../lib/flagUtils';
import { getDriverById } from '../data/wecData';

describe('flagUtils dual and neutral country codes', () => {
  it('resolves dual/conflicting codes to the first listed ISO code', () => {
    expect(getFlagEmoji('DE / DK')).toBe('🇩🇪');
    expect(getFlagEmoji('IT | MC')).toBe('🇮🇹');
    expect(getFlagEmoji('US | BR')).toBe('🇺🇸');
    expect(getFlagEmoji('GB | IE')).toBe('🇬🇧');
    expect(getFlagEmoji('US | US / GB')).toBe('🇺🇸');
    expect(getFlagEmoji('NEUTRAL | RU')).toBe('🇷🇺');
  });
  it('renders NEUTRAL and unverifiable values as the neutral flag, never broken emoji', () => {
    expect(getFlagEmoji('NEUTRAL')).toBe(NEUTRAL_FLAG);
    expect(getFlagEmoji('N/A')).toBe(NEUTRAL_FLAG);
    expect(getFlagEmoji('')).toBe(NEUTRAL_FLAG);
    expect(primaryCountryCode('NEUTRAL')).toBeNull();
  });
  it('keeps clean ISO codes and flag parsing intact', () => {
    expect(getFlagEmoji('GB')).toBe('🇬🇧');
    expect(countryCodeFromFlag('🇳🇱')).toBe('NL');
  });
});

describe('driver slug aliases', () => {
  it('canonical marco-sorensen resolves across seasons', () => {
    expect(getDriverById('marco-sorensen-2025')?.name).toBe('Marco Sørensen');
    expect(getDriverById('marco-sorensen')?.name).toBe('Marco Sørensen');
  });
  it('legacy misspelled slugs keep resolving', () => {
    expect(getDriverById('marco-srensen-2024')?.name).toBe('Marco Sørensen');
    expect(getDriverById('marco-srensen')?.name).toBe('Marco Sørensen');
    expect(getDriverById('sorensen')?.name).toBe('Marco Sørensen');
    expect(getDriverById('sorensen-2025')?.name).toBe('Marco Sørensen');
  });
  it('delacruz-2025 lookup alias still resolves', () => {
    expect(getDriverById('delacruz-2025')?.name).toBe('Nyck De Vries');
  });
});
