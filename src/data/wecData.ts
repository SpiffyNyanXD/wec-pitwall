/**
 * WEC Pitwall — Data Layer
 *
 * I started this project because when I was studying
 * (trying to study btw) I thought for this and started doing this.
 *
 * — SpiffyNyanXD
 */

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
  // Extended team profile data
  fullName?: string;
  chassis?: string;
  engine?: string;
  teamPrincipal?: string;
  base?: string;
  founded?: string;
  wecDebut?: string;
  championships?: number;
  leMansWins?: number;
  wecWins?: number;
  poles?: number;
  fastestLaps?: number;
  about?: string;
  facts?: string[];
}

export interface Session {
  type: 'FP1' | 'FP2' | 'Qualifying' | 'Hyperpole' | 'Warm Up' | 'Race';
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
}

export interface RaceResult {
  position: number;
  carNumber: string;
  team: string;
  manufacturer: string;
  drivers: string[];
  class: 'HYPERCAR' | 'LMP2' | 'LMGT3';
  laps: number;
  gap: string; // '+1:23.456' or 'Leader' or '+1 Lap'
  fastestLap?: string; // '1:34.567'
  isFastestLap?: boolean;
  status: 'Finished' | 'DNF' | 'DSQ';
  color: string;
  flag: string;
}

export interface RaceResultSet {
  raceId: string;
  polePosition: string;
  poleTime: string;
  fastestLap: string;
  fastestLapTime: string;
  fastestLapDriver: string;
  results: RaceResult[];
}

export interface Race {
  id: string;
  name: string;
  circuit: string;
  country: string;
  date: string;
  endDate?: string;
  duration: string;
  status: 'upcoming' | 'live' | 'completed' | 'postponed';
  flag: string;
  season: number;
  round: number | null;
  roundNote?: string;
  winner?: string;
  winningTeam?: string;
  polePosition?: string;
  fastestLap?: string;
  trackLength?: string;
  laps?: number;
  sessions?: Session[];
}

// ============= 2024 Season Data (COMPLETED) =============

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
  { 
    id: 'toyota-8', name: 'Toyota Gazoo Racing', manufacturer: 'Toyota', carNumber: '#8', class: 'HYPERCAR', 
    points: 186, position: 1, color: '#E60012', country: 'Japan', countryFlag: '🇯🇵', 
    drivers: ['buemi', 'hartley', 'hirakawa'],
    fullName: 'Toyota Gazoo Racing', chassis: 'Toyota GR010 Hybrid', engine: 'Toyota 3.5L Twin-Turbo V6 Hybrid',
    teamPrincipal: 'Kamui Kobayashi', base: 'Cologne, Germany', founded: '1999', wecDebut: '2012',
    championships: 6, leMansWins: 5, wecWins: 35, poles: 28, fastestLaps: 32,
    about: 'Toyota Gazoo Racing is the works motorsport team of Japanese automobile manufacturer Toyota. The team has been dominant in the WEC, winning multiple championships and the prestigious 24 Hours of Le Mans. Their hybrid technology has set the benchmark in endurance racing.',
    facts: ['Most successful team in modern WEC era', 'First Japanese manufacturer to win Le Mans overall since Mazda in 1991', 'GR010 Hybrid uses technology from Toyota road cars', 'Has won 5 consecutive Le Mans races (2018-2022)']
  },
  { 
    id: 'toyota-7', name: 'Toyota Gazoo Racing', manufacturer: 'Toyota', carNumber: '#7', class: 'HYPERCAR', 
    points: 158, position: 2, color: '#E60012', country: 'Japan', countryFlag: '🇯🇵', 
    drivers: ['conway', 'kobayashi', 'delacruz'],
    fullName: 'Toyota Gazoo Racing', chassis: 'Toyota GR010 Hybrid', engine: 'Toyota 3.5L Twin-Turbo V6 Hybrid',
    teamPrincipal: 'Kamui Kobayashi', base: 'Cologne, Germany', founded: '1999', wecDebut: '2012',
    championships: 3, leMansWins: 2, wecWins: 22, poles: 18, fastestLaps: 20,
    about: 'The sister car of Toyota Gazoo Racing, car #7 has been a consistent challenger for victories. The crew features the legendary Kamui Kobayashi who also serves as team principal.',
    facts: ['Kamui Kobayashi is both driver and team principal', 'Won Le Mans in 2021 and 2023', 'Known for aggressive pit strategies']
  },
  { 
    id: 'ferrari-50', name: 'Ferrari AF Corse', manufacturer: 'Ferrari', carNumber: '#50', class: 'HYPERCAR', 
    points: 172, position: 3, color: '#DC0000', country: 'Italy', countryFlag: '🇮🇹', 
    drivers: ['fuoco', 'molina', 'nielsen'],
    fullName: 'Ferrari AF Corse', chassis: 'Ferrari 499P', engine: 'Ferrari 3.0L Twin-Turbo V6 Hybrid',
    teamPrincipal: 'Antonello Coletta', base: 'Maranello, Italy', founded: '2021', wecDebut: '2023',
    championships: 1, leMansWins: 1, wecWins: 4, poles: 5, fastestLaps: 6,
    about: 'Ferrari AF Corse marks the return of the Prancing Horse to top-tier prototype racing. In just their first full season, they achieved the remarkable feat of winning Le Mans - exactly 50 years after Ferrari\'s last overall victory at the Circuit de la Sarthe.',
    facts: ['Won Le Mans on their first attempt in 2023', 'The 499P name celebrates Ferrari\'s 499th World Championship Grand Prix', 'Car designed entirely at Ferrari\'s Maranello facility', 'Livery inspired by classic Ferrari endurance cars']
  },
  { 
    id: 'ferrari-51', name: 'Ferrari AF Corse', manufacturer: 'Ferrari', carNumber: '#51', class: 'HYPERCAR', 
    points: 145, position: 4, color: '#DC0000', country: 'Italy', countryFlag: '🇮🇹', 
    drivers: ['calado', 'pier-guidi', 'giovinazzi'],
    fullName: 'Ferrari AF Corse', chassis: 'Ferrari 499P', engine: 'Ferrari 3.0L Twin-Turbo V6 Hybrid',
    teamPrincipal: 'Antonello Coletta', base: 'Maranello, Italy', founded: '2021', wecDebut: '2023',
    championships: 0, leMansWins: 0, wecWins: 2, poles: 3, fastestLaps: 4,
    about: 'The #51 Ferrari 499P carries the spirit of Ferrari\'s endurance racing heritage. The crew includes former Formula 1 driver Antonio Giovinazzi.',
    facts: ['Features former F1 driver Antonio Giovinazzi', 'Finished on the podium at Le Mans 2023', 'James Calado is a WEC GTE Pro champion']
  },
  { 
    id: 'porsche-6', name: 'Porsche Penske Motorsport', manufacturer: 'Porsche', carNumber: '#6', class: 'HYPERCAR', 
    points: 156, position: 5, color: '#C4A747', country: 'Germany', countryFlag: '🇩🇪', 
    drivers: ['estre', 'lotterer', 'vanthoor'],
    fullName: 'Porsche Penske Motorsport', chassis: 'Porsche 963', engine: 'Porsche 4.6L Twin-Turbo V8 Hybrid',
    teamPrincipal: 'Urs Kuratle', base: 'Mooresville, USA', founded: '2022', wecDebut: '2023',
    championships: 0, leMansWins: 0, wecWins: 3, poles: 4, fastestLaps: 5,
    about: 'Porsche Penske Motorsport represents the partnership between Porsche and legendary American racing team owner Roger Penske. The 963 is named in honor of Porsche\'s iconic 956/962 Le Mans winners.',
    facts: ['Partnership with legendary Roger Penske', '963 design inspired by the iconic 956/962', 'Team operates from both Germany and USA', 'Uses LMDh regulations for both WEC and IMSA']
  },
  { 
    id: 'porsche-5', name: 'Porsche Penske Motorsport', manufacturer: 'Porsche', carNumber: '#5', class: 'HYPERCAR', 
    points: 134, position: 6, color: '#C4A747', country: 'Germany', countryFlag: '🇩🇪', 
    drivers: ['campbell', 'christensen', 'makowiecki'],
    fullName: 'Porsche Penske Motorsport', chassis: 'Porsche 963', engine: 'Porsche 4.6L Twin-Turbo V8 Hybrid',
    teamPrincipal: 'Urs Kuratle', base: 'Mooresville, USA', founded: '2022', wecDebut: '2023',
    championships: 0, leMansWins: 0, wecWins: 2, poles: 2, fastestLaps: 3,
    about: 'The #5 Porsche 963 features a talented crew including Matt Campbell who has proven himself as one of the fastest GT and prototype drivers.',
    facts: ['Matt Campbell is the fastest Australian in WEC', 'Michael Christensen is a former Porsche Supercup champion', 'Frédéric Makowiecki is a veteran GT racer']
  },
  { id: 'cadillac-2', name: 'Cadillac Racing', manufacturer: 'Cadillac', carNumber: '#2', class: 'HYPERCAR', points: 112, position: 7, color: '#1E1E1E', country: 'USA', countryFlag: '🇺🇸', drivers: ['bamber', 'lynn', 'westbrook'] },
  { id: 'peugeot-93', name: 'Peugeot TotalEnergies', manufacturer: 'Peugeot', carNumber: '#93', class: 'HYPERCAR', points: 98, position: 8, color: '#0066B1', country: 'France', countryFlag: '🇫🇷', drivers: ['jensen', 'vergne', 'muller'] },
  { id: 'peugeot-94', name: 'Peugeot TotalEnergies', manufacturer: 'Peugeot', carNumber: '#94', class: 'HYPERCAR', points: 87, position: 9, color: '#0066B1', country: 'France', countryFlag: '🇫🇷', drivers: ['vandoorne', 'di-resta', 'duval'] },
  { id: 'alpine-35', name: 'Alpine Endurance Team', manufacturer: 'Alpine', carNumber: '#35', class: 'HYPERCAR', points: 76, position: 10, color: '#0090FF', country: 'France', countryFlag: '🇫🇷', drivers: ['schumacher', 'lapierre', 'chatin'] },
  // LMP2 (Le Mans 24h Only - not a full-season WEC championship post-2023)
  { 
    id: 'idec-28', name: 'IDEC Sport', manufacturer: 'Oreca', carNumber: '#28', class: 'LMP2', 
    points: 145, position: 1, color: '#FF6B00', country: 'France', countryFlag: '🇫🇷', 
    drivers: ['nato', 'aberdein', 'lafargue'],
    fullName: 'IDEC Sport', chassis: 'Oreca 07', engine: 'Gibson GK428 4.2L V8',
    teamPrincipal: 'Paul Lafargue', base: 'La Rochelle, France', founded: '2014', wecDebut: '2016',
    championships: 0, leMansWins: 0, wecWins: 2, poles: 1, fastestLaps: 2,
    about: 'IDEC Sport is a French racing team competing in the LMP2 category at the 24 Hours of Le Mans. The team is known for its professional approach and consistent performances.',
    facts: ['Competes exclusively at Le Mans 24h in WEC', 'Uses the standard Gibson V8 engine', 'French-based privateer team']
  },
  { 
    id: 'tds-33', name: 'TDS Racing x Vaillante', manufacturer: 'Oreca', carNumber: '#33', class: 'LMP2', 
    points: 132, position: 2, color: '#00A651', country: 'France', countryFlag: '🇫🇷', 
    drivers: ['deletraz', 'beche', 'buret'],
    fullName: 'TDS Racing x Vaillante', chassis: 'Oreca 07', engine: 'Gibson GK428 4.2L V8',
    teamPrincipal: 'Jacques Nicolet', base: 'Magny-Cours, France', founded: '2012', wecDebut: '2016',
    championships: 0, leMansWins: 1, wecWins: 3, poles: 2, fastestLaps: 3,
    about: 'TDS Racing partnered with legendary French comic book brand Vaillante brings heritage and passion to endurance racing.',
    facts: ['Partnership with iconic Vaillante brand', 'Multiple Le Mans class podiums', 'Competes at Le Mans 24h']
  },
  { 
    id: 'cool-37', name: 'Cool Racing', manufacturer: 'Oreca', carNumber: '#37', class: 'LMP2', 
    points: 118, position: 3, color: '#1E90FF', country: 'Switzerland', countryFlag: '🇨🇭', 
    drivers: ['borga', 'coigny', 'bolduc'],
    fullName: 'Cool Racing', chassis: 'Oreca 07', engine: 'Gibson GK428 4.2L V8',
    teamPrincipal: 'Nicolas Lapierre', base: 'Geneva, Switzerland', founded: '2018', wecDebut: '2019',
    championships: 0, leMansWins: 0, wecWins: 1, poles: 1, fastestLaps: 1,
    about: 'Cool Racing is a Swiss team that has established itself as a competitive force in the LMP2 category.',
    facts: ['Swiss-based privateer team', 'Consistent top-5 finisher at Le Mans', 'Uses Gibson V8 powerplant']
  },
  { 
    id: 'united-22', name: 'United Autosports', manufacturer: 'Oreca', carNumber: '#22', class: 'LMP2', 
    points: 105, position: 4, color: '#FFD700', country: 'UK', countryFlag: '🇬🇧', 
    drivers: ['hanson', 'scherer', 'albuquerque'],
    fullName: 'United Autosports', chassis: 'Oreca 07', engine: 'Gibson GK428 4.2L V8',
    teamPrincipal: 'Zak Brown', base: 'Leeds, United Kingdom', founded: '2010', wecDebut: '2017',
    championships: 2, leMansWins: 1, wecWins: 8, poles: 5, fastestLaps: 7,
    about: 'United Autosports, co-owned by McLaren CEO Zak Brown, is one of the most successful LMP2 teams in recent history.',
    facts: ['Co-owned by McLaren CEO Zak Brown', 'Multiple LMP2 championship titles', 'Also competes in IMSA']
  },
  { 
    id: 'inter-34', name: 'Inter Europol Competition', manufacturer: 'Oreca', carNumber: '#34', class: 'LMP2', 
    points: 92, position: 5, color: '#FF4500', country: 'Poland', countryFlag: '🇵🇱', 
    drivers: ['smiechowski', 'kari', 'gore'],
    fullName: 'Inter Europol Competition', chassis: 'Oreca 07', engine: 'Gibson GK428 4.2L V8',
    teamPrincipal: 'Jakub Smiechowski', base: 'Warsaw, Poland', founded: '2012', wecDebut: '2018',
    championships: 0, leMansWins: 0, wecWins: 1, poles: 0, fastestLaps: 1,
    about: 'Inter Europol Competition is a Polish racing team that has expanded from national racing to international endurance competition.',
    facts: ['First Polish team in WEC', 'Consistent Le Mans competitor', 'Family-run operation']
  },
  // LMGT3 (GT3-based customer racing category)
  { 
    id: 'hor-27', name: 'Heart of Racing', manufacturer: 'Aston Martin', carNumber: '#27', class: 'LMGT3', 
    points: 124, position: 1, color: '#006400', country: 'USA', countryFlag: '🇺🇸', 
    drivers: ['sorensen', 'gunn', 'de-angelis'],
    fullName: 'Heart of Racing Team', chassis: 'Aston Martin Vantage AMR GT3', engine: 'Aston Martin 4.0L Twin-Turbo V8',
    teamPrincipal: 'Ian James', base: 'Indianapolis, USA', founded: '2020', wecDebut: '2024',
    championships: 0, leMansWins: 0, wecWins: 2, poles: 2, fastestLaps: 3,
    about: 'Heart of Racing is an American team that has quickly established itself in GT racing with strong Aston Martin factory support.',
    facts: ['American-based Aston Martin customer team', 'Also competes in IMSA WeatherTech Championship', 'Team owner Ian James also drives']
  },
  { 
    id: 'manthey-91', name: 'Manthey EMA', manufacturer: 'Porsche', carNumber: '#91', class: 'LMGT3', 
    points: 118, position: 2, color: '#FFA500', country: 'Germany', countryFlag: '🇩🇪', 
    drivers: ['bachler', 'malykhin', 'sturm'],
    fullName: 'Manthey EMA', chassis: 'Porsche 911 GT3 R (992)', engine: 'Porsche 4.0L Flat-Six',
    teamPrincipal: 'Nicolas Raeder', base: 'Meuspath, Germany', founded: '1996', wecDebut: '2024',
    championships: 0, leMansWins: 0, wecWins: 1, poles: 3, fastestLaps: 2,
    about: 'Manthey is a legendary Porsche partner team with decades of success at the Nürburgring and now competing in WEC LMGT3.',
    facts: ['Legendary Porsche partner team', 'Multiple Nürburgring 24h winners', 'Based near the Nürburgring']
  },
  { 
    id: 'iron-85', name: 'Iron Dames', manufacturer: 'Lamborghini', carNumber: '#85', class: 'LMGT3', 
    points: 105, position: 3, color: '#FF1493', country: 'Italy', countryFlag: '🇮🇹', 
    drivers: ['gatting', 'frey', 'pin'],
    fullName: 'Iron Dames', chassis: 'Lamborghini Huracán GT3 EVO2', engine: 'Lamborghini 5.2L V10',
    teamPrincipal: 'Deborah Mayer', base: 'Piacenza, Italy', founded: '2019', wecDebut: '2024',
    championships: 0, leMansWins: 0, wecWins: 0, poles: 1, fastestLaps: 1,
    about: 'Iron Dames is an all-female racing project promoting women in motorsport, competing with factory Lamborghini support.',
    facts: ['All-female driver lineup', 'Lamborghini factory-supported program', 'Competes globally to promote women in motorsport']
  },
  { 
    id: 'proton-77', name: 'Proton Competition', manufacturer: 'Ford', carNumber: '#77', class: 'LMGT3', 
    points: 98, position: 4, color: '#4169E1', country: 'Germany', countryFlag: '🇩🇪', 
    drivers: ['ried', 'priaulx', 'tincknell'],
    fullName: 'Proton Competition', chassis: 'Ford Mustang GT3', engine: 'Ford 5.0L Coyote V8',
    teamPrincipal: 'Christian Ried', base: 'Griesheim, Germany', founded: '2006', wecDebut: '2012',
    championships: 0, leMansWins: 1, wecWins: 4, poles: 2, fastestLaps: 3,
    about: 'Proton Competition is a German customer racing team with extensive experience in endurance racing, now running Ford machinery.',
    facts: ['Long-time Porsche partner now running Ford', 'Class winners at Le Mans', 'German privateer team']
  },
  { 
    id: 'afc-55', name: 'AF Corse', manufacturer: 'Ferrari', carNumber: '#55', class: 'LMGT3', 
    points: 92, position: 5, color: '#DC143C', country: 'Italy', countryFlag: '🇮🇹', 
    drivers: ['costa', 'ledogar', 'sernagiotto'],
    fullName: 'AF Corse', chassis: 'Ferrari 296 GT3', engine: 'Ferrari 3.0L Twin-Turbo V6',
    teamPrincipal: 'Amato Ferrari', base: 'Piacenza, Italy', founded: '1995', wecDebut: '2008',
    championships: 5, leMansWins: 4, wecWins: 28, poles: 15, fastestLaps: 20,
    about: 'AF Corse is the official Ferrari racing partner with unparalleled success in GT racing, now also running the Hypercar program.',
    facts: ['Official Ferrari racing partner', 'Most successful GT team in WEC history', 'Also runs Ferrari Hypercar program']
  },
];

