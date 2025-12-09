import { motion } from 'framer-motion';
import { Radio, Circle } from 'lucide-react';
import { liveTiming } from '@/data/wecData';
import { Badge } from '@/components/ui/badge';

const LiveTimingWidget = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'pit': return 'bg-wec-gold';
      case 'out': return 'bg-secondary';
      default: return 'bg-muted';
    }
  };

  const getClassBadge = (carClass: string) => {
    switch (carClass) {
      case 'HYPER': return 'bg-primary/20 text-primary border-primary/30';
      case 'LMP2': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'LMGT3': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <motion.div 
      className="glass-card p-5 col-span-full lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-secondary animate-pulse" />
          <h3 className="font-racing text-lg font-bold">Live Timing</h3>
        </div>
        <Badge variant="outline" className="bg-secondary/20 text-secondary border-secondary/30 animate-pulse">
          <Circle className="w-2 h-2 mr-1 fill-current" />
          LIVE
        </Badge>
      </div>
      
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[50px_80px_1fr_80px_100px_100px_100px_60px] gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-2 px-3">
        <span>Pos</span>
        <span>Car</span>
        <span>Team / Driver</span>
        <span>Class</span>
        <span className="text-right">Gap</span>
        <span className="text-right">Last Lap</span>
        <span className="text-right">Best Lap</span>
        <span className="text-center">Status</span>
      </div>
      
      {/* Timing Rows */}
      <div className="space-y-1">
        {liveTiming.map((entry, index) => (
          <motion.div
            key={index}
            className="grid grid-cols-[40px_1fr_auto] md:grid-cols-[50px_80px_1fr_80px_100px_100px_100px_60px] gap-2 items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <span className={`font-racing font-bold text-lg ${
              entry.position === 1 ? 'text-wec-gold' : 
              entry.position === 2 ? 'text-wec-silver' : 
              entry.position === 3 ? 'text-wec-bronze' : 'text-foreground'
            }`}>
              {entry.position}
            </span>
            
            <span className="font-racing text-primary hidden md:block">{entry.carNumber}</span>
            
            <div className="min-w-0">
              <p className="font-medium text-foreground truncate">{entry.team}</p>
              <p className="text-xs text-muted-foreground md:hidden">
                {entry.carNumber} · {entry.driver}
              </p>
              <p className="text-xs text-muted-foreground hidden md:block">{entry.driver}</p>
            </div>
            
            <Badge variant="outline" className={`${getClassBadge(entry.class)} hidden md:inline-flex text-[10px] px-2`}>
              {entry.class}
            </Badge>
            
            <span className={`font-mono text-right ${entry.gap === 'LEADER' ? 'text-primary font-bold' : 'text-foreground'}`}>
              {entry.gap}
            </span>
            
            <span className="font-mono text-right text-muted-foreground hidden md:block">
              {entry.lastLap}
            </span>
            
            <span className="font-mono text-right text-primary hidden md:block">
              {entry.bestLap}
            </span>
            
            <div className="flex justify-center">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(entry.status)}`} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LiveTimingWidget;
