import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Flag, Calendar, ChevronRight } from 'lucide-react';
import { races2025, races2026 } from '@/data/wecData';

const LastRaceWidget = () => {
  // Find the most recently completed race
  const allRaces = [...races2025, ...races2026].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const lastRace = allRaces.find(r => r.status === 'completed');

  if (!lastRace) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="glass-card p-5 group h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-racing text-lg font-bold flex items-center gap-2">
          <HistoryIcon className="w-5 h-5 text-wec-gold" />
          Last Race Result
        </h3>
        <Link to={`/race/${lastRace.id}`} className="text-xs text-muted-foreground flex items-center hover:text-primary transition-colors">
          View details <ChevronRight className="w-3 h-3 ml-1" />
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center text-2xl shrink-0">
            {lastRace.flag}
          </div>
          <div>
            <h4 className="font-racing text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {lastRace.name}
            </h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(lastRace.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {lastRace.winner && (
          <div className="bg-muted/30 rounded-lg p-3 border border-border/50">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground mb-1">
              <Trophy className="w-3.5 h-3.5 text-wec-gold" />
              <span>Overall Winner</span>
            </div>
            <p className="font-racing text-lg font-bold text-primary">{lastRace.winner}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{lastRace.winningTeam}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Simple History icon component since it wasn't imported from lucide-react initially
const HistoryIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" className={className}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
    <path d="M3 3v5h5"/>
    <path d="M12 7v5l4 2"/>
  </svg>
);

export default LastRaceWidget;