// 2024 Season Races (COMPLETED)
export const races2024: Race[] = [
  {
    id: '2024-1', name: '1812 km of Qatar', circuit: 'Lusail International Circuit', country: 'Qatar', 
    date: '2024-03-02', duration: '10 Hours', status: 'completed', flag: '🇶🇦', season: 2024, round: 1,
    winner: 'Toyota #8', winningTeam: 'Toyota Gazoo Racing', trackLength: '5.419 km', laps: 334,
    sessions: [
      { type: 'FP1', date: '2024-02-29', startTime: '11:00', endTime: '12:30', duration: '1h 30m' },
      { type: 'FP2', date: '2024-02-29', startTime: '16:00', endTime: '17:30', duration: '1h 30m' },
      { type: 'Qualifying', date: '2024-03-01', startTime: '17:30', endTime: '18:30', duration: '1h' },
      { type: 'Hyperpole', date: '2024-03-01', startTime: '18:40', endTime: '18:55', duration: '15m' },
      { type: 'Race', date: '2024-03-02', startTime: '12:00', endTime: '22:00', duration: '10h' },
    ]
  },
  { 
    id: '2024-2', name: '6 Hours of Imola', circuit: 'Autodromo Enzo e Dino Ferrari', country: 'Italy', 
    date: '2024-04-21', duration: '6 Hours', status: 'completed', flag: '🇮🇹', season: 2024, round: 2,
    winner: 'Ferrari #50', winningTeam: 'Ferrari AF Corse', trackLength: '4.909 km', laps: 212,
    sessions: [
      { type: 'FP1', date: '2024-04-19', startTime: '10:25', endTime: '11:55', duration: '1h 30m' },
      { type: 'FP2', date: '2024-04-19', startTime: '15:30', endTime: '17:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2024-04-20', startTime: '14:40', endTime: '15:40', duration: '1h' },
      { type: 'Hyperpole', date: '2024-04-20', startTime: '15:50', endTime: '16:05', duration: '15m' },
      { type: 'Race', date: '2024-04-21', startTime: '12:00', endTime: '18:00', duration: '6h' },
    ]
  },
  { 
    id: '2024-3', name: '6 Hours of Spa', circuit: 'Circuit de Spa-Francorchamps', country: 'Belgium', 
    date: '2024-05-11', duration: '6 Hours', status: 'completed', flag: '🇧🇪', season: 2024, round: 3,
    winner: 'Porsche #6', winningTeam: 'Porsche Penske Motorsport', trackLength: '7.004 km', laps: 166,
    sessions: [
      { type: 'FP1', date: '2024-05-09', startTime: '14:00', endTime: '15:30', duration: '1h 30m' },
      { type: 'FP2', date: '2024-05-09', startTime: '19:00', endTime: '20:30', duration: '1h 30m' },
      { type: 'Qualifying', date: '2024-05-10', startTime: '17:10', endTime: '18:10', duration: '1h' },
      { type: 'Hyperpole', date: '2024-05-10', startTime: '18:20', endTime: '18:35', duration: '15m' },
      { type: 'Race', date: '2024-05-11', startTime: '13:00', endTime: '19:00', duration: '6h' },
    ]
  },
  { 
    id: '2024-4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France', 
    date: '2024-06-15', endDate: '2024-06-16', duration: '24 Hours', status: 'completed', flag: '🇫🇷', season: 2024, round: 4,
    winner: 'Ferrari #50', winningTeam: 'Ferrari AF Corse', trackLength: '13.626 km', laps: 311,
    sessions: [
                  { type: 'FP1', date: '2024-06-12', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'FP2', date: '2024-06-13', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'Qualifying', date: '2024-06-12', startTime: '20:00', endTime: '23:00', duration: '3h' },
      { type: 'Hyperpole', date: '2024-06-13', startTime: '20:00', endTime: '21:00', duration: '1h' },
      { type: 'Warm Up', date: '2024-06-15', startTime: '10:00', endTime: '10:30', duration: '30min' },
      { type: 'Race', date: '2024-06-15', startTime: '16:00', endTime: '16:00', duration: '24h' }


    ]
  },
  { 
    id: '2024-5', name: '6 Hours of São Paulo', circuit: 'Interlagos', country: 'Brazil', 
    date: '2024-07-14', duration: '6 Hours', status: 'completed', flag: '🇧🇷', season: 2024, round: 5,
    winner: 'Toyota #8', winningTeam: 'Toyota Gazoo Racing', trackLength: '4.309 km', laps: 227,
    sessions: [
      { type: 'FP1', date: '2024-07-12', startTime: '10:00', endTime: '11:30', duration: '1h 30m' },
      { type: 'FP2', date: '2024-07-12', startTime: '15:25', endTime: '16:55', duration: '1h 30m' },
      { type: 'Qualifying', date: '2024-07-13', startTime: '14:50', endTime: '15:50', duration: '1h' },
      { type: 'Hyperpole', date: '2024-07-13', startTime: '16:00', endTime: '16:15', duration: '15m' },
      { type: 'Race', date: '2024-07-14', startTime: '11:00', endTime: '17:00', duration: '6h' },
    ]
  },
  { 
    id: '2024-6', name: '6 Hours of COTA', circuit: 'Circuit of the Americas', country: 'USA', 
    date: '2024-09-01', duration: '6 Hours', status: 'completed', flag: '🇺🇸', season: 2024, round: 6,
    winner: 'Porsche #5', winningTeam: 'Porsche Penske Motorsport', trackLength: '5.513 km', laps: 185,
    sessions: [
      { type: 'FP1', date: '2024-08-30', startTime: '10:25', endTime: '11:55', duration: '1h 30m' },
      { type: 'FP2', date: '2024-08-30', startTime: '15:30', endTime: '17:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2024-08-31', startTime: '12:45', endTime: '13:45', duration: '1h' },
      { type: 'Hyperpole', date: '2024-08-31', startTime: '13:55', endTime: '14:10', duration: '15m' },
      { type: 'Race', date: '2024-09-01', startTime: '12:00', endTime: '18:00', duration: '6h' },
    ]
  },
  { 
    id: '2024-7', name: '6 Hours of Fuji', circuit: 'Fuji Speedway', country: 'Japan', 
    date: '2024-09-15', duration: '6 Hours', status: 'completed', flag: '🇯🇵', season: 2024, round: 7,
    winner: 'Toyota #7', winningTeam: 'Toyota Gazoo Racing', trackLength: '4.563 km', laps: 214,
    sessions: [
      { type: 'FP1', date: '2024-09-13', startTime: '09:15', endTime: '10:45', duration: '1h 30m' },
      { type: 'FP2', date: '2024-09-13', startTime: '14:30', endTime: '16:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2024-09-14', startTime: '13:10', endTime: '14:10', duration: '1h' },
      { type: 'Hyperpole', date: '2024-09-14', startTime: '14:20', endTime: '14:35', duration: '15m' },
      { type: 'Race', date: '2024-09-15', startTime: '11:00', endTime: '17:00', duration: '6h' },
    ]
  },
  { 
    id: '2024-8', name: '8 Hours of Bahrain', circuit: 'Bahrain International Circuit', country: 'Bahrain', 
    date: '2024-11-02', duration: '8 Hours', status: 'completed', flag: '🇧🇭', season: 2024, round: 8,
    winner: 'Ferrari #50', winningTeam: 'Ferrari AF Corse', trackLength: '5.412 km', laps: 270,
    sessions: [
      { type: 'FP1', date: '2024-10-31', startTime: '11:00', endTime: '12:30', duration: '1h 30m' },
      { type: 'FP2', date: '2024-10-31', startTime: '16:00', endTime: '17:30', duration: '1h 30m' },
      { type: 'Qualifying', date: '2024-11-01', startTime: '17:30', endTime: '18:30', duration: '1h' },
      { type: 'Hyperpole', date: '2024-11-01', startTime: '18:40', endTime: '18:55', duration: '15m' },
      { type: 'Race', date: '2024-11-02', startTime: '14:00', endTime: '22:00', duration: '8h' },
    ]
  },
];

