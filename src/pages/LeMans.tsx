import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Trophy, MapPin, Flag, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { races } from '@/data/wecData';
import { useTimezone, CIRCUIT_TIMEZONES } from '@/hooks/useTimezone';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const recentWinners = [
  {
    year: '2025',
    car: 'AF Corse #83',
    chassis: 'Ferrari 499P',
    drivers: 'Kubica / Hanson / Ye',
    color: '#DC0000'
  },
  {
    year: '2024',
    car: 'Ferrari AF Corse #50',
    chassis: 'Ferrari 499P',
    drivers: 'Fuoco / Molina / Nielsen',
    color: '#DC0000'
  },
  {
    year: '2023',
    car: 'Ferrari AF Corse #51',
    chassis: 'Ferrari 499P',
    drivers: 'Pier Guidi / Calado / Giovinazzi',
    color: '#DC0000'
  },
  {
    year: '2022',
    car: 'Toyota Gazoo Racing #8',
    chassis: 'Toyota GR010',
    drivers: 'Buemi / Hartley / Hirakawa',
    color: '#E60012'
  },
  {
    year: '2021',
    car: 'Toyota Gazoo Racing #7',
    chassis: 'Toyota GR010',
    drivers: 'Conway / Kobayashi / López',
    color: '#E60012'
  }
];

