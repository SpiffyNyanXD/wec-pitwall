import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flag, Calendar, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { races, getNextRace } from '@/data/wecData';
import { useTimezone, TIMEZONE_OPTIONS, CIRCUIT_TIMEZONES } from '@/hooks/useTimezone';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownWidget = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasUpcomingRace, setHasUpcomingRace] = useState(true);
  const { convertTime, timezone } = useTimezone();
  
  // Find next upcoming race
  const nextRace = getNextRace();
  
  useEffect(() => {
    if (!nextRace) {
      setHasUpcomingRace(false);
      return;
    }
    
    const calculateTimeLeft = () => {
      const raceSession = nextRace.sessions?.find(s => s.type === 'Race');
      const targetStr = raceSession
        ? `${raceSession.date}T${raceSession.startTime}:00`
        : `${nextRace.date}T11:00:00`;
      const target = new Date(targetStr);

      const now = new Date();
      const difference = target.getTime() - now.getTime();
      
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
        className="glass-card p-6 md:p-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
        
        <div className="relative z-10 text-center py-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="w-6 h-6 text-primary" />
            <span className="text-sm uppercase tracking-widest text-muted-foreground">2025 Season Complete</span>
          </div>
          
          <h2 className="font-racing text-2xl md:text-3xl font-bold text-foreground mb-2">
            2026 Season Coming Soon
          </h2>
          <p className="text-muted-foreground mb-4">
            The 2026 FIA WEC season starts March 28 at Qatar
          </p>
          
          {lastCompletedRace && (
            <Link 
              to={`/race/${lastCompletedRace.id}`}
              className="inline-flex items-center gap-4 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <span className="flex items-center gap-1.5">
                <Flag className="w-4 h-4 text-primary" />
                Last Race: {lastCompletedRace.name}
              </span>
              {lastCompletedRace.winner && (
                <span className="text-primary font-medium">
                  Winner: {lastCompletedRace.winner}
                </span>
              )}
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <Link to={`/race/${nextRace.id}`}>
      <motion.div 
        className="glass-card p-6 md:p-8 relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors"
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
            <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="font-racing text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {nextRace.name}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="text-lg">{nextRace.flag}</span>
                  {nextRace.circuit}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {(() => {
                    const [y, m, d] = nextRace.date.split('-').map(Number);
                    return new Date(y, m - 1, d).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    });
                  })()}
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

        {/* Feature 2: Session breakdown */}
        {nextRace.sessions && nextRace.sessions.length > 0 && (
          <div className="relative z-10 mt-6 pt-4 border-t border-border/50">
            <h3 className="text-sm font-medium text-foreground mb-3">Session Schedule</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {nextRace.sessions.map((session, index) => (
                <div key={index} className="bg-muted/30 rounded p-2 text-xs border border-border/30">
                  <div className="font-medium text-primary mb-1">{session.type}</div>
                  <div className="text-muted-foreground">
                    {new Date(session.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="text-muted-foreground font-mono">
                    {convertTime(session.date, session.startTime, nextRace.circuit)} - {convertTime(session.date, session.endTime, nextRace.circuit)}
                  </div>
                  {timezone !== 'auto' && CIRCUIT_TIMEZONES[nextRace.circuit] && (
                    <div className="text-[9px] text-muted-foreground/50 font-mono mt-0.5">
                      {session.startTime}-{session.endTime} local
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </Link>
  );
};

export default CountdownWidget;