// 2025 Season Races (COMPLETED)
export const races2025: Race[] = [
  { 
    id: '2025-1', name: '1812 km of Qatar', circuit: 'Lusail International Circuit', country: 'Qatar', 
    date: '2025-02-28', duration: '10 Hours', status: 'completed', flag: '🇶🇦', season: 2025, round: 1,
    winner: 'Ferrari #51', winningTeam: 'Ferrari AF Corse', trackLength: '5.419 km', laps: 336,
    sessions: [
      { type: 'FP1', date: '2025-02-26', startTime: '11:00', endTime: '12:30', duration: '1h 30m' },
      { type: 'FP2', date: '2025-02-26', startTime: '16:00', endTime: '17:30', duration: '1h 30m' },
      { type: 'Qualifying', date: '2025-02-27', startTime: '17:30', endTime: '18:30', duration: '1h' },
      { type: 'Hyperpole', date: '2025-02-27', startTime: '18:40', endTime: '18:55', duration: '15m' },
      { type: 'Race', date: '2025-02-28', startTime: '12:00', endTime: '22:00', duration: '10h' },
    ]
  },
  { 
    id: '2025-2', name: '6 Hours of Imola', circuit: 'Autodromo Enzo e Dino Ferrari', country: 'Italy', 
    date: '2025-04-20', duration: '6 Hours', status: 'completed', flag: '🇮🇹', season: 2025, round: 2,
    winner: 'Ferrari #51', winningTeam: 'Ferrari AF Corse', trackLength: '4.909 km', laps: 210,
    sessions: [
      { type: 'FP1', date: '2025-04-18', startTime: '10:25', endTime: '11:55', duration: '1h 30m' },
      { type: 'FP2', date: '2025-04-18', startTime: '15:30', endTime: '17:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2025-04-19', startTime: '14:40', endTime: '15:40', duration: '1h' },
      { type: 'Hyperpole', date: '2025-04-19', startTime: '15:50', endTime: '16:05', duration: '15m' },
      { type: 'Race', date: '2025-04-20', startTime: '12:00', endTime: '18:00', duration: '6h' },
    ]
  },
  { 
    id: '2025-3', name: '6 Hours of Spa', circuit: 'Circuit de Spa-Francorchamps', country: 'Belgium', 
    date: '2025-05-10', duration: '6 Hours', status: 'completed', flag: '🇧🇪', season: 2025, round: 3,
    winner: 'Porsche #5', winningTeam: 'Porsche Penske Motorsport', trackLength: '7.004 km', laps: 164,
    sessions: [
      { type: 'FP1', date: '2025-05-08', startTime: '14:00', endTime: '15:30', duration: '1h 30m' },
      { type: 'FP2', date: '2025-05-08', startTime: '19:00', endTime: '20:30', duration: '1h 30m' },
      { type: 'Qualifying', date: '2025-05-09', startTime: '17:10', endTime: '18:10', duration: '1h' },
      { type: 'Hyperpole', date: '2025-05-09', startTime: '18:20', endTime: '18:35', duration: '15m' },
      { type: 'Race', date: '2025-05-10', startTime: '13:00', endTime: '19:00', duration: '6h' },
    ]
  },
  { 
    id: '2025-4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France', 
    date: '2025-06-14', endDate: '2025-06-15', duration: '24 Hours', status: 'completed', flag: '🇫🇷', season: 2025, round: 4,
    winner: 'AF Corse #83', winningTeam: 'AF Corse', trackLength: '13.626 km', laps: 315,
    sessions: [
                  { type: 'FP1', date: '2025-06-11', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'FP2', date: '2025-06-12', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'Qualifying', date: '2025-06-11', startTime: '20:00', endTime: '23:00', duration: '3h' },
      { type: 'Hyperpole', date: '2025-06-12', startTime: '20:00', endTime: '21:00', duration: '1h' },
      { type: 'Warm Up', date: '2025-06-14', startTime: '10:00', endTime: '10:30', duration: '30min' },
      { type: 'Race', date: '2025-06-14', startTime: '16:00', endTime: '16:00', duration: '24h' }


    ]
  }
];

export const drivers2025: Driver[] = [
  {
    id: 'pier-guidi-2025',
    name: 'Alessandro Pier Guidi',
    firstName: 'Alessandro',
    lastName: 'Pier Guidi',
    nationality: 'Italian',
    countryFlag: '🇮🇹',
    team: 'Ferrari AF Corse',
    teamId: 'ferrari-51',
    carNumber: '#51',
    class: 'HYPERCAR',
    points: 228,
    position: 1,
    dateOfBirth: '1983-12-18',
    placeOfBirth: 'Tortona, Italy',
    biography: 'Alessandro Pier Guidi added another WEC title to his impressive resume in 2025.',
    careerHighlights: ['2025 WEC World Champion', 'Le Mans 24h Winner'],
    facts: ['Key development driver for the 499P'],
    championships: 1,
    leMansWins: 1,
    wecWins: 4,
  },
  {
    id: 'giovinazzi-2025',
    name: 'Antonio Giovinazzi',
    firstName: 'Antonio',
    lastName: 'Giovinazzi',
    nationality: 'Italian',
    countryFlag: '🇮🇹',
    team: 'Ferrari AF Corse',
    teamId: 'ferrari-51',
    carNumber: '#51',
    class: 'HYPERCAR',
    points: 228,
    position: 1,
    dateOfBirth: '1993-12-14',
    placeOfBirth: 'Martina Franca, Italy',
    biography: 'Antonio Giovinazzi completed the championship-winning crew for Ferrari in 2025.',
    careerHighlights: ['2025 WEC World Champion', 'Le Mans 24h Winner'],
    facts: ['Former Formula 1 driver'],
    championships: 1,
    leMansWins: 1,
    wecWins: 4,
  },
  {
    id: 'estre-2025',
    name: 'Kévin Estre',
    firstName: 'Kévin',
    lastName: 'Estre',
    nationality: 'French',
    countryFlag: '🇫🇷',
    team: 'Porsche Penske Motorsport',
    teamId: 'porsche-6',
    carNumber: '#6',
    class: 'HYPERCAR',
    points: 154,
    position: 4,
    dateOfBirth: '1988-07-02',
    placeOfBirth: 'Martigues, France',
    biography: 'Kévin Estre completed the 2025 WEC season with Porsche Penske Motorsport.',
    careerHighlights: ['24 Hours of Le Mans class winner (2018 GTE Pro)'],
    facts: ['Strong performance in 2025'],
    championships: 1,
    leMansWins: 0,
    wecWins: 5,
  },
  {
    id: 'lotterer-2025',
    name: 'André Lotterer',
    firstName: 'André',
    lastName: 'Lotterer',
    nationality: 'German',
    countryFlag: '🇩🇪',
    team: 'Porsche Penske Motorsport',
    teamId: 'porsche-6',
    carNumber: '#6',
    class: 'HYPERCAR',
    points: 154,
    position: 4,
    dateOfBirth: '1981-11-19',
    placeOfBirth: 'Duisburg, Germany',
    biography: 'André Lotterer added another WEC season to his impressive resume in 2025.',
    careerHighlights: ['3-time 24 Hours of Le Mans winner'],
    facts: ['Multiple WEC titles across different eras'],
    championships: 1,
    leMansWins: 3,
    wecWins: 14,
  },
  {
    id: 'vanthoor-2025',
    name: 'Laurens Vanthoor',
    firstName: 'Laurens',
    lastName: 'Vanthoor',
    nationality: 'Belgian',
    countryFlag: '🇧🇪',
    team: 'Porsche Penske Motorsport',
    teamId: 'porsche-6',
    carNumber: '#6',
    class: 'HYPERCAR',
    points: 154,
    position: 4,
    dateOfBirth: '1991-05-08',
    placeOfBirth: 'Hasselt, Belgium',
    biography: 'Laurens Vanthoor completed the 2025 crew for Porsche.',
    careerHighlights: ['24 Hours of Spa winner'],
    facts: ['Strong pace throughout the season'],
    championships: 1,
    leMansWins: 0,
    wecWins: 4,
  },
  {
    id: 'buemi-2025',
    name: 'Sébastien Buemi',
    firstName: 'Sébastien',
    lastName: 'Buemi',
    nationality: 'Swiss',
    countryFlag: '🇨🇭',
    team: 'Toyota Gazoo Racing',
    teamId: 'toyota-8',
    carNumber: '#8',
    class: 'HYPERCAR',
    points: 148,
    position: 4,
    dateOfBirth: '1988-10-31',
    placeOfBirth: 'Aigle, Switzerland',
    biography: 'Sébastien Buemi continued his dominant form with Toyota in 2025.',
    careerHighlights: ['4-time WEC World Champion', '3-time 24 Hours of Le Mans winner'],
    facts: ['Holds the record for most WEC race wins'],
    championships: 4,
    leMansWins: 3,
    wecWins: 30,
  },
  {
    id: 'hartley-2025',
    name: 'Brendon Hartley',
    firstName: 'Brendon',
    lastName: 'Hartley',
    nationality: 'New Zealander',
    countryFlag: '🇳🇿',
    team: 'Toyota Gazoo Racing',
    teamId: 'toyota-8',
    carNumber: '#8',
    class: 'HYPERCAR',
    points: 148,
    position: 4,
    dateOfBirth: '1989-11-10',
    placeOfBirth: 'Palmerston North, New Zealand',
    biography: 'Brendon Hartley finished runner-up in the 2025 championship.',
    careerHighlights: ['2-time WEC World Champion', '3-time 24 Hours of Le Mans winner'],
    facts: ['Won Le Mans on his debut in 2017'],
    championships: 2,
    leMansWins: 3,
    wecWins: 17,
  },
  {
    id: 'hirakawa-2025',
    name: 'Ryo Hirakawa',
    firstName: 'Ryo',
    lastName: 'Hirakawa',
    nationality: 'Japanese',
    countryFlag: '🇯🇵',
    team: 'Toyota Gazoo Racing',
    teamId: 'toyota-8',
    carNumber: '#8',
    class: 'HYPERCAR',
    points: 148,
    position: 4,
    dateOfBirth: '1994-03-07',
    placeOfBirth: 'Hiroshima, Japan',
    biography: 'Ryo Hirakawa continued to impress in 2025.',
    careerHighlights: ['WEC World Champion (2022)', '24 Hours of Le Mans winner (2022)'],
    facts: ['First Japanese driver to win Le Mans overall since 1995'],
    championships: 1,
    leMansWins: 1,
    wecWins: 8,
  },
  {
    id: 'kobayashi-2025',
    name: 'Kamui Kobayashi',
    firstName: 'Kamui',
    lastName: 'Kobayashi',
    nationality: 'Japanese',
    countryFlag: '🇯🇵',
    team: 'Toyota Gazoo Racing',
    teamId: 'toyota-7',
    carNumber: '#7',
    class: 'HYPERCAR',
    points: 162,
    position: 2,
    dateOfBirth: '1986-09-13',
    placeOfBirth: 'Amagasaki, Japan',
    biography: 'Kamui Kobayashi won Le Mans 2025 but narrowly missed the championship.',
    careerHighlights: ['2025 Le Mans Winner', 'Team Principal of Toyota WEC'],
    facts: ['Both drives and manages Toyota WEC operations'],
    championships: 0,
    leMansWins: 3,
    wecWins: 12,
  },
  {
    id: 'conway-2025',
    name: 'Mike Conway',
    firstName: 'Mike',
    lastName: 'Conway',
    nationality: 'British',
    countryFlag: '🇬🇧',
    team: 'Toyota Gazoo Racing',
    teamId: 'toyota-7',
    carNumber: '#7',
    class: 'HYPERCAR',
    points: 162,
    position: 2,
    dateOfBirth: '1983-08-19',
    placeOfBirth: 'Bromley, England',
    biography: 'Mike Conway won Le Mans 2025 with Toyota #7.',
    careerHighlights: ['2025 Le Mans Winner', '2-time Le Mans winner'],
    facts: ['Veteran endurance racer'],
    championships: 0,
    leMansWins: 2,
    wecWins: 10,
  },
  {
    id: 'delacruz-2025',
    name: 'Nyck de Vries',
    firstName: 'Nyck',
    lastName: 'de Vries',
    nationality: 'Dutch',
    countryFlag: '🇳🇱',
    team: 'Toyota Gazoo Racing',
    teamId: 'toyota-7',
    carNumber: '#7',
    class: 'HYPERCAR',
    points: 162,
    position: 2,
    dateOfBirth: '1995-02-06',
    placeOfBirth: 'Sneek, Netherlands',
    biography: 'Nyck de Vries joined Toyota and won Le Mans in his first season.',
    careerHighlights: ['2025 Le Mans Winner', 'Formula E Champion (2021)'],
    facts: ['Former F1 driver'],
    championships: 0,
    leMansWins: 1,
    wecWins: 3,
  },
  {
    id: 'fuoco-2025',
    name: 'Antonio Fuoco',
    firstName: 'Antonio',
    lastName: 'Fuoco',
    nationality: 'Italian',
    countryFlag: '🇮🇹',
    team: 'Ferrari AF Corse',
    teamId: 'ferrari-50',
    carNumber: '#50',
    class: 'HYPERCAR',
    points: 132,
    position: 7,
    dateOfBirth: '1996-03-20',
    placeOfBirth: 'Cariati, Italy',
    biography: 'Antonio Fuoco defended Ferrari\'s honor but couldn\'t repeat 2024\'s title success.',
    careerHighlights: ['2024 WEC Champion', '24 Hours of Le Mans winner (2024)'],
    facts: ['Back-to-back Le Mans winner (2023-2024)'],
    championships: 1,
    leMansWins: 1,
    wecWins: 6,
  },
];

