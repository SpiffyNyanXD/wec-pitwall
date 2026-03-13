import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Info, Award, Settings } from 'lucide-react';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { standings2024, standings2025, hypercars2026 } from '@/data/wecData';

const MANUFACTURER_COLORS: Record<string, string> = {
  Ferrari: '#DC0000',
  Toyota: '#E60012',
  Porsche: '#C4A747',
  Cadillac: '#1E3A5F',
  BMW: '#1C69D4',
  Peugeot: '#0066B1',
  Alpine: '#0052CC',
  'Aston Martin': '#005140',
};

const STAT_CARDS = [
  { title: 'Most Wins (Le Mans)', value: 'Porsche', desc: '20 victories' },
  { title: 'Current Champion', value: 'Ferrari', desc: '2025' },
  { title: 'Defending Le Mans', value: 'AF Corse', desc: 'Ferrari 499P' },
  { title: 'Most WEC Titles', value: 'Audi', desc: '7 titles (LMP1 era)' },
];

const Manufacturers = () => {
  const [selectedSeason, setSelectedSeason] = useState<'2024' | '2025'>('2025');

  const standingsData = selectedSeason === '2025' ? standings2025 : standings2024;
  const manufacturers = standingsData.hypercars.manufacturers;
  const maxPoints = Math.max(...manufacturers.map((m) => m.points));

  // Group 2026 grid by manufacturer
  const grid2026ByManufacturer = hypercars2026.reduce((acc, car) => {
    if (!acc[car.manufacturer]) acc[car.manufacturer] = [];
    acc[car.manufacturer].push(car);
    return acc;
  }, {} as Record<string, typeof hypercars2026>);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="container py-8 px-4 relative z-10 space-y-10">
        <BackButton to="/standings" label="Back to Standings" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-racing text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient">Manufacturers</span>
          </h1>
          <p className="text-muted-foreground">
            Explore manufacturer standings, history, and the 2026 Hypercar grid.
          </p>
        </motion.div>

        {/* Section 4: History stat cards */}
        <section>
          <h2 className="font-racing text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Championship History
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAT_CARDS.map((stat, i) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5 border-l-4 border-l-primary"
              >
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="font-racing text-xl text-foreground font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-2">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 1 & 2: Manufacturer Championship Standings */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="font-racing text-2xl font-bold flex items-center gap-2">
              <Trophy className="w-6 h-6 text-wec-gold" />
              Manufacturers Championship
            </h2>
            <Tabs
              value={selectedSeason}
              onValueChange={(val) => setSelectedSeason(val as '2024' | '2025')}
              className="w-[200px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="2024" className="font-racing">2024</TabsTrigger>
                <TabsTrigger value="2025" className="font-racing">2025</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="glass-card p-6 flex flex-col gap-4">
            {manufacturers.map((m, index) => {
              const color = MANUFACTURER_COLORS[m.manufacturer] || '#666';
              const progress = (m.points / maxPoints) * 100;
              const isChampion = selectedSeason === '2025' && m.manufacturer === 'Ferrari' && index === 0;

              let positionClass = '';
              if (index === 0) positionClass = 'text-wec-gold';
              else if (index === 1) positionClass = 'text-wec-silver opacity-80';
              else if (index === 2) positionClass = 'text-wec-bronze opacity-80';
              else positionClass = 'text-muted-foreground opacity-50';

              return (
                <motion.div
                  key={`${selectedSeason}-${m.manufacturer}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 group"
                >
                  <div className={`w-10 text-center font-racing text-xl ${positionClass}`}>
                    P{index + 1}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-racing text-lg">{m.manufacturer}</span>
                        {isChampion && <span title="Champion">🏆</span>}
                      </div>
                      <span className="font-racing text-xl">{m.points}</span>
                    </div>
                    <div className="h-3 w-full rounded-full overflow-hidden" style={{ backgroundColor: `${color}33` }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Section 3: 2026 Hypercar Grid */}
        <section>
          <h2 className="font-racing text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            2026 Hypercar Grid
          </h2>
          <div className="space-y-8">
            {Object.entries(grid2026ByManufacturer).map(([manufacturer, cars], idx) => {
              const color = MANUFACTURER_COLORS[manufacturer] || '#666';
              return (
                <motion.div
                  key={manufacturer}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="font-racing text-xl pl-3 border-l-4" style={{ borderColor: color }}>
                    {manufacturer}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cars.map((car, cIdx) => (
                      <motion.div
                        key={car.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 + cIdx * 0.05 }}
                        className="glass-card p-4 border-l-4 hover:bg-card/80 transition-colors"
                        style={{ borderColor: color }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <Badge className="font-racing text-lg px-2 py-0 bg-primary/20 text-primary hover:bg-primary/30">
                            {car.carNumber}
                          </Badge>
                          <span className="text-2xl" title={car.country}>{car.countryFlag}</span>
                        </div>
                        <p className="font-bold text-lg mb-1">{car.name}</p>
                        <p className="text-sm text-muted-foreground">{manufacturer} • {car.chassis || 'Hypercar'}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Manufacturers;