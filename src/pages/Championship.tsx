import SEOHead from "@/components/SEOHead";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import ManufacturerProgressionChart from '@/components/charts/ManufacturerProgressionChart';
import { standings2025, standings2024 } from '@/data/wecData';
import { useHypercarDriversStandings, useHypercarManufacturersStandings, useLmgt3DriversStandings, useLmgt3TeamsStandings, useSeasonDrivers, useRaces, useSeasonStats, useCarSeasonStats } from '@/hooks/useWecData';

const SEASON_2026_ID = 'a1b2c3d4-0001-0001-0001-000000000001';

const manufacturerData2025 = [
  { round: 'R1 Qatar',    Ferrari: 43, Toyota: 28, Porsche: 36, Cadillac: 22, BMW: 12 },
  { round: 'R2 Imola',    Ferrari: 93, Toyota: 53, Porsche: 72, Cadillac: 40, BMW: 22 },
  { round: 'R3 Spa',      Ferrari: 118, Toyota: 68, Porsche: 107, Cadillac: 54, BMW: 30 },
  { round: 'R4 Le Mans',  Ferrari: 168, Toyota: 101, Porsche: 132, Cadillac: 76, BMW: 42 },
];

const driversData2025 = [
  { round: 'R1 Qatar',   '#51 Ferrari': 25, '#83 AF Corse': 15, '#50 Ferrari': 12, '#6 Porsche': 18, '#7 Toyota': 10, '#8 Toyota': 8 },
  { round: 'R2 Imola',   '#51 Ferrari': 50, '#83 AF Corse': 33, '#50 Ferrari': 22, '#6 Porsche': 36, '#7 Toyota': 23, '#8 Toyota': 16 },
  { round: 'R3 Spa',     '#51 Ferrari': 68, '#83 AF Corse': 48, '#50 Ferrari': 30, '#6 Porsche': 61, '#7 Toyota': 33, '#8 Toyota': 24 },
  { round: 'R4 Le Mans', '#51 Ferrari': 83, '#83 AF Corse': 73, '#50 Ferrari': 38, '#6 Porsche': 76, '#7 Toyota': 48, '#8 Toyota': 32 },
];

const manufacturerData2024 = [
  { round: 'R1 Qatar',    Porsche: 39, Toyota: 9, Ferrari: 12, Alpine: 15, BMW: 12 },
  { round: 'R2 Imola',    Porsche: 53, Toyota: 43, Ferrari: 34, Alpine: 23, BMW: 17 },
  { round: 'R3 Spa',      Porsche: 83, Toyota: 50, Ferrari: 49, Alpine: 37, BMW: 24 },
  { round: 'R4 Le Mans',  Porsche: 108, Toyota: 96, Ferrari: 109, Alpine: 50, BMW: 36 },
  { round: 'R5 Sao Paulo',Porsche: 126, Toyota: 122, Ferrari: 137, Alpine: 65, BMW: 42 },
  { round: 'R6 COTA',     Porsche: 141, Toyota: 147, Ferrari: 154, Alpine: 78, BMW: 55 },
  { round: 'R7 Fuji',     Porsche: 161, Toyota: 162, Ferrari: 154, Alpine: 93, BMW: 65 },
  { round: 'R8 Bahrain',  Porsche: 184, Toyota: 200, Ferrari: 175, Alpine: 111, BMW: 80 },
];

const driversData2024 = [
  { round: 'R1 Qatar',   '#6 Porsche': 38, '#50 Ferrari': 12, '#7 Toyota': 15, '#51 Ferrari': 0,  '#5 Porsche': 24, '#8 Toyota': 4 },
  { round: 'R2 Imola',   '#6 Porsche': 56, '#50 Ferrari': 27, '#7 Toyota': 40, '#51 Ferrari': 12, '#5 Porsche': 24, '#8 Toyota': 14 },
  { round: 'R3 Spa',     '#6 Porsche': 74, '#50 Ferrari': 40, '#7 Toyota': 55, '#51 Ferrari': 35, '#5 Porsche': 54, '#8 Toyota': 26 },
  { round: 'R4 Le Mans', '#6 Porsche': 99, '#50 Ferrari': 90, '#7 Toyota': 77, '#51 Ferrari': 65, '#5 Porsche': 71, '#8 Toyota': 58 },
  { round: 'R5 Sao Paulo','#6 Porsche': 117, '#50 Ferrari': 105, '#7 Toyota': 95, '#51 Ferrari': 83, '#5 Porsche': 86, '#8 Toyota': 76 },
  { round: 'R6 COTA',    '#6 Porsche': 125, '#50 Ferrari': 113, '#7 Toyota': 113, '#51 Ferrari': 101, '#5 Porsche': 94, '#8 Toyota': 94 },
  { round: 'R7 Fuji',    '#6 Porsche': 150, '#50 Ferrari': 115, '#7 Toyota': 113, '#51 Ferrari': 119, '#5 Porsche': 104, '#8 Toyota': 109 },
  { round: 'R8 Bahrain', '#6 Porsche': 152, '#50 Ferrari': 115, '#7 Toyota': 113, '#51 Ferrari': 137, '#5 Porsche': 114, '#8 Toyota': 134 },
];

