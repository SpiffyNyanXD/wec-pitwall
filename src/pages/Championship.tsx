import SEOHead from "@/components/SEOHead";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import ManufacturerProgressionChart from '@/components/charts/ManufacturerProgressionChart';
import { standings2025, standings2024 } from '@/data/wecData';

const manufacturerData2025 = [
  { round: 'R1 Qatar',    Ferrari: 43, Toyota: 28, Porsche: 36, Cadillac: 22, BMW: 12 },
  { round: 'R2 Imola',    Ferrari: 93, Toyota: 53, Porsche: 72, Cadillac: 40, BMW: 22 },
  { round: 'R3 Spa',      Ferrari: 118, Toyota: 68, Porsche: 107, Cadillac: 54, BMW: 30 },
  { round: 'R4 Le Mans',  Ferrari: 168, Toyota: 101, Porsche: 132, Cadillac: 76, BMW: 42 },
];

const driversData2025 = [
  { round: 'R1 Qatar',   'Pier Guidi/Calado/Giovinazzi': 25, 'Kubica/Hanson/Ye': 15, 'Fuoco/Molina/Nielsen': 12, 'Estre/Lotterer/Vanthoor': 18, 'Conway/Kobayashi/de Vries': 10, 'Buemi/Hartley/Hirakawa': 8 },
  { round: 'R2 Imola',   'Pier Guidi/Calado/Giovinazzi': 50, 'Kubica/Hanson/Ye': 33, 'Fuoco/Molina/Nielsen': 22, 'Estre/Lotterer/Vanthoor': 36, 'Conway/Kobayashi/de Vries': 23, 'Buemi/Hartley/Hirakawa': 16 },
  { round: 'R3 Spa',     'Pier Guidi/Calado/Giovinazzi': 68, 'Kubica/Hanson/Ye': 48, 'Fuoco/Molina/Nielsen': 30, 'Estre/Lotterer/Vanthoor': 61, 'Conway/Kobayashi/de Vries': 33, 'Buemi/Hartley/Hirakawa': 24 },
  { round: 'R4 Le Mans', 'Pier Guidi/Calado/Giovinazzi': 83, 'Kubica/Hanson/Ye': 73, 'Fuoco/Molina/Nielsen': 38, 'Estre/Lotterer/Vanthoor': 76, 'Conway/Kobayashi/de Vries': 48, 'Buemi/Hartley/Hirakawa': 32 },
];

const manufacturerData2024 = [
  { round: 'R1 Qatar',    Porsche: 39, Toyota: 9, Ferrari: 12, Alpine: 15, BMW: 12 },
  { round: 'R2 Imola',    Porsche: 53, Toyota: 43, Ferrari: 34, Alpine: 23, BMW: 17 },
  { round: 'R3 Spa',      Porsche: 83, Toyota: 50, Ferrari: 49, Alpine: 37, BMW: 24 },
  { round: 'R4 Le Mans',  Porsche: 108, Toyota: 96, Ferrari: 109, Alpine: 50, BMW: 36 },
  { round: 'R5 Sao Paulo',Porsche: 126, Toyota: 122, Ferrari: 137, Alpine: 65, BMW: 42 },
  { round: 'R6 COTA',     Porsche: 141, Toyota: 147, Ferrari: 154, Alpine: 78, BMW: 55 },
  { round: 'R7 Fuji',     Porsche: 161, Toyota: 151, Ferrari: 154, Alpine: 92, BMW: 68 },
  { round: 'R8 Bahrain',  Porsche: 188, Toyota: 190, Ferrari: 169, Alpine: 105, BMW: 75 },
];

const driversData2024 = [
  { round: 'R1 Qatar',   'Estre/Lotterer/Vanthoor': 38, 'Fuoco/Molina/Nielsen': 8, 'Kobayashi/de Vries/Conway': 12, 'Pier Guidi/Calado/Giovinazzi': 15, 'Makowiecki/Christensen/Campbell': 24, 'Buemi/Hartley/Hirakawa': 2 },
  { round: 'R2 Imola',   'Estre/Lotterer/Vanthoor': 56, 'Fuoco/Molina/Nielsen': 23, 'Kobayashi/de Vries/Conway': 37, 'Pier Guidi/Calado/Giovinazzi': 27, 'Makowiecki/Christensen/Campbell': 39, 'Buemi/Hartley/Hirakawa': 14 },
  { round: 'R3 Spa',     'Estre/Lotterer/Vanthoor': 74, 'Fuoco/Molina/Nielsen': 40, 'Kobayashi/de Vries/Conway': 45, 'Pier Guidi/Calado/Giovinazzi': 35, 'Makowiecki/Christensen/Campbell': 54, 'Buemi/Hartley/Hirakawa': 26 },
  { round: 'R4 Le Mans', 'Estre/Lotterer/Vanthoor': 99, 'Fuoco/Molina/Nielsen': 90, 'Kobayashi/de Vries/Conway': 77, 'Pier Guidi/Calado/Giovinazzi': 65, 'Makowiecki/Christensen/Campbell': 71, 'Buemi/Hartley/Hirakawa': 58 },
  { round: 'R5 Sao Paulo','Estre/Lotterer/Vanthoor': 117, 'Fuoco/Molina/Nielsen': 105, 'Kobayashi/de Vries/Conway': 95, 'Pier Guidi/Calado/Giovinazzi': 83, 'Makowiecki/Christensen/Campbell': 86, 'Buemi/Hartley/Hirakawa': 76 },
  { round: 'R6 COTA',    'Estre/Lotterer/Vanthoor': 125, 'Fuoco/Molina/Nielsen': 113, 'Kobayashi/de Vries/Conway': 113, 'Pier Guidi/Calado/Giovinazzi': 101, 'Makowiecki/Christensen/Campbell': 94, 'Buemi/Hartley/Hirakawa': 94 },
  { round: 'R7 Fuji',    'Estre/Lotterer/Vanthoor': 150, 'Fuoco/Molina/Nielsen': 115, 'Kobayashi/de Vries/Conway': 113, 'Pier Guidi/Calado/Giovinazzi': 119, 'Makowiecki/Christensen/Campbell': 104, 'Buemi/Hartley/Hirakawa': 109 },
  { round: 'R8 Bahrain', 'Estre/Lotterer/Vanthoor': 152, 'Fuoco/Molina/Nielsen': 115, 'Kobayashi/de Vries/Conway': 113, 'Pier Guidi/Calado/Giovinazzi': 137, 'Makowiecki/Christensen/Campbell': 114, 'Buemi/Hartley/Hirakawa': 134 },
];

