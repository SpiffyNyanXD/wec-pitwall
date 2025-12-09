import { motion } from 'framer-motion';
import { Gauge, Flag, Users, Clock } from 'lucide-react';

const stats = [
  { label: 'Races', value: '7', icon: Flag, color: 'text-primary' },
  { label: 'Teams', value: '16', icon: Users, color: 'text-wec-gold' },
  { label: 'Avg Speed', value: '245', unit: 'km/h', icon: Gauge, color: 'text-secondary' },
  { label: 'Season Hours', value: '62', icon: Clock, color: 'text-green-400' },
];

const QuickStatsWidget = () => {
  return (
    <motion.div 
      className="glass-card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h3 className="font-racing text-lg font-bold mb-4">Season Stats</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-muted/30 rounded-lg p-3 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
            <div className="font-racing text-2xl font-bold text-foreground">
              {stat.value}
              {stat.unit && <span className="text-xs text-muted-foreground ml-0.5">{stat.unit}</span>}
            </div>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickStatsWidget;
