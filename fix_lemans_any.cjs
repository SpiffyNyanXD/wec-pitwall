const fs = require('fs');
const file = 'src/pages/LeMans.tsx';
let data = fs.readFileSync(file, 'utf8');

data = data.replace('const iconMap: Record<string, any> = {', 'const iconMap: Record<string, React.ElementType> = {');
data = data.replace('import { Link } from \'react-router-dom\';', 'import { Link } from \'react-router-dom\';\nimport React from \'react\';');

fs.writeFileSync(file, data);
