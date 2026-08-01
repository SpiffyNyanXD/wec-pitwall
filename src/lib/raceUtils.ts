export function parseMarginToSeconds(marginStr: string): number | null {
  if (!marginStr || marginStr.toLowerCase().includes('lap')) return null;

  const cleanStr = marginStr.replace('+', '').replace('s', '').trim();

  if (cleanStr.includes('m:')) {
    const parts = cleanStr.split('m:');
    return parseInt(parts[0]) * 60 + parseFloat(parts[1]);
  } else if (cleanStr.includes(':')) {
    const parts = cleanStr.split(':');
    return parseInt(parts[0]) * 60 + parseFloat(parts[1]);
  }

  const match = marginStr.match(/\+?(\d+(\.\d+)?)/);
  if (!match) return null;

  return parseFloat(cleanStr);
}
