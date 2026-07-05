import SEOHead from "@/components/SEOHead";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Trophy, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { computeAllRaceStatuses } from '@/utils/raceStatus';
import { RaceBadge } from '@/components/RaceBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { races2024, races2025, races2026 } from '@/data/wecData';
import { JsonLd } from "@/components/seo/JsonLd";

const Schedule = () => {
  const allRaces = [...races2026, ...races2025, ...races2024];
  const raceStatuses = React.useMemo(() => computeAllRaceStatuses(
    allRaces.map(r => ({
      id: r.id,
      scheduled_date: r.date,
      duration_hours: r.duration_hours || 6,
      status: r.status === 'postponed' ? 'cancelled' : (r.status === 'completed' ? 'completed' : 'scheduled')
    }))
  ), [allRaces]);

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



  const RaceCard = ({ race, index }: { race: Record<string, unknown>; index: number }) => (
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
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {race.round !== null ? `Round ${race.round}` : 'Postponed'}
              </p>
              <p className="text-base font-bold truncate">{race.name}</p>
            </div>
            <div className="md:hidden">
              {raceStatuses.has(race.id as string) && <RaceBadge status={raceStatuses.get(race.id as string)!} />}
            </div>
          </div>

          {/* Race Info */}
          <div className="flex-1 min-w-0">
            <div className="hidden md:block">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {race.round !== null ? `Round ${race.round}` : 'Postponed — TBC'}
              </p>
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors truncate">
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
            {raceStatuses.has(race.id as string) && <RaceBadge status={raceStatuses.get(race.id as string)!} />}
            
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



      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        "name": "24 Hours of Le Mans 2026",
        "startDate": "2026-06-13",
        "endDate": "2026-06-14",
        "location": {
          "@type": "Place",
          "name": "Circuit de la Sarthe",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Le Mans",
            "addressCountry": "FR"
          }
        },
        "sport": "Endurance Racing",
        "organizer": {
          "@type": "Organization",
          "name": "Automobile Club de l'Ouest",
          "url": "https://www.24h-lemans.com"
        },
        "url": "https://wec-pitwall.vercel.app/schedule",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
      }} />

      <SEOHead
        title="2026 WEC Race Schedule | WEC Pitwall"
        description="Full 2026 FIA World Endurance Championship calendar. Dates, circuits and results for all 8 rounds including the 24 Hours of Le Mans."
        url="/schedule"
      />
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 py-6 md:py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">
            <span className="text-gradient">Race Calendar</span>
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">FIA World Endurance Championship</p>
        </motion.div>

        <Tabs defaultValue="2026" className="w-full">
          <TabsList className="grid w-full max-w-xs md:max-w-md grid-cols-3 mb-6 md:mb-8">
            <TabsTrigger value="2026" className="text-sm md:text-base">2026</TabsTrigger>
            <TabsTrigger value="2025" className="text-sm md:text-base">2025</TabsTrigger>
            <TabsTrigger value="2024" className="text-sm md:text-base">2024</TabsTrigger>
          </TabsList>

          <TabsContent value="2026">
            <div className="grid grid-cols-1 3xl:grid-cols-2 4xl:grid-cols-3 gap-3 md:gap-4">
              {races2026
                .slice()
                .sort((a, b) => {
                  if (a.round === null) return 1;
                  if (b.round === null) return -1;
                  return a.round - b.round;
                })
                .map((race, index) => (
                  <RaceCard key={race.id} race={race} index={index} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="2025">
            <div className="grid grid-cols-1 3xl:grid-cols-2 4xl:grid-cols-3 gap-3 md:gap-4">
              {races2025.map((race, index) => (
                <RaceCard key={race.id} race={race} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="2024">
            <div className="grid grid-cols-1 3xl:grid-cols-2 4xl:grid-cols-3 gap-3 md:gap-4">
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