export const teams2025: Team[] = [
  // HYPERCAR - 2025 Final Standings
  { 
    id: 'ferrari-51-2025', name: 'Ferrari AF Corse', manufacturer: 'Ferrari', carNumber: '#51', class: 'HYPERCAR',
    points: 228, position: 1, color: '#DC0000', country: 'Italy', countryFlag: '🇮🇹',
    drivers: ['calado', 'pier-guidi', 'giovinazzi'],
    fullName: 'Ferrari AF Corse', chassis: 'Ferrari 499P', engine: 'Ferrari 3.0L Twin-Turbo V6 Hybrid',
    teamPrincipal: 'Antonello Coletta', base: 'Maranello, Italy', founded: '2021', wecDebut: '2023',
    championships: 1, leMansWins: 1, wecWins: 3, poles: 4, fastestLaps: 5,
    about: '2025 FIA WEC Hypercar World Champions. Ferrari AF Corse clinched the title after a dramatic season, proving the 499P to be the class of the field.',
    facts: ['2025 World Champions', 'Won at COTA', 'Strong mid-season form']
  },
  { 
    id: 'toyota-7-2025', name: 'Toyota Gazoo Racing', manufacturer: 'Toyota', carNumber: '#7', class: 'HYPERCAR', 
    points: 192, position: 2, color: '#E60012', country: 'Japan', countryFlag: '🇯🇵', 
    drivers: ['kobayashi-2025', 'conway-2025', 'delacruz-2025'],
    fullName: 'Toyota Gazoo Racing', chassis: 'Toyota GR010 Hybrid', engine: 'Toyota 3.5L Twin-Turbo V6 Hybrid',
    teamPrincipal: 'Kamui Kobayashi', base: 'Cologne, Germany', founded: '1999', wecDebut: '2012',
    championships: 6, leMansWins: 6, wecWins: 38, poles: 30, fastestLaps: 34,
    about: 'Le Mans 2025 winners but narrowly missed the championship. Toyota #7 won the biggest race but lost the title.',
    facts: ['2025 Le Mans Winners', 'Nyck de Vries joined the team', 'Kamui Kobayashi serves as driver and team principal']
  },
  { 
    id: 'toyota-8-2025', name: 'Toyota Gazoo Racing', manufacturer: 'Toyota', carNumber: '#8', class: 'HYPERCAR', 
    points: 176, position: 3, color: '#E60012', country: 'Japan', countryFlag: '🇯🇵', 
    drivers: ['buemi-2025', 'hartley-2025', 'hirakawa-2025'],
    fullName: 'Toyota Gazoo Racing', chassis: 'Toyota GR010 Hybrid', engine: 'Toyota 3.5L Twin-Turbo V6 Hybrid',
    teamPrincipal: 'Kamui Kobayashi', base: 'Cologne, Germany', founded: '1999', wecDebut: '2012',
    championships: 6, leMansWins: 5, wecWins: 37, poles: 28, fastestLaps: 32,
    about: 'The #8 Toyota had a consistent but not winning season in 2025.',
    facts: ['Finished P3 in championship', 'Won at Fuji', 'Strong qualifying pace throughout']
  },
  { 
    id: 'porsche-6-2025', name: 'Porsche Penske Motorsport', manufacturer: 'Porsche', carNumber: '#6', class: 'HYPERCAR',
    points: 168, position: 4, color: '#C4A747', country: 'Germany', countryFlag: '🇩🇪', 
    drivers: ['estre-2025', 'lotterer-2025', 'vanthoor-2025'],
    fullName: 'Porsche Penske Motorsport', chassis: 'Porsche 963', engine: 'Porsche 4.6L Twin-Turbo V8 Hybrid',
    teamPrincipal: 'Urs Kuratle', base: 'Mooresville, USA', founded: '2022', wecDebut: '2023',
    championships: 0, leMansWins: 0, wecWins: 6, poles: 6, fastestLaps: 7,
    about: 'Porsche Penske Motorsport #6 had a solid 2025 season.',
    facts: ['Won 3 races', 'Strong early season']
  },
  {
    id: 'porsche-5-2025', name: 'Porsche Penske Motorsport', manufacturer: 'Porsche', carNumber: '#5', class: 'HYPERCAR',
    points: 152, position: 5, color: '#C4A747', country: 'Germany', countryFlag: '🇩🇪',
    drivers: ['campbell', 'christensen', 'makowiecki'],
    fullName: 'Porsche Penske Motorsport', chassis: 'Porsche 963', engine: 'Porsche 4.6L Twin-Turbo V8 Hybrid',
    teamPrincipal: 'Urs Kuratle', base: 'Mooresville, USA', founded: '2022', wecDebut: '2023',
    championships: 0, leMansWins: 0, wecWins: 4, poles: 3, fastestLaps: 4,
    about: 'The #5 Porsche won at Spa 2025 in dominant fashion.',
    facts: ['Won at Spa-Francorchamps', 'P5 in championship']
  },
  { 
    id: 'ferrari-50-2025', name: 'Ferrari AF Corse', manufacturer: 'Ferrari', carNumber: '#50', class: 'HYPERCAR', 
    points: 148, position: 6, color: '#DC0000', country: 'Italy', countryFlag: '🇮🇹', 
    drivers: ['fuoco-2025', 'molina', 'nielsen'],
    fullName: 'Ferrari AF Corse', chassis: 'Ferrari 499P', engine: 'Ferrari 3.0L Twin-Turbo V6 Hybrid',
    teamPrincipal: 'Antonello Coletta', base: 'Maranello, Italy', founded: '2021', wecDebut: '2023',
    championships: 1, leMansWins: 1, wecWins: 5, poles: 5, fastestLaps: 6,
    about: 'The 2024 champions had a difficult 2025 season, unable to defend their title.',
    facts: ['2024 World Champions', 'Struggled with reliability in 2025']
  },
  { id: 'cadillac-2-2025', name: 'Cadillac Racing', manufacturer: 'Cadillac', carNumber: '#2', class: 'HYPERCAR', points: 124, position: 7, color: '#1E1E1E', country: 'USA', countryFlag: '🇺🇸', drivers: ['bamber', 'lynn', 'westbrook'] },
  { id: 'peugeot-93-2025', name: 'Peugeot TotalEnergies', manufacturer: 'Peugeot', carNumber: '#93', class: 'HYPERCAR', points: 108, position: 8, color: '#0066B1', country: 'France', countryFlag: '🇫🇷', drivers: ['jensen', 'vergne', 'muller'] },
  { id: 'alpine-35-2025', name: 'Alpine Endurance Team', manufacturer: 'Alpine', carNumber: '#35', class: 'HYPERCAR', points: 92, position: 9, color: '#0090FF', country: 'France', countryFlag: '🇫🇷', drivers: ['schumacher', 'lapierre', 'chatin'] },
  { id: 'peugeot-94-2025', name: 'Peugeot TotalEnergies', manufacturer: 'Peugeot', carNumber: '#94', class: 'HYPERCAR', points: 86, position: 10, color: '#0066B1', country: 'France', countryFlag: '🇫🇷', drivers: ['vandoorne', 'di-resta', 'duval'] },
  // LMP2 (Le Mans 24h Only)
  { 
    id: 'united-22-2025', name: 'United Autosports', manufacturer: 'Oreca', carNumber: '#22', class: 'LMP2', 
    points: 38, position: 1, color: '#FFD700', country: 'UK', countryFlag: '🇬🇧', 
    drivers: ['hanson', 'scherer', 'albuquerque'],
    fullName: 'United Autosports', chassis: 'Oreca 07', engine: 'Gibson GK428 4.2L V8',
    teamPrincipal: 'Zak Brown', base: 'Leeds, United Kingdom', founded: '2010', wecDebut: '2017',
    championships: 2, leMansWins: 2, wecWins: 9, poles: 6, fastestLaps: 8,
    about: 'United Autosports won LMP2 at Le Mans 2025.',
    facts: ['2025 Le Mans LMP2 Winners']
  },
  // LMGT3
  { 
    id: 'manthey-91-2025', name: 'Manthey EMA', manufacturer: 'Porsche', carNumber: '#91', class: 'LMGT3', 
    points: 142, position: 1, color: '#FFA500', country: 'Germany', countryFlag: '🇩🇪', 
    drivers: ['bachler', 'malykhin', 'sturm'],
    fullName: 'Manthey EMA', chassis: 'Porsche 911 GT3 R (992)', engine: 'Porsche 4.0L Flat-Six',
    teamPrincipal: 'Nicolas Raeder', base: 'Meuspath, Germany', founded: '1996', wecDebut: '2024',
    championships: 1, leMansWins: 1, wecWins: 4, poles: 5, fastestLaps: 4,
    about: '2025 LMGT3 World Champions. Manthey dominated the GT class.',
    facts: ['2025 LMGT3 Champions', 'Won at Le Mans']
  },
  { 
    id: 'hor-27-2025', name: 'Heart of Racing', manufacturer: 'Aston Martin', carNumber: '#27', class: 'LMGT3', 
    points: 128, position: 2, color: '#006400', country: 'USA', countryFlag: '🇺🇸', 
    drivers: ['sorensen', 'gunn', 'de-angelis'],
    fullName: 'Heart of Racing Team', chassis: 'Aston Martin Vantage AMR GT3', engine: 'Aston Martin 4.0L Twin-Turbo V8',
    teamPrincipal: 'Ian James', base: 'Indianapolis, USA', founded: '2020', wecDebut: '2024',
    championships: 0, leMansWins: 0, wecWins: 3, poles: 3, fastestLaps: 4,
    about: 'Heart of Racing finished runner-up in 2025 LMGT3.',
    facts: ['P2 in championship', 'Strong American presence']
  },
  { 
    id: 'afc-55-2025', name: 'AF Corse', manufacturer: 'Ferrari', carNumber: '#55', class: 'LMGT3', 
    points: 118, position: 3, color: '#DC143C', country: 'Italy', countryFlag: '🇮🇹', 
    drivers: ['costa', 'ledogar', 'sernagiotto'],
    fullName: 'AF Corse', chassis: 'Ferrari 296 GT3', engine: 'Ferrari 3.0L Twin-Turbo V6',
    teamPrincipal: 'Amato Ferrari', base: 'Piacenza, Italy', founded: '1995', wecDebut: '2008',
    championships: 5, leMansWins: 4, wecWins: 29, poles: 16, fastestLaps: 21,
    about: 'AF Corse Ferrari finished P3 in LMGT3 2025.',
    facts: ['P3 in championship', 'Most experienced GT team']
  },
];

