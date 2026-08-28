import { motion } from 'framer-motion';

const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'linear',
  },
};

export const SkeletonBox = ({ className = '' }: { className?: string }) => (
  <motion.div
    className={`rounded-lg bg-muted/50 ${className}`}
    animate={{ opacity: [0.5, 0.8, 0.5] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
  />
);

export const CardSkeleton = () => (
  <div className="glass-card p-4 space-y-3">
    <SkeletonBox className="h-4 w-3/4" />
    <SkeletonBox className="h-3 w-1/2" />
    <SkeletonBox className="h-3 w-2/3" />
  </div>
);

export const RaceCardSkeleton = () => (
  <div className="glass-card p-4 flex items-center gap-4">
    <SkeletonBox className="w-11 h-11 rounded-xl shrink-0" />
    <div className="flex-1 space-y-2">
      <SkeletonBox className="h-4 w-3/4" />
      <SkeletonBox className="h-3 w-1/2" />
    </div>
    <SkeletonBox className="w-16 h-6 rounded-full shrink-0" />
  </div>
);

export const TeamCardSkeleton = () => (
  <div className="glass-card p-4 space-y-3">
    <div className="flex items-start justify-between">
      <SkeletonBox className="w-10 h-10 rounded-lg" />
      <SkeletonBox className="w-16 h-5 rounded-full" />
    </div>
    <SkeletonBox className="h-4 w-3/4" />
    <SkeletonBox className="h-3 w-1/2" />
    <SkeletonBox className="h-3 w-full" />
  </div>
);

const PageSkeleton = ({ type = 'cards', count = 6 }: { type?: 'cards' | 'races' | 'teams'; count?: number }) => {
  const Skeleton = type === 'races' ? RaceCardSkeleton : type === 'teams' ? TeamCardSkeleton : CardSkeleton;

  return (
    <div className={`grid gap-3 ${type === 'teams' ? 'md:grid-cols-2 lg:grid-cols-3' : ''}`}>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} />
      ))}
    </div>
  );
};

export default PageSkeleton;
