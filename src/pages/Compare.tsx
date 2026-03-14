import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { drivers, getDriversBySeason, drivers2026, standings2025 } from '@/data/wecData';
import { Copy, Users } from 'lucide-react';
import { toast } from 'sonner';

// Combine drivers for selection
const allDrivers = [...drivers, ...getDriversBySeason(2025), ...drivers2026].filter((driver, index, self) =>
  index === self.findIndex((t) => (
    t.id === driver.id
  ))
);

const getChampionshipPosition = (driver: any) => {
  if (!driver) return null;
  const lastName = driver.lastName;
  const standing = standings2025.hypercars.drivers.find((d) => d.drivers.includes(lastName));
  return standing ? standing.position : null;
};

const Compare = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [driver1Id, setDriver1Id] = useState(searchParams.get('a') || '');
  const [driver2Id, setDriver2Id] = useState(searchParams.get('b') || '');

  useEffect(() => {
    setDriver1Id(searchParams.get('a') || '');
    setDriver2Id(searchParams.get('b') || '');
  }, [searchParams]);

  const updateUrl = (a: string, b: string) => {
    const params = new URLSearchParams();
    if (a) params.set('a', a);
    if (b) params.set('b', b);
    setSearchParams(params, { replace: true });
  };

  const driver1 = allDrivers.find((d) => d.id === driver1Id);
  const driver2 = allDrivers.find((d) => d.id === driver2Id);

  const d1Pos = getChampionshipPosition(driver1);
  const d2Pos = getChampionshipPosition(driver2);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Comparison link copied to clipboard!');
  };

  const StatRow = ({ label, val1, val2, higherIsBetter = true, displayVal1, displayVal2 }: { label: string, val1: any, val2: any, higherIsBetter?: boolean, displayVal1?: any, displayVal2?: any }) => {
    const isNum1 = typeof val1 === 'number';
    const isNum2 = typeof val2 === 'number';

    let highlight1 = false;
    let highlight2 = false;

    if (isNum1 && isNum2 && val1 !== val2) {
      if (higherIsBetter) {
        highlight1 = val1 > val2;
        highlight2 = val2 > val1;
      } else {
        highlight1 = val1 < val2;
        highlight2 = val2 < val1;
      }
    }

    const show1 = displayVal1 !== undefined ? displayVal1 : (val1 !== null && val1 !== undefined ? val1 : '-');
    const show2 = displayVal2 !== undefined ? displayVal2 : (val2 !== null && val2 !== undefined ? val2 : '-');

    return (
      <div className="flex items-center justify-between py-3 border-b border-border/50">
        <div className={`flex-1 text-center md:text-left ${highlight1 ? 'text-primary font-bold' : ''}`}>
          {show1}
        </div>
        <div className="flex-1 text-center text-muted-foreground text-sm uppercase tracking-wider px-2">
          {label}
        </div>
        <div className={`flex-1 text-center md:text-right ${highlight2 ? 'text-primary font-bold' : ''}`}>
          {show2}
        </div>
      </div>
    );
  };

  const BarChart = ({ label, val1, val2 }: { label: string, val1: number, val2: number }) => {
    const maxVal = Math.max(val1, val2) || 1; // Prevent division by 0
    const w1 = (val1 / maxVal) * 100;
    const w2 = (val2 / maxVal) * 100;

    return (
      <div className="mt-6">
        <div className="text-center text-sm text-muted-foreground uppercase tracking-wider mb-2">{label}</div>
        <div className="flex items-center gap-2 h-6">
          <div className="flex-1 flex justify-end">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${w1}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-primary h-full rounded-l-md"
              style={{ minWidth: val1 > 0 ? '2px' : '0' }}
            />
          </div>
          <div className="w-px h-full bg-border" />
          <div className="flex-1 flex justify-start">
             <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${w2}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-secondary h-full rounded-r-md"
              style={{ minWidth: val2 > 0 ? '2px' : '0' }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-racing text-3xl md:text-4xl">Driver Comparison <span className="text-muted-foreground">⚔️</span></h1>
          <Button variant="outline" onClick={handleShare} className="gap-2">
            <Copy className="w-4 h-4" />
            <span className="hidden sm:inline">Share Comparison</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 md:gap-8 items-start">

          {/* Driver 1 Panel */}
          <div className="glass-card p-6 flex flex-col items-center">
            <select
              className="w-full bg-background border border-border rounded-lg px-4 py-2 mb-6 font-racing text-lg text-center"
              value={driver1Id}
              onChange={(e) => {
                setDriver1Id(e.target.value);
                updateUrl(e.target.value, driver2Id);
              }}
            >
              <option value="">Select a driver</option>
              {allDrivers.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.carNumber})</option>
              ))}
            </select>

            {!driver1 ? (
               <div className="py-20 flex flex-col items-center text-muted-foreground">
                 <Users className="w-12 h-12 mb-4 opacity-20" />
                 <p>Select a driver</p>
               </div>
            ) : (
              <div className="w-full text-center">
                <div className="text-6xl mb-4">{driver1.countryFlag}</div>
                <h2 className="font-racing text-2xl mb-1">{driver1.name}</h2>
                <p className="text-muted-foreground mb-6">{driver1.team}</p>
              </div>
            )}
          </div>

          {/* VS Divider */}
          <div className="flex justify-center items-center py-4 md:py-0 h-full">
             <div className="w-12 h-12 rounded-full bg-muted border-4 border-background flex items-center justify-center font-racing text-xl z-10 text-muted-foreground font-bold shrink-0">
               VS
             </div>
          </div>

          {/* Driver 2 Panel */}
          <div className="glass-card p-6 flex flex-col items-center">
             <select
              className="w-full bg-background border border-border rounded-lg px-4 py-2 mb-6 font-racing text-lg text-center"
              value={driver2Id}
              onChange={(e) => {
                setDriver2Id(e.target.value);
                updateUrl(driver1Id, e.target.value);
              }}
            >
              <option value="">Select a driver</option>
              {allDrivers.map((d) => (
                <option key={d.id} value={d.id}>{d.name} ({d.carNumber})</option>
              ))}
            </select>

             {!driver2 ? (
               <div className="py-20 flex flex-col items-center text-muted-foreground">
                 <Users className="w-12 h-12 mb-4 opacity-20" />
                 <p>Select a driver</p>
               </div>
            ) : (
              <div className="w-full text-center">
                <div className="text-6xl mb-4">{driver2.countryFlag}</div>
                <h2 className="font-racing text-2xl mb-1">{driver2.name}</h2>
                <p className="text-muted-foreground mb-6">{driver2.team}</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Comparison */}
        {driver1 && driver2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 mt-8 font-racing text-lg"
          >
            <StatRow
              label="Season Points"
              val1={driver1.points}
              val2={driver2.points}
              displayVal1={driver1.points !== undefined ? `${driver1.points} pts` : '-'}
              displayVal2={driver2.points !== undefined ? `${driver2.points} pts` : '-'}
              higherIsBetter={true}
            />
            <StatRow
              label="Championship Pos"
              val1={d1Pos}
              val2={d2Pos}
              displayVal1={d1Pos ? `P${d1Pos}` : '-'}
              displayVal2={d2Pos ? `P${d2Pos}` : '-'}
              higherIsBetter={false} // Lower is better
            />
            <StatRow
              label="Race Wins"
              val1={driver1.wins !== undefined ? driver1.wins : (driver1.wecWins || 0)}
              val2={driver2.wins !== undefined ? driver2.wins : (driver2.wecWins || 0)}
            />
            <StatRow
              label="Podiums"
              val1={driver1.podiums !== undefined ? driver1.podiums : '-'}
              val2={driver2.podiums !== undefined ? driver2.podiums : '-'}
            />
            <StatRow
              label="Pole Positions"
              val1={driver1.poles !== undefined ? driver1.poles : '-'}
              val2={driver2.poles !== undefined ? driver2.poles : '-'}
            />
            <StatRow
              label="Fastest Laps"
              val1={driver1.fastestLaps !== undefined ? driver1.fastestLaps : '-'}
              val2={driver2.fastestLaps !== undefined ? driver2.fastestLaps : '-'}
            />
            <StatRow
              label="Nationality"
              val1={driver1.nationality}
              val2={driver2.nationality}
            />
             <StatRow
              label="Team"
              val1={driver1.team}
              val2={driver2.team}
            />
            <StatRow
              label="Car"
              val1={driver1.carNumber}
              val2={driver2.carNumber}
            />

            <div className="mt-8">
               <BarChart
                 label="Season Points"
                 val1={driver1.points || 0}
                 val2={driver2.points || 0}
               />
               <BarChart
                 label="Race Wins"
                 val1={driver1.wins !== undefined ? driver1.wins : (driver1.wecWins || 0)}
                 val2={driver2.wins !== undefined ? driver2.wins : (driver2.wecWins || 0)}
               />
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Compare;
