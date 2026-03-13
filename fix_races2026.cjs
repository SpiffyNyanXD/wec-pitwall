const fs = require('fs');

const file = 'src/data/wecData.ts';
let content = fs.readFileSync(file, 'utf8');

const races2026 = `
export const races2026: Race[] = [
  {
    id: '2026-1', name: '1812 km of Qatar', circuit: 'Lusail International Circuit', country: 'Qatar',
    date: '2026-03-28', duration: '1812 km', status: 'postponed', flag: '🇶🇦', season: 2026, round: 1,
    trackLength: '5.419 km',
    sessions: [
      { type: 'FP1', date: '2026-03-26', startTime: '11:00', endTime: '12:30', duration: '1h 30m' },
      { type: 'FP2', date: '2026-03-26', startTime: '16:00', endTime: '17:30', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-03-27', startTime: '17:30', endTime: '18:30', duration: '1h' },
      { type: 'Hyperpole', date: '2026-03-27', startTime: '18:40', endTime: '18:55', duration: '15m' },
      { type: 'Race', date: '2026-03-28', startTime: '12:00', endTime: '22:00', duration: '~10h' },
    ]
  },
  {
    id: '2026-2', name: '6 Hours of Imola', circuit: 'Autodromo Enzo e Dino Ferrari', country: 'Italy',
    date: '2026-04-19', duration: '6 Hours', status: 'upcoming', flag: '🇮🇹', season: 2026, round: 2,
    trackLength: '4.909 km',
    sessions: [
      { type: 'FP1', date: '2026-04-17', startTime: '10:25', endTime: '11:55', duration: '1h 30m' },
      { type: 'FP2', date: '2026-04-17', startTime: '15:30', endTime: '17:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-04-18', startTime: '14:40', endTime: '15:40', duration: '1h' },
      { type: 'Hyperpole', date: '2026-04-18', startTime: '15:50', endTime: '16:05', duration: '15m' },
      { type: 'Race', date: '2026-04-19', startTime: '12:00', endTime: '18:00', duration: '6h' },
    ]
  },
  {
    id: '2026-3', name: '6 Hours of Spa', circuit: 'Circuit de Spa-Francorchamps', country: 'Belgium',
    date: '2026-05-10', duration: '6 Hours', status: 'upcoming', flag: '🇧🇪', season: 2026, round: 3,
    trackLength: '7.004 km',
    sessions: [
      { type: 'FP1', date: '2026-05-08', startTime: '14:00', endTime: '15:30', duration: '1h 30m' },
      { type: 'FP2', date: '2026-05-08', startTime: '19:00', endTime: '20:30', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-05-09', startTime: '17:10', endTime: '18:10', duration: '1h' },
      { type: 'Hyperpole', date: '2026-05-09', startTime: '18:20', endTime: '18:35', duration: '15m' },
      { type: 'Race', date: '2026-05-10', startTime: '13:00', endTime: '19:00', duration: '6h' },
    ]
  },
  {
    id: '2026-4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France',
    date: '2026-06-13', endDate: '2026-06-14', duration: '24 Hours', status: 'upcoming', flag: '🇫🇷', season: 2026, round: 4,
    trackLength: '13.626 km',
    sessions: [
      { type: 'FP1', date: '2026-06-08', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'FP2', date: '2026-06-10', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'Qualifying', date: '2026-06-09', startTime: '20:00', endTime: '23:00', duration: '3h' },
      { type: 'Hyperpole', date: '2026-06-11', startTime: '20:00', endTime: '21:00', duration: '1h' },
      { type: 'Warm Up', date: '2026-06-13', startTime: '10:00', endTime: '10:30', duration: '30min' },
      { type: 'Race', date: '2026-06-13', startTime: '16:00', endTime: '16:00', duration: '24h' }
    ]
  },
  {
    id: '2026-5', name: '6 Hours of São Paulo', circuit: 'Interlagos', country: 'Brazil',
    date: '2026-07-12', duration: '6 Hours', status: 'upcoming', flag: '🇧🇷', season: 2026, round: 5,
    trackLength: '4.309 km',
    sessions: [
      { type: 'FP1', date: '2026-07-10', startTime: '10:00', endTime: '11:30', duration: '1h 30m' },
      { type: 'FP2', date: '2026-07-10', startTime: '15:25', endTime: '16:55', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-07-11', startTime: '14:50', endTime: '15:50', duration: '1h' },
      { type: 'Hyperpole', date: '2026-07-11', startTime: '16:00', endTime: '16:15', duration: '15m' },
      { type: 'Race', date: '2026-07-12', startTime: '11:30', endTime: '17:30', duration: '6h' },
    ]
  },
  {
    id: '2026-6', name: 'Lone Star Le Mans', circuit: 'Circuit of the Americas', country: 'USA',
    date: '2026-09-06', duration: '6 Hours', status: 'upcoming', flag: '🇺🇸', season: 2026, round: 6,
    trackLength: '5.513 km',
    sessions: [
      { type: 'FP1', date: '2026-09-04', startTime: '12:40', endTime: '14:10', duration: '1h 30m' },
      { type: 'FP2', date: '2026-09-04', startTime: '17:10', endTime: '18:40', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-09-05', startTime: '15:20', endTime: '16:20', duration: '1h' },
      { type: 'Hyperpole', date: '2026-09-05', startTime: '16:30', endTime: '16:45', duration: '15m' },
      { type: 'Race', date: '2026-09-06', startTime: '13:00', endTime: '19:00', duration: '6h' },
    ]
  },
  {
    id: '2026-7', name: '6 Hours of Fuji', circuit: 'Fuji Speedway', country: 'Japan',
    date: '2026-09-27', duration: '6 Hours', status: 'upcoming', flag: '🇯🇵', season: 2026, round: 7,
    trackLength: '4.563 km',
    sessions: [
      { type: 'FP1', date: '2026-09-25', startTime: '11:00', endTime: '12:30', duration: '1h 30m' },
      { type: 'FP2', date: '2026-09-25', startTime: '15:30', endTime: '17:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-09-26', startTime: '14:40', endTime: '15:40', duration: '1h' },
      { type: 'Hyperpole', date: '2026-09-26', startTime: '15:50', endTime: '16:05', duration: '15m' },
      { type: 'Race', date: '2026-09-27', startTime: '11:00', endTime: '17:00', duration: '6h' },
    ]
  },
  {
    id: '2026-8', name: '8 Hours of Bahrain', circuit: 'Bahrain International Circuit', country: 'Bahrain',
    date: '2026-11-07', duration: '8 Hours', status: 'upcoming', flag: '🇧🇭', season: 2026, round: 8,
    trackLength: '5.412 km',
    sessions: [
      { type: 'FP1', date: '2026-11-05', startTime: '12:15', endTime: '13:45', duration: '1h 30m' },
      { type: 'FP2', date: '2026-11-05', startTime: '17:30', endTime: '19:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-11-06', startTime: '16:15', endTime: '17:15', duration: '1h' },
      { type: 'Hyperpole', date: '2026-11-06', startTime: '17:25', endTime: '17:40', duration: '15m' },
      { type: 'Race', date: '2026-11-07', startTime: '14:00', endTime: '22:00', duration: '8h' },
    ]
  }
];
`;

content = content.replace(/export const races =/, `${races2026}\nexport const races =`);

fs.writeFileSync(file, content);
console.log('Added races2026');
