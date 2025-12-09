import { motion } from 'framer-motion';
import { Trophy, Users } from 'lucide-react';
import { teams } from '@/data/wecData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const StandingsWidget = () => {
  const getMedalColor = (position: number) => {
    switch (position) {
      case 1: return 'text-wec-gold';
      case 2: return 'text-wec-silver';
      case 3: return 'text-wec-bronze';
      default: return 'text-muted-foreground';
    }
  };

  const TeamRow = ({ team, index }: { team: typeof teams[0]; index: number }) => (
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
            <h3 className="font-racing text-lg font-bold">Championship</h3>
          </div>
          
          <TabsList className="bg-muted/50">
            <TabsTrigger value="teams" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-3 h-3 mr-1" />
              Teams
            </TabsTrigger>
            <TabsTrigger value="drivers" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Drivers
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="teams" className="mt-0 space-y-1">
          {teams.slice(0, 6).map((team, index) => (
            <TeamRow key={team.id} team={team} index={index} />
          ))}
        </TabsContent>
        
        <TabsContent value="drivers" className="mt-0">
          <div className="space-y-1">
            {[
              { position: 1, name: 'Toyota #7 Crew', points: 123, color: '#E60012' },
              { position: 2, name: 'Porsche #6 Crew', points: 115, color: '#C4A747' },
              { position: 3, name: 'Ferrari #50 Crew', points: 108, color: '#DC0000' },
              { position: 4, name: 'Cadillac #2 Crew', points: 95, color: '#1E1E1E' },
              { position: 5, name: 'Peugeot #93 Crew', points: 72, color: '#0066B1' },
              { position: 6, name: 'Alpine #35 Crew', points: 65, color: '#0090FF' },
            ].map((driver, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className={`font-racing text-lg font-bold w-6 ${getMedalColor(driver.position)}`}>
                  {driver.position}
                </span>
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: driver.color }} />
                <span className="flex-1 text-foreground">{driver.name}</span>
                <span className="font-racing font-bold">{driver.points} <span className="text-xs text-muted-foreground">pts</span></span>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default StandingsWidget;
