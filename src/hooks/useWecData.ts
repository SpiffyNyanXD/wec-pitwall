import { races, getRacesBySeason, getTeamsBySeason, getDriversBySeason, verifiedStandings, verifiedResults } from '@/data/wecData';
import type { SeasonStats } from '@/types/wec';
const yearOf = (id: string | null) => id?.match(/20(24|25|26)/)?.[0] ? Number(id.match(/20(24|25|26)/)![0]) : 2026;
const answer = <T,>(data: T) => ({ data, loading: false, error: null as string | null });
export type WinnerMap = Record<string, { winner: string | null; winningTeam: string | null }>;
export const winnerMap: WinnerMap = Object.fromEntries(races.map(r => [r.id, { winner: r.winner ?? null, winningTeam: r.winningTeam ?? null }]));
export const SEASON_STAT_OVERRIDES: Record<string, Partial<SeasonStats>> = { '2026': { totalTeams: 35, seasonHours: 66 } };
export const getStaleTimeForSeason = () => Infinity;
export const useActiveSeasonId = () => ({ seasonId: '2026', loading: false });
export const useSeasonByYear = (year: number | null) => ({ seasonId: year ? String(year) : null, loading: false });
export const useRaces = (id: string | null) => answer(id ? getRacesBySeason(yearOf(id)) : []);
const standings = (id: string | null, cls: string, kind: string) => id ? verifiedStandings.filter(s => s.year === yearOf(id) && s.cls === cls && s.type === kind) : [];
const driverRows = (id: string | null, cls: string) => standings(id, cls, 'Drivers').map(s => {
 const d = getDriversBySeason(yearOf(id)).find(d => d.name.toLowerCase() === s.name.toLowerCase());
 return { ...s, id: d?.id ?? s.driver_key, full_name: d?.name ?? s.name, driver_name: d?.name ?? s.name, car_number: d?.carNumber.slice(1) ?? '', team_name: d?.team ?? '', manufacturer: getTeamsBySeason(yearOf(id)).find(t => t.id === d?.teamId)?.manufacturer ?? '', total_points: s.points, season_id: String(s.year), races_entered: s.rounds.filter(r => r.race !== '/').length };
});
export const useHypercarDriversStandings = (id: string | null) => answer(driverRows(id, 'Hypercar'));
export const useLmgt3DriversStandings = (id: string | null) => answer(driverRows(id, 'LMGT3'));
export const useHypercarManufacturersStandings = (id: string | null) => answer(standings(id, 'Hypercar', 'Manufacturers').map(s => ({ ...s, manufacturer: s.name, total_points: s.points, season_id: String(s.year) })));
export const useLmgt3TeamsStandings = (id: string | null) => answer(standings(id, 'LMGT3', 'Teams / Entries').map(s => ({ ...s, team_name: s.name, total_points: s.points, season_id: String(s.year), races_entered: s.rounds.filter(r => r.race !== '/').length })));
export const useSeasonStats = (id: string | null) => {
 const y = yearOf(id), rs = getRacesBySeason(y), teams = getTeamsBySeason(y).filter(t => verifiedResults.some(r => r.year === y && r.event !== 'LE MANS' && '#' + r.car_number === t.carNumber));
 return answer({ totalRaces: rs.length, totalTeams: teams.length, totalManufacturers: new Set(teams.filter(t => t.class === 'HYPERCAR').map(t => t.manufacturer)).size, seasonHours: rs.reduce((s,r) => s + (r.duration_hours ?? 0), 0) });
};
export const useSeasonDrivers = (id: string | null) => answer(Object.fromEntries(getTeamsBySeason(yearOf(id)).map(t => [t.carNumber.slice(1), getDriversBySeason(yearOf(id)).filter(d => t.drivers.includes(d.id)).map(d => d.name).join(' / ')])));
export const useRaceResults = (raceId: string | null) => {
 const [y, rd] = (raceId ?? '').split('-').map(Number);
 return answer(verifiedResults.filter(r => r.year === y && r.round === rd).map(r => ({ id: `${y}-${rd}-${r.car_number}`, race_id: raceId, car_id: `entry-${y}-${r.car_number}`, finish_position: r.class_position || null, classified: r.status === 'Classified', status: r.status === 'Classified' ? 'finished' : r.status === 'Disqualified' ? 'dsq' : 'dnf', points_drivers: typeof r.points === 'number' ? r.points : 0, points_teams: typeof r.points === 'number' ? r.points : 0, points_manufacturers: null, car_number: r.car_number, team_name: r.team, category: r.cls, manufacturer: getTeamsBySeason(y).find(t => t.carNumber === '#' + r.car_number)?.manufacturer ?? '' })));
};
export const useCarSeasonStats = (id: string | null) => answer(getTeamsBySeason(yearOf(id)).map(t => ({ car_number: t.carNumber.slice(1), team_name: t.name, category: t.class, total_points: t.points, wins: t.wecWins ?? 0, poles: t.poles ?? 0, fastest_laps: t.fastestLaps ?? 0 })));
export const useLastRace = () => answer([...races].filter(r => r.status === 'completed').sort((a,b) => b.date.localeCompare(a.date))[0] ?? null);
