import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Clock, Trophy, Flag, Gauge, Route } from 'lucide-react';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { races2024, races2025, races2026 } from '@/data/wecData';

const RaceProfile = () => {
  const { id } = useParams();
  
  // Find race across all seasons
  const allRaces = [...races2026, ...races2025, ...races2024];
  const race = allRaces.find(r => r.id === id);

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

  // Circuit data (mock data for circuit details)
  const circuitDetails: Record<string, { lapLength: string; corners: number; drsZones?: number; description: string }> = {
    'qatar': { lapLength: '5.380 km', corners: 16, description: 'Lusail International Circuit is a motorsport venue in Lusail, Qatar. The circuit hosted its first WEC race in 2024.' },
    'imola': { lapLength: '4.909 km', corners: 19, description: 'Autodromo Enzo e Dino Ferrari is a historic Italian circuit known for its challenging layout and rich motorsport heritage.' },
    'spa': { lapLength: '7.004 km', corners: 19, description: 'Circuit de Spa-Francorchamps is one of the most celebrated tracks in motorsport, featuring the iconic Eau Rouge corner.' },
    'le-mans': { lapLength: '13.626 km', corners: 38, description: 'Circuit de la Sarthe is the legendary venue of the 24 Hours of Le Mans, the world\'s oldest active sports car endurance race.' },
    'sao-paulo': { lapLength: '4.309 km', corners: 15, description: 'Interlagos is a challenging circuit with significant elevation changes and passionate local fans.' },
    'cota': { lapLength: '5.513 km', corners: 20, description: 'Circuit of the Americas features a mix of high-speed straights and technical sections inspired by classic circuits.' },
    'fuji': { lapLength: '4.563 km', corners: 16, description: 'Fuji Speedway sits at the base of Mount Fuji, offering stunning views and challenging racing conditions.' },
    'bahrain': { lapLength: '5.412 km', corners: 15, description: 'Bahrain International Circuit hosts the season finale under dramatic floodlights in the desert.' },
    'portimao': { lapLength: '4.653 km', corners: 15, description: 'Algarve International Circuit is known for its dramatic elevation changes and blind corners.' },
    'monza': { lapLength: '5.793 km', corners: 11, description: 'Autodromo Nazionale Monza is the Temple of Speed, featuring long straights and historic chicanes.' },
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

  const circuitKey = getCircuitKey(race.id);
  const circuit = circuitKey ? circuitDetails[circuitKey] : null;

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
          <Link 
            to="/schedule" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Schedule</span>
          </Link>
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
                {race.trackLength && (
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground">Lap Length</span>
                    <span className="font-medium">{race.trackLength}</span>
                  </div>
                )}
                {circuit && (
                  <>
                    <div className="flex justify-between items-center py-2 border-b border-glass-border">
                      <span className="text-muted-foreground">Corners</span>
                      <span className="font-medium">{circuit.corners}</span>
                    </div>
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
                {race.polePosition && (
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground">Pole Position</span>
                    <span className="font-medium">{race.polePosition}</span>
                  </div>
                )}
                {race.fastestLap && (
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

          {/* Sessions (if available) */}
          {race.sessions && race.sessions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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
                        <p className="text-sm text-muted-foreground">
                          {session.startTime} - {session.endTime}
                        </p>
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
