const fs = require('fs');

const file = 'src/data/wecData.ts';
let content = fs.readFileSync(file, 'utf8');

// Update Race interface if needed
content = content.replace(/round: number;/g, "round: number | null;\n  roundNote?: string;");

// Find and update Qatar
content = content.replace(/id:\s*'2026-1',\s*name:\s*'1812 km of Qatar'[\s\S]*?season:\s*2026,\s*round:\s*1,/,
  "id: '2026-1', name: '1812 km of Qatar', circuit: 'Lusail International Circuit', country: 'Qatar', \n    date: '2026-03-28', duration: '1812 km', status: 'postponed', flag: '🇶🇦', season: 2026, round: null, roundNote: 'Postponed — rescheduled date TBC',");

// Shift other rounds
content = content.replace(/season:\s*2026,\s*round:\s*2/g, "season: 2026, round: 1");
content = content.replace(/season:\s*2026,\s*round:\s*3/g, "season: 2026, round: 2");
content = content.replace(/season:\s*2026,\s*round:\s*4/g, "season: 2026, round: 3");
content = content.replace(/season:\s*2026,\s*round:\s*5/g, "season: 2026, round: 4");
content = content.replace(/season:\s*2026,\s*round:\s*6/g, "season: 2026, round: 5");
content = content.replace(/season:\s*2026,\s*round:\s*7/g, "season: 2026, round: 6");
content = content.replace(/season:\s*2026,\s*round:\s*8/g, "season: 2026, round: 7");

fs.writeFileSync(file, content);
console.log('Fixed Qatar and rounds');
