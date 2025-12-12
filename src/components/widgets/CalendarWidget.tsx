import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, CheckCircle, Trophy } from 'lucide-react';
import { races2025 } from '@/data/wecData';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const CalendarWidget = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-muted">Done</Badge>;
      case 'live':
        return <Badge className="bg-secondary text-secondary-foreground animate-pulse">LIVE</Badge>;
      case 'upcoming':
        return <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">Next</Badge>;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="glass-card p-5 col-span-full md:col-span-1"
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
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
        {races2025.slice(0, 5).map((race, index) => (
          <motion.div
            key={race.id}
            className={`p-3 rounded-lg border transition-all ${
              race.status === 'completed' 
                ? 'bg-muted/20 border-muted/30 opacity-60' 
                : 'bg-muted/30 border-glass-border hover:border-primary/30'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: race.status !== 'completed' ? 1.02 : 1 }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{race.flag}</span>
                <div>
                  <h4 className="font-medium text-foreground text-sm">{race.name}</h4>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {race.circuit}
                  </p>
                </div>
              </div>
              {getStatusBadge(race.status)}
            </div>
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
        ))}
      </div>
    </motion.div>
  );
};

export default CalendarWidget;