const ManufacturerStandingsTable = ({ season, hcMfg, standings }: { season: string, hcMfg: Record<string, unknown>[], standings: Record<string, unknown> }) => (
  <div className="glass-card p-6 rounded-xl">
    <h3 className="font-bold text-xl mb-4 text-gradient">
      {season === '2026' ? "Manufacturers Championship" : "Final Manufacturer Standings"}
    </h3>
    <div className="space-y-3">
      {season === '2026' ? (
        hcMfg.map((mfg: Record<string, unknown>, idx: number) => {
          const isTied = hcMfg.filter((m: Record<string, unknown>) => m.total_points === mfg.total_points).length > 1;
          return (
            <div key={mfg.manufacturer} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/50">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-muted-foreground w-4">{mfg.position}</span>
                  {isTied && <span className="text-[10px] font-bold text-yellow-500 bg-yellow-500/20 px-1 rounded">TIE</span>}
                </div>
                <span className="font-medium">{mfg.manufacturer}</span>
              </div>
              <span className="font-racing text-lg">{mfg.total_points}</span>
            </div>
          );
        })
      ) : (
        standings.hypercars.manufacturers.slice(0, 5).map((mfg: Record<string, unknown>, idx: number) => (
          <div key={`item-${idx}`} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/50">
            <div className="flex items-center gap-3">
              <span className="font-bold text-muted-foreground w-4">{mfg.position}</span>
              <span className="font-medium">{mfg.manufacturer as string}</span>
            </div>
            <span className="font-racing text-lg">{mfg.points as string}</span>
          </div>
        ))
      )}
    </div>
  </div>
);

const DriverStandingsTable = ({ season, hcDrivers, standings, driverNamesMap }: { season: string, hcDrivers: Record<string, unknown>[], standings: Record<string, unknown>, driverNamesMap: Record<string, string> }) => (
  <div className="glass-card p-6 rounded-xl">
    <h3 className="font-bold text-xl mb-4 text-gradient">
      {season === '2026' ? "Hypercar Drivers Championship" : "Final Driver Standings"}
    </h3>
    <div className="space-y-3">
      {season === '2026' ? (
        hcDrivers.map((driver: Record<string, unknown>) => {
          const names = driverNamesMap[driver.car_number] || driver.team_name;
          return (
            <div key={`${driver.car_number}-${driver.team_name}`} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/50">
              <div className="flex items-center gap-3">
                <span className="font-bold text-muted-foreground w-4">{driver.position}</span>
                <span className="font-medium text-sm truncate max-w-[200px]" title={names}>
                  #{driver.car_number} {driver.manufacturer} — {names}
                </span>
              </div>
              <span className="font-racing text-lg">{driver.total_points}</span>
            </div>
          );
        })
      ) : (
        standings.hypercars.drivers.slice(0, 6).map((driver: Record<string, unknown>, idx: number) => (
          <div key={`item-${idx}`} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/50">
            <div className="flex items-center gap-3">
              <span className="font-bold text-muted-foreground w-4">{driver.position}</span>
              <span className="font-medium text-sm truncate max-w-[200px]">{driver.drivers as string}</span>
            </div>
            <span className="font-racing text-lg">{driver.points as string}</span>
          </div>
        ))
      )}
    </div>
  </div>
);

const Lmgt3StandingsTable = ({ lmgt3Drivers, driverNamesMap }: { lmgt3Drivers: Record<string, unknown>[], driverNamesMap: Record<string, string> }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="grid md:grid-cols-2 gap-8"
  >
    <div className="glass-card p-6 rounded-xl">
      <h3 className="font-bold text-xl mb-4 text-gradient">LMGT3 Drivers Championship</h3>
      <div className="space-y-3">
        {lmgt3Drivers.map((driver: Record<string, unknown>) => {
          const names = driverNamesMap[driver.car_number] || driver.team_name;
          return (
            <div key={`${driver.car_number}-${driver.team_name}`} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/50">
              <div className="flex items-center gap-3">
                <span className="font-bold text-muted-foreground w-4">{driver.position}</span>
                <span className="font-medium text-sm truncate max-w-[200px]" title={names}>
                  #{driver.car_number} {driver.team_name} — {names}
                </span>
              </div>
              <span className="font-racing text-lg">{driver.total_points}</span>
            </div>
          );
        })}
      </div>
    </div>
  </motion.div>
);

