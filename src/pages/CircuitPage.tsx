import { useParams, Link } from 'react-router-dom'
import { MapPin, Route, Timer, Calendar, Info, History } from 'lucide-react'
import SEOHead from '@/components/SEOHead'
import Header from '@/components/Header'
import { circuits } from '@/data/wecData'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useActiveSeasonId } from '@/hooks/useWecData'

const circuitSlugToDbName: Record<string, string> = {
  'imola': 'Imola',
  'spa': 'Spa',
  'le-mans': 'Sarthe',
  'sao-paulo': 'Interlagos',
  'cota': 'Americas',
  'fuji': 'Fuji',
  'qatar': 'Lusail',
  'bahrain': 'Bahrain',
}

const formatDateTime = (dateString: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

interface CircuitView {
  id: string;
  name: string;
  location: string;
  country: string;
  flag: string;
  length: string;
  turns: number;
  lapRecord: string;
  firstWEC: number;
  description: string;
  city?: string;
  lengthKm?: string;
  shortName?: string;
  wecHistory?: string;
  timezone?: string;
  established?: number;
  lapRecordTime?: string;
  lapRecordHolder?: string;
  lapRecordYear?: string;
  lapRecords?: {
    hypercar?: {
      time: string;
      driver: string;
      year: string;
    };
  };
}

const StatCard = ({ label, value, numeric }: { label: string, value: string, numeric?: boolean }) => (
  <div className="glass-card rounded-xl p-4 border border-glass-border flex flex-col justify-center">
    <div className="text-sm text-muted-foreground mb-1">{label}</div>
    <div className={`text-lg font-bold text-foreground ${numeric ? 'font-racing' : ''}`}>{value}</div>
  </div>
)

const CircuitInfoCard = ({ circuitExtended }: { circuitExtended: CircuitView }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
    <Card className="glass-card border-glass-border h-full bg-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          Circuit Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">{circuitExtended.description}</p>
        {circuitExtended.wecHistory && (
          <p className="text-muted-foreground leading-relaxed">{circuitExtended.wecHistory}</p>
        )}
        {circuitExtended.timezone && (
          <p className="text-xs text-muted-foreground">Local timezone: {circuitExtended.timezone}</p>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

const RaceInfoCard = ({ race, getStatusBadge }: { race: Record<string, unknown> | null, getStatusBadge: (status: string) => React.ReactNode }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
    <Card className="glass-card border-glass-border h-full bg-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-secondary" />
          2026 WEC RACE
        </CardTitle>
      </CardHeader>
      <CardContent>
        {race ? (
          <div className="space-y-4">
            <p className="font-bold text-lg text-foreground">{String(race.name)}</p>
            <div className="flex flex-col space-y-2 text-muted-foreground">
              <p>Date: {formatDateTime(String(race.scheduled_date))}</p>
              <p>Duration: {String(race.duration_hours)} hours</p>
              <div className="flex items-center gap-2 mt-2">Status: {getStatusBadge(String(race.status))}</div>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">Race information not available yet.</p>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

const LapRecordSection = ({ circuitExtended }: { circuitExtended: CircuitView }) => (
  <section className="glass-card rounded-xl p-5 border border-glass-border">
    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
      <Timer className="w-5 h-5 text-primary" />
      Lap Record
    </h2>
    <div className="flex flex-col">
      {circuitExtended.lapRecordTime ? (
        <>
          <span className="font-racing text-2xl text-primary font-bold">{circuitExtended.lapRecordTime}</span>
          <span className="text-muted-foreground mt-1">
            {circuitExtended.lapRecordHolder} {circuitExtended.lapRecordYear && <span className="font-racing ml-1">({circuitExtended.lapRecordYear})</span>}
          </span>
        </>
      ) : circuitExtended.lapRecords?.hypercar ? (
        <>
          <span className="font-racing text-2xl text-primary font-bold">{circuitExtended.lapRecords.hypercar.time}</span>
          <span className="text-muted-foreground mt-1">
            {circuitExtended.lapRecords.hypercar.driver} (<span className="font-racing">{circuitExtended.lapRecords.hypercar.year}</span>)
          </span>
        </>
      ) : (
        <span className="font-medium text-2xl font-racing text-secondary">{circuitExtended.lapRecord}</span>
      )}
    </div>
  </section>
);

export function CircuitPage() {
  const { id } = useParams<{ id: string }>()
  const circuitExtended = circuits.find(c => c.id === id) as CircuitView | undefined;
  const { seasonId } = useActiveSeasonId();

  const { data: race } = useQuery({
    queryKey: ['circuit-race', circuitExtended?.id, seasonId],
    queryFn: async () => {
      if (!supabase || !circuitExtended?.id || !seasonId) return null;
      const dbCircuitName = circuitSlugToDbName[circuitExtended.id];
      if (!dbCircuitName) return null;

      const { data, error } = await supabase
        .from('races')
        .select('name, scheduled_date, duration_hours, status, start_time_utc')
        .eq('season_id', seasonId)
        .ilike('circuit', `%${dbCircuitName}%`)
        .maybeSingle();

      if (error) {
        if (error.code === 'PGRST116') {
          console.warn('Race not found for circuit', circuitExtended.id);
          return null;
        }
        throw error;
      }
      return data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!circuitExtended?.id && !!supabase && !!seasonId
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-primary text-primary-foreground">Done</Badge>;
      case 'next': return <Badge className="bg-secondary text-secondary-foreground">Next</Badge>;
      case 'cancelled': return <Badge variant="destructive">Cancelled</Badge>;
      default: return <Badge variant="outline" className="text-muted-foreground border-muted-foreground">Upcoming</Badge>;
    }
  };

  if (!circuitExtended) {
    return (
      <div className="min-h-screen bg-background">
        <SEOHead title="Circuit Not Found | WEC Pitwall" description="Circuit could not be found." noIndex={true} />
        <Header />
        <main className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 py-8">
          <div className="text-center py-20">
            <h1 className="text-2xl font-semibold mb-4 text-foreground">Circuit not found</h1>
            <Link to="/circuits" className="text-primary hover:underline">
              ← Back to Circuits
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const cityOrLocation = circuitExtended.city || circuitExtended.location;
  const lengthToDisplay = circuitExtended.lengthKm || circuitExtended.length;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${circuitExtended.name} | Circuits | WEC Pitwall`}
        description={`WEC circuit stats and race history for ${circuitExtended.name} in ${circuitExtended.country}.`}
        url={`/circuit/${circuitExtended.id}`}
      />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 py-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Breadcrumbs & Header */}
          <div className="flex flex-col gap-4">
            <nav className="text-sm text-muted-foreground">
              <Link to="/circuits" className="hover:text-primary transition-colors">Circuits</Link>
              {' › '}
              <span className="text-foreground">{circuitExtended.shortName || circuitExtended.name}</span>
            </nav>

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-5xl shrink-0" aria-hidden="true">{circuitExtended.flag}</div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    <span className="text-gradient">{circuitExtended.name}</span>
                  </h1>
                  <p className="text-muted-foreground">{cityOrLocation}, {circuitExtended.country}</p>
                </div>
              </div>
              <Link to="/circuits" className="text-sm text-muted-foreground hover:text-primary transition-colors hidden sm:block">
                ← All Circuits
              </Link>
            </div>
          </div>

          {/* Track Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Track Length" value={`${lengthToDisplay}`} numeric />
            <StatCard label="Turns" value={String(circuitExtended.turns)} numeric />
            {circuitExtended.established && (
              <StatCard label="Established" value={String(circuitExtended.established)} numeric />
            )}
            {circuitExtended.firstWEC && (
              <StatCard label="First WEC" value={String(circuitExtended.firstWEC)} numeric />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CircuitInfoCard circuitExtended={circuitExtended} />
            <RaceInfoCard race={race} getStatusBadge={getStatusBadge} />
          </div>

          <LapRecordSection circuitExtended={circuitExtended} />
        </div>
      </main>
    </div>
  )
}

export default CircuitPage;
