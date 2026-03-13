const fs = require('fs');

const file = 'src/data/wecData.ts';
let content = fs.readFileSync(file, 'utf8');

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

// Append it to the end of the file since it's not present
content += `\n${replacement2025}\n\n${replacement2024}\n`;

fs.writeFileSync(file, content);
console.log('Appended standings.');
