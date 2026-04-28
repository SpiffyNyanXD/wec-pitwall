import SEOHead from "@/components/SEOHead";
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Route, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { circuits } from '@/data/wecData';

const Circuits = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Circuits"
        description="WEC race circuits around the world — lap records, track details and race history."
        url="/circuits"
      />
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
          <h1 className="font-racing text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient">Circuits</span>
          </h1>
          <p className="text-muted-foreground">FIA World Endurance Championship venues</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {circuits.map((circuit, index) => (
            <motion.div
              key={circuit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/circuit/${circuit.id}`}
                className="group glass-card p-5 flex flex-col gap-4 hover:border-primary/50 transition-all duration-300 h-full"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-3xl mb-3 shrink-0">
                    {circuit.flag}
                  </div>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    WEC since {circuit.firstWEC}
                  </Badge>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-racing text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {circuit.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="truncate">{circuit.location}, {circuit.country}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="glass-card p-3 rounded-lg text-center bg-muted/20">
                    <Route className="w-4 h-4 mx-auto mb-1 text-secondary" />
                    <p className="text-sm font-bold text-foreground">{circuit.length}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Length</p>
                  </div>
                  <div className="glass-card p-3 rounded-lg text-center bg-muted/20">
                    <Calendar className="w-4 h-4 mx-auto mb-1 text-primary" />
                    <p className="text-sm font-bold text-foreground">{circuit.turns}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Corners</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Circuits;
