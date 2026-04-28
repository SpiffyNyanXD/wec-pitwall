import SEOHead from "@/components/SEOHead";
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, BellOff } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

const Notifications = () => {
  useEffect(() => {
    document.title = 'Notifications | WEC Pitwall';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Notifications" url="/notifications" noIndex={true} />
      <Header />
      <main className="container py-12 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <Bell className="w-6 h-6 text-primary" />
            <h1 className="font-racing text-2xl font-bold">Notifications</h1>
          </div>

          <div className="glass-card p-12 text-center">
            <BellOff className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="font-racing text-xl mb-2">No notifications yet</h2>
            <p className="text-muted-foreground text-sm">
              Race reminders and session alerts will appear here.
              Check back closer to race weekends.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Notifications;
