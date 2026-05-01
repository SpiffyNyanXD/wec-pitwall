import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import SEOHead from '@/components/SEOHead';
import { drivers2025 } from '@/data/wecData';

const DriverComparison = () => {
  const [driver1Id, setDriver1Id] = useState<string>('');
  const [driver2Id, setDriver2Id] = useState<string>('');

  const driver1 = useMemo(() => drivers2025.find(d => d.id === driver1Id), [driver1Id]);
  const driver2 = useMemo(() => drivers2025.find(d => d.id === driver2Id), [driver2Id]);

  // Metrics to compare
  const metrics = [
    { label: 'Points', key: 'points' as const },
    { label: 'Wins', key: 'wins' as const },
    { label: 'Poles', key: 'poles' as const },
    { label: 'Podiums', key: 'podiums' as const },
    { label: 'Fastest Laps', key: 'fastestLaps' as const },
  ];

  const getWinner = (key: keyof typeof driver1, d1: typeof driver1, d2: typeof driver2) => {
    if (!d1 || !d2) return null;
    const v1 = (d1[key] as number) || 0;
    const v2 = (d2[key] as number) || 0;
    if (v1 > v2) return 'left';
    if (v2 > v1) return 'right';
    return 'tie';
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Driver Comparison" description="Compare WEC drivers head-to-head" url="/compare" />
      <Header />
      <main className="container py-8 px-4">
        <div className="mb-8 pt-2">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">
            Driver Comparison
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Head-to-head 2025 season stats
          </p>
        </div>

        {/* Driver selectors */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
              Driver 1
            </label>
            <select
              value={driver1Id}
              onChange={e => setDriver1Id(e.target.value)}
              className="w-full bg-muted/30 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50"
            >
              <option value="">Select driver...</option>
              {drivers2025.map(d => (
                <option key={d.id} value={d.id} disabled={d.id === driver2Id}>
                  {d.carNumber} {d.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
              Driver 2
            </label>
            <select
              value={driver2Id}
              onChange={e => setDriver2Id(e.target.value)}
              className="w-full bg-muted/30 border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50"
            >
              <option value="">Select driver...</option>
              {drivers2025.map(d => (
                <option key={d.id} value={d.id} disabled={d.id === driver1Id}>
                  {d.carNumber} {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison table */}
        {driver1 && driver2 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card overflow-hidden"
          >
            {/* Driver headers */}
            <div className="grid grid-cols-3 border-b border-border">
              <div className="p-4 text-center border-r border-border">
                <p className="font-racing text-lg font-bold text-primary">{driver1.carNumber}</p>
                <p className="font-bold text-foreground text-sm mt-1">{driver1.name}</p>
                <p className="text-xs text-muted-foreground">{driver1.team}</p>
                <p className="text-lg mt-1">{driver1.countryFlag}</p>
              </div>
              <div className="p-4 text-center flex items-center justify-center">
                <span className="text-2xl font-black text-muted-foreground/30">VS</span>
              </div>
              <div className="p-4 text-center border-l border-border">
                <p className="font-racing text-lg font-bold text-primary">{driver2.carNumber}</p>
                <p className="font-bold text-foreground text-sm mt-1">{driver2.name}</p>
                <p className="text-xs text-muted-foreground">{driver2.team}</p>
                <p className="text-lg mt-1">{driver2.countryFlag}</p>
              </div>
            </div>

            {/* Metrics rows */}
            {metrics.map(metric => {
              const winner = getWinner(metric.key, driver1, driver2);
              const v1 = (driver1[metric.key] as number) || 0;
              const v2 = (driver2[metric.key] as number) || 0;
              return (
                <div key={metric.key} className="grid grid-cols-3 border-b border-border last:border-0">
                  <div className={`p-4 text-center ${winner === 'left' ? 'bg-primary/10' : ''}`}>
                    <span className={`font-racing text-2xl font-bold ${winner === 'left' ? 'text-primary' : 'text-foreground'}`}>
                      {v1}
                    </span>
                    {winner === 'left' && (
                      <span className="ml-2 text-xs text-primary font-bold">▲</span>
                    )}
                  </div>
                  <div className="p-4 text-center flex items-center justify-center">
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      {metric.label}
                    </span>
                  </div>
                  <div className={`p-4 text-center ${winner === 'right' ? 'bg-primary/10' : ''}`}>
                    {winner === 'right' && (
                      <span className="mr-2 text-xs text-primary font-bold">▲</span>
                    )}
                    <span className={`font-racing text-2xl font-bold ${winner === 'right' ? 'text-primary' : 'text-foreground'}`}>
                      {v2}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Class and nationality info */}
            <div className="grid grid-cols-3 bg-muted/20">
              <div className="p-4 text-center">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                  {driver1.class}
                </span>
              </div>
              <div className="p-4 text-center">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Class</span>
              </div>
              <div className="p-4 text-center">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                  {driver2.class}
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="glass-card p-12 text-center text-muted-foreground text-sm">
            Select two drivers above to compare their 2025 season stats
          </div>
        )}
      </main>
    </div>
  );
};

export default DriverComparison;