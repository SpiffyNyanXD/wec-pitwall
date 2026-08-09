const fs = require('fs');
let code = fs.readFileSync('src/pages/DriverProfile.tsx', 'utf8');

// The original import might have had single quotes but BoneyardSkeleton had double quotes or something
// Wait, I should not fix anything unless there is an issue.
