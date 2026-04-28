import SEOHead from "@/components/SEOHead";
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { MapPin, Route, Timer, Calendar, Info, History } from 'lucide-react';
import Header from '@/components/Header';
import BackButton from '@/components/BackButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { circuits, allSeasons } from '@/data/wecData';

const CircuitDetail = () => {
  const { id } = useParams<{ id: string }>();
  const circuit = circuits.find(c => c.id === id);

  useEffect(() => {
    if (circuit) {
      document.title = `${circuit.name} | Circuits | WEC Pitwall`;
    }
  }, [circuit]);

  if (!circuit) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="text-center py-20">
            <h1 className="font-racing text-2xl mb-4">Circuit not found</h1>
            <Link to="/circuits" className="text-primary hover:underline">Back to Circuits</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="container py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <BackButton to="/circuits" label="Back to Circuits" />
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
              <h1 className="font-racing text-3xl md:text-4xl font-bold mb-2">
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
                <CardTitle className="font-racing flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  Circuit Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {circuit.description}
                </p>

                <div className="pt-4 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Route className="w-4 h-4" /> Track Length
                    </span>
                    <span className="font-medium">{circuit.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <History className="w-4 h-4" /> Number of Corners
                    </span>
                    <span className="font-medium">{circuit.turns}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> First WEC Appearance
                    </span>
                    <span className="font-medium">{circuit.firstWEC}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-glass-border">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Timer className="w-4 h-4" /> Lap Record
                    </span>
                    {circuit.lapRecords?.hypercar ? (
                      <div className="flex flex-col items-end">
                        <span className="font-racing text-primary font-bold">{circuit.lapRecords.hypercar.time}</span>
                        <span className="text-xs text-muted-foreground">
                          {circuit.lapRecords.hypercar.driver} ({circuit.lapRecords.hypercar.year})
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
        </div>
      </main>
    </div>
  );
};

export default CircuitDetail;
