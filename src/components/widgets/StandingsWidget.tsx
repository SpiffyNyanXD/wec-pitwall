import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, User, Crown, Medal, Award, ChevronDown } from 'lucide-react';
import { teams2024, drivers2024, teams2025, drivers2025 } from '@/data/wecData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const StandingsWidget = () => {
  const [selectedSeason, setSelectedSeason] = useState<2024 | 2025>(2025);
  
  const teams = selectedSeason === 2025 ? teams2025 : teams2024;
  const drivers = selectedSeason === 2025 ? drivers2025 : drivers2024;

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="w-4 h-4 text-wec-gold" />;
      case 2: return <Medal className="w-4 h-4 text-wec-silver" />;
      case 3: return <Award className="w-4 h-4 text-wec-bronze" />;
      default: return null;
    }
  };

  const getMedalColor = (position: number) => {
    switch (position) {
      case 1: return 'text-wec-gold font-bold';
      case 2: return 'text-wec-silver';
      case 3: return 'text-wec-bronze';
      default: return 'text-muted-foreground';
    }
  };

  // Get drivers grouped by crew (shared points)
  const getDriversStandings = () => {
    const hypercarDrivers = drivers.filter(d => d.class === 'HYPERCAR');
    const driverGroups: Record<string, typeof hypercarDrivers> = {};
    
    hypercarDrivers.forEach(driver => {
      const key = `${driver.teamId}-${driver.points}`;
      if (!driverGroups[key]) {
        driverGroups[key] = [];
      }
      driverGroups[key].push(driver);
    });

    return Object.values(driverGroups)
      .map(crew => ({
        ...crew[0],
        displayName: crew.map(d => d.lastName || d.name.split(' ').pop()).join(' / ')
      }))
      .sort((a, b) => b.points - a.points);
  };

  const hypercarTeams = teams.filter(t => t.class === 'HYPERCAR').sort((a, b) => b.points - a.points);
  const driversStandings = getDriversStandings();

  const EntryRow = ({ team, index }: { team: typeof teams[0]; index: number }) => (
    <Link to={`/teams/${team.id.replace('-2025', '')}`}>
      <motion.div
        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group tap-highlight"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <div className="flex items-center w-6">
          {getMedalIcon(index + 1) || (
            <span className={`font-racing text-sm ${getMedalColor(index + 1)}`}>
              {index + 1}
            </span>
          )}
        </div>
        
        <div 
          className="w-1 h-6 rounded-full"
          style={{ backgroundColor: team.color }}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-racing text-xs font-bold text-primary">{team.carNumber}</span>
            <p className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
              {team.name}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            {team.manufacturer}
          </p>
        </div>
        
        <div className="text-right">
          <span className="font-racing text-sm font-bold text-foreground">
            {team.points}
          </span>
          <span className="text-xs text-muted-foreground ml-0.5">pts</span>
        </div>
      </motion.div>
    </Link>
  );

  const DriverRow = ({ driver, index }: { driver: ReturnType<typeof getDriversStandings>[0]; index: number }) => (
    <Link to={`/drivers/${driver.id.replace('-2025', '')}`}>
      <motion.div
        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors tap-highlight"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <div className="flex items-center w-6">
          {getMedalIcon(index + 1) || (
            <span className={`font-racing text-sm ${getMedalColor(index + 1)}`}>
              {index + 1}
            </span>
          )}
        </div>
        <span className="text-sm">{driver.countryFlag}</span>
        <span className="flex-1 text-foreground text-sm truncate">{driver.displayName}</span>
        <span className="font-racing text-sm font-bold">{driver.points} <span className="text-xs text-muted-foreground">pts</span></span>
      </motion.div>
    </Link>
  );

  return (
    <motion.div 
      className="glass-card p-5 col-span-full md:col-span-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Tabs defaultValue="entries" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-wec-gold" />
            <h3 className="font-racing text-lg font-bold">Hypercar</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <button
                onClick={() => setSelectedSeason(2024)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  selectedSeason === 2024 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                2024
              </button>
              <button
                onClick={() => setSelectedSeason(2025)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  selectedSeason === 2025 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                2025
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/30">
            Season Complete
          </Badge>
          <Link to="/standings" className="text-xs text-primary hover:underline">All Championships</Link>
        </div>
          
        <TabsList className="bg-muted/50 mb-4">
          <TabsTrigger value="entries" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Users className="w-3 h-3 mr-1" />
            Entries
          </TabsTrigger>
          <TabsTrigger value="drivers" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <User className="w-3 h-3 mr-1" />
            Drivers
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="entries" className="mt-0 space-y-1">
          {hypercarTeams.slice(0, 6).map((team, index) => (
            <EntryRow key={team.id} team={team} index={index} />
          ))}
        </TabsContent>
        
        <TabsContent value="drivers" className="mt-0 space-y-1">
          {driversStandings.slice(0, 6).map((driver, index) => (
            <DriverRow key={driver.id} driver={driver} index={index} />
          ))}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default StandingsWidget;