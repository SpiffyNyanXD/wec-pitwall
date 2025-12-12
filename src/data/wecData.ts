// ============= Types =============

export interface Driver {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  nationality: string;
  countryFlag: string;
  team: string;
  teamId: string;
  carNumber: string;
  class: 'HYPERCAR' | 'LMP2' | 'LMGT3';
  points: number;
  position: number;
  dateOfBirth: string;
  placeOfBirth: string;
  biography: string;
  careerHighlights: string[];
  facts: string[];
  championships: number;
  leMansWins: number;
  wecWins: number;
  imageUrl?: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    website?: string;
  };
}

export interface Team {
  id: string;
  name: string;
  manufacturer: string;
  carNumber: string;
  class: 'HYPERCAR' | 'LMP2' | 'LMGT3';
  points: number;
  position: number;
  color: string;
  country: string;
  countryFlag: string;
  drivers: string[];
}

export interface Race {
  id: string;
  name: string;
  circuit: string;
  country: string;
  date: string;
  endDate?: string;
  duration: string;
  status: 'upcoming' | 'live' | 'completed';
  flag: string;
  season: number;
  round: number;
  winner?: string;
  winningTeam?: string;
  polePosition?: string;
  fastestLap?: string;
  trackLength?: string;
  laps?: number;
}

export interface LiveTiming {
  position: number;
  carNumber: string;
  team: string;
  class: 'HYPERCAR' | 'LMP2' | 'LMGT3';
  driver: string;
  gap: string;
  lastLap: string;
  bestLap: string;
  status: 'running' | 'pit' | 'out';
  laps: number;
}

// ============= 2024 Season Data =============

