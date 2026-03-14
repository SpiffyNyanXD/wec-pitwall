import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Car, Shield, Milestone, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import BackButton from '@/components/BackButton';
import { standings2024, standings2025, hypercars2026 } from '@/data/wecData';

const manufacturerColors: Record<string, string> = {
  'Ferrari': '#DC0000',
  'Toyota': '#E60012',
  'Porsche': '#C4A747',
  'Cadillac': '#1E3A5F',
  'BMW': '#1C69D4',
  'Peugeot': '#0066B1',
  'Alpine': '#0052CC',
  'Aston Martin': '#005140',
};

const getPositionColor = (position: number) => {
  if (position === 1) return 'text-wec-gold';
  if (position === 2) return 'text-wec-silver';
  if (position === 3) return 'text-wec-bronze';
  return 'text-muted-foreground';
};

const Manufacturers = () => {
  const [activeSeason, setActiveSeason] = useState('2025');

  const standingsData = activeSeason === '2025'
    ? standings2025.hypercars.manufacturers
    : standings2024.hypercars.manufacturers;

  const maxPoints = Math.max(...standingsData.map(m => m.points));

  // Group 2026 cars by manufacturer
  const carsByManufacturer = hypercars2026.reduce((acc, car) => {
    if (!acc[car.manufacturer]) {
      acc[car.manufacturer] = [];
    }
    acc[car.manufacturer].push(car);
    return acc;
  }, {} as Record<string, typeof hypercars2026>);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        </div>
        <div className="container relative z-10 px-4">
          <BackButton to="/standings" label="Back to Standings" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary uppercase tracking-widest bg-primary/10">
              <Car className="w-3 h-3 mr-2" />
              World Endurance Championship
            </Badge>
            <h1 className="text-4xl md:text-6xl font-racing font-bold mb-4 tracking-wider text-gradient">
              MANUFACTURERS
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore the pinnacle of endurance racing engineering, from current standings to future contenders.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container px-4 space-y-12">
        {/* Championship History Stats */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Trophy className="w-4 h-4 mr-2 text-wec-gold" />
                    Most Wins (Le Mans)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-racing text-2xl font-bold">Porsche</div>
                  <p className="text-sm text-muted-foreground mt-1">20 victories</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-primary" />
                    Current Champion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-racing text-2xl font-bold">Ferrari</div>
                  <p className="text-sm text-muted-foreground mt-1">2025</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Flag className="w-4 h-4 mr-2 text-blue-500" />
                    Defending Le Mans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-racing text-2xl font-bold">AF Corse</div>
                  <p className="text-sm text-muted-foreground mt-1">Ferrari 499P</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="glass-card h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Milestone className="w-4 h-4 mr-2 text-purple-500" />
                    Most WEC Titles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-racing text-2xl font-bold">Audi</div>
                  <p className="text-sm text-muted-foreground mt-1">7 titles (LMP1 era)</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Season Standings Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-racing font-bold tracking-wide">
              Championship Standings
            </h2>
            <Tabs value={activeSeason} onValueChange={setActiveSeason} className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="2024">2024</TabsTrigger>
                <TabsTrigger value="2025">2025</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Card className="glass-card">
            <CardContent className="p-0">
              <div className="divide-y divide-border/50">
                {standingsData.map((manufacturer, index) => {
                  const color = manufacturerColors[manufacturer.manufacturer] || '#666';
                  const width = `${(manufacturer.points / maxPoints) * 100}%`;

                  return (
                    <motion.div
                      key={manufacturer.manufacturer}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center relative overflow-hidden group"
                    >
                      {/* Left accent border */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 opacity-50 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: color }}
                      />

                      <div className="flex items-center gap-4 w-full sm:w-48 shrink-0">
                        <div className={`text-2xl font-racing font-bold w-8 text-center ${getPositionColor(manufacturer.position)}`}>
                          P{manufacturer.position}
                        </div>
                        <div className="font-racing text-xl font-bold tracking-wide flex items-center gap-2">
                          {manufacturer.manufacturer}
                          {manufacturer.manufacturer === 'Ferrari' && activeSeason === '2025' && (
                            <span title="Champion" className="text-xl">🏆</span>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 w-full flex items-center gap-4">
                        <div className="flex-1 h-3 rounded-full overflow-hidden relative" style={{ backgroundColor: `${color}33` }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width }}
                            transition={{ duration: 1, delay: 0.2 + (index * 0.05) }}
                            className="absolute left-0 top-0 bottom-0 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        </div>
                        <div className="font-racing text-2xl font-bold w-16 text-right tabular-nums">
                          {manufacturer.points}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 2026 Entry List Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-racing font-bold tracking-wide">
              2026 Hypercar Grid
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(carsByManufacturer).map(([manufacturer, cars], mIndex) => (
              <motion.div
                key={manufacturer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mIndex * 0.05 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: manufacturerColors[manufacturer] || '#666' }}
                  />
                  <h3 className="font-racing text-xl font-bold">{manufacturer}</h3>
                </div>

                <div className="space-y-3">
                  {cars.map((car, cIndex) => (
                    <Card key={car.id} className="glass-card hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden"
                          style={{ backgroundColor: `${car.color}22`, border: `1px solid ${car.color}55` }}
                        >
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{ backgroundColor: car.color }}
                          />
                          <span className="font-racing text-lg font-bold relative z-10" style={{ color: car.color }}>
                            {car.carNumber}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-sm leading-tight line-clamp-2">{car.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{car.manufacturer}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{car.class}</span>
                            <span className="text-xs">{car.countryFlag}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Manufacturers;
