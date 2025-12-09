import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flag, Calendar, Clock } from 'lucide-react';
import { races } from '@/data/wecData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownWidget = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const nextRace = races.find(race => race.status === 'upcoming') || races[0];
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const raceDate = new Date(nextRace.date);
      const now = new Date();
      const difference = raceDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [nextRace.date]);

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
