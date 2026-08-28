import { AUTH_ENABLED } from '@/lib/featureFlags';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Users, User, Crown, Medal, Award, Lock, Factory } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/AuthModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Skeleton as BoneyardSkeleton } from '@/components/ui/skeleton';
import { races2026 } from '@/data/wecData';
import {
  useActiveSeasonId,
  useHypercarDriversStandings,
  useHypercarManufacturersStandings,
  useLmgt3DriversStandings,
  useLmgt3TeamsStandings,
} from '@/hooks/useWecData';

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

const formatFlag = (code: string | null | undefined) => {
  if (!code) return '🏁';
  return String.fromCodePoint(...code.toUpperCase().split('').map((char: string) => 127397 + char.charCodeAt(0)));
};

interface TeamEntry {
  id: string;
  teamId: string;
  name: string;
  carNumber: string;
  manufacturer: string;
  points: number;
  color: string;
}

interface MfrEntry {
  id: string;
  name: string;
  countryFlag: string;
  points: number;
}

interface DriverEntry {
  id: string;
  displayName: string;
  countryFlag: string;
  points: number;
}

const EntryRow = ({ team, index }: { team: TeamEntry; index: number }) => (
  <Link to={`/teams/${team.teamId}`} key={team.id}>
    <motion.div
      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors group tap-highlight"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center w-6">
        {getMedalIcon(index + 1) || (
          <span className={`font-racing text-sm ${getMedalColor(index + 1)}`}>{index + 1}</span>
        )}
      </div>
      <div className="w-1 h-6 rounded-full" style={{ backgroundColor: team.color }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-racing text-xs font-bold text-primary">{team.carNumber}</span>
          <p className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">{team.name}</p>
        </div>
        <p className="text-xs text-muted-foreground truncate">{team.manufacturer}</p>
      </div>
      <div className="text-right">
        <span className="font-racing text-sm font-bold text-foreground">{team.points}</span>
        <span className="text-xs text-muted-foreground ml-0.5">pts</span>
      </div>
    </motion.div>
  </Link>
);

const MfrRow = ({ mfr, index }: { mfr: MfrEntry; index: number }) => (
  <motion.div
    key={mfr.id}
    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors tap-highlight"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <div className="flex items-center w-6">
      {getMedalIcon(index + 1) || (
        <span className={`font-racing text-sm ${getMedalColor(index + 1)}`}>{index + 1}</span>
      )}
    </div>
    <span className="text-sm">{mfr.countryFlag}</span>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-foreground text-sm truncate">{mfr.name}</p>
    </div>
    <div className="text-right">
      <span className="font-racing text-sm font-bold text-foreground">{mfr.points}</span>
      <span className="text-xs text-muted-foreground ml-0.5">pts</span>
    </div>
  </motion.div>
);

const DriverRow = ({ driver, index, onDriverClick, user }: { driver: DriverEntry; index: number; onDriverClick: (e: React.SyntheticEvent, driverId: string) => void; user: unknown }) => (
  <div
    role="button"
    tabIndex={0}
    aria-label={`View driver ${driver.displayName}`}
    onClick={(e) => onDriverClick(e, driver.id)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onDriverClick(e, driver.id);
      }
    }}
    className="cursor-pointer relative focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-lg"
    key={driver.id}
  >
    <motion.div
      className={`flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted/50 transition-colors tap-highlight ${AUTH_ENABLED && !user ? 'opacity-80' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center w-6">
        {getMedalIcon(index + 1) || (
          <span className={`font-racing text-sm ${getMedalColor(index + 1)}`}>{index + 1}</span>
        )}
      </div>
      <span className="text-sm">{driver.countryFlag}</span>
      <span className="flex-1 text-foreground text-sm truncate">{driver.displayName}</span>
      <span className="font-racing text-sm font-bold">{driver.points} <span className="text-xs text-muted-foreground">pts</span></span>
    </motion.div>
    {AUTH_ENABLED && !user && (
      <div className="absolute top-2 right-2">
        <Lock className="w-3 h-3 text-zinc-400" />
      </div>
    )}
  </div>
);

const Skeletons = () => (
  <>{Array(6).fill(0).map((_, i) => <BoneyardSkeleton key={i} className="h-12 w-full mb-1 rounded-lg" />)}</>
);

const StandingsWidget = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [category, setCategory] = useState<'HYP' | 'LMGT3'>('HYP');
  const navigate = useNavigate();

  const seasonYear = 2026;
  const completedRounds = useMemo(() => races2026.filter(r => r.status === 'completed').length, []);
  const totalRounds = races2026.length;

  const { data: seasonId, loading: seasonLoading } = useActiveSeasonId();

  const hypSeasonId = category === 'HYP' ? seasonId : null;
  const lmgt3SeasonId = category === 'LMGT3' ? seasonId : null;

  const { data: hypDriversData, loading: hypDriversLoading } = useHypercarDriversStandings(hypSeasonId);
  const { data: hypMfrsData, loading: hypMfrsLoading } = useHypercarManufacturersStandings(hypSeasonId);
  const { data: lmgt3DriversData, loading: lmgt3DriversLoading } = useLmgt3DriversStandings(lmgt3SeasonId);
  const { data: lmgt3TeamsData, loading: lmgt3TeamsLoading } = useLmgt3TeamsStandings(lmgt3SeasonId);

  const hypDrivers = useMemo(() => {
    return (hypDriversData || []).map(d => ({
      id: d.driver_id,
      displayName: d.driver_name,
      countryFlag: formatFlag(d.country_code),
      points: d.total_points,
    }));
  }, [hypDriversData]);

  const hypMfrs = useMemo(() => {
    return (hypMfrsData || []).map((m, i) => ({
      id: m.manufacturer_id || `mfr-${i}`,
      name: m.manufacturer_name,
      countryFlag: formatFlag(m.country_code),
      points: m.total_points,
    }));
  }, [hypMfrsData]);

  const lmgt3Drivers = useMemo(() => {
    return (lmgt3DriversData || []).map(d => ({
      id: d.driver_id,
      displayName: d.driver_name,
      countryFlag: formatFlag(d.country_code),
      points: d.total_points,
    }));
  }, [lmgt3DriversData]);

  const lmgt3Teams = useMemo(() => {
    return (lmgt3TeamsData || []).map(t => ({
      id: t.car_id,
      teamId: t.team_id,
      name: t.team_name,
      carNumber: t.car_number,
      manufacturer: t.manufacturer_name,
      points: t.total_points,
      color: '#E8002D',
    }));
  }, [lmgt3TeamsData]);

  const handleDriverClick = (e: React.SyntheticEvent, driverId: string) => {
    e.preventDefault();
    if (!AUTH_ENABLED || user) {
      navigate(`/drivers/${driverId}`);
    } else {
      setShowAuthModal(true);
    }
  };

  const loading = seasonLoading || (category === 'HYP' ? (hypDriversLoading || hypMfrsLoading) : (lmgt3DriversLoading || lmgt3TeamsLoading));

  const renderHypTabs = () => (
    <Tabs defaultValue="drivers" className="w-full">
      <TabsList className="bg-muted/50 mb-4 w-full">
        <TabsTrigger value="drivers" className="text-xs flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <User className="w-3 h-3 mr-1" />
          Drivers
        </TabsTrigger>
        <TabsTrigger value="mfrs" className="text-xs flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <Factory className="w-3 h-3 mr-1" />
          Manufacturers
        </TabsTrigger>
      </TabsList>
      <TabsContent value="drivers" className="mt-0 space-y-1">
        {loading ? <Skeletons /> : hypDrivers.length > 0 ? hypDrivers.slice(0, 6).map((d, i) => <DriverRow key={d.id} driver={d} index={i} onDriverClick={handleDriverClick} user={user} />) : <div className="text-center py-4 text-sm text-muted-foreground">No driver data available</div>}
      </TabsContent>
      <TabsContent value="mfrs" className="mt-0 space-y-1">
        {loading ? <Skeletons /> : hypMfrs.length > 0 ? hypMfrs.map((m, i) => <MfrRow key={m.id} mfr={m} index={i} />) : <div className="text-center py-4 text-sm text-muted-foreground">No manufacturer data available</div>}
      </TabsContent>
    </Tabs>
  );

  const renderLmgt3Tabs = () => (
    <Tabs defaultValue="teams" className="w-full">
      <TabsList className="bg-muted/50 mb-4 w-full">
        <TabsTrigger value="teams" className="text-xs flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <Users className="w-3 h-3 mr-1" />
          Teams
        </TabsTrigger>
        <TabsTrigger value="drivers" className="text-xs flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <User className="w-3 h-3 mr-1" />
          Drivers
        </TabsTrigger>
      </TabsList>
      <TabsContent value="teams" className="mt-0 space-y-1">
        {loading ? <Skeletons /> : lmgt3Teams.length > 0 ? lmgt3Teams.slice(0, 6).map((t, i) => <EntryRow key={t.id} team={t} index={i} />) : <div className="text-center py-4 text-sm text-muted-foreground">No team data available</div>}
      </TabsContent>
      <TabsContent value="drivers" className="mt-0 space-y-1">
        {loading ? <Skeletons /> : lmgt3Drivers.length > 0 ? lmgt3Drivers.slice(0, 6).map((d, i) => <DriverRow key={d.id} driver={d} index={i} onDriverClick={handleDriverClick} user={user} />) : <div className="text-center py-4 text-sm text-muted-foreground">No driver data available</div>}
      </TabsContent>
    </Tabs>
  );

  return (
    <motion.div
      className="glass-card p-5 col-span-full md:col-span-1 min-h-[420px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-wec-gold" />
          <h3 className="text-lg font-bold">Standings</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <button
              onClick={() => setCategory('HYP')}
              className={`px-2 py-1 text-xs font-bold rounded transition-colors ${category === 'HYP' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
            >
              HYP
            </button>
            <button
              onClick={() => setCategory('LMGT3')}
              className={`px-2 py-1 text-xs font-bold rounded transition-colors ${category === 'LMGT3' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
            >
              LMGT3
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline" className="text-xs bg-primary/20 text-primary border-primary/30">
          {seasonYear === 2026 ? `Round ${completedRounds} / ${totalRounds}` : 'Season Complete'}
        </Badge>
        <Link to="/standings" className="text-xs text-primary hover:underline">All Championships</Link>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
        >
          {category === 'HYP' ? renderHypTabs() : renderLmgt3Tabs()}
        </motion.div>
      </AnimatePresence>
      {AUTH_ENABLED && showAuthModal && <AuthModal featureName="Driver Profiles" onClose={() => setShowAuthModal(false)} />}
    </motion.div>
  );
};

export default StandingsWidget;
