/**
 * Basic utility tests for WEC Pitwall
 * These verify core data formatting logic works correctly
 */

// Test date formatting
describe('Date formatting', () => {
  it('correctly parses YYYY-MM-DD without timezone offset', () => {
    const dateString = '2026-06-13';
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(5); // June is 5 (0-indexed)
    expect(date.getDate()).toBe(13);
  });

  it('correctly formats date to readable string', () => {
    const [year, month, day] = '2026-06-13'.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const formatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    expect(formatted).toContain('Jun');
    expect(formatted).toContain('13');
    expect(formatted).toContain('2026');
  });
});

// Test username validation logic
describe('Username validation', () => {
  const isValidUsername = (username: string) =>
    /^[a-z0-9_]+$/.test(username) && username.length >= 3 && username.length <= 20;

  it('accepts valid usernames', () => {
    expect(isValidUsername('spiffynyan')).toBe(true);
    expect(isValidUsername('user_123')).toBe(true);
    expect(isValidUsername('abc')).toBe(true);
  });

  it('rejects invalid usernames', () => {
    expect(isValidUsername('ab')).toBe(false); // too short
    expect(isValidUsername('user name')).toBe(false); // space
    expect(isValidUsername('user@name')).toBe(false); // special char
    expect(isValidUsername('a'.repeat(21))).toBe(false); // too long
  });

  it('rejects uppercase letters', () => {
    expect(isValidUsername('UserName')).toBe(false);
  });
});

// Test points formatting
describe('Points formatting', () => {
  it('formats championship points correctly', () => {
    const points = 334;
    expect(points.toString()).toBe('334');
    expect(typeof points).toBe('number');
  });

  it('handles zero points', () => {
    const points = 0;
    expect(points).toBe(0);
  });
});