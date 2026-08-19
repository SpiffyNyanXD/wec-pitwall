import SEOHead from "@/components/SEOHead";
import { useParams, Link } from 'react-router-dom';
import NotFound from './NotFound';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { MapPin, Route, Timer, Calendar, Info, History } from 'lucide-react';
import Header from '@/components/Header';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';


import { circuits } from '@/data/wecData';


const circuitSlugToDbName: Record<string, string> = {
  'imola': 'Imola',
  'spa': 'Spa',
  'le-mans': 'Sarthe',
  'sao-paulo': 'Interlagos',
  'cota': 'Americas',
  'fuji': 'Fuji',
  'lusail': 'Lusail',
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

const CircuitDetail = () => {
  const { id } = useParams<{ id: string }>();
  const circuit = circuits.find(c => c.id === id);

  useEffect(() => {
    if (circuit) {
      document.title = `${circuit.name} | Circuits | WEC Pitwall`;
    }
  }, [circuit]);

  const { data: race } = useQuery({
    queryKey: ['circuit-race', circuit?.id],
    queryFn: async () => {
      if (!supabase || !circuit?.id) return null;
      const dbCircuitName = circuitSlugToDbName[circuit.id];
      if (!dbCircuitName) return null;

      const { data, error } = await supabase
        .from('races')
        .select('name, scheduled_date, duration_hours, status, start_time_utc')
        .ilike('circuit', `%${dbCircuitName}%`)
        .maybeSingle();
      if (error) return null;
      return data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!circuit?.id && !!supabase
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-primary text-primary-foreground">Done</Badge>;
      case 'next': return <Badge className="bg-secondary text-secondary-foreground">Next</Badge>;
      default: return <Badge variant="outline" className="text-muted-foreground border-muted-foreground">Upcoming</Badge>;
    }
  };


  if (!circuit) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <nav className="text-sm text-zinc-400 mb-2">
            <Link to="/circuits" className="hover:text-primary transition-colors">Circuits</Link>
            {' › '}
            <span className="text-white">{circuit.shortName || circuit.name}</span>
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 md:p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-muted/50 flex items-center justify-center text-6xl md:text-7xl shrink-0">
              {circuit.flag}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="text-gradient">{circuit.name}</span>
              </h1>

              <div className="flex flex-wrap gap-4 text-muted-foreground mt-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{circuit.location}, {circuit.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Route className="w-4 h-4 text-secondary" />
                  <span>{circuit.length}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-card border-glass-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Circuit Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {circuit.description}
                </p>
                {circuit.wecHistory && (
                  <p className="text-muted-foreground leading-relaxed">
                    {circuit.wecHistory}
                  </p>
                )}
                {circuit.timezone && (
                  <p className="text-xs text-muted-foreground">
                    Local timezone: {circuit.timezone}
                  </p>
                )}

                <div className="pt-4 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Route className="w-4 h-4" /> Track Length
                    </span>
                    <span className="font-racing font-bold text-foreground">{circuit.lengthKm || circuit.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <History className="w-4 h-4" /> Number of Corners
                    </span>
                    <span className="font-racing font-bold text-foreground">{circuit.turns}</span>
                  </div>
                  {circuit.established && (
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Established
                    </span>
                    <span className="font-medium">{circuit.established}</span>
                  </div>
                  )}
                  {circuit.firstWEC && (
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> First WEC Appearance
                    </span>
                    <span className="font-medium">{circuit.firstWEC}</span>
                  </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Timer className="w-4 h-4" /> Lap Record
                    </span>
                    {circuit.lapRecordTime ? (
                      <div className="flex flex-col items-end">
                        <span className="font-racing text-primary font-bold">{circuit.lapRecordTime}</span>
                        <span className="text-xs text-muted-foreground">
                          {circuit.lapRecordHolder} {circuit.lapRecordYear && <span className="font-racing ml-1">({circuit.lapRecordYear})</span>}
                        </span>
                      </div>
                    ) : circuit.lapRecords?.hypercar ? (
                      <div className="flex flex-col items-end">
                        <span className="font-racing text-primary font-bold">{circuit.lapRecords.hypercar.time}</span>
                        <span className="text-xs text-muted-foreground">
                          {circuit.lapRecords.hypercar.driver} (<span className="font-racing">{circuit.lapRecords.hypercar.year}</span>)
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium text-secondary">{circuit.lapRecord}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card border-glass-border h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary" />
                  2026 WEC RACE
                </CardTitle>
              </CardHeader>
              <CardContent>
                {race ? (
                  <div className="space-y-4">
                    <p className="font-bold text-lg text-foreground">{race.name}</p>
                    <div className="flex flex-col space-y-2 text-muted-foreground">
                      <p>Date: {formatDateTime(race.scheduled_date)}</p>
                      <p>Duration: {race.duration_hours} hours</p>
                      <div className="flex items-center gap-2 mt-2">
                        Status: {getStatusBadge(race.status)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Race information not available yet.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CircuitDetail;
