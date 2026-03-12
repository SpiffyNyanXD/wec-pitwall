import { motion } from 'framer-motion';
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