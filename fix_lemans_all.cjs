const fs = require('fs');

const file = 'src/data/wecData.ts';
let content = fs.readFileSync(file, 'utf8');

// Replace 2024, 2025 and 2026 Le Mans sessions directly by ID
// 2024
const lemans2024_old = `    id: '2024-4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France',
    date: '2024-06-15', endDate: '2024-06-16', duration: '24 Hours', status: 'completed', flag: '🇫🇷', season: 2024, round: 4,
    winner: 'Ferrari #50', winningTeam: 'Ferrari AF Corse', trackLength: '13.626 km', laps: 311,
    sessions: [
      { type: 'FP1', date: '2024-06-12', startTime: '14:00', endTime: '17:00', duration: '3h' },
      { type: 'Qualifying', date: '2024-06-12', startTime: '19:00', endTime: '20:00', duration: '1h' },
      { type: 'FP2', date: '2024-06-12', startTime: '22:00', endTime: '00:00', duration: '2h' },
      { type: 'Hyperpole', date: '2024-06-13', startTime: '20:00', endTime: '20:30', duration: '30m' },
      { type: 'Race', date: '2024-06-15', startTime: '16:00', endTime: '16:00', duration: '24h' },
    ]`;

const lemans2024_new = `    id: '2024-4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France',
    date: '2024-06-15', endDate: '2024-06-16', duration: '24 Hours', status: 'completed', flag: '🇫🇷', season: 2024, round: 4,
    winner: 'Ferrari #50', winningTeam: 'Ferrari AF Corse', trackLength: '13.626 km', laps: 311,
    sessions: [
      { type: 'FP1', date: '2024-06-12', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'FP2', date: '2024-06-13', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'Qualifying', date: '2024-06-12', startTime: '20:00', endTime: '23:00', duration: '3h' },
      { type: 'Hyperpole', date: '2024-06-13', startTime: '20:00', endTime: '21:00', duration: '1h' },
      { type: 'Warm Up', date: '2024-06-15', startTime: '10:00', endTime: '10:30', duration: '30min' },
      { type: 'Race', date: '2024-06-15', startTime: '16:00', endTime: '16:00', duration: '24h' },
    ]`;

// 2025
const lemans2025_old = `    id: '2025-4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France',
    date: '2025-06-14', endDate: '2025-06-15', duration: '24 Hours', status: 'completed', flag: '🇫🇷', season: 2025, round: 4,
    winner: 'Toyota #7', winningTeam: 'Toyota Gazoo Racing', trackLength: '13.626 km', laps: 315,
    sessions: [
      { type: 'FP1', date: '2025-06-11', startTime: '14:00', endTime: '17:00', duration: '3h' },
      { type: 'Qualifying', date: '2025-06-11', startTime: '19:00', endTime: '20:00', duration: '1h' },
      { type: 'FP2', date: '2025-06-11', startTime: '22:00', endTime: '00:00', duration: '2h' },
      { type: 'Hyperpole', date: '2025-06-12', startTime: '20:00', endTime: '20:30', duration: '30m' },
      { type: 'Race', date: '2025-06-14', startTime: '16:00', endTime: '16:00', duration: '24h' },
    ]`;

const lemans2025_new = `    id: '2025-4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France',
    date: '2025-06-14', endDate: '2025-06-15', duration: '24 Hours', status: 'completed', flag: '🇫🇷', season: 2025, round: 4,
    winner: 'Toyota #7', winningTeam: 'Toyota Gazoo Racing', trackLength: '13.626 km', laps: 315,
    sessions: [
      { type: 'FP1', date: '2025-06-11', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'FP2', date: '2025-06-12', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'Qualifying', date: '2025-06-11', startTime: '20:00', endTime: '23:00', duration: '3h' },
      { type: 'Hyperpole', date: '2025-06-12', startTime: '20:00', endTime: '21:00', duration: '1h' },
      { type: 'Warm Up', date: '2025-06-14', startTime: '10:00', endTime: '10:30', duration: '30min' },
      { type: 'Race', date: '2025-06-14', startTime: '16:00', endTime: '16:00', duration: '24h' },
    ]`;

// 2026
const lemans2026_old = `    id: '2026-4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France',
    date: '2026-06-13', endDate: '2026-06-14', duration: '24 Hours', status: 'upcoming', flag: '🇫🇷', season: 2026, round: 4,
    trackLength: '13.626 km',
    sessions: [
      { type: 'FP1', date: '2026-06-10', startTime: '14:00', endTime: '17:00', duration: '3h' },
      { type: 'Qualifying', date: '2026-06-10', startTime: '19:00', endTime: '20:00', duration: '1h' },
      { type: 'FP2', date: '2026-06-10', startTime: '22:00', endTime: '00:00', duration: '2h' },
      { type: 'Hyperpole', date: '2026-06-11', startTime: '20:00', endTime: '20:30', duration: '30m' },
      { type: 'Race', date: '2026-06-13', startTime: '16:00', endTime: '16:00', duration: '24h' },
    ]`;

const lemans2026_new = `    id: '2026-4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France',
    date: '2026-06-13', endDate: '2026-06-14', duration: '24 Hours', status: 'upcoming', flag: '🇫🇷', season: 2026, round: 4,
    trackLength: '13.626 km',
    sessions: [
      { type: 'FP1', date: '2026-06-08', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'FP2', date: '2026-06-10', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'Qualifying', date: '2026-06-09', startTime: '20:00', endTime: '23:00', duration: '3h' },
      { type: 'Hyperpole', date: '2026-06-11', startTime: '20:00', endTime: '21:00', duration: '1h' },
      { type: 'Warm Up', date: '2026-06-13', startTime: '10:00', endTime: '10:30', duration: '30min' },
      { type: 'Race', date: '2026-06-13', startTime: '16:00', endTime: '16:00', duration: '24h' },
    ]`;

content = content.replace(lemans2024_old, lemans2024_new);
content = content.replace(lemans2025_old, lemans2025_new);
content = content.replace(lemans2026_old, lemans2026_new);

fs.writeFileSync(file, content);
console.log('Le Mans all sessions fixed.');
