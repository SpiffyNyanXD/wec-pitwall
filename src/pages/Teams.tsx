import SEOHead from "@/components/SEOHead";
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Flag, Users, MapPin, Search, X } from 'lucide-react';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTeamProfile } from '@/hooks/useTeamProfile';

import { teams2025, hypercars2026, lmgt3Teams2026 } from '@/data/wecData';

const getClassBadge = (carClass: string) => {
  switch (carClass) {
    case 'HYPERCAR': return 'bg-wec-red/20 text-wec-red border-wec-red/30';
    case 'LMP2': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'LMGT3': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    default: return 'bg-muted text-muted-foreground';
  }
};

interface TeamCardProps {
  team: typeof teams2025[0];
  index: number;
}

const TeamCard = ({ team, index }: TeamCardProps) => {
  const { data: profile } = useTeamProfile(team.name);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/teams/${team.id}`}>
        <div className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group h-full flex flex-col">
          <div className="flex items-start gap-4 flex-1">
            {/* Team Color & Position */}
            <div className="flex flex-col items-center gap-2">
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-racing font-bold shrink-0"
                style={{ background: `${team.color}30`, color: team.color }}
              >
                {team.carNumber}
              </div>
            </div>

            {/* Team Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="outline" className={getClassBadge(team.class)}>
                  {team.class}
                </Badge>
                {team.class === 'LMP2' && (
                  <Badge variant="outline" className="bg-wec-gold/10 text-wec-gold border-wec-gold/30 text-xs">
                    Le Mans 24h
                  </Badge>
                )}
                <span className="text-lg">{team.countryFlag}</span>
              </div>
              
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                {team.name}
              </h3>
              <p className="text-sm text-muted-foreground">{team.manufacturer}</p>
              
              {profile && (
              <div className="mt-2 text-xs text-muted-foreground space-y-1">
                {profile.founded_year && <p>Est. {profile.founded_year}</p>}
                {profile.headquarters && <p className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {profile.headquarters}</p>}
              </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50 text-sm">
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
      </Link>
    </motion.div>
  );
};

const Teams = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Use 2025 data to match active season
  const filteredTeams = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return teams2025;
    return teams2025.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.manufacturer.toLowerCase().includes(q) ||
      t.carNumber.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const hypercars = filteredTeams.filter(t => t.class === 'HYPERCAR');
  const lmp2 = filteredTeams.filter(t => t.class === 'LMP2');
  const lmgt3 = filteredTeams.filter(t => t.class === 'LMGT3');

  const manufacturers = ['All', 'Ferrari', 'Toyota', 'BMW', 'Cadillac', 'Alpine', 'Peugeot', 'Aston Martin', 'Genesis'];

  const manufacturerFilter = activeFilter === 'All' ? '' : activeFilter;

  const filteredHypercars = manufacturerFilter
    ? hypercars.filter(t => t.manufacturer === manufacturerFilter)
    : hypercars;

  return (
    <div className="min-h-screen bg-background">

            <SEOHead
        title="WEC Teams 2026 | WEC Pitwall"
        description="All 2026 FIA WEC Hypercar and LMGT3 teams — entry lists, car specs, championship standings and results."
        url="/teams"
      />
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            WEC <span className="text-primary">Teams</span>
          </h1>
          <p className="text-muted-foreground">Season Teams & Manufacturers</p>
        </motion.div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search teams, manufacturers, car numbers..."
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
          <TabsList className="grid w-full max-w-lg grid-cols-3 mb-8 h-12">
            <TabsTrigger value="HYPERCAR" className="h-10 px-4">Hypercar</TabsTrigger>
            <TabsTrigger value="LMP2" className="h-10 px-4">LMP2</TabsTrigger>
            <TabsTrigger value="LMGT3" className="h-10 px-4">LMGT3</TabsTrigger>
          </TabsList>

          <TabsContent value="HYPERCAR">
            <div className="flex overflow-x-auto pb-4 mb-4 gap-2 no-scrollbar items-center">
              {manufacturers.map(mfg => (
                <button
                  key={mfg}
                  onClick={() => setActiveFilter(mfg)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeFilter === mfg
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {mfg}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHypercars.map((team, index) => (
                <TeamCard key={`${team.id}-${index}`} team={team} index={index} />
              ))}
              {filteredHypercars.length === 0 && (
                <div className="col-span-full py-12 text-center text-muted-foreground text-sm">
                  No hypercar teams found{searchQuery ? ` for "${searchQuery}"` : ""}{manufacturerFilter ? ` from ${manufacturerFilter}` : ""}.
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="LMP2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lmp2.map((team, index) => (
                <TeamCard key={`${team.id}-${index}`} team={team} index={index} />
              ))}
              {lmp2.length === 0 && (
                <div className="col-span-full py-12 text-center text-muted-foreground text-sm">
                  No LMP2 teams found matching "{searchQuery}".
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="LMGT3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lmgt3.map((team, index) => (
                <TeamCard key={`${team.id}-${index}`} team={team} index={index} />
              ))}
              {lmgt3.length === 0 && (
                <div className="col-span-full py-12 text-center text-muted-foreground text-sm">
                  No LMGT3 teams found matching "{searchQuery}".
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Teams;
