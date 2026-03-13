import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CountdownWidget from '@/components/widgets/CountdownWidget';
import StandingsWidget from '@/components/widgets/StandingsWidget';
import CalendarWidget from '@/components/widgets/CalendarWidget';
import QuickStatsWidget from '@/components/widgets/QuickStatsWidget';
import LastRaceWidget from '@/components/widgets/LastRaceWidget';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
      
      <Header />
      
      <main className="container py-6 px-4 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Row 1: Countdown spans full width */}
          <div className="col-span-full">
            <CountdownWidget />
          </div>
          
          {/* Le Mans Feature Card */}
          <div className="col-span-full">
            <Link to="/le-mans">
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="glass-card p-4 flex items-center justify-between gap-4 border-wec-gold/20 hover:border-wec-gold/40 transition-colors cursor-pointer"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-wec-gold/0 via-wec-gold/60 to-wec-gold/0 rounded-t-xl" />
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-wec-gold/10 flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-wec-gold" />
                  </div>
                  <div>
                    <p className="font-racing font-bold text-sm text-foreground">24 Hours of Le Mans</p>
                    <p className="text-xs text-muted-foreground">June 13–14, 2026 · Round 3</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </motion.div>
            </Link>
          </div>

          {/* Row 2: Standings and Calendar */}
          <StandingsWidget />
          <CalendarWidget />

          {/* Row 3: Quick Stats & Last Race */}
          <div className="col-span-full md:col-span-1">
            <QuickStatsWidget />
          </div>
          <div className="col-span-full md:col-span-1">
            <LastRaceWidget />
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;