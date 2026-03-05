import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Trophy, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { races2024, races2025, races2026 } from '@/data/wecData';

const Schedule = () => {
  const formatDate = (dateString: string, endDate?: string) => {
    const parseDate = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
    const start = parseDate(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    
    if (endDate) {
      const end = parseDate(endDate);
      return `${start.toLocaleDateString('en-US', options)} - ${end.toLocaleDateString('en-US', options)}, ${start.getFullYear()}`;
    }
    return `${start.toLocaleDateString('en-US', { ...options, year: 'numeric' })}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>;
      case 'live':
        return <Badge variant="outline" className="bg-secondary/20 text-secondary border-secondary/30 animate-pulse">LIVE</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">Upcoming</Badge>;
      default:
        return null;
    }
  };

  const RaceCard = ({ race, index }: { race: typeof races2024[0]; index: number }) => (
    <Link to={`/race/${race.id}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="glass-card p-4 md:p-5 hover:border-primary/50 transition-all duration-300 group cursor-pointer tap-highlight"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          {/* Round & Flag */}
          <div className="flex items-center gap-3 md:w-32">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-muted/50 flex items-center justify-center shrink-0">
              <span className="text-2xl">{race.flag}</span>
            </div>
            <div className="md:hidden flex-1 min-w-0">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">R{race.round}</p>
              <p className="font-racing text-base font-bold truncate">{race.name}</p>
            </div>
            <div className="md:hidden">
              {getStatusBadge(race.status)}
            </div>
          </div>

          {/* Race Info */}
          <div className="flex-1 min-w-0">
            <div className="hidden md:block">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Round {race.round}</p>
              <h3 className="font-racing text-xl font-bold text-foreground group-hover:text-primary transition-colors truncate">
                {race.name}
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-3 md:gap-4 mt-1 md:mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{race.circuit}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>{formatDate(race.date, race.endDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>{race.duration}</span>
              </div>
            </div>
          </div>

          {/* Status & Winner */}
          <div className="hidden md:flex flex-col items-end gap-2">
            {getStatusBadge(race.status)}
            
            {race.winner && (
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-wec-gold" />
                <span className="text-wec-gold font-medium">{race.winner}</span>
              </div>
            )}
          </div>

          {/* Mobile Winner */}
          {race.winner && (
            <div className="md:hidden flex items-center gap-2 text-sm pt-1">
              <Trophy className="w-3.5 h-3.5 text-wec-gold" />
              <span className="text-wec-gold font-medium text-sm">{race.winner}</span>
            </div>
          )}

          {/* Chevron indicator */}
          <ChevronRight className="hidden md:block w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </motion.div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="container py-6 md:py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="font-racing text-2xl md:text-4xl font-bold mb-1 md:mb-2">
            <span className="text-gradient">Race Calendar</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">FIA World Endurance Championship</p>
        </motion.div>

        <Tabs defaultValue="2026" className="w-full">
          <TabsList className="grid w-full max-w-xs md:max-w-md grid-cols-3 mb-6 md:mb-8">
            <TabsTrigger value="2026" className="font-racing text-sm md:text-base">2026</TabsTrigger>
            <TabsTrigger value="2025" className="font-racing text-sm md:text-base">2025</TabsTrigger>
            <TabsTrigger value="2024" className="font-racing text-sm md:text-base">2024</TabsTrigger>
          </TabsList>

          <TabsContent value="2026">
            <div className="space-y-3 md:space-y-4">
              {races2026.map((race, index) => (
                <RaceCard key={race.id} race={race} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="2025">
            <div className="space-y-3 md:space-y-4">
              {races2025.map((race, index) => (
                <RaceCard key={race.id} race={race} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="2024">
            <div className="space-y-3 md:space-y-4">
              {races2024.map((race, index) => (
                <RaceCard key={race.id} race={race} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Schedule;
