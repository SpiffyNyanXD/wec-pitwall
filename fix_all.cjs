const fs = require('fs');
const file = 'src/data/wecData.ts';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix types
content = content.replace(/type: 'FP1' \| 'FP2' \| 'FP3' \| 'Qualifying' \| 'Hyperpole' \| 'Warm Up' \| 'Race';/, "type: 'FP1' | 'FP2' | 'Qualifying' | 'Hyperpole' | 'Warm Up' | 'Race';");
content = content.replace(/type: 'FP1' \| 'FP2' \| 'FP3' \| 'Qualifying' \| 'Hyperpole' \| 'Race';/, "type: 'FP1' | 'FP2' | 'Qualifying' | 'Hyperpole' | 'Warm Up' | 'Race';");

// 2. Remove FP3
content = content.replace(/\{\s*type:\s*'FP3'.*?\},\s*/g, '');

// 3. Fix Le Mans sessions
const lemans2026_new = `sessions: [
      { type: 'FP1', date: '2026-06-08', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'FP2', date: '2026-06-10', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'Qualifying', date: '2026-06-09', startTime: '20:00', endTime: '23:00', duration: '3h' },
      { type: 'Hyperpole', date: '2026-06-11', startTime: '20:00', endTime: '21:00', duration: '1h' },
      { type: 'Warm Up', date: '2026-06-13', startTime: '10:00', endTime: '10:30', duration: '30min' },
      { type: 'Race', date: '2026-06-13', startTime: '16:00', endTime: '16:00', duration: '24h' }
    ]`;

const lemans2025_new = `sessions: [
      { type: 'FP1', date: '2025-06-11', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'FP2', date: '2025-06-12', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'Qualifying', date: '2025-06-11', startTime: '20:00', endTime: '23:00', duration: '3h' },
      { type: 'Hyperpole', date: '2025-06-12', startTime: '20:00', endTime: '21:00', duration: '1h' },
      { type: 'Warm Up', date: '2025-06-14', startTime: '10:00', endTime: '10:30', duration: '30min' },
      { type: 'Race', date: '2025-06-14', startTime: '16:00', endTime: '16:00', duration: '24h' }
    ]`;

const lemans2024_new = `sessions: [
      { type: 'FP1', date: '2024-06-12', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'FP2', date: '2024-06-13', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'Qualifying', date: '2024-06-12', startTime: '20:00', endTime: '23:00', duration: '3h' },
      { type: 'Hyperpole', date: '2024-06-13', startTime: '20:00', endTime: '21:00', duration: '1h' },
      { type: 'Warm Up', date: '2024-06-15', startTime: '10:00', endTime: '10:30', duration: '30min' },
      { type: 'Race', date: '2024-06-15', startTime: '16:00', endTime: '16:00', duration: '24h' }
    ]`;

content = content.replace(/(id:\s*'2026-4'[\s\S]*?sessions:\s*\[\s*)([\s\S]*?)(\s*\])/, `$1      { type: 'FP1', date: '2026-06-08', startTime: '14:00', endTime: '19:00', duration: '5h' },\n      { type: 'FP2', date: '2026-06-10', startTime: '14:00', endTime: '19:00', duration: '5h' },\n      { type: 'Qualifying', date: '2026-06-09', startTime: '20:00', endTime: '23:00', duration: '3h' },\n      { type: 'Hyperpole', date: '2026-06-11', startTime: '20:00', endTime: '21:00', duration: '1h' },\n      { type: 'Warm Up', date: '2026-06-13', startTime: '10:00', endTime: '10:30', duration: '30min' },\n      { type: 'Race', date: '2026-06-13', startTime: '16:00', endTime: '16:00', duration: '24h' }\n    $3`);
content = content.replace(/(id:\s*'2025-4'[\s\S]*?sessions:\s*\[\s*)([\s\S]*?)(\s*\])/, `$1      { type: 'FP1', date: '2025-06-11', startTime: '14:00', endTime: '19:00', duration: '5h' },\n      { type: 'FP2', date: '2025-06-12', startTime: '14:00', endTime: '19:00', duration: '5h' },\n      { type: 'Qualifying', date: '2025-06-11', startTime: '20:00', endTime: '23:00', duration: '3h' },\n      { type: 'Hyperpole', date: '2025-06-12', startTime: '20:00', endTime: '21:00', duration: '1h' },\n      { type: 'Warm Up', date: '2025-06-14', startTime: '10:00', endTime: '10:30', duration: '30min' },\n      { type: 'Race', date: '2025-06-14', startTime: '16:00', endTime: '16:00', duration: '24h' }\n    $3`);
content = content.replace(/(id:\s*'2024-4'[\s\S]*?sessions:\s*\[\s*)([\s\S]*?)(\s*\])/, `$1      { type: 'FP1', date: '2024-06-12', startTime: '14:00', endTime: '19:00', duration: '5h' },\n      { type: 'FP2', date: '2024-06-13', startTime: '14:00', endTime: '19:00', duration: '5h' },\n      { type: 'Qualifying', date: '2024-06-12', startTime: '20:00', endTime: '23:00', duration: '3h' },\n      { type: 'Hyperpole', date: '2024-06-13', startTime: '20:00', endTime: '21:00', duration: '1h' },\n      { type: 'Warm Up', date: '2024-06-15', startTime: '10:00', endTime: '10:30', duration: '30min' },\n      { type: 'Race', date: '2024-06-15', startTime: '16:00', endTime: '16:00', duration: '24h' }\n    $3`);

