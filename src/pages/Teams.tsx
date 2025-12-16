import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Flag, Users, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { teams2024 } from '@/data/wecData';

const getClassBadge = (carClass: string) => {
  switch (carClass) {
    case 'HYPERCAR': return 'bg-primary/20 text-primary border-primary/30';
    case 'LMP2': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'LMGT3': return 'bg-green-500/20 text-green-400 border-green-500/30';
    default: return 'bg-muted text-muted-foreground';
  }
};

interface TeamCardProps {
  team: typeof teams2024[0];
  index: number;
}

const TeamCard = ({ team, index }: TeamCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/teams/${team.id}`}>
        <div className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group h-full">
          <div className="flex items-start gap-4">
            {/* Team Color & Position */}
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-racing font-bold"
                style={{ background: `${team.color}30`, color: team.color }}
              >
                {team.carNumber}
              </div>
              <span className="text-sm text-muted-foreground">P{team.position}</span>
            </div>

            {/* Team Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className={getClassBadge(team.class)}>
                  {team.class}
                </Badge>
                {team.class === 'LMP2' && (
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">
                    Le Mans 24h
                  </Badge>
                )}
                <span className="text-lg">{team.countryFlag}</span>
              </div>
              
              <h3 className="font-racing text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                {team.name}
              </h3>
              <p className="text-sm text-muted-foreground">{team.manufacturer}</p>
              
              <div className="flex items-center gap-4 mt-3 text-sm">
                <div className="flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-wec-gold" />
                  <span className="text-foreground font-medium">{team.points}</span>
                  <span className="text-muted-foreground">pts</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{team.drivers.length} drivers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Teams = () => {
  const hypercars = teams2024.filter(t => t.class === 'HYPERCAR');
  const lmp2 = teams2024.filter(t => t.class === 'LMP2');
  const lmgt3 = teams2024.filter(t => t.class === 'LMGT3');

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
          <h1 className="font-racing text-4xl font-bold mb-2">
            WEC <span className="text-primary">Teams</span>
          </h1>
          <p className="text-muted-foreground">2024 Season Teams & Manufacturers</p>
          <p className="text-xs text-muted-foreground mt-1">Note: LMP2 competes only at Le Mans 24h since 2024</p>
        </motion.div>

        <Tabs defaultValue="HYPERCAR" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="HYPERCAR" className="font-racing">Hypercar</TabsTrigger>
            <TabsTrigger value="LMP2" className="font-racing">LMP2 (Le Mans)</TabsTrigger>
            <TabsTrigger value="LMGT3" className="font-racing">LMGT3</TabsTrigger>
          </TabsList>

          <TabsContent value="HYPERCAR">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hypercars.map((team, index) => (
                <TeamCard key={team.id} team={team} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="LMP2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lmp2.map((team, index) => (
                <TeamCard key={team.id} team={team} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="LMGT3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lmgt3.map((team, index) => (
                <TeamCard key={team.id} team={team} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Teams;
