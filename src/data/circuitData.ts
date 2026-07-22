export interface CircuitData {
  slug: string
  name: string
  shortName: string
  country: string
  countryCode: string        // ISO 2-letter e.g. "FR"
  city: string
  lengthKm: number
  turns: number
  lapRecordTime?: string     // "H:MM:SS.sss" — most recent WEC fastest lap
  lapRecordHolder?: string   // team or car that set it
  lapRecordYear?: number
  established?: number
  description: string        // 2–3 sentences about the circuit
  wecHistory: string         // brief WEC racing history at this track
  timezone: string           // IANA e.g. "Europe/Paris"
}

export const circuits: CircuitData[] = [
  {
    slug: 'imola',
    name: 'Autodromo Enzo e Dino Ferrari',
    shortName: 'Imola',
    country: 'Italy',
    countryCode: 'IT',
    city: 'Imola',
    lengthKm: 4.909,
    turns: 19,
    lapRecordTime: '1:31.794', // WEC lap record info approx
    lapRecordHolder: 'Ferrari 499P',
    lapRecordYear: 2024,
    established: 1953,
    description: 'Autodromo Enzo e Dino Ferrari is a historic Italian circuit named after Ferrari founder Enzo Ferrari and his son Dino. Known for its challenging, old-school layout with elevation changes.',
    wecHistory: 'Imola joined the FIA WEC calendar in 2024, replacing Monza while it underwent renovations. It quickly became a fan favorite for its tight, technical nature which challenges the Hypercars.',
    timezone: 'Europe/Rome'
  },
  {
    slug: 'spa',
    name: 'Circuit de Spa-Francorchamps',
    shortName: 'Spa',
    country: 'Belgium',
    countryCode: 'BE',
    city: 'Stavelot',
    lengthKm: 7.004,
    turns: 19,
    lapRecordTime: '2:01.401', // Neel Jani 2017
    lapRecordHolder: 'Porsche 919 Hybrid (Neel Jani)',
    lapRecordYear: 2017,
    established: 1921,
    description: 'Circuit de Spa-Francorchamps is one of the most celebrated tracks in motorsport, featuring the iconic Eau Rouge/Raidillon sequence. Located in the Ardennes forest, it often experiences multiple weather conditions during a single race.',
    wecHistory: 'A staple of the FIA WEC since its inception in 2012, the 6 Hours of Spa traditionally serves as the final dress rehearsal before the 24 Hours of Le Mans.',
    timezone: 'Europe/Brussels'
  },
  {
    slug: 'le-mans',
    name: 'Circuit de la Sarthe',
    shortName: 'Le Mans',
    country: 'France',
    countryCode: 'FR',
    city: 'Le Mans',
    lengthKm: 13.626,
    turns: 38,
    lapRecordTime: '3:14.791', // Kamui Kobayashi 2017 qualifying record (not race, race is 3:17.297)
    lapRecordHolder: 'Toyota TS050 Hybrid (Mike Conway)',
    lapRecordYear: 2019,
    established: 1923,
    description: 'Circuit de la Sarthe is the legendary venue of the 24 Hours of Le Mans, the world\'s oldest active sports car endurance race. The circuit combines permanent sections with public roads closed for the event.',
    wecHistory: 'The crown jewel of the FIA WEC, the 24 Hours of Le Mans has been the cornerstone of the championship since 2012. It offers double points and incredible prestige to the winners.',
    timezone: 'Europe/Paris'
  },
  {
    slug: 'sao-paulo',
    name: 'Interlagos',
    shortName: 'Interlagos',
    country: 'Brazil',
    countryCode: 'BR',
    city: 'São Paulo',
    lengthKm: 4.309,
    turns: 15,
    lapRecordTime: '1:17.442',
    lapRecordHolder: 'Porsche 919 Hybrid (Neel Jani)',
    lapRecordYear: 2014,
    established: 1940,
    description: 'Autódromo José Carlos Pace (Interlagos) is a challenging circuit with significant elevation changes and passionate local fans. Known for unpredictable weather and dramatic racing.',
    wecHistory: 'Interlagos hosted WEC from 2012 to 2014 before returning to the calendar in 2024 for the 6 Hours of São Paulo, bringing world-class endurance racing back to South America.',
    timezone: 'America/Sao_Paulo'
  },
  {
    slug: 'cota',
    name: 'Circuit of the Americas',
    shortName: 'COTA',
    country: 'USA',
    countryCode: 'US',
    city: 'Austin',
    lengthKm: 5.513,
    turns: 20,
    lapRecordTime: '1:44.741',
    lapRecordHolder: 'Porsche 919 Hybrid (Neel Jani)',
    lapRecordYear: 2017,
    established: 2012,
    description: 'Circuit of the Americas features a mix of high-speed straights and technical sections inspired by classic circuits. The iconic Turn 1 hill provides spectacular racing action.',
    wecHistory: 'The Lone Star Le Mans was held at COTA from 2013 to 2017, and again in 2020. It returned to the WEC calendar in 2024 as the premier North American round.',
    timezone: 'America/Chicago'
  },
  {
    slug: 'fuji',
    name: 'Fuji Speedway',
    shortName: 'Fuji',
    country: 'Japan',
    countryCode: 'JP',
    city: 'Oyama',
    lengthKm: 4.563,
    turns: 16,
    lapRecordTime: '1:22.739',
    lapRecordHolder: 'Porsche 919 Hybrid (Mark Webber)',
    lapRecordYear: 2015,
    established: 1965,
    description: 'Fuji Speedway sits at the base of Mount Fuji, offering stunning views and challenging racing conditions. The 1.475km start/finish straight is one of the longest in motorsport.',
    wecHistory: 'The 6 Hours of Fuji has been a constant fixture on the WEC calendar since 2012 (except 2020-2021). It is Toyota\'s home race, and they have historically dominated the event.',
    timezone: 'Asia/Tokyo'
  },
  {
    slug: 'lusail',
    name: 'Lusail International Circuit',
    shortName: 'Lusail',
    country: 'Qatar',
    countryCode: 'QA',
    city: 'Lusail',
    lengthKm: 5.419,
    turns: 16,
    lapRecordTime: '1:39.757',
    lapRecordHolder: 'Porsche 963 (Matt Campbell)',
    lapRecordYear: 2024,
    established: 2004,
    description: 'Lusail International Circuit is a motorsport venue in Lusail, Qatar. Originally built for MotoGP, it was upgraded for Formula 1 and WEC racing with extensive lighting for night races.',
    wecHistory: 'Qatar joined the WEC calendar in 2024 as the season opener, hosting the Qatar 1812 km race. It quickly established itself as a demanding test of endurance and tire management.',
    timezone: 'Asia/Qatar'
  },
  {
    slug: 'bahrain',
    name: 'Bahrain International Circuit',
    shortName: 'Bahrain',
    country: 'Bahrain',
    countryCode: 'BH',
    city: 'Sakhir',
    lengthKm: 5.412,
    turns: 15,
    lapRecordTime: '1:39.739',
    lapRecordHolder: 'Audi R18 (Lucas di Grassi)',
    lapRecordYear: 2016,
    established: 2004,
    description: 'Bahrain International Circuit hosts races under dramatic floodlights in the desert. The abrasive surface and high temperatures create unique challenges for teams.',
    wecHistory: 'The 8 Hours of Bahrain traditionally serves as the season finale of the FIA WEC, crowning the champions under the lights in an intense day-to-night race.',
    timezone: 'Asia/Bahrain'
  }
];