// 4. Update standings2025 and 2024 correctly
const replacement2025 = `export const standings2025 = {
  hypercars: {
    champion: {
      drivers: 'Alessandro Pier Guidi / James Calado / Antonio Giovinazzi',
      team: 'Ferrari AF Corse #51',
      manufacturer: 'Ferrari',
    },
    drivers: [
      { position: 1, drivers: 'Pier Guidi / Calado / Giovinazzi', team: 'Ferrari AF Corse #51', points: 228 },
      { position: 2, drivers: 'Kubica / Hanson / Ye', team: 'AF Corse #83', points: 184 },
      { position: 3, drivers: 'Fuoco / Molina / Nielsen', team: 'Ferrari AF Corse #50', points: 181 },
      { position: 4, drivers: 'Bamber / Button / Bourdais', team: 'Cadillac JOTA #38', points: 165 },
      { position: 5, drivers: 'Lynn / Stevens / Nato', team: 'Cadillac JOTA #12', points: 163 },
      { position: 6, drivers: 'Conway / Kobayashi / de Vries', team: 'Toyota GR #7', points: 161 },
      { position: 7, drivers: 'Buemi / Hartley / Hirakawa', team: 'Toyota GR #8', points: 158 },
      { position: 8, drivers: 'Lotterer / Christensen / Estre', team: 'Porsche #6', points: 152 },
      { position: 9, drivers: 'Vanthoor / Marciello / Magnussen', team: 'BMW WRT #15', points: 103 },
      { position: 10, drivers: 'Tincknell / Gamble / Sørensen', team: 'Aston Martin #007', points: 89 },
    ],
    manufacturers: [
      { position: 1, manufacturer: 'Ferrari', points: 334 },
      { position: 2, manufacturer: 'Toyota', points: 278 },
      { position: 3, manufacturer: 'Porsche', points: 265 },
      { position: 4, manufacturer: 'Cadillac', points: 247 },
      { position: 5, manufacturer: 'BMW', points: 176 },
      { position: 6, manufacturer: 'Peugeot', points: 148 },
      { position: 7, manufacturer: 'Alpine', points: 142 },
      { position: 8, manufacturer: 'Aston Martin', points: 98 },
    ],
  },
  lmgt3: {
    champion: {
      drivers: 'Richard Lietz / Ryan Hardwick / Riccardo Pera',
      team: 'Manthey 1st Phorm #92',
      manufacturer: 'Porsche',
    },
  },
};`;

const replacement2024 = `export const standings2024 = {
  hypercars: {
    champion: {
      drivers: 'André Lotterer / Kevin Estre / Laurens Vanthoor',
      team: 'Porsche Penske Motorsport #6',
      manufacturer: 'Ferrari',
    },
    drivers: [
      { position: 1, drivers: 'Lotterer / Estre / Vanthoor', team: 'Porsche Penske Motorsport #6', points: 219 },
      { position: 2, drivers: 'Pier Guidi / Calado / Giovinazzi', team: 'Ferrari AF Corse #51', points: 215 },
      { position: 3, drivers: 'Fuoco / Molina / Nielsen', team: 'Ferrari AF Corse #50', points: 172 },
      { position: 4, drivers: 'Buemi / Hartley / Hirakawa', team: 'Toyota Gazoo Racing #8', points: 168 },
      { position: 5, drivers: 'Conway / Kobayashi / Lopez', team: 'Toyota Gazoo Racing #7', points: 147 },
      { position: 6, drivers: 'Bamber / Nato / Vandoorne', team: 'Peugeot TotalEnergies #93', points: 124 },
      { position: 7, drivers: 'de Vries / Frijns / Rast', team: 'BMW M Team WRT #20', points: 118 },
      { position: 8, drivers: 'Makowiecki / Vaxivière / Gounon', team: 'Alpine #36', points: 110 },
    ],
    manufacturers: [
      { position: 1, manufacturer: 'Ferrari', points: 289 },
      { position: 2, manufacturer: 'Porsche', points: 272 },
      { position: 3, manufacturer: 'Toyota', points: 245 },
      { position: 4, manufacturer: 'Cadillac', points: 198 },
      { position: 5, manufacturer: 'BMW', points: 134 },
      { position: 6, manufacturer: 'Alpine', points: 122 },
      { position: 7, manufacturer: 'Peugeot', points: 109 },
    ],
  },
  lmgt3: {
    champion: {
      drivers: 'Lietz / Pera / Hardwick',
      team: 'Manthey PureRxcing #92',
      manufacturer: 'Porsche',
    },
  },
};`;

// We just append these definitions to the end, since previously they were accidentally deleted when the script used replace with an incorrect regex.
// Let's actually check if they exist, and if so replace them, if not append.
if (content.includes('export const standings2025')) {
  content = content.replace(/export const standings2025 = \{[\s\S]*?(?=export const standings2024)/, replacement2025 + '\n\n');
} else {
  // It should be there. Let's just do a full replace of the existing ones.
  // We'll replace the existing ones exactly.
  // Looking at the original file from the commit...
}
// Actually, earlier the script replaced everything from export const standings2025 = { to export const standings2024. Which might have matched too much if standings2024 wasn't matched properly.
// A safer approach:

// Since `git restore` brought back the original file, it has standings2025 and standings2024. Let's replace them carefully.
// Replace the entire objects
content = content.replace(/export const standings2025 = \{[\s\S]*?(?=export const standings2024)/, replacement2025 + '\n\n');
content = content.replace(/export const standings2024 = \{[\s\S]*?(?=export const allSeasons)/, replacement2024 + '\n\n');

fs.writeFileSync(file, content);
console.log('All fixes applied');
