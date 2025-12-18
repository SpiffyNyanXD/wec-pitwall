import { LucideIcon, AlertCircle, Clock, Database } from 'lucide-react';

type EmptyStateVariant = 'no-data' | 'coming-soon' | 'error' | 'custom';

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}

const variantConfig: Record<EmptyStateVariant, { icon: LucideIcon; title: string; description: string }> = {
  'no-data': {
    icon: Database,
    title: 'No Data Available',
    description: 'There is no data to display at this time.',
  },
  'coming-soon': {
    icon: Clock,
    title: 'Coming Soon',
    description: 'This content will be available soon.',
  },
  'error': {
    icon: AlertCircle,
    title: 'Something Went Wrong',
    description: 'Unable to load this content. Please try again.',
  },
  'custom': {
    icon: AlertCircle,
    title: '',
    description: '',
  },
};

const EmptyState = ({ 
  variant = 'no-data', 
  title, 
  description, 
  icon,
  className = '' 
}: EmptyStateProps) => {
  const config = variantConfig[variant];
  const Icon = icon || config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      {displayTitle && (
        <h3 className="font-racing text-lg font-semibold text-foreground mb-2">{displayTitle}</h3>
      )}
      {displayDescription && (
        <p className="text-sm text-muted-foreground max-w-sm">{displayDescription}</p>
      )}
    </div>
  );
};

export default EmptyState;
