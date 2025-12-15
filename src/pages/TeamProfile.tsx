import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Flag, Users, MapPin, Calendar, Wrench, User, Quote, Star, Target } from 'lucide-react';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getTeamById, getDriverById, Team } from '@/data/wecData';

const TeamProfile = () => {
  const { id } = useParams<{ id: string }>();
  const team = getTeamById(id || '');
  const teamDrivers = team?.drivers.map(dId => getDriverById(dId)).filter(Boolean) || [];

  if (!team) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="text-center py-20">
            <h1 className="font-racing text-2xl mb-4">Team not found</h1>
            <Button asChild>
              <Link to="/teams">Back to Teams</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const getClassBadge = (carClass: string) => {
    switch (carClass) {
      case 'HYPERCAR': return 'bg-primary/20 text-primary border-primary/30';
      case 'LMP2': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'LMGT3': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // Default values for extended data
  const teamData = {
    fullName: team.fullName || team.name,
    chassis: team.chassis || `${team.manufacturer} Hypercar`,
    engine: team.engine || `${team.manufacturer} V6 Hybrid`,
    teamPrincipal: team.teamPrincipal || 'Team Principal',
    base: team.base || team.country,
    founded: team.founded || '2020',
    wecDebut: team.wecDebut || '2021',
    championships: team.championships || 0,
    leMansWins: team.leMansWins || 0,
    wecWins: team.wecWins || Math.floor(team.points / 25),
    poles: team.poles || Math.floor(team.points / 30),
    fastestLaps: team.fastestLaps || Math.floor(team.points / 35),
    about: team.about || `${team.name} is a professional endurance racing team competing in the FIA World Endurance Championship. The team campaigns the ${team.manufacturer} in the ${team.class} category, representing ${team.country} on the world stage.`,
    facts: team.facts || [
      `Based in ${team.country}`,
      `Competes with ${team.manufacturer} machinery`,
      `Running car number ${team.carNumber}`,
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ background: team.color }}
        />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="container py-8 relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" asChild className="gap-2 text-muted-foreground hover:text-foreground">
            <Link to="/teams">
              <ArrowLeft className="w-4 h-4" />
              Back to Teams
            </Link>
          </Button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-8 relative overflow-hidden"
        >
          {/* Team Color Gradient */}
          <div 
            className="absolute top-0 right-0 w-1/2 h-full opacity-15"
            style={{ background: `linear-gradient(135deg, ${team.color} 0%, transparent 100%)` }}
          />
          
          <div className="relative">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Team Logo/Number */}
              <div 
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: `${team.color}30`, border: `2px solid ${team.color}` }}
              >
                <span className="font-racing text-5xl md:text-6xl font-bold" style={{ color: team.color }}>
                  {team.carNumber}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <Badge variant="outline" className={getClassBadge(team.class)}>
                    {team.class}
                  </Badge>
                  <span className="text-2xl">{team.countryFlag}</span>
                </div>

                <h1 className="font-racing text-4xl md:text-5xl font-bold text-foreground mb-2">
                  {team.name}
                </h1>
                <p className="text-lg text-muted-foreground mb-1">{teamData.chassis}</p>
                <p className="text-sm text-muted-foreground">Since {teamData.wecDebut}</p>

                {/* Quick Stats Row */}
                <div className="flex flex-wrap gap-6 mt-6">
                  <div className="text-center">
                    <p className="font-racing text-3xl font-bold text-foreground">{team.points}</p>
                    <p className="text-xs text-muted-foreground uppercase">Points</p>
                  </div>
                  <div className="text-center">
                    <p className="font-racing text-3xl font-bold text-wec-gold">{teamData.wecWins}</p>
                    <p className="text-xs text-muted-foreground uppercase">Wins</p>
                  </div>
                  <div className="text-center">
                    <p className="font-racing text-3xl font-bold text-secondary">{teamData.leMansWins}</p>
                    <p className="text-xs text-muted-foreground uppercase">Le Mans</p>
                  </div>
                  <div className="text-center">
                    <p className="font-racing text-3xl font-bold text-primary">{teamData.poles}</p>
                    <p className="text-xs text-muted-foreground uppercase">Poles</p>
                  </div>
                  <div className="text-center">
                    <p className="font-racing text-3xl font-bold text-foreground">{teamData.fastestLaps}</p>
                    <p className="text-xs text-muted-foreground uppercase">Fastest Laps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Team Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Team Details */}
            <div className="glass-card p-6">
              <h2 className="font-racing text-lg font-bold mb-4 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-primary" />
                Team Details
              </h2>
              
              <div className="space-y-4">
                {/* Drivers */}
                {teamDrivers.map((driver, index) => (
                  <Link 
                    key={driver?.id} 
                    to={`/drivers/${driver?.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-2xl">{driver?.countryFlag}</span>
                    <div>
                      <p className="font-medium text-foreground">{driver?.name}</p>
                      <p className="text-xs text-muted-foreground">Driver</p>
                    </div>
                  </Link>
                ))}

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <Wrench className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{teamData.chassis}</p>
                    <p className="text-xs text-muted-foreground">Chassis</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <Target className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{teamData.engine}</p>
                    <p className="text-xs text-muted-foreground">Power Unit</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{teamData.teamPrincipal}</p>
                    <p className="text-xs text-muted-foreground">Team Principal</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{teamData.wecDebut}</p>
                    <p className="text-xs text-muted-foreground">WEC Debut</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{teamData.base}</p>
                    <p className="text-xs text-muted-foreground">Base</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Championships */}
            <div className="glass-card p-6">
              <h2 className="font-racing text-lg font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-wec-gold" />
                Achievements
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">Championships</span>
                  <span className="font-racing text-2xl text-wec-gold">{teamData.championships}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">Le Mans Wins</span>
                  <span className="font-racing text-2xl text-secondary">{teamData.leMansWins}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">WEC Wins</span>
                  <span className="font-racing text-2xl text-primary">{teamData.wecWins}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">2024 Position</span>
                  <span className="font-racing text-2xl text-foreground">P{team.position}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - About & Facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* About */}
            <div className="glass-card p-6">
              <h2 className="font-racing text-lg font-bold mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">{teamData.about}</p>
            </div>

            {/* Team Facts */}
            <div className="glass-card p-6">
              <h2 className="font-racing text-lg font-bold mb-4 flex items-center gap-2">
                <Quote className="w-5 h-5 text-primary" />
                Team Facts
              </h2>
              <div className="space-y-3">
                {teamData.facts.map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/50"
                  >
                    <Star className="w-4 h-4 text-wec-gold mt-0.5 shrink-0" />
                    <p className="text-muted-foreground">{fact}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Drivers Grid */}
            <div className="glass-card p-6">
              <h2 className="font-racing text-lg font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Current Drivers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamDrivers.map((driver, index) => (
                  <motion.div
                    key={driver?.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <Link 
                      to={`/drivers/${driver?.id}`}
                      className="block p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50 hover:border-primary/50"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{driver?.countryFlag}</span>
                        <div>
                          <p className="font-racing font-bold text-foreground">{driver?.name}</p>
                          <p className="text-xs text-muted-foreground">{driver?.nationality}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-wec-gold font-bold">{driver?.championships}</span>
                          <span className="text-muted-foreground ml-1">titles</span>
                        </div>
                        <div>
                          <span className="text-secondary font-bold">{driver?.leMansWins}</span>
                          <span className="text-muted-foreground ml-1">Le Mans</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default TeamProfile;