export const drivers2024: Driver[] = [
  // HYPERCAR DRIVERS
  {
    id: 'buemi',
    name: 'Sébastien Buemi',
    firstName: 'Sébastien',
    lastName: 'Buemi',
    nationality: 'Swiss',
    countryFlag: '🇨🇭',
    team: 'Toyota Gazoo Racing',
    teamId: 'toyota-8',
    carNumber: '#8',
    class: 'HYPERCAR',
    points: 135,
    position: 1,
    dateOfBirth: '1988-10-31',
    placeOfBirth: 'Aigle, Switzerland',
    biography: 'Sébastien Buemi is a Swiss racing driver and one of the most successful endurance racers of his generation. A former Formula 1 driver for Toro Rosso, he transitioned to endurance racing where he has dominated the WEC with Toyota.',
    careerHighlights: [
      '4-time WEC World Champion (2014, 2018-19, 2019-20, 2021)',
      '3-time 24 Hours of Le Mans winner (2018, 2019, 2020)',
      'Formula E Champion (2015-16)',
      '55 Formula 1 Grand Prix starts',
    ],
    facts: [
      'Holds the record for most WEC race wins',
      'One of only two drivers to win both WEC and Formula E championships',
      'Started karting at age 6',
      'His uncle was also a racing driver',
    ],
    championships: 4,
    leMansWins: 3,
    wecWins: 28,
  },
  {
    id: 'hartley',
    name: 'Brendon Hartley',
    firstName: 'Brendon',
    lastName: 'Hartley',
    nationality: 'New Zealander',
    countryFlag: '🇳🇿',
    team: 'Toyota Gazoo Racing',
    teamId: 'toyota-8',
    carNumber: '#8',
    class: 'HYPERCAR',
    points: 135,
    position: 1,
    dateOfBirth: '1989-11-10',
    placeOfBirth: 'Palmerston North, New Zealand',
    biography: 'Brendon Hartley is a New Zealand racing driver who has excelled in multiple disciplines. After time as a Red Bull junior and brief F1 stint with Toro Rosso, he found his true calling in endurance racing.',
    careerHighlights: [
      '2-time WEC World Champion (2017, 2021)',
      '3-time 24 Hours of Le Mans winner (2017, 2020, 2022)',
      'Formula 1 driver (2017-2018)',
      'Former Red Bull Racing test driver',
    ],
    facts: [
      'Won Le Mans on his debut in 2017 with Porsche',
      'Started racing go-karts at age 6',
      'Competed in the inaugural Formula E season',
      'Holds New Zealand passport and racing license',
    ],
    championships: 2,
    leMansWins: 3,
    wecWins: 15,
  },
  {
    id: 'hirakawa',
    name: 'Ryo Hirakawa',
    firstName: 'Ryo',
    lastName: 'Hirakawa',
    nationality: 'Japanese',
    countryFlag: '🇯🇵',
    team: 'Toyota Gazoo Racing',
    teamId: 'toyota-8',
    carNumber: '#8',
    class: 'HYPERCAR',
    points: 135,
    position: 1,
    dateOfBirth: '1994-03-07',
    placeOfBirth: 'Hiroshima, Japan',
    biography: 'Ryo Hirakawa is a Japanese racing driver and rising star in endurance racing. A dominant force in Super Formula and Super GT in Japan, he joined Toyota\'s WEC program and quickly proved his worth.',
    careerHighlights: [
      'WEC World Champion (2022)',
      '24 Hours of Le Mans winner (2022)',
      'Super GT Champion (2017, 2020)',
      'Super Formula runner-up (2020)',
    ],
    facts: [
      'Won Le Mans on his first attempt in 2022',
      'First Japanese driver to win Le Mans overall since 1995',
      'Began karting at age 10',
      'Toyota development driver since 2016',
    ],
    championships: 1,
    leMansWins: 1,
    wecWins: 6,
  },
  {
    id: 'estre',
    name: 'Kévin Estre',
    firstName: 'Kévin',
    lastName: 'Estre',
    nationality: 'French',
    countryFlag: '🇫🇷',
    team: 'Porsche Penske Motorsport',
    teamId: 'porsche-6',
    carNumber: '#6',
    class: 'HYPERCAR',
    points: 128,
    position: 4,
    dateOfBirth: '1988-07-02',
    placeOfBirth: 'Martigues, France',
    biography: 'Kévin Estre is a French racing driver and Porsche factory ace. Known for his exceptional qualifying pace and precision driving, he has been instrumental in Porsche\'s return to top-tier endurance racing.',
    careerHighlights: [
      '24 Hours of Le Mans class winner (2018 GTE Pro)',
      'Porsche Supercup Champion (2013)',
      '24 Hours of Spa winner (2019)',
      'Nürburgring 24 Hours winner (2021)',
    ],
    facts: [
      'Nicknamed "The Flying Frenchman" for his qualifying speed',
      'Holds multiple GT lap records',
      'Started racing in karting at age 9',
      'Porsche works driver since 2016',
    ],
    championships: 0,
    leMansWins: 0,
    wecWins: 3,
  },
  {
    id: 'lotterer',
    name: 'André Lotterer',
    firstName: 'André',
    lastName: 'Lotterer',
    nationality: 'German',
    countryFlag: '🇩🇪',
    team: 'Porsche Penske Motorsport',
    teamId: 'porsche-6',
    carNumber: '#6',
    class: 'HYPERCAR',
    points: 128,
    position: 4,
    dateOfBirth: '1981-11-19',
    placeOfBirth: 'Duisburg, Germany',
    biography: 'André Lotterer is a German racing driver and three-time Le Mans winner. With extensive experience in Japanese motorsport and European endurance racing, he brings invaluable expertise to Porsche.',
    careerHighlights: [
      '3-time 24 Hours of Le Mans winner (2011, 2012, 2014)',
      'Super Formula Champion (2011)',
      '6-time Super GT Champion',
      'Formula 1 debut (2014 Belgian GP)',
    ],
    facts: [
      'Spent 10+ years racing in Japan before European success',
      'Made surprise F1 debut replacing Kamui Kobayashi',
      'One of the most successful drivers in Super GT history',
      'Fluent in German, English, and Japanese',
    ],
    championships: 0,
    leMansWins: 3,
    wecWins: 12,
  },
  {
    id: 'vanthoor',
    name: 'Laurens Vanthoor',
    firstName: 'Laurens',
    lastName: 'Vanthoor',
    nationality: 'Belgian',
    countryFlag: '🇧🇪',
    team: 'Porsche Penske Motorsport',
    teamId: 'porsche-6',
    carNumber: '#6',
    class: 'HYPERCAR',
    points: 128,
    position: 4,
    dateOfBirth: '1991-05-08',
    placeOfBirth: 'Hasselt, Belgium',
    biography: 'Laurens Vanthoor is a Belgian racing driver renowned for his GT racing prowess. A Porsche factory driver, he has won multiple prestigious endurance races and now competes in the Hypercar class.',
    careerHighlights: [
      '24 Hours of Spa winner (2014, 2019)',
      'Petit Le Mans winner (2018, 2019)',
      'Blancpain GT Champion (2014)',
      'ADAC GT Masters Champion (2016)',
    ],
    facts: [
      'Part of a racing family - father was a racing driver',
      'Won Spa 24 Hours as a teenager',
      'Known for consistency in long races',
      'Porsche works driver since 2017',
    ],
    championships: 0,
    leMansWins: 0,
    wecWins: 2,
  },
  {
    id: 'fuoco',
    name: 'Antonio Fuoco',
    firstName: 'Antonio',
    lastName: 'Fuoco',
    nationality: 'Italian',
    countryFlag: '🇮🇹',
    team: 'Ferrari AF Corse',
    teamId: 'ferrari-50',
    carNumber: '#50',
    class: 'HYPERCAR',
    points: 142,
    position: 2,
    dateOfBirth: '1996-03-20',
    placeOfBirth: 'Cariati, Italy',
    biography: 'Antonio Fuoco is an Italian racing driver and Ferrari factory pilot. A former Ferrari Driver Academy member, he has risen through the ranks to become one of the marque\'s most trusted endurance racers.',
    careerHighlights: [
      '24 Hours of Le Mans winner (2024)',
      'GP3 Series race winner',
      'FIA WEC Hypercar champion (2024)',
      'Ferrari Driver Academy graduate',
    ],
    facts: [
      'Won Le Mans on Ferrari\'s Hypercar debut year victory',
      'Former Ferrari F1 test and development driver',
      'Started karting at age 8',
      'Ferrari factory driver since 2019',
    ],
    championships: 1,
    leMansWins: 1,
    wecWins: 5,
  },
  {
    id: 'molina',
    name: 'Miguel Molina',
    firstName: 'Miguel',
    lastName: 'Molina',
    nationality: 'Spanish',
    countryFlag: '🇪🇸',
    team: 'Ferrari AF Corse',
    teamId: 'ferrari-50',
    carNumber: '#50',
    class: 'HYPERCAR',
    points: 142,
    position: 2,
    dateOfBirth: '1989-02-17',
    placeOfBirth: 'Barcelona, Spain',
    biography: 'Miguel Molina is a Spanish racing driver with extensive DTM and GT experience. His smooth driving style and consistency made him a natural fit for Ferrari\'s endurance program.',
    careerHighlights: [
      '24 Hours of Le Mans winner (2024)',
      'DTM race winner (multiple)',
      'FIA WEC Hypercar champion (2024)',
      'Ferrari Challenge Europe Champion',
    ],
    facts: [
      'Former Audi DTM factory driver',
      'Won Le Mans in his first Hypercar season',
      'Known for tire management skills',
      'Joined Ferrari in 2021',
    ],
    championships: 1,
    leMansWins: 1,
    wecWins: 5,
  },
  {
    id: 'nielsen',
    name: 'Nicklas Nielsen',
    firstName: 'Nicklas',
    lastName: 'Nielsen',
    nationality: 'Danish',
    countryFlag: '🇩🇰',
    team: 'Ferrari AF Corse',
    teamId: 'ferrari-50',
    carNumber: '#50',
    class: 'HYPERCAR',
    points: 142,
    position: 2,
    dateOfBirth: '1997-08-14',
    placeOfBirth: 'Aarhus, Denmark',
    biography: 'Nicklas Nielsen is a Danish racing driver who rose through the Ferrari ranks. Starting in the Ferrari Challenge, his exceptional talent earned him a spot in the factory Hypercar program.',
    careerHighlights: [
      '24 Hours of Le Mans winner (2024)',
      'FIA WEC Hypercar champion (2024)',
      'WEC LMGTE Am Champion (2021)',
      'Ferrari Challenge Europe Champion (2018)',
    ],
    facts: [
      'Youngest driver in the Le Mans winning car in 2024',
      'Won three WEC classes with Ferrari',
      'Started in Ferrari Challenge at 20',
      'Danish Motorsport Talent of the Year',
    ],
    championships: 1,
    leMansWins: 1,
    wecWins: 5,
  },
  // LMP2 DRIVERS
  {
    id: 'nato',
    name: 'Norman Nato',
    firstName: 'Norman',
    lastName: 'Nato',
    nationality: 'French',
    countryFlag: '🇫🇷',
    team: 'IDEC Sport',
    teamId: 'idec-28',
    carNumber: '#28',
    class: 'LMP2',
    points: 95,
    position: 1,
    dateOfBirth: '1992-05-17',
    placeOfBirth: 'Cannes, France',
    biography: 'Norman Nato is a French racing driver with experience across multiple categories including Formula E and endurance racing.',
    careerHighlights: [
      'GP2 Series race winner',
      'Formula E race winner',
      'LMP2 class winner at Le Mans',
    ],
    facts: [
      'Former DAMS GP2 driver',
      'Competed in Formula E for Venturi',
      'Versatile across single-seaters and prototypes',
    ],
    championships: 0,
    leMansWins: 0,
    wecWins: 2,
  },
  {
    id: 'deletraz',
    name: 'Louis Delétraz',
    firstName: 'Louis',
    lastName: 'Delétraz',
    nationality: 'Swiss',
    countryFlag: '🇨🇭',
    team: 'TDS Racing',
    teamId: 'tds-33',
    carNumber: '#33',
    class: 'LMP2',
    points: 88,
    position: 2,
    dateOfBirth: '1997-09-22',
    placeOfBirth: 'Geneva, Switzerland',
    biography: 'Louis Delétraz is a Swiss racing driver and son of former F1 driver Jean-Denis Delétraz. He has become one of the fastest LMP2 drivers in the world.',
    careerHighlights: [
      'LMP2 Le Mans class winner (2021)',
      'Formula 2 race winner',
      'Haas F1 test driver',
    ],
    facts: [
      'Second generation racing driver',
      'Multiple Formula 2 podiums',
      'Known for aggressive racing style',
    ],
    championships: 0,
    leMansWins: 1,
    wecWins: 4,
  },
  // LMGT3 DRIVERS
  {
    id: 'sorensen',
    name: 'Marco Sørensen',
    firstName: 'Marco',
    lastName: 'Sørensen',
    nationality: 'Danish',
    countryFlag: '🇩🇰',
    team: 'Heart of Racing',
    teamId: 'hor-27',
    carNumber: '#27',
    class: 'LMGT3',
    points: 82,
    position: 1,
    dateOfBirth: '1990-07-16',
    placeOfBirth: 'Hillerød, Denmark',
    biography: 'Marco Sørensen is a Danish GT specialist and former Aston Martin factory driver with multiple class wins at Le Mans.',
    careerHighlights: [
      'GTE Pro Le Mans class winner (2020)',
      'WEC GTE Am Champion',
      'FIA GT World Cup podium',
    ],
    facts: [
      'Long-time Aston Martin factory driver',
      'Known for wet weather driving',
      'Competed in Formula Renault 3.5',
    ],
    championships: 1,
    leMansWins: 1,
    wecWins: 6,
  },
  {
    id: 'gunn',
    name: 'Ian James',
    firstName: 'Ian',
    lastName: 'James',
    nationality: 'American',
    countryFlag: '🇺🇸',
    team: 'Heart of Racing',
    teamId: 'hor-27',
    carNumber: '#27',
    class: 'LMGT3',
    points: 82,
    position: 1,
    dateOfBirth: '1969-08-22',
    placeOfBirth: 'Ohio, USA',
    biography: 'Ian James is an American racing driver and team owner of Heart of Racing Team. A passionate racer who combines driving with team management.',
    careerHighlights: [
      'IMSA GTD class wins',
      'Heart of Racing Team founder',
      'Rolex 24 competitor',
    ],
    facts: [
      'Combines team ownership with driving',
      'Strong advocate for American motorsport',
      'Experienced in both GT3 and GT4 machinery',
    ],
    championships: 0,
    leMansWins: 0,
    wecWins: 2,
  },
];

