import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Clock, MapPin, ChevronRight, CornerUpRight, Map, FastForward, Navigation, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { races2026 } from '@/data/wecData';
import { useTimezone } from '@/hooks/useTimezone';

const winners = [
  { year: '2025', team: 'AF Corse #83', car: 'Ferrari 499P', drivers: 'Kubica / Hanson / Ye', color: 'bg-yellow-500' },
  { year: '2024', team: 'Ferrari AF Corse #50', car: 'Ferrari 499P', drivers: 'Fuoco / Molina / Nielsen', color: 'bg-red-600' },
  { year: '2023', team: 'Ferrari AF Corse #51', car: 'Ferrari 499P', drivers: 'Pier Guidi / Calado / Giovinazzi', color: 'bg-red-600' },
  { year: '2022', team: 'Toyota Gazoo Racing #8', car: 'Toyota GR010', drivers: 'Buemi / Hartley / Hirakawa', color: 'bg-white text-black border-red-600 border' },
  { year: '2021', team: 'Toyota Gazoo Racing #7', car: 'Toyota GR010', drivers: 'Conway / Kobayashi / López', color: 'bg-white text-black border-red-600 border' },
];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const LeMans = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { convertTime, timezone } = useTimezone();

  // Find 2026 Le Mans race
  // Instructions say id '2026-3' but name '24 Hours of Le Mans'
  const leMansRace = races2026.find(r => r.id === '2026-3' || r.name.includes('Le Mans')) || races2026[0];

  useEffect(() => {
    if (!leMansRace) return;

    const calculateTimeLeft = () => {
      const raceSession = leMansRace.sessions?.find(s => s.type === 'Race');
      const targetStr = raceSession
        ? `${raceSession.date}T${raceSession.startTime}:00`
        : `${leMansRace.date}T16:00:00`;
      const target = new Date(targetStr);

      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [leMansRace]);

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
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-wec-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-wec-gold/5 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="container py-6 px-4 relative z-10 max-w-6xl mx-auto space-y-8">
        <BackButton to="/schedule" label="Back to Schedule" />

        {/* Hero Section */}
        <motion.section
          className="text-center space-y-4 py-8 md:py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-wec-gold/10 text-wec-gold mb-4 border border-wec-gold/20 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
            <Trophy className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-racing font-bold text-gradient uppercase tracking-widest">
            24 Hours of Le Mans
          </h1>
          <p className="text-xl md:text-2xl font-racing text-wec-gold uppercase tracking-widest">
            The Greatest Race in the World
          </p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground pt-2">
            <MapPin className="w-5 h-5 text-wec-gold/70" />
            <span className="text-lg">Circuit de la Sarthe, Le Mans, France 🇫🇷</span>
          </div>
        </motion.section>

        {/* Stats Bar */}
        <motion.section
          className="glass-card grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6 border-wec-gold/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {[
            { label: "First Race", value: "Since 1923", icon: Calendar },
            { label: "Track Length", value: "13.626 km", icon: Navigation },
            { label: "Duration", value: "24 Hours", icon: Clock },
            { label: "Complexity", value: "38 Corners", icon: CornerUpRight },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center p-2">
              <stat.icon className="w-5 h-5 text-wec-gold/70 mb-2" />
              <div className="font-racing text-lg font-bold text-foreground">{stat.value}</div>
            </div>
          ))}
        </motion.section>

        {/* The Legend Card */}
        <motion.section
          className="glass-card p-6 md:p-8 border-wec-gold/30 bg-wec-gold/5 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-wec-gold/10 via-transparent to-transparent pointer-events-none" />
          <h2 className="font-racing text-2xl font-bold text-wec-gold mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6" /> The Legend
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed relative z-10">
            The 24 Hours of Le Mans has been run since 1923 on the Circuit de la Sarthe — a unique combination of permanent racing sections and public roads closed for the event. The legendary Mulsanne Straight once allowed cars to exceed 400 km/h before chicanes were added in 1990. Modern Hypercars now lap in under 3 minutes 24 seconds. Winning Le Mans is considered the pinnacle of motorsport endurance.
          </p>
        </motion.section>

        {/* Winners Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="font-racing text-2xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="w-6 h-6 text-wec-gold" /> Recent Winners
          </h2>

          <div className="flex overflow-x-auto pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:overflow-visible snap-x">
            {winners.map((winner, i) => (
              <div key={i} className="glass-card p-5 min-w-[280px] snap-center border-wec-gold/10 flex flex-col justify-between hover:border-wec-gold/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-racing text-3xl font-bold text-wec-gold">{winner.year}</span>
                  <Trophy className="w-5 h-5 text-wec-gold/50" />
                </div>

                <div className="space-y-3 flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-3 h-3 rounded-full ${winner.color}`} />
                      <span className="font-medium text-foreground text-sm">{winner.team}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{winner.car}</div>
                  </div>

                  <div className="pt-3 border-t border-border/50 mt-auto">
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Drivers</div>
                    <div className="text-sm">{winner.drivers}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Circuit Facts Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 md:p-8 border-wec-gold/20"
        >
          <h2 className="font-racing text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Map className="w-6 h-6 text-wec-gold" /> Circuit Facts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
            {[
              { label: "Track Length", value: "13.626 km" },
              { label: "Total Corners", value: "38" },
              { label: "Longest Straight", value: "6.0 km (Mulsanne)" },
              { label: "Lap Record (Hypercar)", value: "3:23.550 — Kamui Kobayashi (2024)" },
              { label: "First Race", value: "1923" },
              { label: "Race Duration", value: "24 Hours (4pm Saturday → 4pm Sunday)" },
              { label: "Circuit Type", value: "Permanent + Public Roads" },
              { label: "Elevation Change", value: "30m" }
            ].map((fact, i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                <span className="text-muted-foreground">{fact.label}</span>
                <span className="font-medium text-right max-w-[60%]">{fact.value}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 2026 Race Countdown */}
        {leMansRace && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-racing text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <FastForward className="w-6 h-6 text-wec-gold" /> Countdown to {leMansRace.season}
            </h2>

            <Link to={`/race/${leMansRace.id}`}>
              <div className="glass-card p-6 md:p-8 relative overflow-hidden group cursor-pointer hover:border-wec-gold/50 transition-colors border-wec-gold/20">
                <div className="absolute inset-0 bg-gradient-to-br from-wec-gold/10 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Flag className="w-4 h-4 text-wec-gold" />
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">Next Edition</span>
                      <ChevronRight className="w-4 h-4 ml-auto md:ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-wec-gold" />
                    </div>

                    <h3 className="font-racing text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-wec-gold transition-colors">
                      {leMansRace.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <span className="text-lg">{leMansRace.flag}</span>
                        {leMansRace.circuit}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {(() => {
                          const [y, m, d] = leMansRace.date.split('-').map(Number);
                          return new Date(y, m - 1, d).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          });
                        })()}
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

                {leMansRace.sessions && leMansRace.sessions.length > 0 && (
                  <div className="relative z-10 mt-6 pt-4 border-t border-border/50">
                    <h4 className="text-sm font-medium text-foreground mb-3">Session Schedule</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {leMansRace.sessions.map((session, index) => (
                        <div key={index} className="bg-muted/30 rounded p-2 text-xs border border-border/30">
                          <div className="font-medium text-wec-gold mb-1">{session.type}</div>
                          <div className="text-muted-foreground">
                            {new Date(session.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                          </div>
                          <div className="text-muted-foreground font-mono">
                            {convertTime(session.date, session.startTime, leMansRace.circuit)} - {convertTime(session.date, session.endTime, leMansRace.circuit)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          </motion.section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LeMans;