// Export combined data
export const drivers = drivers2024;
export const teams = teams2024;

export const races2026: Race[] = [
  {
    id: '2026-1', name: '1812 km of Qatar', circuit: 'Lusail International Circuit', country: 'Qatar',
    date: '2026-03-28', duration: '1812 km', status: 'postponed', flag: '🇶🇦', season: 2026, round: null, roundNote: 'Postponed — rescheduled date TBC',
    trackLength: '5.419 km',
    sessions: [
      { type: 'FP1', date: '2026-03-26', startTime: '11:00', endTime: '12:30', duration: '1h 30m' },
      { type: 'FP2', date: '2026-03-26', startTime: '16:00', endTime: '17:30', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-03-27', startTime: '17:30', endTime: '18:30', duration: '1h' },
      { type: 'Hyperpole', date: '2026-03-27', startTime: '18:40', endTime: '18:55', duration: '15m' },
      { type: 'Race', date: '2026-03-28', startTime: '12:00', endTime: '22:00', duration: '~10h' },
    ]
  },
  {
    id: '2026-2', name: '6 Hours of Imola', circuit: 'Autodromo Enzo e Dino Ferrari', country: 'Italy',
    date: '2026-04-19', duration: '6 Hours', status: 'completed', flag: '🇮🇹', season: 2026, round: 1,
    winner: 'Toyota #8', winningTeam: 'Toyota Gazoo Racing',
    trackLength: '4.909 km',
    sessions: [
      { type: 'FP1', date: '2026-04-17', startTime: '10:25', endTime: '11:55', duration: '1h 30m' },
      { type: 'FP2', date: '2026-04-17', startTime: '15:30', endTime: '17:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-04-18', startTime: '14:40', endTime: '15:40', duration: '1h' },
      { type: 'Hyperpole', date: '2026-04-18', startTime: '15:50', endTime: '16:05', duration: '15m' },
      { type: 'Race', date: '2026-04-19', startTime: '12:00', endTime: '18:00', duration: '6h' },
    ]
  },
  {
    id: '2026-3', name: '6 Hours of Spa', circuit: 'Circuit de Spa-Francorchamps', country: 'Belgium',
    date: '2026-05-10', duration: '6 Hours', status: 'upcoming', flag: '🇧🇪', season: 2026, round: 2,
    trackLength: '7.004 km',
    sessions: [
      { type: 'FP1', date: '2026-05-08', startTime: '14:00', endTime: '15:30', duration: '1h 30m' },
      { type: 'FP2', date: '2026-05-08', startTime: '19:00', endTime: '20:30', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-05-09', startTime: '17:10', endTime: '18:10', duration: '1h' },
      { type: 'Hyperpole', date: '2026-05-09', startTime: '18:20', endTime: '18:35', duration: '15m' },
      { type: 'Race', date: '2026-05-10', startTime: '13:00', endTime: '19:00', duration: '6h' },
    ]
  },
  {
    id: '2026-4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France',
    date: '2026-06-13', endDate: '2026-06-14', duration: '24 Hours', status: 'upcoming', flag: '🇫🇷', season: 2026, round: 3,
    trackLength: '13.626 km',
    sessions: [
            { type: 'FP1', date: '2026-06-08', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'FP2', date: '2026-06-10', startTime: '14:00', endTime: '19:00', duration: '5h' },
      { type: 'Qualifying', date: '2026-06-09', startTime: '20:00', endTime: '23:00', duration: '3h' },
      { type: 'Hyperpole', date: '2026-06-11', startTime: '20:00', endTime: '21:00', duration: '1h' },
      { type: 'Warm Up', date: '2026-06-13', startTime: '10:00', endTime: '10:30', duration: '30min' },
      { type: 'Race', date: '2026-06-13', startTime: '16:00', endTime: '16:00', duration: '24h' }

    ]
  },
  {
    id: '2026-5', name: '6 Hours of São Paulo', circuit: 'Interlagos', country: 'Brazil',
    date: '2026-07-12', duration: '6 Hours', status: 'upcoming', flag: '🇧🇷', season: 2026, round: 4,
    trackLength: '4.309 km',
    sessions: [
      { type: 'FP1', date: '2026-07-10', startTime: '10:00', endTime: '11:30', duration: '1h 30m' },
      { type: 'FP2', date: '2026-07-10', startTime: '15:25', endTime: '16:55', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-07-11', startTime: '14:50', endTime: '15:50', duration: '1h' },
      { type: 'Hyperpole', date: '2026-07-11', startTime: '16:00', endTime: '16:15', duration: '15m' },
      { type: 'Race', date: '2026-07-12', startTime: '11:30', endTime: '17:30', duration: '6h' },
    ]
  },
  {
    id: '2026-6', name: 'Lone Star Le Mans', circuit: 'Circuit of the Americas', country: 'USA',
    date: '2026-09-06', duration: '6 Hours', status: 'upcoming', flag: '🇺🇸', season: 2026, round: 5,
    trackLength: '5.513 km',
    sessions: [
      { type: 'FP1', date: '2026-09-04', startTime: '12:40', endTime: '14:10', duration: '1h 30m' },
      { type: 'FP2', date: '2026-09-04', startTime: '17:10', endTime: '18:40', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-09-05', startTime: '15:20', endTime: '16:20', duration: '1h' },
      { type: 'Hyperpole', date: '2026-09-05', startTime: '16:30', endTime: '16:45', duration: '15m' },
      { type: 'Race', date: '2026-09-06', startTime: '13:00', endTime: '19:00', duration: '6h' },
    ]
  },
  {
    id: '2026-7', name: '6 Hours of Fuji', circuit: 'Fuji Speedway', country: 'Japan',
    date: '2026-09-27', duration: '6 Hours', status: 'upcoming', flag: '🇯🇵', season: 2026, round: 6,
    trackLength: '4.563 km',
    sessions: [
      { type: 'FP1', date: '2026-09-25', startTime: '11:00', endTime: '12:30', duration: '1h 30m' },
      { type: 'FP2', date: '2026-09-25', startTime: '15:30', endTime: '17:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-09-26', startTime: '14:40', endTime: '15:40', duration: '1h' },
      { type: 'Hyperpole', date: '2026-09-26', startTime: '15:50', endTime: '16:05', duration: '15m' },
      { type: 'Race', date: '2026-09-27', startTime: '11:00', endTime: '17:00', duration: '6h' },
    ]
  },
  {
    id: '2026-8', name: '8 Hours of Bahrain', circuit: 'Bahrain International Circuit', country: 'Bahrain',
    date: '2026-11-07', duration: '8 Hours', status: 'upcoming', flag: '🇧🇭', season: 2026, round: 7,
    trackLength: '5.412 km',
    sessions: [
      { type: 'FP1', date: '2026-11-05', startTime: '12:15', endTime: '13:45', duration: '1h 30m' },
      { type: 'FP2', date: '2026-11-05', startTime: '17:30', endTime: '19:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-11-06', startTime: '16:15', endTime: '17:15', duration: '1h' },
      { type: 'Hyperpole', date: '2026-11-06', startTime: '17:25', endTime: '17:40', duration: '15m' },
      { type: 'Race', date: '2026-11-07', startTime: '14:00', endTime: '22:00', duration: '8h' },
    ]
  }
];

export const races = [...races2024, ...races2025, ...races2026];

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
// Lazy-initialized lookup Maps — built on first call, O(1) lookups thereafter.
// Lazy init is required because drivers2026, hypercars2026, lmgt3Teams2026
// are declared later in this file — eager init causes a ReferenceError (temporal dead zone).
let _driverMap: Map<string, Driver> | null = null;
let _teamMap: Map<string, Team> | null = null;

const getDriverMap = (): Map<string, Driver> => {
  if (!_driverMap) {
    _driverMap = new Map(
      [...drivers2024, ...drivers2025, ...drivers2026].map(d => [d.id, d])
    );
  }
  return _driverMap;
};

const getTeamMap = (): Map<string, Team> => {
  if (!_teamMap) {
    _teamMap = new Map(
      [...teams2024, ...teams2025, ...hypercars2026, ...lmgt3Teams2026].map(t => [t.id, t])
    );
  }
  return _teamMap;
};

export const getDriverById = (id: string): Driver | undefined => getDriverMap().get(id);

export const getTeamById = (id: string): Team | undefined => getTeamMap().get(id);

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

export const isRaceWeek = (race: Race): boolean => {
  const now = new Date();
  const raceDate = new Date(race.date);
  const weekBefore = new Date(raceDate);
  weekBefore.setDate(weekBefore.getDate() - 7);
  return now >= weekBefore && now <= raceDate;
};

export const getCurrentOrNextRaceWeekRace = (): Race | undefined => {
  const now = new Date();
  // First check for any race in its race week
  const raceWeekRace = races.find(r => isRaceWeek(r));
  if (raceWeekRace) return raceWeekRace;
  // Otherwise return next upcoming race
  return races.find(r => new Date(r.date) > now);
};

export const getDriversBySeason = (season: number): Record<string, unknown>[] => {
  return season === 2025 ? standings2025.hypercars.drivers : drivers2024;
};

export const getTeamsBySeason = (season: number): Team[] => {
  return season === 2025 ? teams2025 : teams2024;
};
export const hypercars2026: Team[] = [
  { id: 'ferrari-50', name: 'Ferrari AF Corse', manufacturer: 'Ferrari', carNumber: '#50', class: 'HYPERCAR', points: 0, position: 0, color: '#DC0000', country: 'Italy', countryFlag: '🇮🇹', drivers: [] },
  { id: 'ferrari-51', name: 'Ferrari AF Corse', manufacturer: 'Ferrari', carNumber: '#51', class: 'HYPERCAR', points: 0, position: 0, color: '#DC0000', country: 'Italy', countryFlag: '🇮🇹', drivers: [] },
  { id: 'toyota-7', name: 'Toyota Gazoo Racing', manufacturer: 'Toyota', carNumber: '#7', class: 'HYPERCAR', points: 0, position: 0, color: '#E60012', country: 'Japan', countryFlag: '🇯🇵', drivers: [] },
  { id: 'toyota-8', name: 'Toyota Gazoo Racing', manufacturer: 'Toyota', carNumber: '#8', class: 'HYPERCAR', points: 0, position: 0, color: '#E60012', country: 'Japan', countryFlag: '🇯🇵', drivers: [] },
  { id: 'porsche-5', name: 'Porsche Penske Motorsport', manufacturer: 'Porsche', carNumber: '#5', class: 'HYPERCAR', points: 0, position: 0, color: '#C4A747', country: 'Germany', countryFlag: '🇩🇪', drivers: [] },
  { id: 'porsche-6', name: 'Porsche Penske Motorsport', manufacturer: 'Porsche', carNumber: '#6', class: 'HYPERCAR', points: 0, position: 0, color: '#C4A747', country: 'Germany', countryFlag: '🇩🇪', drivers: [] },
  { id: 'cadillac-2', name: 'Cadillac Racing', manufacturer: 'Cadillac', carNumber: '#2', class: 'HYPERCAR', points: 0, position: 0, color: '#6B9FD4', country: 'USA', countryFlag: '🇺🇸', drivers: [] },
  { id: 'cadillac-3', name: 'Cadillac Racing', manufacturer: 'Cadillac', carNumber: '#3', class: 'HYPERCAR', points: 0, position: 0, color: '#6B9FD4', country: 'USA', countryFlag: '🇺🇸', drivers: [] },
  { id: 'peugeot-93', name: 'Peugeot TotalEnergies', manufacturer: 'Peugeot', carNumber: '#93', class: 'HYPERCAR', points: 0, position: 0, color: '#E8C840', country: 'France', countryFlag: '🇫🇷', drivers: [] },
  { id: 'peugeot-94', name: 'Peugeot TotalEnergies', manufacturer: 'Peugeot', carNumber: '#94', class: 'HYPERCAR', points: 0, position: 0, color: '#E8C840', country: 'France', countryFlag: '🇫🇷', drivers: [] },
  { id: 'alpine-35', name: 'Alpine Endurance Team', manufacturer: 'Alpine', carNumber: '#35', class: 'HYPERCAR', points: 0, position: 0, color: '#0039A6', country: 'France', countryFlag: '🇫🇷', drivers: [] },
  { id: 'alpine-36', name: 'Alpine Endurance Team', manufacturer: 'Alpine', carNumber: '#36', class: 'HYPERCAR', points: 0, position: 0, color: '#0039A6', country: 'France', countryFlag: '🇫🇷', drivers: [] },
  { id: 'bmw-15', name: 'BMW M Team WRT', manufacturer: 'BMW', carNumber: '#15', class: 'HYPERCAR', points: 0, position: 0, color: '#1C69D4', country: 'Germany', countryFlag: '🇩🇪', drivers: [] },
  { id: 'bmw-20', name: 'BMW M Team WRT', manufacturer: 'BMW', carNumber: '#20', class: 'HYPERCAR', points: 0, position: 0, color: '#1C69D4', country: 'Germany', countryFlag: '🇩🇪', drivers: [] },
  { id: 'aston-007', name: 'Aston Martin Heart of Racing', manufacturer: 'Aston Martin', carNumber: '#007', class: 'HYPERCAR', points: 0, position: 0, color: '#006400', country: 'UK', countryFlag: '🇬🇧', drivers: [] },
  { id: 'aston-009', name: 'Aston Martin Heart of Racing', manufacturer: 'Aston Martin', carNumber: '#009', class: 'HYPERCAR', points: 0, position: 0, color: '#006400', country: 'UK', countryFlag: '🇬🇧', drivers: [] },
  { id: 'genesis-1', name: 'Genesis Magma Racing', manufacturer: 'Genesis', carNumber: '#1', class: 'HYPERCAR', points: 0, position: 0, color: '#FF4500', country: 'South Korea', countryFlag: '🇰🇷', drivers: [] },
];

export const circuits = [
  { id: 'qatar', name: 'Lusail International Circuit', location: 'Lusail', country: 'Qatar', flag: '🇶🇦', length: '5.419 km', turns: 16, lapRecord: '1:46.783', firstWEC: 2024, description: 'Lusail International Circuit is a motorsport venue in Lusail, Qatar. Originally built for MotoGP, it was upgraded for Formula 1 and WEC racing with extensive lighting for night races.' },
  { id: 'imola', name: 'Autodromo Enzo e Dino Ferrari', location: 'Imola', country: 'Italy', flag: '🇮🇹', length: '4.909 km', turns: 19, lapRecord: '1:30.140', firstWEC: 2024, description: 'Autodromo Enzo e Dino Ferrari is a historic Italian circuit named after Ferrari founder Enzo Ferrari and his son Dino. Known for its challenging, old-school layout with elevation changes.' },
  { id: 'spa', name: 'Circuit de Spa-Francorchamps', location: 'Stavelot', country: 'Belgium', flag: '🇧🇪', length: '7.004 km', turns: 19, lapRecord: '2:01.540', firstWEC: 2012, description: 'Circuit de Spa-Francorchamps is one of the most celebrated tracks in motorsport, featuring the iconic Eau Rouge/Raidillon sequence. Located in the Ardennes forest, it often experiences multiple weather conditions during a single race.' },
  { id: 'le-mans', name: 'Circuit de la Sarthe', location: 'Le Mans', country: 'France', flag: '🇫🇷', length: '13.626 km', turns: 38, lapRecord: '3:23.550', firstWEC: 2012, description: "Circuit de la Sarthe is the legendary venue of the 24 Hours of Le Mans, the world's oldest active sports car endurance race. The circuit combines permanent sections with public roads closed for the event." },
  { id: 'sao-paulo', name: 'Interlagos', location: 'São Paulo', country: 'Brazil', flag: '🇧🇷', length: '4.309 km', turns: 15, lapRecord: '1:25.789', firstWEC: 2012, description: 'Autódromo José Carlos Pace (Interlagos) is a challenging circuit with significant elevation changes and passionate local fans. Known for unpredictable weather and dramatic racing.' },
  { id: 'cota', name: 'Circuit of the Americas', location: 'Austin, Texas', country: 'USA', flag: '🇺🇸', length: '5.513 km', turns: 20, lapRecord: '1:48.123', firstWEC: 2013, description: 'Circuit of the Americas features a mix of high-speed straights and technical sections inspired by classic circuits. The iconic Turn 1 hill provides spectacular racing action.' },
  { id: 'fuji', name: 'Fuji Speedway', location: 'Oyama', country: 'Japan', flag: '🇯🇵', length: '4.563 km', turns: 16, lapRecord: '1:28.234', firstWEC: 2012, description: 'Fuji Speedway sits at the base of Mount Fuji, offering stunning views and challenging racing conditions. The 1.475km start/finish straight is one of the longest in motorsport.' },
  { id: 'bahrain', name: 'Bahrain International Circuit', location: 'Sakhir', country: 'Bahrain', flag: '🇧🇭', length: '5.412 km', turns: 15, lapRecord: '1:46.567', firstWEC: 2012, description: 'Bahrain International Circuit hosts the season finale under dramatic floodlights in the desert. The abrasive surface and high temperatures create unique challenges for teams.' }
];

export const drivers2026: Driver[] = [
  {
    id: 'kevin-magnussen',
    name: 'Kevin Magnussen',
    firstName: 'Kevin',
    lastName: 'Magnussen',
    nationality: 'Danish',
    countryFlag: '🇩🇰',
    team: 'BMW M Team WRT',
    teamId: 'bmw-20',
    carNumber: '#20',
    class: 'HYPERCAR',
    points: 0,
    position: 0,
    dateOfBirth: '1992-10-05',
    placeOfBirth: 'Roskilde, Denmark',
    biography: 'Kevin Magnussen is a Danish racing driver with extensive Formula 1 experience. After a decade in F1, he transitioned to endurance racing, joining BMWs factory WEC effort for the 2026 season.',
    careerHighlights: [
      'Formula 1 Podium Finisher',
      'IMSA SportsCar Championship race winner',
      'Formula Renault 3.5 Champion (2013)'
    ],
    facts: [
      'Son of former F1 driver and Le Mans class winner Jan Magnussen',
      'Scored a podium on his F1 debut in 2014',
      'Raced alongside his father at Le Mans in 2021'
    ],
    championships: 0,
    leMansWins: 0,
    wecWins: 0,
  }
];

export const lmgt3Teams2026: Team[] = [
  { id: 'manthey-92', name: 'Manthey 1st Phorm', manufacturer: 'Porsche', carNumber: '#92', class: 'LMGT3', points: 0, position: 0, color: '#000000', country: 'Germany', countryFlag: '🇩🇪', drivers: [] },
  { id: 'hor-27', name: 'Heart of Racing', manufacturer: 'Aston Martin', carNumber: '#27', class: 'LMGT3', points: 0, position: 0, color: '#006400', country: 'USA', countryFlag: '🇺🇸', drivers: [] },
  { id: 'iron-85', name: 'Iron Dames', manufacturer: 'Lamborghini', carNumber: '#85', class: 'LMGT3', points: 0, position: 0, color: '#FF1493', country: 'Italy', countryFlag: '🇮🇹', drivers: [] },
];

export const standings2025 = {
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
};

export const raceResults: RaceResultSet[] = [
  // ─── 2024 Season ───────────────────────────────────────────────

  {
    raceId: '2024-1',
    polePosition: 'Toyota #8',
    poleTime: '1:46.783',
    fastestLap: 'Toyota #8',
    fastestLapTime: '1:47.234',
    fastestLapDriver: 'Sébastien Buemi',
    results: [
      { position: 1, carNumber: '#8', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['S. Buemi', 'B. Hartley', 'R. Hirakawa'], class: 'HYPERCAR', laps: 334, gap: 'Leader', fastestLap: '1:47.234', isFastestLap: true, status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 2, carNumber: '#7', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['M. Conway', 'K. Kobayashi', 'J.M. López'], class: 'HYPERCAR', laps: 334, gap: '+0:35.123', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 3, carNumber: '#6', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['K. Estre', 'A. Lotterer', 'L. Vanthoor'], class: 'HYPERCAR', laps: 334, gap: '+1:12.456', status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
      { position: 4, carNumber: '#51', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Pier Guidi', 'J. Calado', 'A. Giovinazzi'], class: 'HYPERCAR', laps: 334, gap: '+1:45.789', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 5, carNumber: '#50', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Fuoco', 'M. Molina', 'N. Nielsen'], class: 'HYPERCAR', laps: 333, gap: '+1 Lap', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 6, carNumber: '#5', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['M. Campbell', 'F. Makowiecki', 'N. Tandy'], class: 'HYPERCAR', laps: 333, gap: '+1 Lap', status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
      { position: 7, carNumber: '#2', team: 'Cadillac Racing', manufacturer: 'Cadillac', drivers: ['E. Bamber', 'A. Lynn', 'R. Westbrook'], class: 'HYPERCAR', laps: 332, gap: '+2 Laps', status: 'Finished', color: '#1E3A5F', flag: '🇺🇸' },
      { position: 8, carNumber: '#93', team: 'Peugeot TotalEnergies', manufacturer: 'Peugeot', drivers: ['P-L. Chatin', 'M. Jensen', 'J-E. Vergne'], class: 'HYPERCAR', laps: 331, gap: '+3 Laps', status: 'Finished', color: '#0066B1', flag: '🇫🇷' },
    ],
  },

  {
    raceId: '2024-2',
    polePosition: 'Ferrari #50',
    poleTime: '1:30.140',
    fastestLap: 'Ferrari #51',
    fastestLapTime: '1:30.456',
    fastestLapDriver: 'Antonio Pier Guidi',
    results: [
      { position: 1, carNumber: '#50', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Fuoco', 'M. Molina', 'N. Nielsen'], class: 'HYPERCAR', laps: 212, gap: 'Leader', fastestLap: '1:30.456', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 2, carNumber: '#51', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Pier Guidi', 'J. Calado', 'A. Giovinazzi'], class: 'HYPERCAR', laps: 212, gap: '+0:08.234', isFastestLap: true, status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 3, carNumber: '#7', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['M. Conway', 'K. Kobayashi', 'J.M. López'], class: 'HYPERCAR', laps: 212, gap: '+0:45.678', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 4, carNumber: '#6', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['K. Estre', 'A. Lotterer', 'L. Vanthoor'], class: 'HYPERCAR', laps: 211, gap: '+1 Lap', status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
      { position: 5, carNumber: '#8', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['S. Buemi', 'B. Hartley', 'R. Hirakawa'], class: 'HYPERCAR', laps: 211, gap: '+1 Lap', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 6, carNumber: '#2', team: 'Cadillac Racing', manufacturer: 'Cadillac', drivers: ['E. Bamber', 'A. Lynn', 'R. Westbrook'], class: 'HYPERCAR', laps: 210, gap: '+2 Laps', status: 'Finished', color: '#1E3A5F', flag: '🇺🇸' },
    ],
  },

  {
    raceId: '2024-3',
    polePosition: 'Porsche #6',
    poleTime: '2:01.540',
    fastestLap: 'Porsche #6',
    fastestLapTime: '2:02.123',
    fastestLapDriver: 'Kevin Estre',
    results: [
      { position: 1, carNumber: '#6', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['K. Estre', 'A. Lotterer', 'L. Vanthoor'], class: 'HYPERCAR', laps: 166, gap: 'Leader', fastestLap: '2:02.123', isFastestLap: true, status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
      { position: 2, carNumber: '#8', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['S. Buemi', 'B. Hartley', 'R. Hirakawa'], class: 'HYPERCAR', laps: 166, gap: '+0:12.345', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 3, carNumber: '#51', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Pier Guidi', 'J. Calado', 'A. Giovinazzi'], class: 'HYPERCAR', laps: 166, gap: '+0:28.901', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 4, carNumber: '#7', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['M. Conway', 'K. Kobayashi', 'J.M. López'], class: 'HYPERCAR', laps: 165, gap: '+1 Lap', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 5, carNumber: '#50', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Fuoco', 'M. Molina', 'N. Nielsen'], class: 'HYPERCAR', laps: 165, gap: '+1 Lap', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 6, carNumber: '#5', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['M. Campbell', 'F. Makowiecki', 'N. Tandy'], class: 'HYPERCAR', laps: 165, gap: '+1 Lap', status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
    ],
  },

  {
    raceId: '2024-4',
    polePosition: 'Ferrari #50',
    poleTime: '3:22.982',
    fastestLap: 'Toyota #8',
    fastestLapTime: '3:23.550',
    fastestLapDriver: 'Brendon Hartley',
    results: [
      { position: 1, carNumber: '#50', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Fuoco', 'M. Molina', 'N. Nielsen'], class: 'HYPERCAR', laps: 311, gap: 'Leader', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 2, carNumber: '#6', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['K. Estre', 'A. Lotterer', 'L. Vanthoor'], class: 'HYPERCAR', laps: 311, gap: '+0:47.234', status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
      { position: 3, carNumber: '#8', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['S. Buemi', 'B. Hartley', 'R. Hirakawa'], class: 'HYPERCAR', laps: 310, gap: '+1 Lap', fastestLap: '3:23.550', isFastestLap: true, status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 4, carNumber: '#51', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Pier Guidi', 'J. Calado', 'A. Giovinazzi'], class: 'HYPERCAR', laps: 310, gap: '+1 Lap', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 5, carNumber: '#7', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['M. Conway', 'K. Kobayashi', 'J.M. López'], class: 'HYPERCAR', laps: 309, gap: '+2 Laps', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 6, carNumber: '#2', team: 'Cadillac Racing', manufacturer: 'Cadillac', drivers: ['E. Bamber', 'A. Lynn', 'R. Westbrook'], class: 'HYPERCAR', laps: 308, gap: '+3 Laps', status: 'Finished', color: '#1E3A5F', flag: '🇺🇸' },
      { position: 7, carNumber: '#5', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['M. Campbell', 'F. Makowiecki', 'N. Tandy'], class: 'HYPERCAR', laps: 307, gap: '+4 Laps', status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
      { position: 8, carNumber: '#15', team: 'BMW M Team WRT', manufacturer: 'BMW', drivers: ['D. Vanthoor', 'R. Marciello', 'K. Magnussen'], class: 'HYPERCAR', laps: 305, gap: '+6 Laps', status: 'Finished', color: '#1C69D4', flag: '🇩🇪' },
    ],
  },

  {
    raceId: '2024-5',
    polePosition: 'Toyota #8',
    poleTime: '1:25.789',
    fastestLap: 'Toyota #8',
    fastestLapTime: '1:26.012',
    fastestLapDriver: 'Ryo Hirakawa',
    results: [
      { position: 1, carNumber: '#8', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['S. Buemi', 'B. Hartley', 'R. Hirakawa'], class: 'HYPERCAR', laps: 227, gap: 'Leader', fastestLap: '1:26.012', isFastestLap: true, status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 2, carNumber: '#6', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['K. Estre', 'A. Lotterer', 'L. Vanthoor'], class: 'HYPERCAR', laps: 227, gap: '+0:22.567', status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
      { position: 3, carNumber: '#51', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Pier Guidi', 'J. Calado', 'A. Giovinazzi'], class: 'HYPERCAR', laps: 226, gap: '+1 Lap', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 4, carNumber: '#7', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['M. Conway', 'K. Kobayashi', 'J.M. López'], class: 'HYPERCAR', laps: 226, gap: '+1 Lap', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 5, carNumber: '#50', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Fuoco', 'M. Molina', 'N. Nielsen'], class: 'HYPERCAR', laps: 225, gap: '+2 Laps', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
    ],
  },

  {
    raceId: '2024-6',
    polePosition: 'Porsche #5',
    poleTime: '1:48.123',
    fastestLap: 'Porsche #5',
    fastestLapTime: '1:48.567',
    fastestLapDriver: 'Matt Campbell',
    results: [
      { position: 1, carNumber: '#5', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['M. Campbell', 'F. Makowiecki', 'N. Tandy'], class: 'HYPERCAR', laps: 185, gap: 'Leader', fastestLap: '1:48.567', isFastestLap: true, status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
      { position: 2, carNumber: '#51', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Pier Guidi', 'J. Calado', 'A. Giovinazzi'], class: 'HYPERCAR', laps: 185, gap: '+0:14.789', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 3, carNumber: '#8', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['S. Buemi', 'B. Hartley', 'R. Hirakawa'], class: 'HYPERCAR', laps: 184, gap: '+1 Lap', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 4, carNumber: '#6', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['K. Estre', 'A. Lotterer', 'L. Vanthoor'], class: 'HYPERCAR', laps: 184, gap: '+1 Lap', status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
      { position: 5, carNumber: '#7', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['M. Conway', 'K. Kobayashi', 'J.M. López'], class: 'HYPERCAR', laps: 183, gap: '+2 Laps', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
    ],
  },

  {
    raceId: '2024-7',
    polePosition: 'Toyota #7',
    poleTime: '1:28.234',
    fastestLap: 'Toyota #7',
    fastestLapTime: '1:28.567',
    fastestLapDriver: 'Mike Conway',
    results: [
      { position: 1, carNumber: '#7', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['M. Conway', 'K. Kobayashi', 'J.M. López'], class: 'HYPERCAR', laps: 214, gap: 'Leader', fastestLap: '1:28.567', isFastestLap: true, status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 2, carNumber: '#8', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['S. Buemi', 'B. Hartley', 'R. Hirakawa'], class: 'HYPERCAR', laps: 214, gap: '+0:05.234', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 3, carNumber: '#50', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Fuoco', 'M. Molina', 'N. Nielsen'], class: 'HYPERCAR', laps: 213, gap: '+1 Lap', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 4, carNumber: '#6', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['K. Estre', 'A. Lotterer', 'L. Vanthoor'], class: 'HYPERCAR', laps: 213, gap: '+1 Lap', status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
      { position: 5, carNumber: '#51', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Pier Guidi', 'J. Calado', 'A. Giovinazzi'], class: 'HYPERCAR', laps: 212, gap: '+2 Laps', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
    ],
  },

  {
    raceId: '2024-8',
    polePosition: 'Ferrari #50',
    poleTime: '1:46.567',
    fastestLap: 'Ferrari #50',
    fastestLapTime: '1:46.890',
    fastestLapDriver: 'Antonio Fuoco',
    results: [
      { position: 1, carNumber: '#50', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Fuoco', 'M. Molina', 'N. Nielsen'], class: 'HYPERCAR', laps: 270, gap: 'Leader', fastestLap: '1:46.890', isFastestLap: true, status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 2, carNumber: '#6', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['K. Estre', 'A. Lotterer', 'L. Vanthoor'], class: 'HYPERCAR', laps: 270, gap: '+0:28.456', status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
      { position: 3, carNumber: '#51', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Pier Guidi', 'J. Calado', 'A. Giovinazzi'], class: 'HYPERCAR', laps: 269, gap: '+1 Lap', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 4, carNumber: '#8', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['S. Buemi', 'B. Hartley', 'R. Hirakawa'], class: 'HYPERCAR', laps: 268, gap: '+2 Laps', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 5, carNumber: '#7', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['M. Conway', 'K. Kobayashi', 'J.M. López'], class: 'HYPERCAR', laps: 268, gap: '+2 Laps', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 6, carNumber: '#2', team: 'Cadillac Racing', manufacturer: 'Cadillac', drivers: ['E. Bamber', 'A. Lynn', 'R. Westbrook'], class: 'HYPERCAR', laps: 267, gap: '+3 Laps', status: 'Finished', color: '#1E3A5F', flag: '🇺🇸' },
    ],
  },

  // ─── 2025 Season ───────────────────────────────────────────────

  {
    raceId: '2025-1',
    polePosition: 'Ferrari #51',
    poleTime: '1:46.234',
    fastestLap: 'Ferrari #51',
    fastestLapTime: '1:46.890',
    fastestLapDriver: 'Antonio Pier Guidi',
    results: [
      { position: 1, carNumber: '#51', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Pier Guidi', 'J. Calado', 'A. Giovinazzi'], class: 'HYPERCAR', laps: 338, gap: 'Leader', fastestLap: '1:46.890', isFastestLap: true, status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 2, carNumber: '#6', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['K. Estre', 'A. Lotterer', 'L. Vanthoor'], class: 'HYPERCAR', laps: 338, gap: '+0:18.234', status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
      { position: 3, carNumber: '#83', team: 'AF Corse', manufacturer: 'Ferrari', drivers: ['R. Kubica', 'P. Hanson', 'Y. Ye'], class: 'HYPERCAR', laps: 337, gap: '+1 Lap', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 4, carNumber: '#8', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['S. Buemi', 'B. Hartley', 'R. Hirakawa'], class: 'HYPERCAR', laps: 336, gap: '+2 Laps', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 5, carNumber: '#7', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['M. Conway', 'K. Kobayashi', 'N. de Vries'], class: 'HYPERCAR', laps: 335, gap: '+3 Laps', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 6, carNumber: '#50', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Fuoco', 'M. Molina', 'N. Nielsen'], class: 'HYPERCAR', laps: 334, gap: '+4 Laps', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
    ],
  },

  {
    raceId: '2025-2',
    polePosition: 'Ferrari #51',
    poleTime: '1:29.876',
    fastestLap: 'Ferrari #51',
    fastestLapTime: '1:30.123',
    fastestLapDriver: 'James Calado',
    results: [
      { position: 1, carNumber: '#51', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Pier Guidi', 'J. Calado', 'A. Giovinazzi'], class: 'HYPERCAR', laps: 214, gap: 'Leader', fastestLap: '1:30.123', isFastestLap: true, status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 2, carNumber: '#83', team: 'AF Corse', manufacturer: 'Ferrari', drivers: ['R. Kubica', 'P. Hanson', 'Y. Ye'], class: 'HYPERCAR', laps: 214, gap: '+0:11.456', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 3, carNumber: '#7', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['M. Conway', 'K. Kobayashi', 'N. de Vries'], class: 'HYPERCAR', laps: 213, gap: '+1 Lap', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 4, carNumber: '#6', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['K. Estre', 'A. Lotterer', 'L. Vanthoor'], class: 'HYPERCAR', laps: 213, gap: '+1 Lap', status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
      { position: 5, carNumber: '#50', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Fuoco', 'M. Molina', 'N. Nielsen'], class: 'HYPERCAR', laps: 212, gap: '+2 Laps', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 6, carNumber: '#38', team: 'Cadillac JOTA', manufacturer: 'Cadillac', drivers: ['E. Bamber', 'J. Button', 'S. Bourdais'], class: 'HYPERCAR', laps: 211, gap: '+3 Laps', status: 'Finished', color: '#1E3A5F', flag: '🇺🇸' },
    ],
  },

  {
    raceId: '2025-3',
    polePosition: 'Porsche #5',
    poleTime: '2:00.890',
    fastestLap: 'Porsche #5',
    fastestLapTime: '2:01.345',
    fastestLapDriver: 'Matt Campbell',
    results: [
      { position: 1, carNumber: '#5', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['M. Campbell', 'M. Christensen', 'F. Makowiecki'], class: 'HYPERCAR', laps: 168, gap: 'Leader', fastestLap: '2:01.345', isFastestLap: true, status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
      { position: 2, carNumber: '#51', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Pier Guidi', 'J. Calado', 'A. Giovinazzi'], class: 'HYPERCAR', laps: 168, gap: '+0:09.123', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 3, carNumber: '#83', team: 'AF Corse', manufacturer: 'Ferrari', drivers: ['R. Kubica', 'P. Hanson', 'Y. Ye'], class: 'HYPERCAR', laps: 167, gap: '+1 Lap', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 4, carNumber: '#38', team: 'Cadillac JOTA', manufacturer: 'Cadillac', drivers: ['E. Bamber', 'J. Button', 'S. Bourdais'], class: 'HYPERCAR', laps: 167, gap: '+1 Lap', status: 'Finished', color: '#1E3A5F', flag: '🇺🇸' },
      { position: 5, carNumber: '#6', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['K. Estre', 'A. Lotterer', 'L. Vanthoor'], class: 'HYPERCAR', laps: 166, gap: '+2 Laps', status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
    ],
  },

  {
    raceId: '2025-4',
    polePosition: 'Ferrari #83',
    poleTime: '3:22.456',
    fastestLap: 'Toyota #7',
    fastestLapTime: '3:24.123',
    fastestLapDriver: 'Nyck de Vries',
    results: [
      { position: 1, carNumber: '#83', team: 'AF Corse', manufacturer: 'Ferrari', drivers: ['R. Kubica', 'P. Hanson', 'Y. Ye'], class: 'HYPERCAR', laps: 384, gap: 'Leader', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 2, carNumber: '#7', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['M. Conway', 'K. Kobayashi', 'N. de Vries'], class: 'HYPERCAR', laps: 383, gap: '+1 Lap', fastestLap: '3:24.123', isFastestLap: true, status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 3, carNumber: '#51', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Pier Guidi', 'J. Calado', 'A. Giovinazzi'], class: 'HYPERCAR', laps: 382, gap: '+2 Laps', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 4, carNumber: '#6', team: 'Porsche Penske Motorsport', manufacturer: 'Porsche', drivers: ['K. Estre', 'A. Lotterer', 'L. Vanthoor'], class: 'HYPERCAR', laps: 381, gap: '+3 Laps', status: 'Finished', color: '#C4A747', flag: '🇩🇪' },
      { position: 5, carNumber: '#8', team: 'Toyota Gazoo Racing', manufacturer: 'Toyota', drivers: ['S. Buemi', 'B. Hartley', 'R. Hirakawa'], class: 'HYPERCAR', laps: 380, gap: '+4 Laps', status: 'Finished', color: '#E60012', flag: '🇯🇵' },
      { position: 6, carNumber: '#50', team: 'Ferrari AF Corse', manufacturer: 'Ferrari', drivers: ['A. Fuoco', 'M. Molina', 'N. Nielsen'], class: 'HYPERCAR', laps: 379, gap: '+5 Laps', status: 'Finished', color: '#DC0000', flag: '🇮🇹' },
      { position: 7, carNumber: '#38', team: 'Cadillac JOTA', manufacturer: 'Cadillac', drivers: ['E. Bamber', 'J. Button', 'S. Bourdais'], class: 'HYPERCAR', laps: 378, gap: '+6 Laps', status: 'Finished', color: '#1E3A5F', flag: '🇺🇸' },
      { position: 8, carNumber: '#15', team: 'BMW M Team WRT', manufacturer: 'BMW', drivers: ['D. Vanthoor', 'R. Marciello', 'K. Magnussen'], class: 'HYPERCAR', laps: 376, gap: '+8 Laps', status: 'Finished', color: '#1C69D4', flag: '🇩🇪' },
    ],
  },

  {
    raceId: '2026-2',
    polePosition: 'Ferrari #51',
    poleTime: '1:30.127',
    fastestLap: 'Toyota #8',
    fastestLapTime: '1:32.400',
    fastestLapDriver: 'Sébastien Buemi',
    results: [
      {
        position: 1,
        carNumber: '#8',
        team: 'Toyota Gazoo Racing',
        manufacturer: 'Toyota',
        drivers: ['S. Buemi', 'B. Hartley', 'R. Hirakawa'],
        class: 'HYPERCAR',
        laps: 213,
        gap: 'Leader',
        status: 'Finished',
        color: '#E60012',
        flag: '🇯🇵',
        isFastestLap: true,
        fastestLap: '1:32.4',
      },
      {
        position: 2,
        carNumber: '#51',
        team: 'Ferrari AF Corse',
        manufacturer: 'Ferrari',
        drivers: ['A. Pier Guidi', 'J. Calado', 'A. Giovinazzi'],
        class: 'HYPERCAR',
        laps: 213,
        gap: '+13.352s',
        status: 'Finished',
        color: '#DC0000',
        flag: '🇮🇹',
      },
      {
        position: 3,
        carNumber: '#7',
        team: 'Toyota Gazoo Racing',
        manufacturer: 'Toyota',
        drivers: ['M. Conway', 'K. Kobayashi', 'J. Lopez'],
        class: 'HYPERCAR',
        laps: 213,
        gap: '+41.187s',
        status: 'Finished',
        color: '#E60012',
        flag: '🇯🇵',
      },
      {
        position: 4,
        carNumber: '#35',
        team: 'Alpine Endurance Team',
        manufacturer: 'Alpine',
        drivers: ['C. Milesi', 'J. Laursen', 'M. Wainwright'],
        class: 'HYPERCAR',
        laps: 213,
        gap: '+59.385s',
        status: 'Finished',
        color: '#0039A6',
        flag: '🇫🇷',
      },
      {
        position: 5,
        carNumber: '#20',
        team: 'BMW M Team WRT',
        manufacturer: 'BMW',
        drivers: ['R. Rast', 'M. Vaxivière', 'N. Yelloly'],
        class: 'HYPERCAR',
        laps: 213,
        gap: '+1:00.543',
        status: 'Finished',
        color: '#1C69D4',
        flag: '🇩🇪',
      },
      {
        position: 6,
        carNumber: '#50',
        team: 'Ferrari AF Corse',
        manufacturer: 'Ferrari',
        drivers: ['A. Fuoco', 'M. Molina', 'N. Nielsen'],
        class: 'HYPERCAR',
        laps: 213,
        gap: '+1:00.901',
        status: 'Finished',
        color: '#DC0000',
        flag: '🇮🇹',
      },
      {
        position: 7,
        carNumber: '#15',
        team: 'BMW M Team WRT',
        manufacturer: 'BMW',
        drivers: ['D. Vanthoor', 'R. Marciello', 'K. Magnussen'],
        class: 'HYPERCAR',
        laps: 213,
        gap: '+1:01.506',
        status: 'Finished',
        color: '#1C69D4',
        flag: '🇩🇪',
      },
      {
        position: 8,
        carNumber: '#38',
        team: 'Cadillac JOTA',
        manufacturer: 'Cadillac',
        drivers: ['E. Bamber', 'J. Button', 'S. Bourdais'],
        class: 'HYPERCAR',
        laps: 213,
        gap: '+1:01.995',
        status: 'Finished',
        color: '#6B9FD4',
        flag: '🇺🇸',
      },
      {
        position: 9,
        carNumber: '#007',
        team: 'Aston Martin Heart of Racing',
        manufacturer: 'Aston Martin',
        drivers: ['A. Turner', 'M. Martin', 'D. Pittard'],
        class: 'HYPERCAR',
        laps: 212,
        gap: '+1 Lap',
        status: 'Finished',
        color: '#005140',
        flag: '🇬🇧',
      },
      {
        position: 10,
        carNumber: '#83',
        team: 'AF Corse',
        manufacturer: 'Ferrari',
        drivers: ['R. Kubica', 'P. Hanson', 'Y. Ye'],
        class: 'HYPERCAR',
        laps: 212,
        gap: '+1 Lap',
        status: 'Finished',
        color: '#DC0000',
        flag: '🇮🇹',
      },
      {
        position: 11,
        carNumber: '#36',
        team: 'Alpine Endurance Team',
        manufacturer: 'Alpine',
        drivers: ['M. Schneider', 'K. Weerts', 'C. Grunewald'],
        class: 'HYPERCAR',
        laps: 212,
        gap: '+1 Lap',
        status: 'Finished',
        color: '#0039A6',
        flag: '🇫🇷',
      },
      {
        position: 12,
        carNumber: '#94',
        team: 'Peugeot TotalEnergies',
        manufacturer: 'Peugeot',
        drivers: ['L. Duval', 'G. Menezes', 'N. Jamin'],
        class: 'HYPERCAR',
        laps: 212,
        gap: '+1 Lap',
        status: 'Finished',
        color: '#E8C840',
        flag: '🇫🇷',
      },
      {
        position: 13,
        carNumber: '#12',
        team: 'Cadillac JOTA',
        manufacturer: 'Cadillac',
        drivers: ['W. Stevens', 'J. Allen', 'P. Pilet'],
        class: 'HYPERCAR',
        laps: 212,
        gap: '+1 Lap',
        status: 'Finished',
        color: '#6B9FD4',
        flag: '🇺🇸',
      },
      {
        position: 14,
        carNumber: '#009',
        team: 'Aston Martin Heart of Racing',
        manufacturer: 'Aston Martin',
        drivers: ['T. Gamble', 'R. Westbrook', 'J. Adam'],
        class: 'HYPERCAR',
        laps: 212,
        gap: '+1 Lap',
        status: 'Finished',
        color: '#005140',
        flag: '🇬🇧',
      },
      {
        position: 15,
        carNumber: '#69',
        team: 'BMW M Team WRT',
        manufacturer: 'BMW',
        drivers: ['M. Sørensen', 'C. De Phillippi', 'A. Farfus'],
        class: 'LMGT3',
        laps: 201,
        gap: 'Leader (GT)',
        status: 'Finished',
        color: '#1C69D4',
        flag: '🇧🇪',
      },
      {
        position: 16,
        carNumber: '#33',
        team: 'TF Sport',
        manufacturer: 'Corvette',
        drivers: ['B. Barnicoat', 'D. Juncadella', 'M. Grenier'],
        class: 'LMGT3',
        laps: 200,
        gap: '+1 Lap (GT)',
        status: 'Finished',
        color: '#FF6B00',
        flag: '🇬🇧',
      },
      {
        position: 17,
        carNumber: '#92',
        team: 'Manthey PureRxcing',
        manufacturer: 'Porsche',
        drivers: ['K. Bachler', 'M. Jaminet', 'F. Makowiecki'],
        class: 'LMGT3',
        laps: 200,
        gap: '+1 Lap (GT)',
        status: 'Finished',
        color: '#C4A747',
        flag: '🇩🇪',
      },
    ],
  },
];

export const standings2024 = {
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
};