export const teams2024: Team[] = [
  // HYPERCAR
  { id: 'toyota-8', name: 'Toyota Gazoo Racing', manufacturer: 'Toyota', carNumber: '#8', class: 'HYPERCAR', points: 186, position: 1, color: '#E60012', country: 'Japan', countryFlag: '🇯🇵', drivers: ['buemi', 'hartley', 'hirakawa'] },
  { id: 'toyota-7', name: 'Toyota Gazoo Racing', manufacturer: 'Toyota', carNumber: '#7', class: 'HYPERCAR', points: 158, position: 2, color: '#E60012', country: 'Japan', countryFlag: '🇯🇵', drivers: ['conway', 'kobayashi', 'delacruz'] },
  { id: 'ferrari-50', name: 'Ferrari AF Corse', manufacturer: 'Ferrari', carNumber: '#50', class: 'HYPERCAR', points: 172, position: 3, color: '#DC0000', country: 'Italy', countryFlag: '🇮🇹', drivers: ['fuoco', 'molina', 'nielsen'] },
  { id: 'ferrari-51', name: 'Ferrari AF Corse', manufacturer: 'Ferrari', carNumber: '#51', class: 'HYPERCAR', points: 145, position: 4, color: '#DC0000', country: 'Italy', countryFlag: '🇮🇹', drivers: ['calado', 'pier-guidi', 'giovinazzi'] },
  { id: 'porsche-6', name: 'Porsche Penske Motorsport', manufacturer: 'Porsche', carNumber: '#6', class: 'HYPERCAR', points: 156, position: 5, color: '#C4A747', country: 'Germany', countryFlag: '🇩🇪', drivers: ['estre', 'lotterer', 'vanthoor'] },
  { id: 'porsche-5', name: 'Porsche Penske Motorsport', manufacturer: 'Porsche', carNumber: '#5', class: 'HYPERCAR', points: 134, position: 6, color: '#C4A747', country: 'Germany', countryFlag: '🇩🇪', drivers: ['campbell', 'christensen', 'makowiecki'] },
  { id: 'cadillac-2', name: 'Cadillac Racing', manufacturer: 'Cadillac', carNumber: '#2', class: 'HYPERCAR', points: 112, position: 7, color: '#1E1E1E', country: 'USA', countryFlag: '🇺🇸', drivers: ['bamber', 'lynn', 'westbrook'] },
  { id: 'peugeot-93', name: 'Peugeot TotalEnergies', manufacturer: 'Peugeot', carNumber: '#93', class: 'HYPERCAR', points: 98, position: 8, color: '#0066B1', country: 'France', countryFlag: '🇫🇷', drivers: ['jensen', 'vergne', 'muller'] },
  { id: 'peugeot-94', name: 'Peugeot TotalEnergies', manufacturer: 'Peugeot', carNumber: '#94', class: 'HYPERCAR', points: 87, position: 9, color: '#0066B1', country: 'France', countryFlag: '🇫🇷', drivers: ['vandoorne', 'di-resta', 'duval'] },
  { id: 'alpine-35', name: 'Alpine Endurance Team', manufacturer: 'Alpine', carNumber: '#35', class: 'HYPERCAR', points: 76, position: 10, color: '#0090FF', country: 'France', countryFlag: '🇫🇷', drivers: ['schumacher', 'lapierre', 'chatin'] },
  // LMP2
  { id: 'idec-28', name: 'IDEC Sport', manufacturer: 'Oreca', carNumber: '#28', class: 'LMP2', points: 145, position: 1, color: '#FF6B00', country: 'France', countryFlag: '🇫🇷', drivers: ['nato', 'aberdein', 'lafargue'] },
  { id: 'tds-33', name: 'TDS Racing x Vaillante', manufacturer: 'Oreca', carNumber: '#33', class: 'LMP2', points: 132, position: 2, color: '#00A651', country: 'France', countryFlag: '🇫🇷', drivers: ['deletraz', 'beche', 'buret'] },
  { id: 'cool-37', name: 'Cool Racing', manufacturer: 'Oreca', carNumber: '#37', class: 'LMP2', points: 118, position: 3, color: '#1E90FF', country: 'Switzerland', countryFlag: '🇨🇭', drivers: ['borga', 'coigny', 'bolduc'] },
  { id: 'united-22', name: 'United Autosports', manufacturer: 'Oreca', carNumber: '#22', class: 'LMP2', points: 105, position: 4, color: '#FFD700', country: 'UK', countryFlag: '🇬🇧', drivers: ['hanson', 'scherer', 'albuquerque'] },
  { id: 'inter-34', name: 'Inter Europol Competition', manufacturer: 'Oreca', carNumber: '#34', class: 'LMP2', points: 92, position: 5, color: '#FF4500', country: 'Poland', countryFlag: '🇵🇱', drivers: ['smiechowski', 'kari', 'gore'] },
  // LMGT3
  { id: 'hor-27', name: 'Heart of Racing', manufacturer: 'Aston Martin', carNumber: '#27', class: 'LMGT3', points: 124, position: 1, color: '#006400', country: 'USA', countryFlag: '🇺🇸', drivers: ['sorensen', 'gunn', 'de-angelis'] },
  { id: 'manthey-91', name: 'Manthey EMA', manufacturer: 'Porsche', carNumber: '#91', class: 'LMGT3', points: 118, position: 2, color: '#FFA500', country: 'Germany', countryFlag: '🇩🇪', drivers: ['bachler', 'malykhin', 'sturm'] },
  { id: 'iron-85', name: 'Iron Dames', manufacturer: 'Lamborghini', carNumber: '#85', class: 'LMGT3', points: 105, position: 3, color: '#FF1493', country: 'Italy', countryFlag: '🇮🇹', drivers: ['gatting', 'frey', 'pin'] },
  { id: 'proton-77', name: 'Proton Competition', manufacturer: 'Ford', carNumber: '#77', class: 'LMGT3', points: 98, position: 4, color: '#4169E1', country: 'Germany', countryFlag: '🇩🇪', drivers: ['ried', 'priaulx', 'tincknell'] },
  { id: 'afc-55', name: 'AF Corse', manufacturer: 'Ferrari', carNumber: '#55', class: 'LMGT3', points: 92, position: 5, color: '#DC143C', country: 'Italy', countryFlag: '🇮🇹', drivers: ['costa', 'ledogar', 'sernagiotto'] },
];

