const fs = require('fs');

const file = 'src/data/wecData.ts';
let content = fs.readFileSync(file, 'utf8');

// Use regex to remove any object in the sessions arrays where type is 'FP3'
content = content.replace(/\{\s*type:\s*'FP3'.*?\},\s*/g, '');

fs.writeFileSync(file, content);
console.log('Done removing FP3');
