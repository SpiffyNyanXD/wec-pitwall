import fs from 'fs';

const file = 'src/data/wecData.ts';
let content = fs.readFileSync(file, 'utf8');

// The WEC session format is correctly mapped (FP1, FP2, Qualifying, Hyperpole, Race) where applicable.
// So we remove FP3 and add Hyperpole if it doesn't exist.

const racesMatch = content.match(/sessions:\s*\[\s*\{[\s\S]*?\]/g);

if (racesMatch) {
    for (let match of racesMatch) {
        let newMatch = match;
        // Remove FP3
        newMatch = newMatch.replace(/\s*\{\s*type:\s*'FP3'.*?\},/, '');

        // Check if Hyperpole exists
        if (!newMatch.includes("'Hyperpole'")) {
            // Find Qualifying and add Hyperpole right after it
            newMatch = newMatch.replace(/(\{\s*type:\s*'Qualifying'.*?\},)/, (qMatch) => {
                // We need to generate a Hyperpole session based on Qualifying date and time
                const dateMatch = qMatch.match(/date:\s*'([^']+)'/);
                const timeMatch = qMatch.match(/endTime:\s*'([^']+)'/);
                if (dateMatch && timeMatch) {
                    const date = dateMatch[1];
                    const startTime = timeMatch[1];
                    // Add 10 mins to start time roughly
                    let [hours, mins] = startTime.split(':').map(Number);
                    mins += 10;
                    if (mins >= 60) {
                        mins -= 60;
                        hours += 1;
                    }
                    const newStart = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;

                    let endMins = mins + 15;
                    let endHours = hours;
                    if (endMins >= 60) {
                        endMins -= 60;
                        endHours += 1;
                    }
                    const newEnd = `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;

                    return `${qMatch}\n      { type: 'Hyperpole', date: '${date}', startTime: '${newStart}', endTime: '${newEnd}', duration: '15m' },`;
                }
                return qMatch;
            });
        }
        content = content.replace(match, newMatch);
    }
}

fs.writeFileSync(file, content);
console.log('Fixed sessions');
