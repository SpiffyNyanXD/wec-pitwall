import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Flag, Calendar, Trophy, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';

const quickLinks = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/schedule', label: 'Schedule', icon: Calendar },
  { to: '/standings', label: 'Standings', icon: Trophy },
  { to: '/teams', label: 'Teams', icon: Flag },
];

const NotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found | WEC Pitwall";
  }, []);

  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <Header />

      <main className="container py-12 px-4 relative z-10 flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <span className="font-racing text-8xl md:text-9xl font-bold text-gradient opacity-30">
              404
            </span>
          </motion.div>

          {/* Flag icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center">
              <Flag className="w-8 h-8 text-muted-foreground" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-racing text-2xl md:text-3xl font-bold text-foreground mb-3"
          >
            Off the Racing Line
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mb-2"
          >
            This page doesn't exist or has been moved.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-xs text-muted-foreground/60 mb-8 font-mono"
          >
            {location.pathname}
          </motion.p>

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl racing-gradient text-primary-foreground font-racing font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
              Quick Navigation
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="glass-card p-3 flex items-center gap-2 hover:border-primary/40 transition-colors group"
                >
                  <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default NotFound;