export default function Championship() {
  const [season, setSeason] = useState<'2025' | '2024'>('2025');

  const mfgData = season === '2025' ? manufacturerData2025 : manufacturerData2024;
  const driverData = season === '2025' ? driversData2025 : driversData2024;
  const standings = season === '2025' ? standings2025 : standings2024;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Championship Battle"
        description="Round-by-round FIA WEC championship points progression for 2024 and 2025 seasons."
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
              <h1 className="text-4xl font-racing text-gradient mb-2">Championship Battle</h1>
              <p className="text-muted-foreground">Round-by-round point progression</p>
            </div>

            <Tabs value={season} onValueChange={(v) => setSeason(v as '2025' | '2024')} className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="2025">2025</TabsTrigger>
                <TabsTrigger value="2024">2024</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-8">
            <ManufacturerProgressionChart season={season} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-4 sm:p-6 rounded-xl"
            >
              <h2 className="text-xl sm:text-2xl font-racing mb-6">Manufacturers Championship — {season}</h2>
              <div className="h-[300px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mfgData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--glass-border))" />
                    <XAxis dataKey="round" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                    <YAxis domain={[0, 350]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--glass-border))' }} />
                    <Legend />
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
              <h2 className="text-xl sm:text-2xl font-racing mb-6">Drivers Championship — {season}</h2>
              <div className="h-[300px] md:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={driverData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--glass-border))" />
                    <XAxis dataKey="round" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                    <YAxis domain={[0, 350]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--glass-border))' }} />
                    <Legend />
                    {season === '2025' ? (
                      <>
                        <Line type="monotone" dataKey="Pier Guidi/Calado/Giovinazzi" stroke="#DC0000" strokeWidth={2} dot={{ r: 5 }} />
                        <Line type="monotone" dataKey="Kubica/Hanson/Ye" stroke="#FFD700" strokeWidth={2} dot={{ r: 5 }} />
                        <Line type="monotone" dataKey="Fuoco/Molina/Nielsen" stroke="#B22222" strokeWidth={2} dot={{ r: 5 }} />
                        <Line type="monotone" dataKey="Estre/Lotterer/Vanthoor" stroke="#C4A747" strokeWidth={2} dot={{ r: 5 }} />
                        <Line type="monotone" dataKey="Conway/Kobayashi/de Vries" stroke="#E60012" strokeWidth={2} dot={{ r: 5 }} />
                        <Line type="monotone" dataKey="Buemi/Hartley/Hirakawa" stroke="#808080" strokeWidth={2} dot={{ r: 5 }} />
                      </>
                    ) : (
                      <>
                        <Line type="monotone" dataKey="Estre/Lotterer/Vanthoor" stroke="#C4A747" strokeWidth={2} dot={{ r: 5 }} />
                        <Line type="monotone" dataKey="Fuoco/Molina/Nielsen" stroke="#DC0000" strokeWidth={2} dot={{ r: 5 }} />
                        <Line type="monotone" dataKey="Kobayashi/de Vries/Conway" stroke="#E60012" strokeWidth={2} dot={{ r: 5 }} />
                        <Line type="monotone" dataKey="Pier Guidi/Calado/Giovinazzi" stroke="#B22222" strokeWidth={2} dot={{ r: 5 }} />
                        <Line type="monotone" dataKey="Makowiecki/Christensen/Campbell" stroke="#FFD700" strokeWidth={2} dot={{ r: 5 }} />
                        <Line type="monotone" dataKey="Buemi/Hartley/Hirakawa" stroke="#808080" strokeWidth={2} dot={{ r: 5 }} />
                      </>
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-8"
            >
              <div className="glass-card p-6 rounded-xl">
                <h3 className="font-racing text-xl mb-4 text-gradient">Final Manufacturer Standings</h3>
                <div className="space-y-3">
                  {standings.hypercars.manufacturers.slice(0, 5).map((mfg: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/50">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-muted-foreground w-4">{mfg.position}</span>
                        <span className="font-medium">{mfg.manufacturer}</span>
                      </div>
                      <span className="font-racing text-lg">{mfg.points}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h3 className="font-racing text-xl mb-4 text-gradient">Final Driver Standings</h3>
                <div className="space-y-3">
                  {standings.hypercars.drivers.slice(0, 6).map((driver: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/50">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-muted-foreground w-4">{driver.position}</span>
                        <span className="font-medium text-sm truncate max-w-[200px]">{driver.drivers}</span>
                      </div>
                      <span className="font-racing text-lg">{driver.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground italic py-4"
            >
              {season === '2025'
                ? "Rounds 5–8 data will be available after each race."
                : "Final standings — Season complete."}
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
