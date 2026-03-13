const fs = require('fs');

const file = 'src/data/wecData.ts';
let content = fs.readFileSync(file, 'utf8');

const lemans2026_sessions = `sessions: [
      { type: 'FP1', date: '2026-06-08', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'FP2', date: '2026-06-10', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'Qualifying', date: '2026-06-09', startTime: '20:00', endTime: '23:00', duration: '3h' },
      { type: 'Hyperpole', date: '2026-06-11', startTime: '20:00', endTime: '21:00', duration: '1h' },
      { type: 'Warm Up', date: '2026-06-13', startTime: '10:00', endTime: '10:30', duration: '30min' },
      { type: 'Race', date: '2026-06-13', startTime: '16:00', endTime: '16:00', duration: '24h' }
    ]`;

const regex2026 = /(id:\s*'2026-4'[\s\S]*?sessions:\s*\[)([\s\S]*?)(\])/;
content = content.replace(regex2026, `$1\n      { type: 'FP1', date: '2026-06-08', startTime: '14:00', endTime: '19:00', duration: '5h' },\n      { type: 'FP2', date: '2026-06-10', startTime: '14:00', endTime: '19:00', duration: '5h' },\n      { type: 'Qualifying', date: '2026-06-09', startTime: '20:00', endTime: '23:00', duration: '3h' },\n      { type: 'Hyperpole', date: '2026-06-11', startTime: '20:00', endTime: '21:00', duration: '1h' },\n      { type: 'Warm Up', date: '2026-06-13', startTime: '10:00', endTime: '10:30', duration: '30min' },\n      { type: 'Race', date: '2026-06-13', startTime: '16:00', endTime: '16:00', duration: '24h' }\n    ]`);


fs.writeFileSync(file, content);
console.log('Le Mans 2026 sessions fixed.');
