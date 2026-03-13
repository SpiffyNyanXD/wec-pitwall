import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, Users, Car } from 'lucide-react';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { drivers2026, standings2025 } from '@/data/wecData';
import { toast } from 'sonner';

const Compare = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [driverAId, setDriverAId] = useState<string>(searchParams.get('a') || '');
  const [driverBId, setDriverBId] = useState<string>(searchParams.get('b') || '');

  useEffect(() => {
    const params = new URLSearchParams();
    if (driverAId) params.set('a', driverAId);
    if (driverBId) params.set('b', driverBId);
    setSearchParams(params, { replace: true });
  }, [driverAId, driverBId, setSearchParams]);

  const allDrivers = drivers2026;

  const driverA = allDrivers.find(d => d.id === driverAId);
  const driverB = allDrivers.find(d => d.id === driverBId);

  const getDriverRank = (driver: typeof drivers2026[0]) => {
    // Normalize last name for searching
    const searchName = (driver.lastName || driver.name.split(' ').pop() || '').toLowerCase();

    // Find driver in standings
    const entry = standings2025.hypercars.drivers.find(d =>
        d.drivers.toLowerCase().includes(searchName)
    );

    return entry ? entry.position : Infinity;
  };

  const getDriverRankDisplay = (driver: typeof drivers2026[0]) => {
    const rank = getDriverRank(driver);
    return rank === Infinity ? 'N/A' : `P${rank}`;
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Comparison link copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy link');
    });
  };

  const StatRow = ({
      label,
      valA,
      valB,
      format = (v: any) => v,
      isLowerBetter = false
  }: {
      label: string,
      valA: any,
      valB: any,
      format?: (v: any) => React.ReactNode,
      isLowerBetter?: boolean
  }) => {
    const numA = typeof valA === 'number' ? valA : parseFloat(valA);
    const numB = typeof valB === 'number' ? valB : parseFloat(valB);

    let isAHigher = false;
    let isBHigher = false;

    if (!isNaN(numA) && !isNaN(numB) && numA !== numB) {
        if (isLowerBetter) {
            if (numA < numB) isAHigher = true;
            if (numB < numA) isBHigher = true;
        } else {
            if (numA > numB) isAHigher = true;
            if (numB > numA) isBHigher = true;
        }
    }

    return (
      <div className="flex justify-between items-center py-3 border-b border-border/50 text-sm md:text-base">
        <div className={`flex-1 text-left ${isAHigher ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            {format(valA)}
        </div>
        <div className="flex-1 text-center font-racing text-muted-foreground text-xs uppercase tracking-wider">
            {label}
        </div>
        <div className={`flex-1 text-right ${isBHigher ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
            {format(valB)}
        </div>
      </div>
    );
  };

  const BarChart = ({ label, valA, valB }: { label: string, valA: number, valB: number }) => {
    const maxVal = Math.max(valA, valB, 1);
    const pctA = (valA / maxVal) * 100;
    const pctB = (valB / maxVal) * 100;

    return (
      <div className="mt-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-2 uppercase font-racing tracking-wider">
            <span>{valA}</span>
            <span>{label}</span>
            <span>{valB}</span>
        </div>
        <div className="flex h-3 rounded-full overflow-hidden bg-muted/30">
            <div className="flex-1 flex justify-end border-r border-background/50">
               <motion.div
                 className="h-full bg-primary"
                 initial={{ width: 0 }}
                 animate={{ width: `${pctA}%` }}
                 transition={{ duration: 1, ease: "easeOut" }}
               />
            </div>
            <div className="flex-1 flex justify-start border-l border-background/50">
               <motion.div
                 className="h-full bg-secondary"
                 initial={{ width: 0 }}
                 animate={{ width: `${pctB}%` }}
                 transition={{ duration: 1, ease: "easeOut" }}
               />
            </div>
        </div>
      </div>
    );
  };

  const DriverSelector = ({ value, onChange, placeholder }: { value: string, onChange: (v: string) => void, placeholder: string }) => (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-card/50 border-border h-14">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allDrivers.map(d => (
          <SelectItem key={d.id} value={d.id}>
             <div className="flex items-center gap-2">
                 <span>{d.countryFlag}</span>
                 <span className="font-racing">{d.name}</span>
                 <span className="text-xs text-muted-foreground ml-2">{d.team}</span>
             </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const DriverHeader = ({ driver }: { driver: typeof allDrivers[0] | undefined }) => {
      if (!driver) {
          return (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                  <Users className="w-12 h-12 mb-4 opacity-20" />
                  <p className="font-racing text-xl opacity-50">Select a driver</p>
              </div>
          );
      }
      return (
          <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-5xl mb-4 shadow-inner">
                  {driver.countryFlag}
              </div>
              <Badge variant="outline" className="mb-2 bg-primary/10 text-primary border-primary/30">
                  {driver.class}
              </Badge>
              <h2 className="font-racing text-2xl font-bold text-foreground mb-1">{driver.name}</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Car className="w-3 h-3" /> {driver.carNumber}
              </p>
          </div>
      );
  };


  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="container py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <h1 className="font-racing text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
              <span className="text-gradient">Driver Comparison</span>
            </h1>
            <p className="text-muted-foreground">Compare stats side-by-side</p>
          </div>

          <Button variant="outline" onClick={handleShare} className="gap-2 border-primary/30 hover:bg-primary/10 transition-colors">
            <Share2 className="w-4 h-4" />
            Share Comparison
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-6 items-center">

            {/* Left Panel */}
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="glass-card p-6 flex flex-col gap-6 w-full"
            >
                <DriverSelector value={driverAId} onChange={setDriverAId} placeholder="Select Driver A" />
                <DriverHeader driver={driverA} />
            </motion.div>

            {/* VS Badge - Mobile & Desktop */}
            <div className="flex justify-center items-center py-4 lg:py-0 relative z-10">
                <div className="w-12 h-12 rounded-full racing-gradient flex items-center justify-center shadow-lg relative z-20">
                    <span className="font-racing font-bold text-primary-foreground italic">VS</span>
                </div>
            </div>

            {/* Right Panel */}
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="glass-card p-6 flex flex-col gap-6 w-full"
            >
                <DriverSelector value={driverBId} onChange={setDriverBId} placeholder="Select Driver B" />
                <DriverHeader driver={driverB} />
            </motion.div>

        </div>

        {/* Stats Section */}
        {driverA && driverB && (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 glass-card p-6 md:p-8"
            >
                <div className="max-w-3xl mx-auto">
                    <StatRow
                        label="Season Points"
                        valA={driverA.points}
                        valB={driverB.points}
                        format={(v) => <span className="font-racing text-lg">{v} <span className="text-xs font-sans font-normal text-muted-foreground">pts</span></span>}
                    />
                    <StatRow
                        label="Championship Position"
                        valA={getDriverRank(driverA)}
                        valB={getDriverRank(driverB)}
                        isLowerBetter={true}
                        format={(v) => <span className="font-racing text-lg">{v === Infinity ? 'N/A' : `P${v}`}</span>}
                    />
                    <StatRow
                        label="Race Wins"
                        valA={driverA.wecWins}
                        valB={driverB.wecWins}
                        format={(v) => <span className="font-racing text-lg">{v}</span>}
                    />
                    <StatRow
                        label="Podiums"
                        valA={driverA.podiums || 0}
                        valB={driverB.podiums || 0}
                        format={(v) => <span className="font-racing text-lg">{v}</span>}
                    />
                    <StatRow
                        label="Pole Positions"
                        valA={driverA.poles || 0}
                        valB={driverB.poles || 0}
                        format={(v) => <span className="font-racing text-lg">{v}</span>}
                    />
                    <StatRow
                        label="Fastest Laps"
                        valA={driverA.fastestLaps || 0}
                        valB={driverB.fastestLaps || 0}
                        format={(v) => <span className="font-racing text-lg">{v}</span>}
                    />

                    <div className="mt-8 pt-6 border-t border-border/50 space-y-4">
                        <StatRow
                            label="Nationality"
                            valA={driverA.nationality}
                            valB={driverB.nationality}
                        />
                        <StatRow
                            label="Team"
                            valA={driverA.team}
                            valB={driverB.team}
                        />
                        <StatRow
                            label="Car"
                            valA={driverA.carNumber}
                            valB={driverB.carNumber}
                        />
                    </div>

                    <div className="mt-12 space-y-8">
                        <BarChart label="Season Points" valA={driverA.points} valB={driverB.points} />
                        <BarChart label="Race Wins" valA={driverA.wecWins} valB={driverB.wecWins} />
                    </div>
                </div>
            </motion.div>
        )}

      </main>
    </div>
  );
};

export default Compare;
