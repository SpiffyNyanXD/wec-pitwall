import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Flag, Medal, Calendar, MapPin, Users, Star, Quote } from 'lucide-react';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getDriverById, getTeamById } from '@/data/wecData';

const DriverProfile = () => {
  const { id } = useParams<{ id: string }>();
  const driver = getDriverById(id || '');
  const team = driver ? getTeamById(driver.teamId) : undefined;

  if (!driver) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="text-center py-20">
            <h1 className="font-racing text-2xl mb-4">Driver not found</h1>
            <Button asChild className="tap-highlight">
              <Link to="/drivers">Back to Drivers</Link>
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6 flex justify-between items-center"
        >
          <BackButton to="/drivers" label="Back to Drivers" />
          <Button asChild variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10 transition-colors">
            <Link to={`/compare?a=${driver.id}`}>
              <span className="text-base">⚔️</span>
              Compare
            </Link>
          </Button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-8 relative overflow-hidden"
        >
          {/* Decorative gradient */}
          <div 
            className="absolute top-0 right-0 w-1/2 h-full opacity-10"
            style={{ background: `linear-gradient(135deg, ${team?.color || 'hsl(var(--primary))'} 0%, transparent 100%)` }}
          />
          
          <div className="relative flex flex-col md:flex-row gap-8 items-start">
            {/* Driver Avatar */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-6xl md:text-7xl shrink-0">
              {driver.countryFlag}
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge variant="outline" className={`${getClassBadge(driver.class)}`}>
                  {driver.class}
                </Badge>
                <span className="font-racing text-xl text-primary">{driver.carNumber}</span>
              </div>

              <h1 className="font-racing text-4xl md:text-5xl font-bold mb-2">
                <span className="text-muted-foreground">{driver.firstName}</span>{' '}
                <span className="text-foreground">{driver.lastName}</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-4">{driver.team}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {driver.nationality}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Born: {formatDate(driver.dateOfBirth)}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {driver.placeOfBirth}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Career Stats */}
            <div className="glass-card p-6">
              <h2 className="font-racing text-lg font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-wec-gold" />
                Career Statistics
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">World Championships</span>
                  <span className="font-racing text-2xl text-wec-gold">{driver.championships}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">Le Mans Wins</span>
                  <span className="font-racing text-2xl text-secondary">{driver.leMansWins}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">WEC Race Wins</span>
                  <span className="font-racing text-2xl text-primary">{driver.wecWins}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">2024 Points</span>
                  <span className="font-racing text-2xl text-foreground">{driver.points}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">2024 Position</span>
                  <span className="font-racing text-2xl text-foreground">P{driver.position}</span>
                </div>
              </div>
            </div>

            {/* Current Team */}
            {team && (
              <div className="glass-card p-6">
                <h2 className="font-racing text-lg font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Current Team
                </h2>
                <div 
                  className="p-4 rounded-lg border-l-4"
                  style={{ borderColor: team.color, background: `${team.color}10` }}
                >
                  <p className="font-racing font-bold text-foreground">{team.name}</p>
                  <p className="text-sm text-muted-foreground">{team.manufacturer} • {team.carNumber}</p>
                  <p className="text-xs text-muted-foreground mt-1">{team.countryFlag} {team.country}</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Biography & Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Biography */}
            <div className="glass-card p-6">
              <h2 className="font-racing text-lg font-bold mb-4">Biography</h2>
              <p className="text-muted-foreground leading-relaxed">{driver.biography}</p>
            </div>

            {/* Career Highlights */}
            <div className="glass-card p-6">
              <h2 className="font-racing text-lg font-bold mb-4 flex items-center gap-2">
                <Medal className="w-5 h-5 text-wec-gold" />
                Career Highlights
              </h2>
              <ul className="space-y-3">
                {driver.careerHighlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                  >
                    <Star className="w-4 h-4 text-wec-gold mt-0.5 shrink-0" />
                    <span className="text-foreground">{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Fun Facts */}
            <div className="glass-card p-6">
              <h2 className="font-racing text-lg font-bold mb-4 flex items-center gap-2">
                <Quote className="w-5 h-5 text-primary" />
                Facts & Trivia
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {driver.facts.map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/50"
                  >
                    <p className="text-sm text-muted-foreground">{fact}</p>
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

export default DriverProfile;
