import SEOHead from "@/components/SEOHead";
import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, User, Factory, Info, Crown, Medal, Award, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { drivers2024, drivers2025, teams2024, races2024, teams2025, races2025, races2026, hypercars2026, lmgt3Teams2026, standings2025, standings2024 } from '@/data/wecData';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AuthGate } from '@/components/AuthGate';
import { useHypercarDriversStandings, useHypercarManufacturersStandings, useLmgt3DriversStandings, useLmgt3TeamsStandings, useActiveSeasonId } from '@/hooks/useWecData';
import { CHAMPIONSHIPS, SEASON_STATUS, CLASS_BADGES, POINTS_INFO, EMPTY_STATES } from '@/lib/constants';

type SeasonYear = 2024 | 2025 | 2026;

type SeasonStatus = 'completed' | 'in-progress' | 'upcoming';

const SEASON_DATA: Record<SeasonYear, { drivers: typeof drivers2024; teams: typeof teams2024; races: typeof races2024; status: SeasonStatus }> = {
  2024: { drivers: drivers2024, teams: teams2024, races: races2024, status: 'completed' },
  2025: { drivers: drivers2025, teams: teams2025, races: races2025, status: 'completed' },
  2026: { drivers: [], teams: [...hypercars2026, ...lmgt3Teams2026], races: races2026, status: 'in-progress' },
};


// Empty state component
const StandingsEmptyState = ({ message }: { message: string }) => (
  <div className="glass-card p-8 text-center border-dashed border-2 border-border/50">
    <Info className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-50" />
    <p className="text-muted-foreground">{message}</p>
  </div>
);

const SEASON_2026_ID = 'a1b2c3d4-0001-0001-0001-000000000001';

