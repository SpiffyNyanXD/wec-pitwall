import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { races2025 } from '@/data/wecData';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const CalendarWidget = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-muted text-xs">Done</Badge>;
      case 'live':
        return <Badge className="bg-secondary text-secondary-foreground animate-pulse text-xs">LIVE</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 text-xs">Next</Badge>;
      default:
        return null;
    }
  };

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
          <h3 className="font-racing text-lg font-bold">2025 Calendar</h3>
        </div>
        <Link to="/schedule" className="text-xs text-primary hover:underline">View All</Link>
      </div>
      
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
        {races2025.slice(0, 5).map((race, index) => (
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
                  <span className="text-lg shrink-0">{race.flag}</span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-foreground text-sm truncate">{race.name}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="truncate">{race.circuit}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {getStatusBadge(race.status)}
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