const ChartsSection = ({ season, mfgData, driverData }: { season: string, mfgData: Record<string, unknown>[], driverData: Record<string, unknown>[] }) => (
  <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 sm:p-6 rounded-xl"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Manufacturers Championship — {season}</h2>
      <div className="h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mfgData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--glass-border))" />
            <XAxis dataKey="round" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
            <YAxis domain={[0, 350]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--glass-border))' }} />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            {season === '2025' ? (
              <>
                <Line type="monotone" dataKey="Ferrari" stroke="#DC0000" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="Toyota" stroke="#E60012" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="Porsche" stroke="#C4A747" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="Cadillac" stroke="#1E3A5F" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="BMW" stroke="#1C69D4" strokeWidth={2} dot={{ r: 5 }} />
              </>
            ) : (
              <>
                <Line type="monotone" dataKey="Porsche" stroke="#C4A747" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="Toyota" stroke="#E60012" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="Ferrari" stroke="#DC0000" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="Alpine" stroke="#00529F" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="BMW" stroke="#1C69D4" strokeWidth={2} dot={{ r: 5 }} />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 sm:p-6 rounded-xl"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Drivers Championship — {season}</h2>
      <div className="h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={driverData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--glass-border))" />
            <XAxis dataKey="round" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
            <YAxis domain={[0, 350]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--glass-border))' }} />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            {season === '2025' ? (
              <>
                <Line type="monotone" dataKey="#51 Ferrari" stroke="#DC0000" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="#83 AF Corse" stroke="#FFD700" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="#50 Ferrari" stroke="#B22222" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="#6 Porsche" stroke="#C4A747" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="#7 Toyota" stroke="#E60012" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="#8 Toyota" stroke="#808080" strokeWidth={2} dot={{ r: 5 }} />
              </>
            ) : (
              <>
                <Line type="monotone" dataKey="#6 Porsche" stroke="#C4A747" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="#50 Ferrari" stroke="#DC0000" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="#7 Toyota" stroke="#E60012" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="#51 Ferrari" stroke="#B22222" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="#5 Porsche" stroke="#FFD700" strokeWidth={2} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="#8 Toyota" stroke="#808080" strokeWidth={2} dot={{ r: 5 }} />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  </>
);

export default function Championship() {
  const [season, setSeason] = useState<'2026' | '2025' | '2024'>('2026');

  const selectedSeason = Number(season);
  const is2026 = selectedSeason === 2026;
  const { data: hcDrivers }   = useHypercarDriversStandings(is2026 ? SEASON_2026_ID : null);
  const { data: hcMfg }       = useHypercarManufacturersStandings(is2026 ? SEASON_2026_ID : null);
  const { data: lmgt3Drivers }= useLmgt3DriversStandings(is2026 ? SEASON_2026_ID : null);
  const { data: driverNamesMap } = useSeasonDrivers(SEASON_2026_ID);
  const { data: races }       = useRaces(is2026 ? SEASON_2026_ID : null);
  useLmgt3TeamsStandings(SEASON_2026_ID);
  useSeasonStats(SEASON_2026_ID);
  useCarSeasonStats(SEASON_2026_ID);

  const mfgData = season === '2025' ? manufacturerData2025 : manufacturerData2024;
  const driverData = season === '2025' ? driversData2025 : driversData2024;
  const standings = season === '2025' ? standings2025 : standings2024;

  return (
    <div className="min-h-screen bg-background">

            <SEOHead
        title="Championship Battle | WEC Pitwall"
        description="WEC Championship progression charts — see how the title fights evolved round by round across 2024, 2025 and 2026."
        url="/championship"
      />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">Championship Battle</h1>
              <p className="text-muted-foreground">Round-by-round point progression</p>
            </div>

            <Tabs value={season} onValueChange={(v) => setSeason(v as '2026' | '2025' | '2024')} className="w-[300px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="2026">2026</TabsTrigger>
                <TabsTrigger value="2025">2025</TabsTrigger>
                <TabsTrigger value="2024">2024</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-8">


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <ManufacturerStandingsTable season={season} hcMfg={hcMfg} standings={standings} />
              <DriverStandingsTable season={season} hcDrivers={hcDrivers} standings={standings} driverNamesMap={driverNamesMap} />
            </motion.div>

            {season === '2026' && lmgt3Drivers.length > 0 && (
              <Lmgt3StandingsTable lmgt3Drivers={lmgt3Drivers} driverNamesMap={driverNamesMap} />
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground italic py-4"
            >
              {season === '2026' ? (
                <div className="flex flex-col items-center gap-1">
                  {(() => {
                    const completedRounds = races?.filter(r => r.status === 'completed').length ?? 0;
                    const totalRounds = races?.length ?? 8;
                    return (
                      <>
                        <span className="font-medium">After Round {completedRounds}</span>
                        <span>{completedRounds} of {totalRounds} rounds completed</span>
                      </>
                    );
                  })()}
                </div>
              ) : season === '2025'
                ? "Rounds 5–8 data will be available after each race."
                : "Final standings — Season complete."}
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
