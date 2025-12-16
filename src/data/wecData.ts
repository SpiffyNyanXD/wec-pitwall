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
  type: 'FP1' | 'FP2' | 'FP3' | 'Qualifying' | 'Hyperpole' | 'Warm Up' | 'Race';
  date: string;
  startTime: string;
  endTime: string;
  duration: string;
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
      { type: 'FP3', date: '2024-03-01', startTime: '12:30', endTime: '14:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2024-03-01', startTime: '17:30', endTime: '18:30', duration: '1h' },
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
      { type: 'FP3', date: '2024-04-20', startTime: '10:00', endTime: '11:00', duration: '1h' },
      { type: 'Qualifying', date: '2024-04-20', startTime: '14:40', endTime: '15:40', duration: '1h' },
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
      { type: 'FP3', date: '2024-05-10', startTime: '11:30', endTime: '13:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2024-05-10', startTime: '17:10', endTime: '18:10', duration: '1h' },
      { type: 'Race', date: '2024-05-11', startTime: '13:00', endTime: '19:00', duration: '6h' },
    ]
  },
  { 
    id: '2024-4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France', 
    date: '2024-06-15', endDate: '2024-06-16', duration: '24 Hours', status: 'completed', flag: '🇫🇷', season: 2024, round: 4,
    winner: 'Ferrari #50', winningTeam: 'Ferrari AF Corse', trackLength: '13.626 km', laps: 311,
    sessions: [
      { type: 'FP1', date: '2024-06-12', startTime: '14:00', endTime: '17:00', duration: '3h' },
      { type: 'Qualifying', date: '2024-06-12', startTime: '19:00', endTime: '20:00', duration: '1h' },
      { type: 'FP2', date: '2024-06-12', startTime: '22:00', endTime: '00:00', duration: '2h' },
      { type: 'FP3', date: '2024-06-13', startTime: '15:00', endTime: '18:00', duration: '3h' },
      { type: 'Hyperpole', date: '2024-06-13', startTime: '20:00', endTime: '20:30', duration: '30m' },
      { type: 'Warm Up', date: '2024-06-15', startTime: '10:30', endTime: '10:45', duration: '15m' },
      { type: 'Race', date: '2024-06-15', startTime: '16:00', endTime: '16:00', duration: '24h' },
    ]
  },
  { 
    id: '2024-5', name: '6 Hours of São Paulo', circuit: 'Interlagos', country: 'Brazil', 
    date: '2024-07-14', duration: '6 Hours', status: 'completed', flag: '🇧🇷', season: 2024, round: 5,
    winner: 'Toyota #8', winningTeam: 'Toyota Gazoo Racing', trackLength: '4.309 km', laps: 227,
    sessions: [
      { type: 'FP1', date: '2024-07-12', startTime: '10:00', endTime: '11:30', duration: '1h 30m' },
      { type: 'FP2', date: '2024-07-12', startTime: '15:25', endTime: '16:55', duration: '1h 30m' },
      { type: 'FP3', date: '2024-07-13', startTime: '09:30', endTime: '11:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2024-07-13', startTime: '14:50', endTime: '15:50', duration: '1h' },
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
      { type: 'FP3', date: '2024-08-31', startTime: '09:00', endTime: '10:00', duration: '1h' },
      { type: 'Qualifying', date: '2024-08-31', startTime: '12:45', endTime: '13:45', duration: '1h' },
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
      { type: 'FP3', date: '2024-09-14', startTime: '09:00', endTime: '10:00', duration: '1h' },
      { type: 'Qualifying', date: '2024-09-14', startTime: '13:10', endTime: '14:10', duration: '1h' },
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
      { type: 'FP3', date: '2024-11-01', startTime: '12:30', endTime: '14:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2024-11-01', startTime: '17:30', endTime: '18:30', duration: '1h' },
      { type: 'Race', date: '2024-11-02', startTime: '14:00', endTime: '22:00', duration: '8h' },
    ]
  },
];

