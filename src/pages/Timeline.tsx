import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { raceResults, races2024, races2025 } from '@/data/wecData';
import { Badge } from '@/components/ui/badge';

type SeasonYear = 2024 | 2025;

const MANUFACTURER_COLORS: Record<string, string> = {
  'Ferrari': '#DC0000',
  'Toyota': '#E60012',
  'Porsche': '#C4A747',
  'Cadillac': '#1E3A5F',
  'Alpine': '#0090FF',
  'Peugeot': '#0066B1',
  'BMW': '#1E90FF',
};

const POINTS_SYSTEM = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

const Timeline = () => {
  const [selectedSeason, setSelectedSeason] = useState<SeasonYear>(2025);

  const races = selectedSeason === 2024 ? races2024 : races2025;
  const seasonRaces = races.slice().sort((a, b) => {
    if (a.round === null) return 1;
    if (b.round === null) return -1;
    return a.round - b.round;
  });

  const getRaceResult = (raceId: string) => {
    return raceResults.find(r => r.raceId === raceId);
  };

  const completedRaces = seasonRaces.filter(r => getRaceResult(r.id));
  const upcomingRaces = seasonRaces.filter(r => !getRaceResult(r.id));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getManufacturerWins = () => {
    const wins: Record<string, { count: number, color: string }> = {};
    completedRaces.forEach(race => {
      const result = getRaceResult(race.id);
      if (result && result.results.length > 0) {
        const winner = result.results[0];
        const manufacturer = winner.manufacturer;
        if (!wins[manufacturer]) {
          wins[manufacturer] = {
            count: 0,
            color: MANUFACTURER_COLORS[manufacturer] || winner.color || '#333'
          };
        }
        wins[manufacturer].count += 1;
      }
    });
    return Object.entries(wins).sort((a, b) => b[1].count - a[1].count);
  };

  const manufacturerWins = getManufacturerWins();
  const totalWins = completedRaces.length;

  const getPointsProgression = () => {
    const progression: Record<string, { name: string, points: number[] }> = {};

    // Initialize progression arrays
    const completedRoundIds = completedRaces.map(r => r.id);

    completedRoundIds.forEach((raceId, roundIndex) => {
      const result = getRaceResult(raceId);
      if (result) {
        result.results.forEach(entry => {
          const key = entry.team + ' ' + entry.carNumber;
          if (!progression[key]) {
            progression[key] = {
              name: key,
              points: new Array(completedRaces.length).fill(0)
            };
          }

          let points = 0;
          if (entry.position <= 10) {
            points = POINTS_SYSTEM[entry.position - 1];
          }
          if (entry.isFastestLap) {
            points += 1;
          }

          const prevPoints = roundIndex > 0 ? progression[key].points[roundIndex - 1] : 0;
          progression[key].points[roundIndex] = prevPoints + points;
        });

        // Ensure all keys have a value for this round even if they didn't score or participate
        Object.keys(progression).forEach(key => {
          if (progression[key].points[roundIndex] === 0 && roundIndex > 0) {
             progression[key].points[roundIndex] = progression[key].points[roundIndex - 1];
          }
        });
      }
    });

    const finalStandings = Object.values(progression).sort((a, b) => {
      const aPoints = a.points[a.points.length - 1] || 0;
      const bPoints = b.points[b.points.length - 1] || 0;
      return bPoints - aPoints;
    }).slice(0, 5);

    return finalStandings;
  };

  const pointsProgression = getPointsProgression();

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="container py-8 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h1 className="font-racing text-3xl md:text-4xl font-bold">
              <span className="text-gradient">Season Timeline</span>
            </h1>

            <Tabs
              value={selectedSeason.toString()}
              onValueChange={(val) => setSelectedSeason(parseInt(val) as SeasonYear)}
            >
              <TabsList className="grid w-full max-w-[200px] grid-cols-2">
                <TabsTrigger value="2025" className="font-racing text-sm md:text-base">2025</TabsTrigger>
                <TabsTrigger value="2024" className="font-racing text-sm md:text-base">2024</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        {/* Timeline Horizontal Scroll */}
        <div className="mb-12 relative">
          <div className="overflow-x-auto pb-6 custom-scrollbar">
            <div className="flex gap-4 min-w-max md:grid md:grid-cols-4 md:min-w-0 md:gap-6 items-start">
              {seasonRaces.map((race, index) => {
                const result = getRaceResult(race.id);
                const winner = result?.results[0];
                const isUpcoming = !result;
                const winnerColor = winner ? (MANUFACTURER_COLORS[winner.manufacturer] || winner.color) : 'transparent';

                return (
                  <motion.div
                    key={race.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="relative w-[280px] md:w-auto shrink-0"
                  >
                    {/* Connecting Line */}
                    {index < seasonRaces.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-[2px] z-0 -translate-y-1/2"
                           style={{ backgroundColor: winnerColor !== 'transparent' ? winnerColor : 'hsl(var(--border))' }}
                      />
                    )}

                    <Link to={`/race/${race.id}`} className="block relative z-10">
                      <div
                        className={`glass-card p-4 transition-all duration-300 hover:scale-[1.02] border-2 ${isUpcoming ? 'opacity-50' : ''}`}
                        style={{ borderColor: isUpcoming ? 'transparent' : `${winnerColor}40` }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="font-racing text-xs">
                            Round {race.round}
                          </Badge>
                          <span className="text-xl">{race.flag}</span>
                        </div>

                        <h3 className="font-racing text-lg font-bold truncate mb-1">{race.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{formatDate(race.date)}</p>

                        <div className="pt-3 border-t border-border/50">
                          {isUpcoming ? (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <span className="font-racing text-sm">TBD</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: winnerColor }} />
                              <span className="text-sm font-medium truncate">
                                Winner: {winner?.carNumber}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Manufacturer Dominance */}
        {totalWins > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12 glass-card p-6"
          >
            <h2 className="font-racing text-2xl font-bold mb-6">Manufacturer Dominance</h2>
            <div className="space-y-4">
              {manufacturerWins.map(([manufacturer, data]) => (
                <div key={manufacturer} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium shrink-0">{manufacturer}</div>
                  <div className="flex-1 h-6 bg-muted rounded-sm overflow-hidden flex">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: data.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.count / totalWins) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="w-16 text-sm text-muted-foreground text-right shrink-0">
                    {data.count} win{data.count !== 1 ? 's' : ''}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Points Progression Table */}
        {completedRaces.length > 0 && pointsProgression.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 overflow-x-auto"
          >
            <h2 className="font-racing text-2xl font-bold mb-6">Championship Progression (Top 5)</h2>
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-4 py-3 font-medium rounded-tl-lg">Team / Car</th>
                  {completedRaces.map((race, index) => (
                    <th key={race.id} className="px-4 py-3 font-racing text-center">
                      R{index + 1}
                    </th>
                  ))}
                  <th className="px-4 py-3 font-racing text-center rounded-tr-lg">Total</th>
                </tr>
              </thead>
              <tbody>
                {pointsProgression.map((entry, index) => (
                  <tr key={entry.name} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="px-4 py-4 font-medium">{entry.name}</td>
                    {entry.points.map((points, pIndex) => (
                      <td key={pIndex} className="px-4 py-4 text-center font-racing">
                        {points}
                      </td>
                    ))}
                    <td className="px-4 py-4 text-center font-racing font-bold text-primary">
                      {entry.points[entry.points.length - 1]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

      </main>
    </div>
  );
};

export default Timeline;
