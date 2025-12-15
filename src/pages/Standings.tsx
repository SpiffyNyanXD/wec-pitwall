import { motion } from 'framer-motion';
import { Trophy, Users, User, Factory, Info, Crown, Medal, Award } from 'lucide-react';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { drivers2024, teams2024, races2024 } from '@/data/wecData';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Standings = () => {
  // Calculate completed rounds
  const completedRounds = races2024.filter(r => r.status === 'completed').length;
  const totalRounds = races2024.length;

  // Get medal icon based on position
  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-5 h-5 text-wec-gold" />;
      case 2: return <Medal className="w-5 h-5 text-wec-silver" />;
      case 3: return <Award className="w-5 h-5 text-wec-bronze" />;
      default: return null;
    }
  };

  const getMedalColor = (position: number) => {
    switch (position) {
      case 1: return 'text-wec-gold font-bold';
      case 2: return 'text-wec-silver font-semibold';
      case 3: return 'text-wec-bronze font-semibold';
      default: return 'text-muted-foreground';
    }
  };

  // Calculate Manufacturers Championship (aggregate points by manufacturer for Hypercar only)
  const getManufacturersStandings = () => {
    const hypercarTeams = teams2024.filter(t => t.class === 'HYPERCAR');
    const manufacturerPoints: Record<string, { points: number; color: string; country: string; countryFlag: string; wins: number; entries: number }> = {};
    
    hypercarTeams.forEach(team => {
      if (!manufacturerPoints[team.manufacturer]) {
        manufacturerPoints[team.manufacturer] = { 
          points: 0, 
          color: team.color, 
          country: team.country,
          countryFlag: team.countryFlag,
          wins: team.wecWins || 0,
          entries: 0
        };
      }
      manufacturerPoints[team.manufacturer].points += team.points;
      manufacturerPoints[team.manufacturer].entries += 1;
    });

    return Object.entries(manufacturerPoints)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.points - a.points);
  };

  // Get car entries (teams) for Hypercar World Cup
  const getHypercarEntries = () => {
    return teams2024
      .filter(t => t.class === 'HYPERCAR')
      .sort((a, b) => b.points - a.points);
  };

  // Get drivers sorted by points for each class
  const getDriversStandings = (carClass: 'HYPERCAR' | 'LMP2' | 'LMGT3') => {
    // Group drivers by their crew (shared points)
    const driverGroups: Record<string, typeof drivers2024> = {};
    
    drivers2024.filter(d => d.class === carClass).forEach(driver => {
      const key = `${driver.teamId}-${driver.points}`;
      if (!driverGroups[key]) {
        driverGroups[key] = [];
      }
      driverGroups[key].push(driver);
    });

    // Create unique entries with crew names
    const uniqueDriverEntries = Object.values(driverGroups).map(crew => ({
      ...crew[0],
      crewNames: crew.map(d => d.name),
      displayName: crew.map(d => d.lastName || d.name.split(' ').pop()).join(' / ')
    }));

    return uniqueDriverEntries.sort((a, b) => b.points - a.points);
  };

  const manufacturersStandings = getManufacturersStandings();
  const hypercarEntries = getHypercarEntries();

  const DriverRow = ({ driver, position }: { driver: ReturnType<typeof getDriversStandings>[0]; position: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: position * 0.03 }}
    >
      <Link
        to={`/drivers/${driver.id}`}
        className="flex items-center gap-3 p-3 rounded-lg bg-card/50 hover:bg-card/80 border border-border/50 transition-all group"
      >
        <div className="flex items-center gap-2 w-12">
          {getMedalIcon(position) || (
            <span className={`font-racing text-lg w-6 text-center ${getMedalColor(position)}`}>
              {position}
            </span>
          )}
        </div>
        
        <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-sm">
          {driver.countryFlag}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
            {driver.displayName}
          </p>
          <p className="text-xs text-muted-foreground truncate">{driver.team} {driver.carNumber}</p>
        </div>

        <div className="text-right">
          <span className="font-racing text-lg font-bold text-foreground">{driver.points}</span>
          <span className="text-xs text-muted-foreground ml-1">pts</span>
        </div>
      </Link>
    </motion.div>
  );

  const EntryRow = ({ team, position }: { team: typeof teams2024[0]; position: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: position * 0.03 }}
    >
      <Link
        to={`/teams/${team.id}`}
        className="flex items-center gap-3 p-3 rounded-lg bg-card/50 hover:bg-card/80 border border-border/50 transition-all group"
      >
        <div className="flex items-center gap-2 w-12">
          {getMedalIcon(position) || (
            <span className={`font-racing text-lg w-6 text-center ${getMedalColor(position)}`}>
              {position}
            </span>
          )}
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div 
                className="w-8 h-8 rounded-md flex items-center justify-center border-2"
                style={{ 
                  backgroundColor: `${team.color}20`,
                  borderColor: team.color 
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: team.color }}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{team.manufacturer}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-racing text-sm font-bold text-primary">{team.carNumber}</span>
            <p className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
              {team.name}
            </p>
          </div>
          <p className="text-xs text-muted-foreground truncate">{team.manufacturer} • {team.chassis || team.manufacturer}</p>
        </div>

        <div className="text-right">
          <span className="font-racing text-lg font-bold text-foreground">{team.points}</span>
          <span className="text-xs text-muted-foreground ml-1">pts</span>
        </div>
      </Link>
    </motion.div>
  );

  const ManufacturerRow = ({ manufacturer, position }: { manufacturer: ReturnType<typeof getManufacturersStandings>[0]; position: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: position * 0.03 }}
      className="flex items-center gap-3 p-3 rounded-lg bg-card/50 hover:bg-card/80 border border-border/50 transition-all"
    >
      <div className="flex items-center gap-2 w-12">
        {getMedalIcon(position) || (
          <span className={`font-racing text-lg w-6 text-center ${getMedalColor(position)}`}>
            {position}
          </span>
        )}
      </div>
      
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center border-2"
        style={{ 
          backgroundColor: `${manufacturer.color}20`,
          borderColor: manufacturer.color 
        }}
      >
        <span className="text-lg">{manufacturer.countryFlag}</span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground text-sm">{manufacturer.name}</p>
        <p className="text-xs text-muted-foreground">{manufacturer.entries} entries</p>
      </div>

      <div className="text-right">
        <span className="font-racing text-lg font-bold text-foreground">{manufacturer.points}</span>
        <span className="text-xs text-muted-foreground ml-1">pts</span>
      </div>
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
          <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
            <span>2024 FIA World Endurance Championship</span>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              {completedRounds}/{totalRounds} Rounds Complete
            </Badge>
            <Badge variant="outline" className="bg-muted text-muted-foreground">
              Season Finished
            </Badge>
          </div>
        </motion.div>

        {/* Hypercar Championships */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-wec-gold" />
            <h2 className="font-racing text-2xl font-bold">Hypercar</h2>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              World Championship
            </Badge>
          </div>

          <Tabs defaultValue="drivers" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
              <TabsTrigger value="drivers" className="font-racing gap-2 text-xs">
                <User className="w-3 h-3" />
                Drivers
              </TabsTrigger>
              <TabsTrigger value="entries" className="font-racing gap-2 text-xs">
                <Users className="w-3 h-3" />
                Entries
              </TabsTrigger>
              <TabsTrigger value="manufacturers" className="font-racing gap-2 text-xs">
                <Factory className="w-3 h-3" />
                Manufacturers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="drivers">
              <div className="glass-card p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    FIA World Endurance Drivers' Championship • Points shared between co-drivers
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {getDriversStandings('HYPERCAR').map((driver, index) => (
                    <DriverRow key={driver.id} driver={driver} position={index + 1} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="entries">
              <div className="glass-card p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    FIA World Cup for Hypercar Teams • Each car entry scores independently
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {hypercarEntries.map((team, index) => (
                    <EntryRow key={team.id} team={team} position={index + 1} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="manufacturers">
              <div className="glass-card p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    FIA World Endurance Manufacturers' Championship • Combined points from all entries
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {manufacturersStandings.map((manufacturer, index) => (
                    <ManufacturerRow key={manufacturer.name} manufacturer={manufacturer} position={index + 1} />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* LMGT3 Championship */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-green-400" />
            <h2 className="font-racing text-2xl font-bold">LMGT3</h2>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              FIA World Cup
            </Badge>
          </div>

          <Tabs defaultValue="drivers" className="w-full">
            <TabsList className="grid w-full max-w-xs grid-cols-2 mb-6">
              <TabsTrigger value="drivers" className="font-racing gap-2 text-xs">
                <User className="w-3 h-3" />
                Drivers
              </TabsTrigger>
              <TabsTrigger value="teams" className="font-racing gap-2 text-xs">
                <Users className="w-3 h-3" />
                Teams
              </TabsTrigger>
            </TabsList>

            <TabsContent value="drivers">
              <div className="glass-card p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    FIA Endurance Trophy for LMGT3 Drivers
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {getDriversStandings('LMGT3').map((driver, index) => (
                    <DriverRow key={driver.id} driver={driver} position={index + 1} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="teams">
              <div className="glass-card p-4 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    FIA Endurance Trophy for LMGT3 Teams
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {teams2024
                    .filter(t => t.class === 'LMGT3')
                    .sort((a, b) => b.points - a.points)
                    .map((team, index) => (
                      <EntryRow key={team.id} team={team} position={index + 1} />
                    ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* LMP2 - Le Mans Only */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-blue-400" />
            <h2 className="font-racing text-2xl font-bold">LMP2</h2>
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
              Le Mans 24h Only
            </Badge>
          </div>

          <div className="glass-card p-4 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                LMP2 competes only at the 24 Hours of Le Mans since 2024 • Not a full-season championship
              </span>
            </div>

            <Tabs defaultValue="teams" className="w-full">
              <TabsList className="grid w-full max-w-xs grid-cols-2 mb-4">
                <TabsTrigger value="teams" className="font-racing gap-2 text-xs">
                  <Users className="w-3 h-3" />
                  Teams
                </TabsTrigger>
                <TabsTrigger value="drivers" className="font-racing gap-2 text-xs">
                  <User className="w-3 h-3" />
                  Drivers
                </TabsTrigger>
              </TabsList>

              <TabsContent value="teams">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {teams2024
                    .filter(t => t.class === 'LMP2')
                    .sort((a, b) => b.points - a.points)
                    .map((team, index) => (
                      <EntryRow key={team.id} team={team} position={index + 1} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="drivers">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {getDriversStandings('LMP2').map((driver, index) => (
                    <DriverRow key={driver.id} driver={driver} position={index + 1} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Legend */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Legend</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-wec-gold" />
              <span>1st Place</span>
            </div>
            <div className="flex items-center gap-2">
              <Medal className="w-4 h-4 text-wec-silver" />
              <span>2nd Place</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-wec-bronze" />
              <span>3rd Place</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <span>Manufacturer Color</span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Standings;