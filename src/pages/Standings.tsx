import { motion } from 'framer-motion';
import { Trophy, Users, User } from 'lucide-react';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { drivers2024, teams2024, getDriversByClass, getTeamsByClass } from '@/data/wecData';
import { Link } from 'react-router-dom';

const Standings = () => {
  const getMedalColor = (position: number) => {
    switch (position) {
      case 1: return 'text-wec-gold';
      case 2: return 'text-wec-silver';
      case 3: return 'text-wec-bronze';
      default: return 'text-foreground';
    }
  };

  const getClassBadge = (carClass: string) => {
    switch (carClass) {
      case 'HYPERCAR': return 'bg-primary/20 text-primary border-primary/30';
      case 'LMP2': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'LMGT3': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const DriverRow = ({ driver, index }: { driver: typeof drivers2024[0]; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <Link
        to={`/drivers/${driver.id}`}
        className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
      >
        <span className={`font-racing text-2xl font-bold w-10 ${getMedalColor(driver.position)}`}>
          {driver.position}
        </span>
        
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg">
          {driver.countryFlag}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {driver.name}
          </p>
          <p className="text-sm text-muted-foreground truncate">{driver.team}</p>
        </div>

        <span className="font-racing text-xl font-bold text-primary">{driver.points}</span>
      </Link>
    </motion.div>
  );

  const TeamRow = ({ team, index }: { team: typeof teams2024[0]; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
    >
      <span className={`font-racing text-2xl font-bold w-10 ${getMedalColor(team.position)}`}>
        {team.position}
      </span>
      
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${team.color}30` }}
      >
        <div 
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: team.color }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{team.name}</p>
        <p className="text-sm text-muted-foreground">{team.manufacturer} • {team.carNumber}</p>
      </div>

      <span className="font-racing text-xl font-bold text-primary">{team.points}</span>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
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
          className="mb-8"
        >
          <h1 className="font-racing text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient">Championship Standings</span>
          </h1>
          <p className="text-muted-foreground">2024 FIA World Endurance Championship</p>
        </motion.div>

        <Tabs defaultValue="teams" className="w-full">
          <TabsList className="grid w-full max-w-xs grid-cols-2 mb-8">
            <TabsTrigger value="teams" className="font-racing gap-2">
              <Users className="w-4 h-4" />
              Teams
            </TabsTrigger>
            <TabsTrigger value="drivers" className="font-racing gap-2">
              <User className="w-4 h-4" />
              Drivers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teams">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {(['HYPERCAR', 'LMP2', 'LMGT3'] as const).map((carClass) => (
                <div key={carClass} className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Trophy className="w-5 h-5 text-wec-gold" />
                    <h2 className="font-racing text-xl font-bold">{carClass}</h2>
                    <Badge variant="outline" className={getClassBadge(carClass)}>
                      Teams
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {getTeamsByClass(carClass)
                      .sort((a, b) => b.points - a.points)
                      .map((team, index) => (
                        <TeamRow key={team.id} team={{ ...team, position: index + 1 }} index={index} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="drivers">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {(['HYPERCAR', 'LMP2', 'LMGT3'] as const).map((carClass) => (
                <div key={carClass} className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Trophy className="w-5 h-5 text-wec-gold" />
                    <h2 className="font-racing text-xl font-bold">{carClass}</h2>
                    <Badge variant="outline" className={getClassBadge(carClass)}>
                      Drivers
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {getDriversByClass(carClass)
                      .sort((a, b) => b.points - a.points)
                      .map((driver, index) => (
                        <DriverRow key={driver.id} driver={{ ...driver, position: index + 1 }} index={index} />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Standings;