// 2024 Season Races (Completed)
export const races2024: Race[] = [
  { 
    id: '2024-1', name: '1812 km of Qatar', circuit: 'Lusail International Circuit', country: 'Qatar', 
    date: '2024-03-02', duration: '10 Hours', status: 'completed', flag: '🇶🇦', season: 2024, round: 1,
    winner: 'Toyota #8', winningTeam: 'Toyota Gazoo Racing', trackLength: '5.419 km', laps: 334
  },
  { 
    id: '2024-2', name: '6 Hours of Imola', circuit: 'Autodromo Enzo e Dino Ferrari', country: 'Italy', 
    date: '2024-04-21', duration: '6 Hours', status: 'completed', flag: '🇮🇹', season: 2024, round: 2,
    winner: 'Ferrari #50', winningTeam: 'Ferrari AF Corse', trackLength: '4.909 km', laps: 212
  },
  { 
    id: '2024-3', name: '6 Hours of Spa', circuit: 'Circuit de Spa-Francorchamps', country: 'Belgium', 
    date: '2024-05-11', duration: '6 Hours', status: 'completed', flag: '🇧🇪', season: 2024, round: 3,
    winner: 'Porsche #6', winningTeam: 'Porsche Penske Motorsport', trackLength: '7.004 km', laps: 166
  },
  { 
    id: '2024-4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France', 
    date: '2024-06-15', endDate: '2024-06-16', duration: '24 Hours', status: 'completed', flag: '🇫🇷', season: 2024, round: 4,
    winner: 'Ferrari #50', winningTeam: 'Ferrari AF Corse', trackLength: '13.626 km', laps: 311
  },
  { 
    id: '2024-5', name: '6 Hours of São Paulo', circuit: 'Interlagos', country: 'Brazil', 
    date: '2024-07-14', duration: '6 Hours', status: 'completed', flag: '🇧🇷', season: 2024, round: 5,
    winner: 'Toyota #8', winningTeam: 'Toyota Gazoo Racing', trackLength: '4.309 km', laps: 227
  },
  { 
    id: '2024-6', name: '6 Hours of COTA', circuit: 'Circuit of the Americas', country: 'USA', 
    date: '2024-09-01', duration: '6 Hours', status: 'completed', flag: '🇺🇸', season: 2024, round: 6,
    winner: 'Porsche #5', winningTeam: 'Porsche Penske Motorsport', trackLength: '5.513 km', laps: 185
  },
  { 
    id: '2024-7', name: '6 Hours of Fuji', circuit: 'Fuji Speedway', country: 'Japan', 
    date: '2024-09-15', duration: '6 Hours', status: 'completed', flag: '🇯🇵', season: 2024, round: 7,
    winner: 'Toyota #7', winningTeam: 'Toyota Gazoo Racing', trackLength: '4.563 km', laps: 214
  },
  { 
    id: '2024-8', name: '8 Hours of Bahrain', circuit: 'Bahrain International Circuit', country: 'Bahrain', 
    date: '2024-11-02', duration: '8 Hours', status: 'completed', flag: '🇧🇭', season: 2024, round: 8,
    winner: 'Ferrari #50', winningTeam: 'Ferrari AF Corse', trackLength: '5.412 km', laps: 270
  },
];

