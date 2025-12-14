import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flag, Calendar, Clock, CheckCircle } from 'lucide-react';
import { races, getNextRace } from '@/data/wecData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownWidget = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasUpcomingRace, setHasUpcomingRace] = useState(true);
  
  // Find next upcoming race
  const nextRace = getNextRace();
  
  useEffect(() => {
    if (!nextRace) {
      setHasUpcomingRace(false);
      return;
    }
    
    const calculateTimeLeft = () => {
      const raceDate = new Date(nextRace.date);
      const now = new Date();
      const difference = raceDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setHasUpcomingRace(true);
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setHasUpcomingRace(false);
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [nextRace]);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <motion.div 
      className="flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
    >
      <div className="glass-card px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[90px] text-center border-primary/30">
        <span className="font-racing text-2xl md:text-4xl font-bold text-foreground">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs md:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );

  // If no upcoming races, show season complete message
  if (!nextRace || !hasUpcomingRace) {
    const lastCompletedRace = [...races].reverse().find(r => r.status === 'completed');
    
    return (
      <motion.div 
        className="glass-card p-6 md:p-8 col-span-full lg:col-span-2 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
        
        <div className="relative z-10 text-center py-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-primary" />
            <span className="text-sm uppercase tracking-widest text-muted-foreground">Season Complete</span>
          </div>
          
          <h2 className="font-racing text-2xl md:text-3xl font-bold text-foreground mb-2">
            2025 Season Finished
          </h2>
          <p className="text-muted-foreground mb-4">
            The 2026 season starts in February
          </p>
          
          {lastCompletedRace && (
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Flag className="w-4 h-4 text-primary" />
                Last Race: {lastCompletedRace.name}
              </span>
              {lastCompletedRace.winner && (
                <span className="text-primary font-medium">
                  Winner: {lastCompletedRace.winner}
                </span>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="glass-card p-6 md:p-8 col-span-full lg:col-span-2 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Flag className="w-4 h-4 text-primary" />
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Next Race</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="font-racing text-2xl md:text-3xl font-bold text-foreground mb-2">
              {nextRace.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="text-lg">{nextRace.flag}</span>
                {nextRace.circuit}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(nextRace.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {nextRace.duration}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3 md:gap-4">
            <TimeBlock value={timeLeft.days} label="Days" />
            <TimeBlock value={timeLeft.hours} label="Hours" />
            <TimeBlock value={timeLeft.minutes} label="Mins" />
            <TimeBlock value={timeLeft.seconds} label="Secs" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CountdownWidget;
