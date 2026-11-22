const ISO_CODE = /^[A-Z]{2}$/;
const toEmoji = (code: string): string => Array.from(code).map(c => String.fromCodePoint(127397 + c.charCodeAt(0))).join('');
// NEUTRAL or unverifiable nationality renders the neutral white flag, never a broken emoji.
export const NEUTRAL_FLAG = '🏁';

// First listed ISO 3166-1 alpha-2 code wins for dual/conflicting values such as
// "DE / DK", "IT | MC", "US | BR", "GB | IE", "US | US / GB" or "NEUTRAL | RU".
export function primaryCountryCode(raw: string): string | null {
  if (!raw) return null;
  return raw.toUpperCase().split(/[^A-Z]+/).find(token => ISO_CODE.test(token)) ?? null;
}

export function getFlagEmoji(code: string): string {
  const primary = primaryCountryCode(code);
  return primary ? toEmoji(primary) : NEUTRAL_FLAG;
}

// Comparison aggregates can contain both NEUTRAL and a country from another
// source. Preserve the neutral designation instead of assigning nationality.
export function getComparisonFlagEmoji(code: string): string {
  return /(?:^|[^A-Z])NEUTRAL(?:$|[^A-Z])/.test(code.toUpperCase())
    ? NEUTRAL_FLAG
    : getFlagEmoji(code);
}

export function countryCodeFromFlag(flag: string): string | null {
  const points = Array.from(flag);
  if (points.length !== 2) return null;
  const code = points.map(p => String.fromCharCode(p.codePointAt(0)! - 127397)).join('');
  return ISO_CODE.test(code) ? code : null;
}