// 2025 Season Races (Upcoming)
export const races2025: Race[] = [
  { 
    id: '2025-1', name: '1812 km of Qatar', circuit: 'Lusail International Circuit', country: 'Qatar', 
    date: '2025-02-28', duration: '10 Hours', status: 'completed', flag: '🇶🇦', season: 2025, round: 1,
    trackLength: '5.419 km'
  },
  { 
    id: '2025-2', name: '6 Hours of Imola', circuit: 'Autodromo Enzo e Dino Ferrari', country: 'Italy', 
    date: '2025-04-20', duration: '6 Hours', status: 'upcoming', flag: '🇮🇹', season: 2025, round: 2,
    trackLength: '4.909 km'
  },
  { 
    id: '2025-3', name: '6 Hours of Spa', circuit: 'Circuit de Spa-Francorchamps', country: 'Belgium', 
    date: '2025-05-10', duration: '6 Hours', status: 'upcoming', flag: '🇧🇪', season: 2025, round: 3,
    trackLength: '7.004 km'
  },
  { 
    id: '2025-4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France', 
    date: '2025-06-14', endDate: '2025-06-15', duration: '24 Hours', status: 'upcoming', flag: '🇫🇷', season: 2025, round: 4,
    trackLength: '13.626 km'
  },
  { 
    id: '2025-5', name: '6 Hours of São Paulo', circuit: 'Interlagos', country: 'Brazil', 
    date: '2025-07-13', duration: '6 Hours', status: 'upcoming', flag: '🇧🇷', season: 2025, round: 5,
    trackLength: '4.309 km'
  },
  { 
    id: '2025-6', name: '6 Hours of COTA', circuit: 'Circuit of the Americas', country: 'USA', 
    date: '2025-08-31', duration: '6 Hours', status: 'upcoming', flag: '🇺🇸', season: 2025, round: 6,
    trackLength: '5.513 km'
  },
  { 
    id: '2025-7', name: '6 Hours of Fuji', circuit: 'Fuji Speedway', country: 'Japan', 
    date: '2025-09-14', duration: '6 Hours', status: 'upcoming', flag: '🇯🇵', season: 2025, round: 7,
    trackLength: '4.563 km'
  },
  { 
    id: '2025-8', name: '8 Hours of Bahrain', circuit: 'Bahrain International Circuit', country: 'Bahrain', 
    date: '2025-11-08', duration: '8 Hours', status: 'upcoming', flag: '🇧🇭', season: 2025, round: 8,
    trackLength: '5.412 km'
  },
];

