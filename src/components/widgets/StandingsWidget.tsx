import { motion } from 'framer-motion';
import { Trophy, Users } from 'lucide-react';
import { teams2024, drivers2024 } from '@/data/wecData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const StandingsWidget = () => {
  const getMedalColor = (position: number) => {
    switch (position) {
      case 1: return 'text-wec-gold';
      case 2: return 'text-wec-silver';
      case 3: return 'text-wec-bronze';
      default: return 'text-muted-foreground';
    }
  };

  const TeamRow = ({ team, index }: { team: typeof teams2024[0]; index: number }) => (
    <motion.div
      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <span className={`font-racing text-lg font-bold w-6 ${getMedalColor(team.position)}`}>
        {team.position}
      </span>
      
      <div 
        className="w-1 h-8 rounded-full"
        style={{ backgroundColor: team.color }}
      />
      
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {team.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {team.carNumber} · {team.manufacturer}
        </p>
      </div>
      
      <div className="text-right">
        <span className="font-racing text-lg font-bold text-foreground">
          {team.points}
        </span>
        <span className="text-xs text-muted-foreground ml-1">pts</span>
      </div>
    </motion.div>
  );

  const hypercarTeams = teams2024.filter(t => t.class === 'HYPERCAR').sort((a, b) => b.points - a.points);
  const hypercarDrivers = drivers2024.filter(d => d.class === 'HYPERCAR').sort((a, b) => b.points - a.points);

  return (
    <motion.div 
      className="glass-card p-5 col-span-full md:col-span-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Tabs defaultValue="teams" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-wec-gold" />
            <h3 className="font-racing text-lg font-bold">Hypercar</h3>
          </div>
          <Link to="/standings" className="text-xs text-primary hover:underline">All Classes</Link>
        </div>
          
        <TabsList className="bg-muted/50 mb-4">
          <TabsTrigger value="teams" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Users className="w-3 h-3 mr-1" />
            Teams
          </TabsTrigger>
          <TabsTrigger value="drivers" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Drivers
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="teams" className="mt-0 space-y-1">
          {hypercarTeams.slice(0, 6).map((team, index) => (
            <TeamRow key={team.id} team={{ ...team, position: index + 1 }} index={index} />
          ))}
        </TabsContent>
        
        <TabsContent value="drivers" className="mt-0">
          <div className="space-y-1">
            {hypercarDrivers.slice(0, 6).map((driver, index) => (
              <Link to={`/drivers/${driver.id}`} key={driver.id}>
                <motion.div
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className={`font-racing text-lg font-bold w-6 ${getMedalColor(index + 1)}`}>
                    {index + 1}
                  </span>
                  <span className="text-lg">{driver.countryFlag}</span>
                  <span className="flex-1 text-foreground truncate">{driver.name}</span>
                  <span className="font-racing font-bold">{driver.points} <span className="text-xs text-muted-foreground">pts</span></span>
                </motion.div>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default StandingsWidget;
