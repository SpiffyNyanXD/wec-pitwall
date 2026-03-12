const fs = require('fs');

const file = 'src/data/wecData.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/type: 'FP1' \| 'FP2' \| 'FP3' \| 'Qualifying' \| 'Hyperpole' \| 'Warm Up' \| 'Race';/, "type: 'FP1' | 'FP2' | 'Qualifying' | 'Hyperpole' | 'Warm Up' | 'Race';");

fs.writeFileSync(file, content);
console.log('Fixed types');