// Export combined data (default to 2024 for backward compatibility)
export const drivers = drivers2024;
export const teams = teams2024;
export const races = [...races2024, ...races2025];

export const liveTiming: LiveTiming[] = [
  { position: 1, carNumber: '#8', team: 'Toyota Gazoo Racing', class: 'HYPERCAR', driver: 'Buemi', gap: 'LEADER', lastLap: '3:24.567', bestLap: '3:23.891', status: 'running', laps: 156 },
  { position: 2, carNumber: '#50', team: 'Ferrari AF Corse', class: 'HYPERCAR', driver: 'Fuoco', gap: '+2.341', lastLap: '3:24.892', bestLap: '3:24.102', status: 'running', laps: 156 },
  { position: 3, carNumber: '#6', team: 'Porsche Penske', class: 'HYPERCAR', driver: 'Estre', gap: '+5.678', lastLap: '3:25.123', bestLap: '3:24.456', status: 'running', laps: 156 },
  { position: 4, carNumber: '#7', team: 'Toyota Gazoo Racing', class: 'HYPERCAR', driver: 'Kobayashi', gap: '+8.901', lastLap: '3:25.456', bestLap: '3:24.789', status: 'pit', laps: 155 },
  { position: 5, carNumber: '#51', team: 'Ferrari AF Corse', class: 'HYPERCAR', driver: 'Pier Guidi', gap: '+12.345', lastLap: '3:25.789', bestLap: '3:25.012', status: 'running', laps: 156 },
  { position: 6, carNumber: '#5', team: 'Porsche Penske', class: 'HYPERCAR', driver: 'Campbell', gap: '+15.678', lastLap: '3:26.012', bestLap: '3:25.345', status: 'running', laps: 156 },
  { position: 7, carNumber: '#2', team: 'Cadillac Racing', class: 'HYPERCAR', driver: 'Bamber', gap: '+23.456', lastLap: '3:26.789', bestLap: '3:25.890', status: 'running', laps: 155 },
  { position: 8, carNumber: '#93', team: 'Peugeot TotalEnergies', class: 'HYPERCAR', driver: 'Jensen', gap: '+34.567', lastLap: '3:27.123', bestLap: '3:26.456', status: 'running', laps: 155 },
  // LMP2
  { position: 9, carNumber: '#28', team: 'IDEC Sport', class: 'LMP2', driver: 'Nato', gap: '+1 LAP', lastLap: '3:32.456', bestLap: '3:31.234', status: 'running', laps: 155 },
  { position: 10, carNumber: '#33', team: 'TDS Racing', class: 'LMP2', driver: 'Delétraz', gap: '+1 LAP', lastLap: '3:32.789', bestLap: '3:31.567', status: 'running', laps: 155 },
  { position: 11, carNumber: '#37', team: 'Cool Racing', class: 'LMP2', driver: 'Borga', gap: '+1 LAP', lastLap: '3:33.012', bestLap: '3:31.890', status: 'pit', laps: 154 },
  // LMGT3
  { position: 12, carNumber: '#27', team: 'Heart of Racing', class: 'LMGT3', driver: 'Sørensen', gap: '+3 LAPS', lastLap: '3:54.123', bestLap: '3:52.456', status: 'running', laps: 153 },
  { position: 13, carNumber: '#91', team: 'Manthey EMA', class: 'LMGT3', driver: 'Bachler', gap: '+3 LAPS', lastLap: '3:54.456', bestLap: '3:52.789', status: 'running', laps: 153 },
  { position: 14, carNumber: '#85', team: 'Iron Dames', class: 'LMGT3', driver: 'Gatting', gap: '+3 LAPS', lastLap: '3:54.789', bestLap: '3:53.012', status: 'running', laps: 153 },
];

export const weather = {
  location: 'Le Mans, France',
  temperature: 22,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12,
  trackTemp: 38,
  rainChance: 15,
};

// Helper functions
export const getDriverById = (id: string): Driver | undefined => {
  return drivers2024.find(d => d.id === id);
};

export const getTeamById = (id: string): Team | undefined => {
  return teams2024.find(t => t.id === id);
};

export const getDriversByClass = (carClass: 'HYPERCAR' | 'LMP2' | 'LMGT3'): Driver[] => {
  return drivers2024.filter(d => d.class === carClass);
};

export const getTeamsByClass = (carClass: 'HYPERCAR' | 'LMP2' | 'LMGT3'): Team[] => {
  return teams2024.filter(t => t.class === carClass);
};

export const getRacesBySeason = (season: number): Race[] => {
  return races.filter(r => r.season === season);
};

export const getNextRace = (): Race | undefined => {
  const now = new Date();
  return races.find(r => new Date(r.date) > now && r.status === 'upcoming');
};