const LeMans = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasUpcomingRace, setHasUpcomingRace] = useState(true);
  const { convertTime, timezone } = useTimezone();

  const nextRace = races.find(r => r.id === '2026-3'); // 2026 Le Mans

  useEffect(() => {
    if (!nextRace) {
      setHasUpcomingRace(false);
      return;
    }

    const calculateTimeLeft = () => {
      const raceSession = nextRace.sessions?.find(s => s.type === 'Race');
      const targetStr = raceSession
        ? `${raceSession.date}T${raceSession.startTime}:00`
        : `${nextRace.date}T16:00:00`;
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
      <div className="glass-card px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[90px] text-center border-wec-gold/30">
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Background effects with Gold */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-wec-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-wec-gold/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="container py-8 px-4 relative z-10 max-w-6xl mx-auto space-y-8">

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <BackButton to="/schedule" label="Back to Schedule" />
        </motion.div>

        {/* Hero Section */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-racing text-5xl md:text-7xl font-bold text-gradient pb-2 bg-gradient-to-r from-wec-gold via-yellow-300 to-wec-gold bg-clip-text text-transparent">
            24 HOURS OF LE MANS
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-medium uppercase tracking-widest">
            The Greatest Race in the World
          </p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-wec-gold" />
            <span>Circuit de la Sarthe, Le Mans, France 🇫🇷</span>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="glass-card p-4 md:p-6 border-wec-gold/20 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <div className="font-racing text-2xl font-bold text-wec-gold">1923</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Since</div>
          </div>
          <div className="w-px h-8 bg-border hidden md:block" />
          <div>
            <div className="font-racing text-2xl font-bold text-wec-gold">13.626 km</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Length</div>
          </div>
          <div className="w-px h-8 bg-border hidden md:block" />
          <div>
            <div className="font-racing text-2xl font-bold text-wec-gold">24 Hours</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Duration</div>
          </div>
          <div className="w-px h-8 bg-border hidden md:block" />
          <div>
            <div className="font-racing text-2xl font-bold text-wec-gold">38</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Corners</div>
          </div>
        </motion.div>

        {/* The Legend Card */}
        <motion.div
          className="glass-card p-6 md:p-8 border-wec-gold/30 bg-wec-gold/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-racing text-2xl font-bold text-wec-gold mb-4">The Legend</h2>
          <p className="text-lg leading-relaxed text-foreground/90">
            The 24 Hours of Le Mans has been run since 1923 on the Circuit de la Sarthe — a unique combination of permanent racing sections and public roads closed for the event. The legendary Mulsanne Straight once allowed cars to exceed 400 km/h before chicanes were added in 1990. Modern Hypercars now lap in under 3 minutes 24 seconds. Winning Le Mans is considered the pinnacle of motorsport endurance.
          </p>
        </motion.div>

        {/* Winners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="font-racing text-2xl font-bold flex items-center gap-2">
            <Trophy className="w-6 h-6 text-wec-gold" />
            Recent Winners
          </h2>

          <div className="overflow-x-auto pb-4 custom-scrollbar">
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 min-w-max md:min-w-0">
              {recentWinners.map((winner, index) => (
                <motion.div
                  key={winner.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="glass-card p-5 border-wec-gold/10 hover:border-wec-gold/30 transition-colors w-[280px] md:w-auto shrink-0 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-racing text-3xl font-bold text-wec-gold">{winner.year}</span>
                    <Trophy className="w-5 h-5 text-wec-gold opacity-50" />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: winner.color }} />
                      <span className="font-bold text-lg leading-tight">{winner.car}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {winner.chassis}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/50 text-sm font-medium">
                    {winner.drivers}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Circuit Facts Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass-card p-6">
            <h3 className="font-racing text-xl font-bold text-wec-gold mb-4">Circuit Details</h3>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-border/30 pb-2">
                <span className="text-muted-foreground">Track Length</span>
                <span className="font-medium">13.626 km</span>
              </li>
              <li className="flex justify-between border-b border-border/30 pb-2">
                <span className="text-muted-foreground">Total Corners</span>
                <span className="font-medium">38</span>
              </li>
              <li className="flex justify-between border-b border-border/30 pb-2">
                <span className="text-muted-foreground">Longest Straight</span>
                <span className="font-medium">6.0 km (Mulsanne)</span>
              </li>
              <li className="flex justify-between border-b border-border/30 pb-2">
                <span className="text-muted-foreground">Elevation Change</span>
                <span className="font-medium">30m</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-racing text-xl font-bold text-wec-gold mb-4">Race Facts</h3>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-border/30 pb-2">
                <span className="text-muted-foreground">First Race</span>
                <span className="font-medium">1923</span>
              </li>
              <li className="flex justify-between border-b border-border/30 pb-2">
                <span className="text-muted-foreground">Race Duration</span>
                <span className="font-medium">24 Hours (4pm Sat → 4pm Sun)</span>
              </li>
              <li className="flex justify-between border-b border-border/30 pb-2">
                <span className="text-muted-foreground">Circuit Type</span>
                <span className="font-medium text-right">Permanent + Public Roads</span>
              </li>
              <li className="flex flex-col gap-1 border-b border-border/30 pb-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lap Record (Hypercar)</span>
                  <span className="font-medium">3:23.550</span>
                </div>
                <span className="text-sm text-muted-foreground/80 text-right">Kamui Kobayashi (2024)</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* 2026 Countdown */}
        {nextRace && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link to={`/race/${nextRace.id}`}>
              <div className="glass-card p-6 md:p-8 relative overflow-hidden group cursor-pointer hover:border-wec-gold/50 transition-colors border-wec-gold/20">
                <div className="absolute inset-0 bg-gradient-to-br from-wec-gold/10 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Flag className="w-4 h-4 text-wec-gold" />
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">Next Edition</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-wec-gold" />
                  </div>

                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                      <h2 className="font-racing text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-wec-gold transition-colors">
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

                    {hasUpcomingRace ? (
                      <div className="flex gap-3 md:gap-4">
                        <TimeBlock value={timeLeft.days} label="Days" />
                        <TimeBlock value={timeLeft.hours} label="Hours" />
                        <TimeBlock value={timeLeft.minutes} label="Mins" />
                        <TimeBlock value={timeLeft.seconds} label="Secs" />
                      </div>
                    ) : (
                      <div className="text-xl font-bold text-wec-gold">Race Started</div>
                    )}
                  </div>

                  <div className="mt-4 text-xs text-muted-foreground/70 text-right">
                    Times shown in your local time zone.
                  </div>
                </div>

                {nextRace.sessions && nextRace.sessions.length > 0 && (
                  <div className="relative z-10 mt-6 pt-4 border-t border-wec-gold/20">
                    <h3 className="text-sm font-medium text-foreground mb-3">Session Schedule</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                      {nextRace.sessions.map((session, index) => (
                        <div key={index} className="bg-muted/30 rounded p-2 text-xs border border-wec-gold/10">
                          <div className="font-medium text-wec-gold mb-1">{session.type}</div>
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
              </div>
            </Link>
          </motion.div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default LeMans;