const Standings = () => {
  const [selectedSeason, setSelectedSeason] = useState<SeasonYear>(2026);
  
  const { drivers, teams, races, status } = SEASON_DATA[selectedSeason];
  
  // Use DB hooks for 2026
  const is2026 = selectedSeason === 2026;
  const { data: dbHypercarDrivers } = useHypercarDriversStandings(is2026 ? SEASON_2026_ID : null);
  const { data: dbHypercarMfg } = useHypercarManufacturersStandings(is2026 ? SEASON_2026_ID : null);
  const { data: dbLmgt3Drivers } = useLmgt3DriversStandings(is2026 ? SEASON_2026_ID : null);
  const { data: dbLmgt3Teams } = useLmgt3TeamsStandings(is2026 ? SEASON_2026_ID : null);

  // Calculate completed rounds
  const completedRounds = races.filter(r => r.status === 'completed').length;
  const totalRounds = races.length;

  // Get status badge based on season status
  const getSeasonStatusBadge = () => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
            {SEASON_STATUS.COMPLETED}
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 animate-pulse">
            {SEASON_STATUS.IN_PROGRESS}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-muted text-muted-foreground">
            {SEASON_STATUS.UPCOMING}
          </Badge>
        );
    }
  };

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
  const getManufacturersStandings = useCallback(() => {
    const hypercarTeams = teams.filter(t => t.class === 'HYPERCAR');
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
  }, [teams]);

  // Get car entries (teams) for Hypercar World Cup
  const getHypercarEntries = useCallback(() => {
    return teams
      .filter(t => t.class === 'HYPERCAR')
      .sort((a, b) => b.points - a.points);
  }, [teams]);

  // Get drivers sorted by points for each class
  const getDriversStandings = useCallback((carClass: 'HYPERCAR' | 'LMP2' | 'LMGT3') => {
    // Group drivers by their crew (shared points)
    const driverGroups: Record<string, typeof drivers> = {};
    
    drivers.filter(d => d.class === carClass).forEach(driver => {
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
  }, [drivers]);




  const DriverRow = ({ driver, position }: { driver: ReturnType<typeof getDriversStandings>[0]; position: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: position * 0.03 }}
    >
      <Link
        to={`/drivers/${driver.id}`}
        className="flex items-center gap-3 p-3 3xl:p-5 3xl:text-lg rounded-lg bg-card/50 hover:bg-card/80 border border-border/50 transition-all group tap-highlight"
      >
        <div className="flex items-center gap-2 w-12">
          {getMedalIcon(position) || (
            <span className={`font-racing text-lg 3xl:text-2xl w-6 text-center ${getMedalColor(position)}`}>
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
          <span className="font-racing text-lg 3xl:text-2xl font-bold text-foreground">{driver.points}</span>
          <span className="text-xs text-muted-foreground ml-1">pts</span>
        </div>
      </Link>
    </motion.div>
  );

  const EntryRow = ({ team, position }: { team: typeof teams[0]; position: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: position * 0.03 }}
    >
      <Link
        to={`/teams/${team.id}`}
        className="flex items-center gap-3 p-3 3xl:p-5 3xl:text-lg rounded-lg bg-card/50 hover:bg-card/80 border border-border/50 transition-all group tap-highlight"
      >
        <div className="flex items-center gap-2 w-12">
          {getMedalIcon(position) || (
            <span className={`font-racing text-lg 3xl:text-2xl w-6 text-center ${getMedalColor(position)}`}>
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
          <span className="font-racing text-lg 3xl:text-2xl font-bold text-foreground">{team.points}</span>
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
      className="flex items-center gap-3 p-3 3xl:p-5 3xl:text-lg rounded-lg bg-card/50 hover:bg-card/80 border border-border/50 transition-all tap-highlight"
    >
      <div className="flex items-center gap-2 w-12">
        {getMedalIcon(position) || (
          <span className={`font-racing text-lg 3xl:text-2xl w-6 text-center ${getMedalColor(position)}`}>
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
        <span className="font-racing text-lg 3xl:text-2xl font-bold text-foreground">{manufacturer.points}</span>
        <span className="text-xs text-muted-foreground ml-1">pts</span>
      </div>
    </motion.div>
  );



  const hypercarDrivers = useMemo(() => {
    if (is2026) {
      return (dbHypercarDrivers || []).map(d => ({
        id: d.id,
        name: d.driver_names,
        displayName: d.driver_names,
        points: d.total_points,
        position: d.position,
        teamId: d.car_id,
        countryFlag: d.flag || '🏁'
      }));
    }
    return getDriversStandings('HYPERCAR');
  }, [is2026, dbHypercarDrivers, getDriversStandings]);

  const manufacturersStandings = useMemo(() => {
    if (is2026) {
      return (dbHypercarMfg || []).map(m => ({
        name: m.manufacturer_name,
        points: m.total_points,
        position: m.position,
        color: m.color || '#E8002D',
        countryFlag: m.flag || '🏁'
      }));
    }
    return getManufacturersStandings();
  }, [is2026, dbHypercarMfg, getManufacturersStandings]);

  const hypercarEntries = useMemo(() => {
    if (is2026) {
      return teams.filter(t => t.class === 'HYPERCAR').sort((a, b) => b.points - a.points);
    }
    return getHypercarEntries();
  }, [is2026, getHypercarEntries, teams]);

  const lmgt3Drivers = useMemo(() => {
    if (is2026) {
      return (dbLmgt3Drivers || []).map(d => ({
        id: d.id,
        name: d.driver_names,
        displayName: d.driver_names,
        points: d.total_points,
        position: d.position,
        teamId: d.car_id,
        countryFlag: d.flag || '🏁'
      }));
    }
    return getDriversStandings('LMGT3');
  }, [is2026, dbLmgt3Drivers, getDriversStandings]);

  const lmgt3Teams = useMemo(() => {
    if (is2026) {
      return (dbLmgt3Teams || []).map(t => ({
        id: t.id,
        name: t.team_name,
        carNumber: t.car_number,
        manufacturer: t.manufacturer_name,
        points: t.total_points,
        position: t.position,
        color: t.color || '#E8002D'
      }));
    }
    return teams.filter(t => t.class === 'LMGT3').sort((a, b) => b.points - a.points);
  }, [teams, is2026, dbLmgt3Teams]);

  const lmp2Drivers = useMemo(
    () => getDriversStandings('LMP2'),
    [getDriversStandings]
  );
  const lmp2Teams = teams.filter(t => t.class === 'LMP2').sort((a, b) => b.points - a.points);


  // Data normalization for rendering
  const isHistoric = selectedSeason < 2026;
  const historicData = selectedSeason === 2025 ? standings2025 : selectedSeason === 2024 ? standings2024 : null;

  // Helpers to check if we have data to display
  const hasHypercarDrivers = isHistoric ? !!historicData?.hypercars?.drivers?.length : hypercarDrivers.length > 0;
  const hasHypercarTeams = isHistoric ? !!historicData?.hypercars?.teams?.length : hypercarEntries.length > 0;
  const hasHypercarManufacturers = isHistoric ? !!historicData?.hypercars?.manufacturers?.length : manufacturersStandings.length > 0;

  const hasLmgt3Drivers = isHistoric ? !!historicData?.lmgt3?.drivers?.length : lmgt3Drivers.length > 0;
  const hasLmgt3Teams = isHistoric ? !!historicData?.lmgt3?.teams?.length : lmgt3Teams.length > 0;

  const hasLmp2Drivers = isHistoric ? !!historicData?.lmp2?.drivers?.length : lmp2Drivers.length > 0;
  const hasLmp2Teams = isHistoric ? !!historicData?.lmp2?.teams?.length : lmp2Teams.length > 0;

  const content = (
    <div className="space-y-10">
      {/* Hypercar Championships */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-wec-gold" />
          <h2 className="text-2xl font-bold">Hypercar</h2>
          <Badge className="bg-primary/20 text-primary border-primary/30">
            {CLASS_BADGES.HYPERCAR}
          </Badge>
        </div>

        <Tabs defaultValue="drivers" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="drivers" className="gap-2 text-xs font-bold min-h-[44px] md:min-h-0">
              <User className="w-3 h-3" />
              Drivers
            </TabsTrigger>
            <TabsTrigger value="entries" className="gap-2 text-xs font-bold">
              <Users className="w-3 h-3" />
              Entries
            </TabsTrigger>
            <TabsTrigger value="manufacturers" className="gap-2 text-xs font-bold">
              <Factory className="w-3 h-3" />
              Manufacturers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drivers">
            <div className="glass-card p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {CHAMPIONSHIPS.HYPERCAR_DRIVERS} • {POINTS_INFO.DRIVERS_SHARED}
                </span>
              </div>
              {hasHypercarDrivers ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {!isHistoric
                    ? hypercarDrivers.map((driver, index) => (
                        <DriverRow key={`${driver.id}-${index}`} driver={driver} position={index + 1} />
                      ))
                    : historicData!.hypercars.drivers.map((driver: Record<string, unknown>, index: number) => (
                        <div key={`${index}`} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/50">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-muted-foreground w-4">{String(driver.position)}</span>
                            <span className="font-medium text-sm">{String(driver.drivers)}</span>
                          </div>
                          <span className="font-racing text-lg">{String(driver.points)} pts</span>
                        </div>
                      ))
                  }
                </div>
              ) : (
                <StandingsEmptyState message={isHistoric ? EMPTY_STATES.NO_STANDINGS : "Season in progress — standings will update after each round."} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="entries">
            <div className="glass-card p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {CHAMPIONSHIPS.HYPERCAR_TEAMS} • {POINTS_INFO.ENTRIES_INDEPENDENT}
                </span>
              </div>
              {hasHypercarTeams ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {!isHistoric
                    ? hypercarEntries.map((team, index) => (
                        <EntryRow key={`${team.id}-${index}`} team={team} position={index + 1} />
                      ))
                    : historicData!.hypercars.teams.map((team: Record<string, unknown>, index: number) => (
                        <div key={`${index}`} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/50">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-muted-foreground w-4">{String(team.position)}</span>
                            <span className="font-medium text-sm">{String(team.team)}</span>
                          </div>
                          <span className="font-racing text-lg">{String(team.points)} pts</span>
                        </div>
                      ))
                  }
                </div>
              ) : (
                <StandingsEmptyState message={isHistoric ? EMPTY_STATES.NO_STANDINGS : "Season in progress — standings will update after each round."} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="manufacturers">
            <div className="glass-card p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {CHAMPIONSHIPS.HYPERCAR_MANUFACTURERS} • {POINTS_INFO.MANUFACTURERS_COMBINED}
                </span>
              </div>
              {hasHypercarManufacturers ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {!isHistoric
                    ? manufacturersStandings.map((manufacturer, index) => (
                        <ManufacturerRow key={`${manufacturer.name}-${index}`} manufacturer={manufacturer} position={index + 1} />
                      ))
                    : historicData!.hypercars.manufacturers.map((manufacturer: Record<string, unknown>, index: number) => (
                        <div key={`${index}`} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/50">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-muted-foreground w-4">{String(manufacturer.position)}</span>
                            <span className="font-medium text-sm">{String(manufacturer.manufacturer)}</span>
                          </div>
                          <span className="font-racing text-lg">{String(manufacturer.points)} pts</span>
                        </div>
                      ))
                  }
                </div>
              ) : (
                <StandingsEmptyState message={isHistoric ? EMPTY_STATES.NO_STANDINGS : "Season in progress — standings will update after each round."} />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* LMGT3 Championship */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-green-400" />
          <h2 className="text-2xl font-bold">LMGT3</h2>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            {CLASS_BADGES.LMGT3}
          </Badge>
        </div>

        <Tabs defaultValue="drivers" className="w-full">
          <TabsList className="grid w-full max-w-xs grid-cols-2 mb-6">
            <TabsTrigger value="drivers" className="gap-2 text-xs font-bold min-h-[44px] md:min-h-0">
              <User className="w-3 h-3" />
              Drivers
            </TabsTrigger>
            <TabsTrigger value="teams" className="gap-2 text-xs font-bold min-h-[44px] md:min-h-0">
              <Users className="w-3 h-3" />
              Teams
            </TabsTrigger>
          </TabsList>

          <TabsContent value="drivers">
            <div className="glass-card p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {CHAMPIONSHIPS.LMGT3_DRIVERS}
                </span>
              </div>
              {hasLmgt3Drivers ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {!isHistoric
                    ? lmgt3Drivers.map((driver, index) => (
                        <DriverRow key={`${driver.id}-${index}`} driver={driver} position={index + 1} />
                      ))
                    : historicData!.lmgt3.drivers.map((driver: Record<string, unknown>, index: number) => (
                        <div key={`${index}`} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/50">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-muted-foreground w-4">{String(driver.position)}</span>
                            <span className="font-medium text-sm">{String(driver.drivers)}</span>
                          </div>
                          <span className="font-racing text-lg">{String(driver.points)} pts</span>
                        </div>
                      ))
                  }
                </div>
              ) : (
                <StandingsEmptyState message={isHistoric ? EMPTY_STATES.NO_STANDINGS : "Season in progress — standings will update after each round."} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="teams">
            <div className="glass-card p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Info className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {CHAMPIONSHIPS.LMGT3_TEAMS}
                </span>
              </div>
              {hasLmgt3Teams ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {!isHistoric
                    ? lmgt3Teams.map((team, index) => (
                        <EntryRow key={`${team.id}-${index}`} team={team} position={index + 1} />
                      ))
                    : historicData!.lmgt3.teams.map((team: Record<string, unknown>, index: number) => (
                        <div key={`${index}`} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/50">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-muted-foreground w-4">{String(team.position)}</span>
                            <span className="font-medium text-sm">{String(team.team)}</span>
                          </div>
                          <span className="font-racing text-lg">{String(team.points)} pts</span>
                        </div>
                      ))
                  }
                </div>
              ) : (
                <StandingsEmptyState message={isHistoric ? EMPTY_STATES.NO_STANDINGS : "Season in progress — standings will update after each round."} />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {!is2026 && (
      <div className="mb-10">
        {/* LMP2 - Le Mans Only */}
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold">LMP2</h2>
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            {CLASS_BADGES.LMP2}
          </Badge>
        </div>

        <div className="glass-card p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {POINTS_INFO.LMP2_NOTE}
            </span>
          </div>

          {hasLmp2Teams || hasLmp2Drivers ? (
            <Tabs defaultValue="teams" className="w-full">
              <TabsList className="grid w-full max-w-xs grid-cols-2 mb-4">
                <TabsTrigger value="teams" className="gap-2 text-xs font-bold min-h-[44px] md:min-h-0">
                  <Users className="w-3 h-3" />
                  Teams
                </TabsTrigger>
                <TabsTrigger value="drivers" className="gap-2 text-xs font-bold min-h-[44px] md:min-h-0">
                  <User className="w-3 h-3" />
                  Drivers
                </TabsTrigger>
              </TabsList>

              <TabsContent value="teams">
                {hasLmp2Teams ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {!isHistoric
                      ? lmp2Teams.map((team, index) => (
                          <EntryRow key={`${team.id}-${index}`} team={team} position={index + 1} />
                        ))
                      : historicData!.lmp2.teams.map((team: Record<string, unknown>, index: number) => (
                          <div key={`${index}`} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/50">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-muted-foreground w-4">{String(team.position)}</span>
                              <span className="font-medium text-sm">{String(team.team)}</span>
                            </div>
                            <span className="font-racing text-lg">{String(team.points)} pts</span>
                          </div>
                        ))
                    }
                  </div>
                ) : (
                  <StandingsEmptyState message={EMPTY_STATES.NO_STANDINGS} />
                )}
              </TabsContent>

              <TabsContent value="drivers">
                {hasLmp2Drivers ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                    {!isHistoric
                      ? lmp2Drivers.map((driver, index) => (
                          <DriverRow key={`${driver.id}-${index}`} driver={driver} position={index + 1} />
                        ))
                      : historicData!.lmp2.drivers.map((driver: Record<string, unknown>, index: number) => (
                          <div key={`${index}`} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/50">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-muted-foreground w-4">{String(driver.position)}</span>
                              <span className="font-medium text-sm">{String(driver.drivers)}</span>
                            </div>
                            <span className="font-racing text-lg">{String(driver.points)} pts</span>
                          </div>
                        ))
                    }
                  </div>
                ) : (
                  <StandingsEmptyState message={EMPTY_STATES.NO_STANDINGS} />
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <StandingsEmptyState message={EMPTY_STATES.NO_STANDINGS} />
          )}
        </div>
      </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">


            <SEOHead
        title="Championship Standings 2026 | WEC Pitwall"
        description="2026 FIA WEC Championship standings — Hypercar drivers, manufacturers and LMGT3 after each round."
        url="/standings"
      />
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 py-8 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl 3xl:text-4xl font-bold">
              <span className="text-gradient">Championship Standings</span>
            </h1>
            
            {/* Season Selector */}
            <Select 
              value={selectedSeason.toString()} 
              onValueChange={(val) => setSelectedSeason(parseInt(val) as SeasonYear)}
            >
              <SelectTrigger className="w-[140px] bg-card border-border min-h-[44px] md:min-h-0">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
            <span>{selectedSeason} FIA World Endurance Championship</span>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              {completedRounds}/{totalRounds} Rounds
            </Badge>
            {getSeasonStatusBadge()}
          </div>
        </motion.div>



        {isHistoric ? (
          <AuthGate featureName="Historical Data">
            {content}
          </AuthGate>
        ) : content}
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
          </div>
        </motion.div>
      </main>
    </div>
  );
};

// FONT-AUDIT: this page uses default sans font — verified to match home page
export default Standings;
