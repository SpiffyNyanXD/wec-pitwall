import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { MapPin, Calendar, Clock, Trophy, Flag, Route, Timer, History } from 'lucide-react';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { races2024, races2025, races2026, raceResults } from '@/data/wecData';
import { useTimezone, TIMEZONE_OPTIONS, CIRCUIT_TIMEZONES } from '@/hooks/useTimezone';

interface CircuitFacts {
  lapLength: string;
  corners: number;
  description: string;
  opened: number;
  designer?: string;
  lapRecords?: {
    hypercar?: { time: string; driver: string; year: number };
    lmp2?: { time: string; driver: string; year: number };
    gt3?: { time: string; driver: string; year: number };
  };
  notableWinners?: string[];
  elevation?: string;
  longestStraight?: string;
}

const RaceProfile = () => {
  const { id } = useParams();
  const { convertTime, timezone } = useTimezone();
  
  // Find race across all seasons
  const allRaces = [...races2026, ...races2025, ...races2024];
  const race = allRaces.find(r => r.id === id);
  const raceResult = raceResults.find(r => r.raceId === id);

  useEffect(() => {
    if (race) {
      document.title = `${race.name} | Races | WEC Pitwall`;
    }
  }, [race]);

  if (!race) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Race Not Found</h1>
            <Link to="/schedule" className="text-primary hover:underline">
              Back to Schedule
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const formatDate = (dateString: string, endDate?: string) => {
    const start = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    
    if (endDate) {
      const end = new Date(endDate);
      return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.toLocaleDateString('en-US', options)}`;
    }
    return start.toLocaleDateString('en-US', options);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>;
      case 'live':
        return <Badge className="bg-secondary text-secondary-foreground animate-pulse">LIVE</Badge>;
      case 'upcoming':
        return <Badge className="bg-primary/20 text-primary border-primary/30">Upcoming</Badge>;
      default:
        return null;
    }
  };

  // Circuit data with comprehensive facts
  const circuitDetails: Record<string, CircuitFacts> = {
    'qatar': { 
      lapLength: '5.380 km', 
      corners: 16, 
      description: 'Lusail International Circuit is a motorsport venue in Lusail, Qatar. Originally built for MotoGP, it was upgraded for Formula 1 and WEC racing with extensive lighting for night races.',
      opened: 2004,
      designer: 'Tilke GmbH',
      elevation: '12m change',
      longestStraight: '1.068 km',
      lapRecords: {
        hypercar: { time: '1:46.783', driver: 'Kamui Kobayashi', year: 2024 },
        lmp2: { time: '1:51.234', driver: 'Louis Delétraz', year: 2024 },
      },
      notableWinners: ['Toyota GR010 (2024)', 'Porsche 963 (2025)']
    },
    'imola': { 
      lapLength: '4.909 km', 
      corners: 19, 
      description: 'Autodromo Enzo e Dino Ferrari is a historic Italian circuit named after Ferrari founder Enzo Ferrari and his son Dino. Known for its challenging, old-school layout with elevation changes.',
      opened: 1953,
      designer: 'Various (modified over decades)',
      elevation: '42m change',
      longestStraight: '0.550 km',
      lapRecords: {
        hypercar: { time: '1:30.140', driver: 'Antonio Fuoco', year: 2024 },
        lmp2: { time: '1:35.876', driver: 'Norman Nato', year: 2024 },
        gt3: { time: '1:42.561', driver: 'Marco Sørensen', year: 2024 },
      },
      notableWinners: ['Ferrari 499P (2024)', 'Toyota GR010 (2025)']
    },
    'spa': { 
      lapLength: '7.004 km', 
      corners: 19, 
      description: 'Circuit de Spa-Francorchamps is one of the most celebrated tracks in motorsport, featuring the iconic Eau Rouge/Raidillon sequence. Located in the Ardennes forest, it often experiences multiple weather conditions during a single race.',
      opened: 1921,
      designer: 'Jules de Thier & Henri Langlois Van Ophem',
      elevation: '104m change',
      longestStraight: '1.933 km (Kemmel)',
      lapRecords: {
        hypercar: { time: '2:01.540', driver: 'Kévin Estre', year: 2024 },
        lmp2: { time: '2:09.234', driver: 'Phil Hanson', year: 2024 },
        gt3: { time: '2:18.123', driver: 'Klaus Bachler', year: 2024 },
      },
      notableWinners: ['Porsche 963 (2024, 2025)', 'Toyota TS050 (2019)', 'Audi R18 (2012)']
    },
    'le-mans': { 
      lapLength: '13.626 km', 
      corners: 38, 
      description: 'Circuit de la Sarthe is the legendary venue of the 24 Hours of Le Mans, the world\'s oldest active sports car endurance race. The circuit combines permanent sections with public roads closed for the event.',
      opened: 1923,
      designer: 'ACO (evolved over 100 years)',
      elevation: '30m change',
      longestStraight: '6.0 km (Mulsanne)',
      lapRecords: {
        hypercar: { time: '3:23.550', driver: 'Kamui Kobayashi', year: 2024 },
        lmp2: { time: '3:30.567', driver: 'Louis Delétraz', year: 2024 },
        gt3: { time: '3:54.234', driver: 'Davide Rigon', year: 2024 },
      },
      notableWinners: ['Ferrari 499P (2023, 2024)', 'Toyota GR010 (2021, 2022, 2025)', 'Porsche 919 (2015-17)']
    },
    'sao-paulo': { 
      lapLength: '4.309 km', 
      corners: 15, 
      description: 'Autódromo José Carlos Pace (Interlagos) is a challenging circuit with significant elevation changes and passionate local fans. Known for unpredictable weather and dramatic racing.',
      opened: 1940,
      designer: 'Alfredo Guará',
      elevation: '40m change',
      longestStraight: '0.700 km',
      lapRecords: {
        hypercar: { time: '1:25.789', driver: 'Sébastien Buemi', year: 2024 },
        lmp2: { time: '1:31.234', driver: 'Norman Nato', year: 2024 },
        gt3: { time: '1:38.567', driver: 'Marco Sørensen', year: 2024 },
      },
      notableWinners: ['Toyota GR010 (2024)', 'Porsche 963 (2025)']
    },
    'cota': { 
      lapLength: '5.513 km', 
      corners: 20, 
      description: 'Circuit of the Americas features a mix of high-speed straights and technical sections inspired by classic circuits. The iconic Turn 1 hill provides spectacular racing action.',
      opened: 2012,
      designer: 'Tilke GmbH',
      elevation: '41m change',
      longestStraight: '1.0 km',
      lapRecords: {
        hypercar: { time: '1:48.123', driver: 'Antonio Giovinazzi', year: 2024 },
        lmp2: { time: '1:54.567', driver: 'Phil Hanson', year: 2024 },
        gt3: { time: '2:02.345', driver: 'Laurin Heinrich', year: 2024 },
      },
      notableWinners: ['Porsche 963 (2024)', 'Ferrari 499P (2025)']
    },
    'fuji': { 
      lapLength: '4.563 km', 
      corners: 16, 
      description: 'Fuji Speedway sits at the base of Mount Fuji, offering stunning views and challenging racing conditions. The 1.475km start/finish straight is one of the longest in motorsport.',
      opened: 1966,
      designer: 'Various (modernized by Tilke in 2005)',
      elevation: '35m change',
      longestStraight: '1.475 km',
      lapRecords: {
        hypercar: { time: '1:28.234', driver: 'Ryo Hirakawa', year: 2024 },
        lmp2: { time: '1:34.567', driver: 'Louis Delétraz', year: 2024 },
        gt3: { time: '1:41.234', driver: 'Klaus Bachler', year: 2024 },
      },
      notableWinners: ['Toyota GR010 (2024, 2025)', 'Porsche 919 (2017)']
    },
    'bahrain': { 
      lapLength: '5.412 km', 
      corners: 15, 
      description: 'Bahrain International Circuit hosts the season finale under dramatic floodlights in the desert. The abrasive surface and high temperatures create unique challenges for teams.',
      opened: 2004,
      designer: 'Tilke GmbH',
      elevation: '12m change',
      longestStraight: '0.700 km',
      lapRecords: {
        hypercar: { time: '1:46.567', driver: 'Kévin Estre', year: 2024 },
        lmp2: { time: '1:52.234', driver: 'Norman Nato', year: 2024 },
        gt3: { time: '1:59.123', driver: 'Marco Sørensen', year: 2024 },
      },
      notableWinners: ['Toyota GR010 (2024)', 'Porsche 963 (2025)']
    },
    'portimao': { 
      lapLength: '4.653 km', 
      corners: 15, 
      description: 'Algarve International Circuit is known for its dramatic elevation changes and blind corners. The rollercoaster layout provides unique challenges for drivers.',
      opened: 2008,
      designer: 'Ricardo Pina',
      elevation: '61m change',
      longestStraight: '0.969 km',
      lapRecords: {
        hypercar: { time: '1:32.456', driver: 'Brendon Hartley', year: 2024 },
      },
      notableWinners: ['Alpine A480 (2022)', 'Toyota GR010 (2023)']
    },
    'monza': { 
      lapLength: '5.793 km', 
      corners: 11, 
      description: 'Autodromo Nazionale Monza is the Temple of Speed, featuring long straights and historic chicanes. The circuit has hosted racing since 1922.',
      opened: 1922,
      designer: 'Alfredo Rosselli',
      elevation: '11m change',
      longestStraight: '1.1 km',
      lapRecords: {
        hypercar: { time: '1:36.789', driver: 'Antonio Fuoco', year: 2024 },
        gt3: { time: '1:48.567', driver: 'Davide Rigon', year: 2024 },
      },
      notableWinners: ['Ferrari 499P', 'Porsche 963']
    },
  };

  const getCircuitKey = (raceId: string) => {
    if (raceId.includes('qatar')) return 'qatar';
    if (raceId.includes('imola')) return 'imola';
    if (raceId.includes('spa')) return 'spa';
    if (raceId.includes('le-mans') || raceId.includes('lemans')) return 'le-mans';
    if (raceId.includes('sao-paulo') || raceId.includes('interlagos')) return 'sao-paulo';
    if (raceId.includes('cota') || raceId.includes('austin')) return 'cota';
    if (raceId.includes('fuji')) return 'fuji';
    if (raceId.includes('bahrain')) return 'bahrain';
    if (raceId.includes('portimao')) return 'portimao';
    if (raceId.includes('monza')) return 'monza';
    return null;
  };

  const getUtcOffset = (circuitKey: string | null) => {
    switch (circuitKey) {
      case 'qatar': return 'UTC+3';
      case 'imola': return 'UTC+2 (CEST)';
      case 'spa': return 'UTC+2 (CEST)';
      case 'le-mans': return 'UTC+2 (CEST)';
      case 'sao-paulo': return 'UTC-3';
      case 'cota': return 'UTC-5 (CDT)';
      case 'fuji': return 'UTC+9';
      case 'bahrain': return 'UTC+3';
      case 'portimao': return 'UTC+1 (WEST)';
      case 'monza': return 'UTC+2 (CEST)';
      default: return '';
    }
  };

  const circuitKey = getCircuitKey(race.id);
  const circuit = circuitKey ? circuitDetails[circuitKey] : null;
  const utcOffset = getUtcOffset(circuitKey);

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="container py-6 md:py-8 relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <BackButton to="/schedule" label="Back to Schedule" />
        </motion.div>

        {/* Race Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 md:p-8 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-muted/50 flex items-center justify-center text-5xl md:text-6xl shrink-0">
              {race.flag}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <Badge variant="outline" className="text-xs">Round {race.round}</Badge>
                <Badge variant="outline" className="text-xs">{race.season} Season</Badge>
                {getStatusBadge(race.status)}
              </div>
              
              <h1 className="font-racing text-2xl md:text-4xl font-bold mb-2">
                <span className="text-gradient">{race.name}</span>
              </h1>
              
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{race.circuit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(race.date, race.endDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{race.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Circuit Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-card border-glass-border h-full">
              <CardHeader>
                <CardTitle className="font-racing flex items-center gap-2">
                  <Route className="w-5 h-5 text-primary" />
                  Circuit Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(race.trackLength || circuit?.lapLength) && (
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground">Lap Length</span>
                    <span className="font-medium">{race.trackLength || circuit?.lapLength}</span>
                  </div>
                )}
                {circuit && (
                  <>
                    <div className="flex justify-between items-center py-2 border-b border-glass-border">
                      <span className="text-muted-foreground">Corners</span>
                      <span className="font-medium">{circuit.corners}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-glass-border">
                      <span className="text-muted-foreground">Opened</span>
                      <span className="font-medium">{circuit.opened}</span>
                    </div>
                    {circuit.designer && (
                      <div className="flex justify-between items-center py-2 border-b border-glass-border">
                        <span className="text-muted-foreground">Designer</span>
                        <span className="font-medium text-right">{circuit.designer}</span>
                      </div>
                    )}
                    {circuit.elevation && (
                      <div className="flex justify-between items-center py-2 border-b border-glass-border">
                        <span className="text-muted-foreground">Elevation</span>
                        <span className="font-medium">{circuit.elevation}</span>
                      </div>
                    )}
                    {circuit.longestStraight && (
                      <div className="flex justify-between items-center py-2 border-b border-glass-border">
                        <span className="text-muted-foreground">Longest Straight</span>
                        <span className="font-medium">{circuit.longestStraight}</span>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground pt-2">
                      {circuit.description}
                    </p>
                  </>
                )}
                {!circuit && !race.trackLength && (
                  <p className="text-sm text-muted-foreground">Circuit details coming soon.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Race Results (if completed) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card border-glass-border h-full">
              <CardHeader>
                <CardTitle className="font-racing flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-wec-gold" />
                  {race.status === 'completed' ? 'Race Results' : 'Race Information'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {race.winner && (
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground">Winner</span>
                    <span className="font-medium text-wec-gold">{race.winner}</span>
                  </div>
                )}
                {race.winningTeam && (
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground">Winning Team</span>
                    <span className="font-medium">{race.winningTeam}</span>
                  </div>
                )}
                {raceResult?.polePosition ? (
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground">Pole Position</span>
                    <span className="font-medium">{raceResult.polePosition} — {raceResult.poleTime}</span>
                  </div>
                ) : race.polePosition && (
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground">Pole Position</span>
                    <span className="font-medium">{race.polePosition}</span>
                  </div>
                )}
                {raceResult?.fastestLap ? (
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground">Fastest Lap</span>
                    <span className="font-medium text-wec-gold">{raceResult.fastestLapTime}</span>
                  </div>
                ) : race.fastestLap && (
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground">Fastest Lap</span>
                    <span className="font-medium">{race.fastestLap}</span>
                  </div>
                )}
                {race.status === 'upcoming' && !race.winner && (
                  <p className="text-sm text-muted-foreground">
                    Results will be available after the race.
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Full Results Table */}
          {raceResult && race.status === 'completed' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="md:col-span-2"
            >
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="font-racing flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-wec-gold" />
                    Full Race Results — All Classes
                  </CardTitle>
                  {/* Pole + Fastest Lap summary */}
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-muted-foreground">Pole:</span>
                      <span className="font-medium">{raceResult.polePosition}</span>
                      <span className="font-racing text-primary">{raceResult.poleTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-wec-gold" />
                      <span className="text-muted-foreground">Fastest Lap:</span>
                      <span className="font-medium">{raceResult.fastestLap}</span>
                      <span className="font-racing text-wec-gold">{raceResult.fastestLapTime}</span>
                      <span className="text-muted-foreground text-xs">({raceResult.fastestLapDriver})</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-glass-border text-xs text-muted-foreground uppercase tracking-wider">
                          <th className="text-left py-2 px-4 w-10">Pos</th>
                          <th className="text-left py-2 px-2 w-12">Car</th>
                          <th className="text-left py-2 px-2">Team / Drivers</th>
                          <th className="text-right py-2 px-4 hidden sm:table-cell">Laps</th>
                          <th className="text-right py-2 px-4">Gap</th>
                        </tr>
                      </thead>
                      <tbody>
                        {raceResult.results.map((result, i) => (
                          <tr
                            key={result.position}
                            className={`border-b border-glass-border/50 transition-colors hover:bg-muted/20 ${
                              result.position === 1 ? 'bg-wec-gold/5' : ''
                            }`}
                          >
                            {/* Position */}
                            <td className="py-3 px-4">
                              <span className={`font-racing font-bold text-base ${
                                result.position === 1 ? 'text-wec-gold' :
                                result.position === 2 ? 'text-muted-foreground' :
                                result.position === 3 ? 'text-wec-bronze' :
                                'text-foreground'
                              }`}>
                                {result.position}
                              </span>
                            </td>

                            {/* Car number */}
                            <td className="py-3 px-2">
                              <span
                                className="text-xs font-bold px-2 py-1 rounded"
                                style={{ backgroundColor: `${result.color}25`, color: result.color }}
                              >
                                {result.carNumber}
                              </span>
                            </td>

                            {/* Team + Drivers */}
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{result.flag}</span>
                                <div>
                                  <p className="font-medium text-foreground text-sm leading-tight">
                                    {result.manufacturer} · {result.class}
                                    {result.isFastestLap && (
                                      <span className="ml-2 text-wec-gold text-xs font-bold">⚡ FL</span>
                                    )}
                                  </p>
                                  <p className="text-xs text-muted-foreground leading-tight">
                                    {result.drivers.join(' · ')}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Laps */}
                            <td className="py-3 px-4 text-right hidden sm:table-cell">
                              <span className="text-muted-foreground">{result.laps}</span>
                            </td>

                            {/* Gap */}
                            <td className="py-3 px-4 text-right">
                              <span className={`font-racing text-sm ${
                                result.gap === 'Leader' ? 'text-wec-gold font-bold' : 'text-muted-foreground'
                              }`}>
                                {result.gap}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Race Pace Analysis — shown only for completed races */}
          {race.status === 'completed' && raceResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 mt-6 md:col-span-2"
            >
              <h2 className="text-lg font-bold text-foreground mb-4">Race Pace Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Winning margin insight */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Winning Margin
                  </p>
                  <p className="font-racing text-2xl font-bold text-foreground">
                    {raceResult.results[1]?.gap ?? 'N/A'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">P1 gap to P2</p>
                </div>

                {/* Average lap delta */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Avg Lap Delta (P1 vs P2)
                  </p>
                  {(() => {
                    const totalLaps = raceResult.results[0]?.laps || 1;
                    const marginStr = raceResult.results[1]?.gap || '';
                    const match = marginStr.match(/\+?(\d+):?(\d+\.?\d*)/);
                    if (!match) return <p className="font-racing text-2xl font-bold text-foreground">N/A</p>;
                    const totalSeconds = match[1].includes(':')
                      ? parseInt(match[1]) * 60 + parseFloat(match[2])
                      : parseFloat(match[1] + '.' + (match[2] || '0'));
                    const avgDelta = totalSeconds / totalLaps;
                    return (
                      <>
                        <p className="font-racing text-2xl font-bold text-primary">
                          +{avgDelta.toFixed(3)}s
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">per lap average</p>
                      </>
                    );
                  })()}
                </div>

                {/* Fastest lap */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Fastest Lap
                  </p>
                  <p className="font-racing text-2xl font-bold text-foreground">
                    {raceResult.fastestLapTime}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {raceResult.fastestLapDriver} — {raceResult.fastestLap}
                  </p>
                </div>
              </div>

              {/* Competitiveness indicator */}
              <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Race Verdict
                </p>
                {(() => {
                  const marginStr = raceResult.results[1]?.gap || '';
                  const seconds = parseFloat(marginStr.replace('+', '').replace('s', ''));
                  let verdict = '';
                  let color = '';
                  if (seconds < 5) { verdict = 'Photo finish — exceptional race battle'; color = 'text-green-500'; }
                  else if (seconds < 30) { verdict = 'Close race — strategy was decisive'; color = 'text-yellow-500'; }
                  else if (seconds < 60) { verdict = 'Controlled win — consistent pace advantage'; color = 'text-orange-500'; }
                  else { verdict = 'Dominant performance — significant gap to second'; color = 'text-red-500'; }
                  return <p className={`text-sm font-medium ${color}`}>{verdict}</p>;
                })()}
              </div>
            </motion.div>
          )}

          {/* Lap Records */}
          {circuit?.lapRecords && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="glass-card border-glass-border h-full">
                <CardHeader>
                  <CardTitle className="font-racing flex items-center gap-2">
                    <Timer className="w-5 h-5 text-secondary" />
                    Lap Records
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {circuit.lapRecords.hypercar && (
                    <div className="py-2 border-b border-glass-border">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-muted-foreground text-sm">Hypercar</span>
                        <div className="flex flex-col items-end">
                          <span className="font-racing font-bold text-primary">{circuit.lapRecords.hypercar.time}</span>
                          <span className="text-xs text-muted-foreground">
                            {circuit.lapRecords.hypercar.driver} ({circuit.lapRecords.hypercar.year})
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {circuit.lapRecords.lmp2 && (
                    <div className="py-2 border-b border-glass-border">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-muted-foreground text-sm">LMP2</span>
                        <div className="flex flex-col items-end">
                          <span className="font-racing font-bold">{circuit.lapRecords.lmp2.time}</span>
                          <span className="text-xs text-muted-foreground">
                            {circuit.lapRecords.lmp2.driver} ({circuit.lapRecords.lmp2.year})
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {circuit.lapRecords.gt3 && (
                    <div className="py-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-muted-foreground text-sm">LMGT3</span>
                        <div className="flex flex-col items-end">
                          <span className="font-racing font-bold">{circuit.lapRecords.gt3.time}</span>
                          <span className="text-xs text-muted-foreground">
                            {circuit.lapRecords.gt3.driver} ({circuit.lapRecords.gt3.year})
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Notable Winners */}
          {circuit?.notableWinners && circuit.notableWinners.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card border-glass-border h-full">
                <CardHeader>
                  <CardTitle className="font-racing flex items-center gap-2">
                    <History className="w-5 h-5 text-wec-gold" />
                    Notable Winners
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {circuit.notableWinners.map((winner, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-wec-gold" />
                        <span className="text-foreground">{winner}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Sessions (if available) */}
          {race.sessions && race.sessions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="md:col-span-2"
            >
              <Card className="glass-card border-glass-border">
                <CardHeader>
                  <CardTitle className="font-racing flex items-center gap-2">
                    <Flag className="w-5 h-5 text-primary" />
                    Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {utcOffset && (
                    <p className="text-xs text-muted-foreground mb-4">
                      All times are local circuit time ({utcOffset})
                    </p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {race.sessions.map((session, index) => (
                      <div 
                        key={index}
                        className="p-4 rounded-lg bg-muted/30 border border-glass-border"
                      >
                        <p className="font-medium mb-1">{session.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(session.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                          <Clock className="w-4 h-4" />
                          {convertTime(session.date, session.startTime, race.circuit)} - {convertTime(session.date, session.endTime, race.circuit)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default RaceProfile;