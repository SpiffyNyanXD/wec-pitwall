import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { races2025 } from '@/data/wecData';
import { computeAllRaceStatuses } from '@/utils/raceStatus';
import { RaceBadge } from '@/components/RaceBadge';
import { Link } from 'react-router-dom';
import { useActiveSeasonId, useRaces } from '@/hooks/useWecData';
import { Skeleton } from '@/components/ui/skeleton';

const CalendarWidget = () => {
  const { seasonId, loading: seasonLoading } = useActiveSeasonId();
  const { data: dbRaces, loading: racesLoading } = useRaces(seasonId);
  const isRacesLoading = seasonLoading || racesLoading;

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isRacesLoading) {
    return (
      <motion.div
        className="glass-card p-4 md:p-5 col-span-full md:col-span-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <Skeleton className="h-6 w-32" />
          </div>
          <Skeleton className="h-4 w-12" />
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-3 rounded-lg border bg-muted/30 border-glass-border space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="w-6 h-6 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Determine which season to show based on current date or status
  const currentSeasonRaces = (dbRaces && dbRaces.length > 0) ? dbRaces : races2025;
  const currentYear = currentSeasonRaces[0]?.season || (currentSeasonRaces[0]?.date ? new Date(currentSeasonRaces[0].date).getFullYear() : 2026);

  const raceStatuses = computeAllRaceStatuses(
    currentSeasonRaces.map(r => ({
      id: r.id,
      scheduled_date: r.date,
      duration_hours: r.duration_hours || 6,
      status: r.status === 'postponed' ? 'cancelled' : (r.status === 'completed' ? 'completed' : 'scheduled')
    }))
  );

  return (
    <motion.div 
      className="glass-card p-4 md:p-5 col-span-full md:col-span-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <h3 className="text-lg font-bold">{currentYear} Calendar</h3>
        </div>
        <Link to="/schedule" className="text-xs text-primary hover:underline">View All</Link>
      </div>
      
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
        {currentSeasonRaces.slice(0, 5).map((race, index) => (
          <Link key={race.id} to={`/race/${race.id}`}>
            <motion.div
              className={`p-3 rounded-lg border transition-all cursor-pointer tap-highlight ${
                race.status === 'completed' 
                  ? 'bg-muted/20 border-muted/30 opacity-60' 
                  : 'bg-muted/30 border-glass-border hover:border-primary/30'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-lg shrink-0">{race.flag ?? '🏁'}</span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-foreground text-sm truncate">{race.name}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{race.circuit}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {raceStatuses.has(race.id) && <RaceBadge status={raceStatuses.get(race.id)!} />}
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(race.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric'
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {race.duration}
                </span>
                {race.status === 'completed' && (
                  <CheckCircle className="w-3 h-3 text-green-500" />
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default CalendarWidget;
