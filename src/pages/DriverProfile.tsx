import SEOHead from "@/components/SEOHead";
import { useParams, Link, Navigate } from 'react-router-dom';
import NotFound from './NotFound';
import { motion } from 'framer-motion';
import { Trophy, Flag, Medal, Calendar, MapPin, Users, Star, Quote } from 'lucide-react';
import Header from '@/components/Header';
import { BoneyardSkeleton } from '@/components/ui/BoneyardSkeleton';
import { AuthGate } from '@/components/AuthGate';
import BackButton from '@/components/BackButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getDriverById, getTeamById } from '@/data/wecData';
import { getFlagEmoji } from '@/lib/flagUtils';
import { useDriverProfile } from '@/hooks/useDriverProfile';

const DriverHero = ({ driver, profile, age, team, }: { driver: Record<string, unknown>; profile: Record<string, unknown> | null | undefined; age: number | null; team: Record<string, unknown> | null | undefined }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-8 mb-8 relative overflow-hidden"
  >
    <div
      className="absolute top-0 right-0 w-1/2 h-full opacity-10"
      style={{ background: `linear-gradient(135deg, ${team?.color || 'hsl(var(--primary))'} 0%, transparent 100%)` }}
    />
    <div className="relative flex flex-col md:flex-row gap-8 items-start">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-6xl md:text-7xl shrink-0">
        {profile?.nationality_code ? getFlagEmoji(profile.nationality_code) : driver.countryFlag}
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <Badge variant="outline" className={`${team ? 'bg-primary/20 text-primary border-primary/30' : 'bg-muted text-muted-foreground'}`}>
            {driver.class}
          </Badge>
          <span className="font-racing text-xl text-primary">{driver.carNumber}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          <span className="text-muted-foreground">{driver.firstName}</span>{' '}
          <span className="text-foreground">{driver.lastName}</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-4">{driver.team}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {profile?.nationality || driver.nationality}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Born: {profile?.date_of_birth ? new Date(profile.date_of_birth).getFullYear() : 'Unknown'} {age ? `(Age ${age})` : ''}
          </div>
          {driver.placeOfBirth && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {driver.placeOfBirth}
            </div>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const DriverStats = ({ profile }: { profile: Record<string, unknown> | null | undefined }) => (
  <div className="glass-card p-6">
    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
      <Trophy className="w-5 h-5 text-wec-gold" />
      WEC Career
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="text-center p-4 rounded-lg bg-muted/30">
        <p className="font-racing text-3xl font-bold text-foreground">{profile?.total_wec_starts}</p>
        <p className="text-xs text-muted-foreground uppercase mt-1">Starts</p>
      </div>
      <div className="text-center p-4 rounded-lg bg-muted/30">
        <p className="font-racing text-3xl font-bold text-primary">{profile?.total_wec_wins}</p>
        <p className="text-xs text-muted-foreground uppercase mt-1">Wins</p>
      </div>
      <div className="text-center p-4 rounded-lg bg-muted/30">
        <p className="font-racing text-3xl font-bold text-secondary">{profile?.total_wec_podiums}</p>
        <p className="text-xs text-muted-foreground uppercase mt-1">Podiums</p>
      </div>
      <div className="text-center p-4 rounded-lg bg-muted/30">
        <p className="font-racing text-3xl font-bold text-foreground">{profile?.total_le_mans_starts}</p>
        <p className="text-xs text-muted-foreground uppercase mt-1">Le Mans Starts</p>
      </div>
      <div className="text-center p-4 rounded-lg bg-muted/30">
        <p className="font-racing text-3xl font-bold text-wec-gold">{profile?.total_le_mans_wins}</p>
        <p className="text-xs text-muted-foreground uppercase mt-1">Le Mans Wins</p>
      </div>
    </div>
  </div>
);


const DriverDetails = ({ profile, isProfileLoading, driver }: { profile: Record<string, unknown> | null | undefined; isProfileLoading: boolean; driver: Record<string, unknown> }) => {
  if (!profile && !isProfileLoading) {
    return (
      <div className="glass-card p-12 text-center">
        <h2 className="text-2xl font-bold mb-2">Extended profile coming soon.</h2>
        <p className="text-muted-foreground">Check back later for detailed career statistics, biography, and more.</p>
      </div>
    );
  }

  return (
    <>
      <DriverStats profile={profile} />

      {/* Biography */}
      {profile?.bio && (
        <div className="glass-card p-6">
          <h2 className="text-lg font-bold mb-4">Biography</h2>
          <p className="text-muted-foreground leading-relaxed text-zinc-300 font-sans">{profile.bio}</p>
        </div>
      )}

      {/* Career Highlights */}
      {profile?.career_highlights && profile.career_highlights.length > 0 && (
        <div className="glass-card p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Medal className="w-5 h-5 text-wec-gold" />
            Highlights
          </h2>
          <ul className="space-y-3 list-disc list-inside text-muted-foreground">
            {profile.career_highlights.map((highlight: string, index: number) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <span className="text-foreground">{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Fallback to static highlights if no profile highlights */}
      {(!profile?.career_highlights || profile.career_highlights.length === 0) && driver.careerHighlights && driver.careerHighlights.length > 0 && (
        <div className="glass-card p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Medal className="w-5 h-5 text-wec-gold" />
            Career Highlights
          </h2>
          <ul className="space-y-3">
            {driver.careerHighlights.map((highlight: string, index: number) => (
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
      )}
    </>
  );
};

const DriverProfile = () => {
  const { id } = useParams<{ id: string }>();
  const driver = getDriverById(id || '');
  const baseId = id?.split('-202')[0];
  const resolvedDriver = driver || (baseId ? getDriverById(baseId) : null);


  const { data: profile, isLoading: isProfileLoading } = useDriverProfile(resolvedDriver?.name ?? '');

  // Calculate age from date_of_birth
  const age = profile?.date_of_birth
    ? new Date().getFullYear() - new Date(profile.date_of_birth as string).getFullYear()
    : null;

  if (isProfileLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 py-8 relative z-10">
          <BoneyardSkeleton.Hero className="mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <BoneyardSkeleton.Card className="lg:col-span-1" />
            <BoneyardSkeleton.Table rows={5} className="lg:col-span-2" />
          </div>
        </main>
      </div>
    );
  }

  if (!resolvedDriver) {
    return <NotFound />;
  }

  const team = getTeamById(resolvedDriver.teamId);

  const getClassBadge = (carClass: string) => {
    switch (carClass) {
      case 'HYPERCAR': return 'bg-primary/20 text-primary border-primary/30';
      case 'LMP2': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'LMGT3': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };



  const formatDate = (dateString?: string) => {
    const date = new Date(dateString);

    if (!dateString || Number.isNaN(date.getTime())) {
      return 'Unknown';
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={resolvedDriver ? `${resolvedDriver.name} — WEC Pitwall` : 'Driver'}
        description={resolvedDriver ? `WEC career profile for ${resolvedDriver.name}. ${profile?.bio?.slice(0, 120) ?? ''}` : ''}
        url={resolvedDriver ? `/drivers/${resolvedDriver.id}` : '/drivers'}
      />
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 py-8 relative z-10">
        <AuthGate featureName="Driver Profiles">


        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <BackButton to="/drivers" label="Back to Drivers" />
        </motion.div>

        <DriverHero driver={resolvedDriver} profile={profile} age={age} team={team} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >

            {/* Current Team */}
            <div className="glass-card p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                CAR / TEAM
              </h2>
              <div
                className="p-4 rounded-lg border-l-4"
                style={{ borderColor: team?.color || 'hsl(var(--primary))', background: `${team?.color || 'hsl(var(--primary))'}10` }}
              >
                <p className="font-bold text-foreground">#{resolvedDriver.carNumber} &middot; {resolvedDriver.team} &middot; {resolvedDriver.class}</p>
                {team && (
                  <p className="text-xs text-muted-foreground mt-1">{team.countryFlag} {team.country} &middot; {team.manufacturer}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Biography & Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <DriverDetails profile={profile} isProfileLoading={isProfileLoading} driver={resolvedDriver as unknown as Record<string, unknown>} />
          </motion.div>
        </div>
      </AuthGate>
      </main>
    </div>
  );
};

export default DriverProfile;
