import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-8 text-center"
  >
    <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
      <Icon className="w-6 h-6 text-muted-foreground" />
    </div>
    <h3 className="font-racing font-bold text-foreground mb-2">{title}</h3>
    {description && (
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
    )}
    {action && (
      <button
        onClick={action.onClick}
        className="px-4 py-2 rounded-lg bg-primary/20 text-primary text-sm font-medium hover:bg-primary/30 transition-colors"
      >
        {action.label}
      </button>
    )}
  </motion.div>
);

export default EmptyState;
