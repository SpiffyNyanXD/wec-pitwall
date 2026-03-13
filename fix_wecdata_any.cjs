const fs = require('fs');
const file = 'src/data/wecData.ts';
let data = fs.readFileSync(file, 'utf8');

data = data.replace('export const getDriversBySeason = (season: number): any[] => {', 'export const getDriversBySeason = (season: number): Driver[] | {position: number, drivers: string, team: string, points: number}[] => {');

fs.writeFileSync(file, data);
