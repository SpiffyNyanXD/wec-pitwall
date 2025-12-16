import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Trophy, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { races2024, races2025, races2026 } from '@/data/wecData';

const Schedule = () => {
  const formatDate = (dateString: string, endDate?: string) => {
    const start = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    
    if (endDate) {
      const end = new Date(endDate);
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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card p-5 hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        {/* Round & Flag */}
        <div className="flex items-center gap-4 md:w-32">
          <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
            <span className="text-2xl">{race.flag}</span>
          </div>
          <div className="md:hidden">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Round {race.round}</p>
            <p className="font-racing text-lg font-bold">{race.name}</p>
          </div>
        </div>

        {/* Race Info */}
        <div className="flex-1">
          <div className="hidden md:block">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Round {race.round}</p>
            <h3 className="font-racing text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {race.name}
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {race.circuit}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(race.date, race.endDate)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {race.duration}
            </div>
          </div>

          {race.trackLength && (
            <p className="text-xs text-muted-foreground mt-2">
              Track: {race.trackLength}
            </p>
          )}
        </div>

        {/* Status & Winner */}
        <div className="flex flex-col items-end gap-2">
          {getStatusBadge(race.status)}
          
          {race.winner && (
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="w-4 h-4 text-wec-gold" />
              <span className="text-wec-gold font-medium">{race.winner}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="container py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-racing text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient">Race Calendar</span>
          </h1>
          <p className="text-muted-foreground">FIA World Endurance Championship Schedule</p>
        </motion.div>

        <Tabs defaultValue="2026" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="2026" className="font-racing">2026 Season</TabsTrigger>
            <TabsTrigger value="2025" className="font-racing">2025 Season</TabsTrigger>
            <TabsTrigger value="2024" className="font-racing">2024 Season</TabsTrigger>
          </TabsList>

          <TabsContent value="2026">
            <div className="space-y-4">
              {races2026.map((race, index) => (
                <RaceCard key={race.id} race={race} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="2025">
            <div className="space-y-4">
              {races2025.map((race, index) => (
                <RaceCard key={race.id} race={race} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="2024">
            <div className="space-y-4">
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