// 2025 Season Races (COMPLETED)
export const races2025: Race[] = [
  { 
    id: '2025-1', name: '1812 km of Qatar', circuit: 'Lusail International Circuit', country: 'Qatar', 
    date: '2025-02-28', duration: '10 Hours', status: 'completed', flag: '🇶🇦', season: 2025, round: 1,
    winner: 'Toyota #8', winningTeam: 'Toyota Gazoo Racing', trackLength: '5.419 km', laps: 336,
    sessions: [
      { type: 'FP1', date: '2025-02-26', startTime: '11:00', endTime: '12:30', duration: '1h 30m' },
      { type: 'FP2', date: '2025-02-26', startTime: '16:00', endTime: '17:30', duration: '1h 30m' },
      { type: 'FP3', date: '2025-02-27', startTime: '12:30', endTime: '14:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2025-02-27', startTime: '17:30', endTime: '18:30', duration: '1h' },
      { type: 'Race', date: '2025-02-28', startTime: '12:00', endTime: '22:00', duration: '10h' },
    ]
  },
  { 
    id: '2025-2', name: '6 Hours of Imola', circuit: 'Autodromo Enzo e Dino Ferrari', country: 'Italy', 
    date: '2025-04-20', duration: '6 Hours', status: 'completed', flag: '🇮🇹', season: 2025, round: 2,
    winner: 'Ferrari #50', winningTeam: 'Ferrari AF Corse', trackLength: '4.909 km', laps: 210,
    sessions: [
      { type: 'FP1', date: '2025-04-18', startTime: '10:25', endTime: '11:55', duration: '1h 30m' },
      { type: 'FP2', date: '2025-04-18', startTime: '15:30', endTime: '17:00', duration: '1h 30m' },
      { type: 'FP3', date: '2025-04-19', startTime: '10:00', endTime: '11:00', duration: '1h' },
      { type: 'Qualifying', date: '2025-04-19', startTime: '14:40', endTime: '15:40', duration: '1h' },
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
      { type: 'FP3', date: '2025-05-09', startTime: '11:30', endTime: '13:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2025-05-09', startTime: '17:10', endTime: '18:10', duration: '1h' },
      { type: 'Race', date: '2025-05-10', startTime: '13:00', endTime: '19:00', duration: '6h' },
    ]
  },
  { 
    id: '2025-4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France', 
    date: '2025-06-14', endDate: '2025-06-15', duration: '24 Hours', status: 'completed', flag: '🇫🇷', season: 2025, round: 4,
    winner: 'Toyota #7', winningTeam: 'Toyota Gazoo Racing', trackLength: '13.626 km', laps: 315,
    sessions: [
      { type: 'FP1', date: '2025-06-11', startTime: '14:00', endTime: '17:00', duration: '3h' },
      { type: 'Qualifying', date: '2025-06-11', startTime: '19:00', endTime: '20:00', duration: '1h' },
      { type: 'FP2', date: '2025-06-11', startTime: '22:00', endTime: '00:00', duration: '2h' },
      { type: 'FP3', date: '2025-06-12', startTime: '15:00', endTime: '18:00', duration: '3h' },
      { type: 'Hyperpole', date: '2025-06-12', startTime: '20:00', endTime: '20:30', duration: '30m' },
      { type: 'Warm Up', date: '2025-06-14', startTime: '10:30', endTime: '10:45', duration: '15m' },
      { type: 'Race', date: '2025-06-14', startTime: '16:00', endTime: '16:00', duration: '24h' },
    ]
  },
  { 
    id: '2025-5', name: '6 Hours of São Paulo', circuit: 'Interlagos', country: 'Brazil', 
    date: '2025-07-13', duration: '6 Hours', status: 'completed', flag: '🇧🇷', season: 2025, round: 5,
    winner: 'Porsche #6', winningTeam: 'Porsche Penske Motorsport', trackLength: '4.309 km', laps: 229,
    sessions: [
      { type: 'FP1', date: '2025-07-11', startTime: '10:00', endTime: '11:30', duration: '1h 30m' },
      { type: 'FP2', date: '2025-07-11', startTime: '15:25', endTime: '16:55', duration: '1h 30m' },
      { type: 'FP3', date: '2025-07-12', startTime: '09:30', endTime: '11:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2025-07-12', startTime: '14:50', endTime: '15:50', duration: '1h' },
      { type: 'Race', date: '2025-07-13', startTime: '11:00', endTime: '17:00', duration: '6h' },
    ]
  },
  { 
    id: '2025-6', name: '6 Hours of COTA', circuit: 'Circuit of the Americas', country: 'USA', 
    date: '2025-08-31', duration: '6 Hours', status: 'completed', flag: '🇺🇸', season: 2025, round: 6,
    winner: 'Ferrari #51', winningTeam: 'Ferrari AF Corse', trackLength: '5.513 km', laps: 187,
    sessions: [
      { type: 'FP1', date: '2025-08-29', startTime: '10:25', endTime: '11:55', duration: '1h 30m' },
      { type: 'FP2', date: '2025-08-29', startTime: '15:30', endTime: '17:00', duration: '1h 30m' },
      { type: 'FP3', date: '2025-08-30', startTime: '09:00', endTime: '10:00', duration: '1h' },
      { type: 'Qualifying', date: '2025-08-30', startTime: '12:45', endTime: '13:45', duration: '1h' },
      { type: 'Race', date: '2025-08-31', startTime: '12:00', endTime: '18:00', duration: '6h' },
    ]
  },
  { 
    id: '2025-7', name: '6 Hours of Fuji', circuit: 'Fuji Speedway', country: 'Japan', 
    date: '2025-09-14', duration: '6 Hours', status: 'completed', flag: '🇯🇵', season: 2025, round: 7,
    winner: 'Toyota #8', winningTeam: 'Toyota Gazoo Racing', trackLength: '4.563 km', laps: 216,
    sessions: [
      { type: 'FP1', date: '2025-09-12', startTime: '09:15', endTime: '10:45', duration: '1h 30m' },
      { type: 'FP2', date: '2025-09-12', startTime: '14:30', endTime: '16:00', duration: '1h 30m' },
      { type: 'FP3', date: '2025-09-13', startTime: '09:00', endTime: '10:00', duration: '1h' },
      { type: 'Qualifying', date: '2025-09-13', startTime: '13:10', endTime: '14:10', duration: '1h' },
      { type: 'Race', date: '2025-09-14', startTime: '11:00', endTime: '17:00', duration: '6h' },
    ]
  },
  { 
    id: '2025-8', name: '8 Hours of Bahrain', circuit: 'Bahrain International Circuit', country: 'Bahrain', 
    date: '2025-11-08', duration: '8 Hours', status: 'completed', flag: '🇧🇭', season: 2025, round: 8,
    winner: 'Porsche #6', winningTeam: 'Porsche Penske Motorsport', trackLength: '5.412 km', laps: 272,
    sessions: [
      { type: 'FP1', date: '2025-11-06', startTime: '11:00', endTime: '12:30', duration: '1h 30m' },
      { type: 'FP2', date: '2025-11-06', startTime: '16:00', endTime: '17:30', duration: '1h 30m' },
      { type: 'FP3', date: '2025-11-07', startTime: '12:30', endTime: '14:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2025-11-07', startTime: '17:30', endTime: '18:30', duration: '1h' },
      { type: 'Race', date: '2025-11-08', startTime: '14:00', endTime: '22:00', duration: '8h' },
    ]
  },
];

