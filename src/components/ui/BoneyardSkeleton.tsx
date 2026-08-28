import React from 'react';

function BoneyardSkeletonRoot({ children }: { children?: React.ReactNode }) {
  return <div role="status" aria-busy="true" className="bg-[#0d0d0d]">{children}</div>;
}

BoneyardSkeletonRoot.Hero = function BoneyardSkeletonHero() {
  return (
    <div role="status" aria-busy="true" aria-label="Loading profile content" className="min-h-screen bg-[#0d0d0d]">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 py-8 mt-16 relative z-10">
        <div className="motion-safe:animate-boneyard-pulse flex flex-col gap-8">
          <div className="h-6 w-32 bg-muted rounded"></div>
          <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-muted/50 shrink-0"></div>
            <div className="flex-1 space-y-4">
              <div className="h-10 w-3/4 bg-muted rounded"></div>
              <div className="h-6 w-1/2 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BoneyardSkeletonRoot.Card = function BoneyardSkeletonCard() {
  return (
    <div role="status" aria-busy="true" aria-label="Loading card content" className="glass-card p-6 bg-[#0d0d0d] motion-safe:animate-boneyard-pulse">
      <div className="h-6 w-1/3 bg-muted rounded mb-4"></div>
      <div className="h-20 bg-muted/50 rounded"></div>
    </div>
  );
};

BoneyardSkeletonRoot.Grid = function BoneyardSkeletonGrid() {
  return (
    <div role="status" aria-busy="true" aria-label="Loading grid items" className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0d0d0d] p-4 rounded-xl motion-safe:animate-boneyard-pulse">
      <div className="h-12 bg-muted rounded"></div>
      <div className="h-12 bg-muted rounded"></div>
    </div>
  );
};

BoneyardSkeletonRoot.List = function BoneyardSkeletonList() {
  return (
    <div role="status" aria-busy="true" aria-label="Loading list items" className="space-y-3 bg-[#0d0d0d] p-4 rounded-xl motion-safe:animate-boneyard-pulse">
      <div className="h-8 bg-muted rounded"></div>
      <div className="h-8 bg-muted rounded"></div>
    </div>
  );
};

export const BoneyardSkeleton = BoneyardSkeletonRoot;
export default BoneyardSkeleton;
