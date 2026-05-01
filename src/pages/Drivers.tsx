import SEOHead from "@/components/SEOHead";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Flag, Medal, ChevronRight, Search, X, Users } from 'lucide-react';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { drivers2024, drivers2026, getDriversByClass } from '@/data/wecData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Drivers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const getClassBadge = (carClass: string) => {
    switch (carClass) {
      case 'HYPERCAR': return 'bg-primary/20 text-primary border-primary/30';
      case 'LMP2': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'LMGT3': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const DriverCard = ({ driver, index }: { driver: typeof drivers2024[0]; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link 
        to={`/drivers/${driver.id}`}
        className="group glass-card p-5 flex flex-col gap-4 hover:border-primary/50 transition-all duration-300"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-2xl font-racing">
              {driver.countryFlag}
            </div>
            <div>
              <h3 className="font-racing text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {driver.name}
              </h3>
              <p className="text-sm text-muted-foreground">{driver.team}</p>
            </div>
          </div>
          <Badge variant="outline" className={`${getClassBadge(driver.class)} text-xs`}>
            {driver.class}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="glass-card p-2 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-wec-gold mb-1">
              <Trophy className="w-3 h-3" />
            </div>
            <p className="text-lg font-racing font-bold">{driver.championships}</p>
            <p className="text-[10px] text-muted-foreground uppercase">Titles</p>
          </div>
          <div className="glass-card p-2 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-secondary mb-1">
              <Flag className="w-3 h-3" />
            </div>
            <p className="text-lg font-racing font-bold">{driver.leMansWins}</p>
            <p className="text-[10px] text-muted-foreground uppercase">Le Mans</p>
          </div>
          <div className="glass-card p-2 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-primary mb-1">
              <Medal className="w-3 h-3" />
            </div>
            <p className="text-lg font-racing font-bold">{driver.wecWins}</p>
            <p className="text-[10px] text-muted-foreground uppercase">WEC Wins</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2">
            <span className="text-sm font-racing text-primary">{driver.carNumber}</span>
            <span className="text-xs text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">{driver.nationality}</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </Link>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Drivers"
        description="Complete FIA WEC driver lineup for 2026 including Hypercar and LMGT3 class drivers."
        url="/drivers"
      />
      {/* Background effects */}
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
            <h1 className="font-racing text-3xl md:text-4xl font-bold mb-2">
              <span className="text-gradient">Drivers</span>
            </h1>
            <p className="text-muted-foreground">FIA World Endurance Championship drivers</p>
          </div>
        </motion.div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search drivers, teams, car numbers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-muted/30 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <Tabs defaultValue="HYPERCAR" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="HYPERCAR" className="font-racing">Hypercar</TabsTrigger>
            <TabsTrigger value="LMP2" className="font-racing">LMP2</TabsTrigger>
            <TabsTrigger value="LMGT3" className="font-racing">LMGT3</TabsTrigger>
          </TabsList>

          {(['HYPERCAR', 'LMP2', 'LMGT3'] as const).map((carClass) => {
            // Use 2026 drivers for hypercar to show new entries
            const allClassDrivers = carClass === 'HYPERCAR'
              ? [...getDriversByClass('HYPERCAR'), ...drivers2026]
              : getDriversByClass(carClass);

            const normalize = (str: string) => str
              .normalize('NFD')
              .replace(/[̀-ͯ]/g, '')
              .toLowerCase();
            const q = normalize(searchQuery.trim());

            const filteredDrivers = allClassDrivers.filter(d => {
              if (!q) return true;
              return normalize(d.name).includes(q) ||
                     normalize(d.team).includes(q) ||
                     normalize(d.carNumber).includes(q) ||
                     normalize(d.nationality ?? '').includes(q);
            });

            return (
              <TabsContent key={carClass} value={carClass}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDrivers.map((driver, index) => (
                    <DriverCard key={driver.id} driver={driver} index={index} />
                  ))}
                  {filteredDrivers.length === 0 && (
                    <div className="col-span-full py-12 text-center text-muted-foreground text-sm">
                      No drivers found for "{searchQuery}"
                    </div>
                  )}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </main>
    </div>
  );
};

export default Drivers;