// 2026 Season Races (UPCOMING)
export const races2026: Race[] = [
  { 
    id: '2026-1', name: '1812 km of Qatar', circuit: 'Lusail International Circuit', country: 'Qatar', 
    date: '2026-02-27', duration: '10 Hours', status: 'upcoming', flag: '🇶🇦', season: 2026, round: 1,
    trackLength: '5.419 km',
    sessions: [
      { type: 'FP1', date: '2026-02-25', startTime: '11:00', endTime: '12:30', duration: '1h 30m' },
      { type: 'FP2', date: '2026-02-25', startTime: '16:00', endTime: '17:30', duration: '1h 30m' },
      { type: 'FP3', date: '2026-02-26', startTime: '12:30', endTime: '14:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-02-26', startTime: '17:30', endTime: '18:30', duration: '1h' },
      { type: 'Race', date: '2026-02-27', startTime: '12:00', endTime: '22:00', duration: '10h' },
    ]
  },
  { 
    id: '2026-2', name: '6 Hours of Imola', circuit: 'Autodromo Enzo e Dino Ferrari', country: 'Italy', 
    date: '2026-04-19', duration: '6 Hours', status: 'upcoming', flag: '🇮🇹', season: 2026, round: 2,
    trackLength: '4.909 km',
    sessions: [
      { type: 'FP1', date: '2026-04-17', startTime: '10:25', endTime: '11:55', duration: '1h 30m' },
      { type: 'FP2', date: '2026-04-17', startTime: '15:30', endTime: '17:00', duration: '1h 30m' },
      { type: 'FP3', date: '2026-04-18', startTime: '10:00', endTime: '11:00', duration: '1h' },
      { type: 'Qualifying', date: '2026-04-18', startTime: '14:40', endTime: '15:40', duration: '1h' },
      { type: 'Race', date: '2026-04-19', startTime: '12:00', endTime: '18:00', duration: '6h' },
    ]
  },
  { 
    id: '2026-3', name: '6 Hours of Spa', circuit: 'Circuit de Spa-Francorchamps', country: 'Belgium', 
    date: '2026-05-09', duration: '6 Hours', status: 'upcoming', flag: '🇧🇪', season: 2026, round: 3,
    trackLength: '7.004 km',
    sessions: [
      { type: 'FP1', date: '2026-05-07', startTime: '14:00', endTime: '15:30', duration: '1h 30m' },
      { type: 'FP2', date: '2026-05-07', startTime: '19:00', endTime: '20:30', duration: '1h 30m' },
      { type: 'FP3', date: '2026-05-08', startTime: '11:30', endTime: '13:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-05-08', startTime: '17:10', endTime: '18:10', duration: '1h' },
      { type: 'Race', date: '2026-05-09', startTime: '13:00', endTime: '19:00', duration: '6h' },
    ]
  },
  { 
    id: '2026-4', name: '24 Hours of Le Mans', circuit: 'Circuit de la Sarthe', country: 'France', 
    date: '2026-06-13', endDate: '2026-06-14', duration: '24 Hours', status: 'upcoming', flag: '🇫🇷', season: 2026, round: 4,
    trackLength: '13.626 km',
    sessions: [
      { type: 'FP1', date: '2026-06-10', startTime: '14:00', endTime: '17:00', duration: '3h' },
      { type: 'Qualifying', date: '2026-06-10', startTime: '19:00', endTime: '20:00', duration: '1h' },
      { type: 'FP2', date: '2026-06-10', startTime: '22:00', endTime: '00:00', duration: '2h' },
      { type: 'FP3', date: '2026-06-11', startTime: '15:00', endTime: '18:00', duration: '3h' },
      { type: 'Hyperpole', date: '2026-06-11', startTime: '20:00', endTime: '20:30', duration: '30m' },
      { type: 'Warm Up', date: '2026-06-13', startTime: '10:30', endTime: '10:45', duration: '15m' },
      { type: 'Race', date: '2026-06-13', startTime: '16:00', endTime: '16:00', duration: '24h' },
    ]
  },
  { 
    id: '2026-5', name: '6 Hours of São Paulo', circuit: 'Interlagos', country: 'Brazil', 
    date: '2026-07-12', duration: '6 Hours', status: 'upcoming', flag: '🇧🇷', season: 2026, round: 5,
    trackLength: '4.309 km',
    sessions: [
      { type: 'FP1', date: '2026-07-10', startTime: '10:00', endTime: '11:30', duration: '1h 30m' },
      { type: 'FP2', date: '2026-07-10', startTime: '15:25', endTime: '16:55', duration: '1h 30m' },
      { type: 'FP3', date: '2026-07-11', startTime: '09:30', endTime: '11:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-07-11', startTime: '14:50', endTime: '15:50', duration: '1h' },
      { type: 'Race', date: '2026-07-12', startTime: '11:00', endTime: '17:00', duration: '6h' },
    ]
  },
  { 
    id: '2026-6', name: '6 Hours of COTA', circuit: 'Circuit of the Americas', country: 'USA', 
    date: '2026-08-30', duration: '6 Hours', status: 'upcoming', flag: '🇺🇸', season: 2026, round: 6,
    trackLength: '5.513 km',
    sessions: [
      { type: 'FP1', date: '2026-08-28', startTime: '10:25', endTime: '11:55', duration: '1h 30m' },
      { type: 'FP2', date: '2026-08-28', startTime: '15:30', endTime: '17:00', duration: '1h 30m' },
      { type: 'FP3', date: '2026-08-29', startTime: '09:00', endTime: '10:00', duration: '1h' },
      { type: 'Qualifying', date: '2026-08-29', startTime: '12:45', endTime: '13:45', duration: '1h' },
      { type: 'Race', date: '2026-08-30', startTime: '12:00', endTime: '18:00', duration: '6h' },
    ]
  },
  { 
    id: '2026-7', name: '6 Hours of Fuji', circuit: 'Fuji Speedway', country: 'Japan', 
    date: '2026-09-13', duration: '6 Hours', status: 'upcoming', flag: '🇯🇵', season: 2026, round: 7,
    trackLength: '4.563 km',
    sessions: [
      { type: 'FP1', date: '2026-09-11', startTime: '09:15', endTime: '10:45', duration: '1h 30m' },
      { type: 'FP2', date: '2026-09-11', startTime: '14:30', endTime: '16:00', duration: '1h 30m' },
      { type: 'FP3', date: '2026-09-12', startTime: '09:00', endTime: '10:00', duration: '1h' },
      { type: 'Qualifying', date: '2026-09-12', startTime: '13:10', endTime: '14:10', duration: '1h' },
      { type: 'Race', date: '2026-09-13', startTime: '11:00', endTime: '17:00', duration: '6h' },
    ]
  },
  { 
    id: '2026-8', name: '8 Hours of Bahrain', circuit: 'Bahrain International Circuit', country: 'Bahrain', 
    date: '2026-11-07', duration: '8 Hours', status: 'upcoming', flag: '🇧🇭', season: 2026, round: 8,
    trackLength: '5.412 km',
    sessions: [
      { type: 'FP1', date: '2026-11-05', startTime: '11:00', endTime: '12:30', duration: '1h 30m' },
      { type: 'FP2', date: '2026-11-05', startTime: '16:00', endTime: '17:30', duration: '1h 30m' },
      { type: 'FP3', date: '2026-11-06', startTime: '12:30', endTime: '14:00', duration: '1h 30m' },
      { type: 'Qualifying', date: '2026-11-06', startTime: '17:30', endTime: '18:30', duration: '1h' },
      { type: 'Race', date: '2026-11-07', startTime: '14:00', endTime: '22:00', duration: '8h' },
    ]
  },
];

// Export combined data
export const drivers = drivers2024;
export const teams = teams2024;
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
