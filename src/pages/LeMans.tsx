import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import React from 'react';
import {
  Clock, MapPin, Trophy, Flag, Users, Calendar,
  ChevronRight, Star, Zap
} from 'lucide-react';
import Header from '@/components/Header';
import { leMansData } from '@/data/wecData';

const iconMap: Record<string, React.ElementType> = {
  calendar: Calendar,
  clock: Clock,
  map: MapPin,
  flag: Flag,
  users: Users,
  trophy: Trophy,
};

const LeMans = () => {
  const { circuit, race2026, recentWinners, fastFacts, uniqueFeatures } = leMansData;

  const daysUntilRace = Math.ceil(
    (new Date(race2026.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-wec-gold/3 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="container py-6 px-4 relative z-10 space-y-6">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 racing-gradient" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🇫🇷</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                  Round 3 · 2026 WEC Season
                </span>
              </div>
              <h1 className="font-racing text-3xl md:text-4xl font-bold text-gradient mb-1">
                24 Hours of Le Mans
              </h1>
              <p className="text-muted-foreground text-sm">
                {circuit.name} · {circuit.location}
              </p>
            </div>
            <div className="glass-card p-4 text-center shrink-0 border-primary/30">
              <p className="font-racing text-4xl font-bold text-primary">{daysUntilRace}</p>
              <p className="text-xs text-muted-foreground mt-1">days away</p>
              <p className="text-xs text-foreground font-medium mt-1">June 13–14, 2026</p>
            </div>
          </div>
        </motion.div>

        {/* Fast Facts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="font-racing text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            Fast Facts
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {fastFacts.map((fact, i) => {
              const Icon = iconMap[fact.icon] ?? Flag;
              return (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="glass-card p-4"
                >
                  <Icon className="w-4 h-4 text-primary mb-2" />
                  <p className="font-racing font-bold text-foreground text-sm">{fact.value}</p>
                  <p className="text-xs text-muted-foreground">{fact.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 2026 Session Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-racing text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            2026 Session Schedule
          </h2>
          <div className="glass-card divide-y divide-border/50">
            {race2026.sessions.map((session, i) => {
              const isRace = session.type === 'Race';
              const isNight = session.duration.includes('Night');
              return (
                <div
                  key={i}
                  className={`p-4 flex items-center justify-between gap-4 ${isRace ? 'bg-primary/5' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${isRace ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                    <div>
                      <p className={`font-racing font-bold text-sm ${isRace ? 'text-primary' : 'text-foreground'}`}>
                        {session.type}
                        {isNight && <span className="ml-2 text-xs text-wec-gold">🌙 Night</span>}
                      </p>
                      <p className="text-xs text-muted-foreground">{session.date} · {session.startTime}–{session.endTime}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${isRace ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-muted-foreground'}`}>
                    {session.duration}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            All times in circuit local time (CEST — UTC+2)
          </p>
        </motion.div>

        {/* Recent Winners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-racing text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-wec-gold" />
            Recent Winners
          </h2>
          <div className="space-y-3">
            {recentWinners.map((winner, i) => (
              <motion.div
                key={winner.year}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className={`glass-card p-4 flex items-center gap-4 ${i === 0 ? 'border-wec-gold/30' : ''}`}
              >
                {/* Year + position */}
                <div className="text-center shrink-0 w-12">
                  {i === 0 && <Star className="w-3 h-3 text-wec-gold mx-auto mb-1" />}
                  <p className="font-racing font-bold text-sm text-foreground">{winner.year}</p>
                  <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground">
                    {winner.carNumber}
                  </span>
                </div>

                {/* Team and drivers */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-sm">{winner.flag}</span>
                    <p className="font-racing font-bold text-sm text-foreground truncate">{winner.team}</p>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {winner.drivers.join(' · ')}
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">{winner.car}</p>
                </div>

                {/* Distance */}
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-foreground">{winner.lapsCompleted} laps</p>
                  <p className="text-xs text-muted-foreground">{winner.distanceCovered}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What Makes Le Mans Unique */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="font-racing text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-wec-gold" />
            What Makes Le Mans Unique
          </h2>
          <div className="space-y-3">
            {uniqueFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="glass-card p-4"
              >
                <p className="font-racing font-bold text-sm text-foreground mb-1">{feature.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Circuit Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-racing text-lg font-bold text-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Circuit de la Sarthe
          </h2>
          <div className="glass-card p-4 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{circuit.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Length', value: circuit.length },
                { label: 'Turns', value: `${circuit.turns}` },
                { label: 'Lap Record', value: circuit.lapRecord },
                { label: 'Record Holder', value: circuit.lapRecordHolder },
                { label: 'Longest Straight', value: circuit.longestStraight },
                { label: 'First Race', value: `${circuit.firstRace}` },
              ].map(stat => (
                <div key={stat.label} className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-0.5">{stat.label}</p>
                  <p className="text-sm font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
            <Link
              to="/circuit/le-mans"
              className="flex items-center justify-between p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group"
            >
              <span className="text-sm font-medium text-primary">View Full Circuit Profile</span>
              <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

      </main>
    </div>
  );
};

export default LeMans;
