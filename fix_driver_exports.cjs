const fs = require('fs');

const file = 'src/data/wecData.ts';
let content = fs.readFileSync(file, 'utf8');

// The original file had export const drivers2025: Driver[] = [ ... ];
// We might have accidentally overwritten it. Let's just restore from git and do the changes again carefully.
