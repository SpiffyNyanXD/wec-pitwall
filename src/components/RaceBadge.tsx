import { RaceBadgeStatus } from '@/utils/raceStatus';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RaceBadgeProps {
  status: RaceBadgeStatus;
  className?: string;
}

export function RaceBadge({ status, className }: RaceBadgeProps) {
  const badgeStyles: Record<RaceBadgeStatus, string> = {
    done:      'bg-zinc-700 text-zinc-300',
    live:      'bg-red-600 text-white animate-pulse',
    next:      'bg-white text-black font-semibold',
    upcoming:  'bg-zinc-800 text-zinc-400',
    postponed: 'bg-amber-600 text-white',
  }

  const badgeLabels: Record<RaceBadgeStatus, string> = {
    done:      'Done',
    live:      'LIVE',
    next:      'Next',
    upcoming:  'Upcoming',
    postponed: 'Postponed',
  }

  return (
    <Badge className={cn("px-2 py-0.5 text-xs rounded border-0 uppercase tracking-wider", badgeStyles[status], className)}>
      {status === 'live' ? (
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          {badgeLabels[status]}
        </span>
      ) : (
        badgeLabels[status]
      )}
    </Badge>
  );
}
