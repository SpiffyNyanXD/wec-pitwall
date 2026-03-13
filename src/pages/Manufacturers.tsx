import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flag, Zap, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/components/Header';
import { manufacturers, Manufacturer } from '@/data/wecData';

type SortKey = 'wecChampionships' | 'leMansWins' | 'wecRaceWins' | 'points2025' | 'poles';

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'points2025', label: '2025 Points' },
  { key: 'wecChampionships', label: 'Championships' },
  { key: 'leMansWins', label: 'Le Mans Wins' },
  { key: 'wecRaceWins', label: 'Race Wins' },
  { key: 'poles', label: 'Pole Positions' },
];

const StatBadge = ({ value, label, highlight = false }: { value: number | string; label: string; highlight?: boolean }) => (
  <div className={`text-center p-2 rounded-lg ${highlight ? 'bg-primary/10' : 'bg-muted/30'}`}>
    <p className={`font-racing font-bold text-lg ${highlight ? 'text-primary' : 'text-foreground'}`}>{value}</p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

const ManufacturerCard = ({ m, rank }: { m: Manufacturer; rank: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.05 }}
      className="glass-card overflow-hidden"
    >
      {/* Color bar */}
      <div className="h-1 w-full" style={{ backgroundColor: m.color }} />

      {/* Header row */}
      <div className="p-4">
        <div className="flex items-center gap-3 mb-3">
          {/* Rank */}
          <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
            <span className="font-racing font-bold text-sm text-foreground">#{rank}</span>
          </div>

          {/* Name + flag */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg">{m.flag}</span>
              <h3 className="font-racing font-bold text-foreground text-lg">{m.name}</h3>
            </div>
            <p className="text-xs text-muted-foreground">{m.currentCar} · WEC since {m.wecDebut}</p>
          </div>

          {/* 2025 points badge */}
          {m.points2025 > 0 && (
            <div className="text-right shrink-0">
              <p className="font-racing font-bold text-primary text-lg">{m.points2025}</p>
              <p className="text-xs text-muted-foreground">2025 pts</p>
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <StatBadge value={m.wecChampionships} label="Titles" highlight={m.wecChampionships > 0} />
          <StatBadge value={m.leMansWins} label="Le Mans" highlight={m.leMansWins > 0} />
          <StatBadge value={m.wecRaceWins} label="Wins" />
          <StatBadge value={m.poles} label="Poles" />
        </div>

        {/* Cars on grid */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground">Cars:</span>
          {m.activeCars.map(car => (
            <span
              key={car}
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{ backgroundColor: `${m.color}25`, color: m.color }}
            >
              {car}
            </span>
          ))}
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
        >
          {expanded ? (
            <><ChevronUp className="w-3 h-3" /> Less</>
          ) : (
            <><ChevronDown className="w-3 h-3" /> More details</>
          )}
        </button>
      </div>

      {/* Expanded section */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border/50 p-4 space-y-4"
        >
          {/* About */}
          <p className="text-sm text-muted-foreground leading-relaxed">{m.about}</p>

          {/* Engine */}
          <div className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Engine</p>
              <p className="text-sm font-medium text-foreground">{m.engine}</p>
            </div>
          </div>

          {/* Season comparison */}
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Season Points</p>
            <div className="space-y-2">
              {[
                { season: '2025', points: m.points2025, position: m.position2025, total: 334 },
                { season: '2024', points: m.points2024, position: m.position2024, total: 289 },
              ].filter(s => s.points > 0).map(s => (
                <div key={s.season} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-8">{s.season}</span>
                  <div className="flex-1 bg-muted/30 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${(s.points / s.total) * 100}%`,
                        backgroundColor: m.color,
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-foreground w-12 text-right">{s.points}pts</span>
                  <span className="text-xs text-muted-foreground w-6">P{s.position}</span>
                </div>
              ))}
            </div>
          </div>

          {/* All-time stats */}
          <div className="grid grid-cols-3 gap-2">
            <StatBadge value={m.wecRaceWins} label="Race Wins" />
            <StatBadge value={m.poles} label="Poles" />
            <StatBadge value={m.fastestLaps} label="Fastest Laps" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const Manufacturers = () => {
  const [sortBy, setSortBy] = useState<SortKey>('points2025');
  const [descending, setDescending] = useState(true);

  const sorted = [...manufacturers].sort((a, b) => {
    const diff = (b[sortBy] as number) - (a[sortBy] as number);
    return descending ? diff : -diff;
  });

  // Summary stats for top bar
  const totalWins = manufacturers.reduce((s, m) => s + m.wecRaceWins, 0);
  const totalLeMans = manufacturers.reduce((s, m) => s + m.leMansWins, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="container py-6 px-4 relative z-10 space-y-6">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 racing-gradient" />
          <div className="flex items-center gap-3 mb-1">
            <Flag className="w-5 h-5 text-primary" />
            <h1 className="font-racing text-2xl font-bold text-foreground">Manufacturers</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Hypercar manufacturers competing in the FIA World Endurance Championship
          </p>

          {/* Summary bar */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-muted/30 rounded-lg p-3 text-center">
              <p className="font-racing font-bold text-xl text-foreground">{manufacturers.length}</p>
              <p className="text-xs text-muted-foreground">Manufacturers</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-3 text-center">
              <p className="font-racing font-bold text-xl text-foreground">{totalWins}</p>
              <p className="text-xs text-muted-foreground">WEC Race Wins</p>
            </div>
            <div className="bg-muted/30 rounded-lg p-3 text-center">
              <p className="font-racing font-bold text-xl text-foreground">{totalLeMans}</p>
              <p className="text-xs text-muted-foreground">Le Mans Wins</p>
            </div>
          </div>
        </motion.div>

        {/* Sort controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs text-muted-foreground shrink-0">Sort by:</span>
          {sortOptions.map(opt => (
            <button
              key={opt.key}
              onClick={() => {
                if (sortBy === opt.key) setDescending(!descending);
                else { setSortBy(opt.key); setDescending(true); }
              }}
              className={`text-xs px-3 py-1.5 rounded-full shrink-0 transition-colors flex items-center gap-1 ${
                sortBy === opt.key
                  ? 'bg-primary/20 text-primary'
                  : 'bg-muted/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              {opt.label}
              {sortBy === opt.key && (
                descending ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />
              )}
            </button>
          ))}
        </div>

        {/* Manufacturer cards */}
        <div className="space-y-3">
          {sorted.map((m, i) => (
            <ManufacturerCard key={m.id} m={m} rank={i + 1} />
          ))}
        </div>

        {/* Le Mans wins bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5"
        >
          <h2 className="font-racing font-bold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-wec-gold" />
            All-Time Le Mans Wins (Hypercar Era)
          </h2>
          <div className="space-y-3">
            {[...manufacturers]
              .filter(m => m.leMansWins > 0)
              .sort((a, b) => b.leMansWins - a.leMansWins)
              .map(m => (
                <div key={m.id} className="flex items-center gap-3">
                  <span className="text-sm w-24 text-foreground shrink-0">{m.name}</span>
                  <div className="flex-1 bg-muted/30 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(m.leMansWins / 6) * 100}%` }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="h-3 rounded-full"
                      style={{ backgroundColor: m.color }}
                    />
                  </div>
                  <span className="text-sm font-bold text-foreground w-4 shrink-0">{m.leMansWins}</span>
                  <span className="text-xs">{m.flag}</span>
                </div>
              ))}
          </div>
        </motion.div>

        {/* Race wins bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-5"
        >
          <h2 className="font-racing font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Total WEC Race Wins
          </h2>
          <div className="space-y-3">
            {[...manufacturers]
              .sort((a, b) => b.wecRaceWins - a.wecRaceWins)
              .map(m => (
                <div key={m.id} className="flex items-center gap-3">
                  <span className="text-sm w-24 text-foreground shrink-0">{m.name}</span>
                  <div className="flex-1 bg-muted/30 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(m.wecRaceWins / 42) * 100}%` }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="h-3 rounded-full"
                      style={{ backgroundColor: m.color }}
                    />
                  </div>
                  <span className="text-sm font-bold text-foreground w-4 shrink-0">{m.wecRaceWins}</span>
                  <span className="text-xs">{m.flag}</span>
                </div>
              ))}
          </div>
        </motion.div>

      </main>
    </div>
  );
};

export default Manufacturers;
