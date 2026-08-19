import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const BoneyardSkeleton = {
  Hero: ({ className }: { className?: string }) => (
    <div
      className={cn("w-full rounded-md bg-[#0a0a0a] overflow-hidden p-6 md:p-8 border border-border/10", className)}
      aria-busy="true"
      aria-label="Loading..."
    >
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-[#1a1a1a] animate-boneyard-pulse shrink-0" />
        <div className="flex-1 space-y-4 w-full mt-2">
          <div className="w-3/4 md:w-1/2 h-8 bg-[#1a1a1a] animate-boneyard-pulse rounded-md" />
          <div className="w-1/2 md:w-1/3 h-4 bg-[#1a1a1a] animate-boneyard-pulse rounded-md mt-4" />
          <div className="flex gap-4 mt-4">
            <div className="w-24 h-4 bg-[#1a1a1a] animate-boneyard-pulse rounded-md" />
            <div className="w-24 h-4 bg-[#1a1a1a] animate-boneyard-pulse rounded-md" />
          </div>
        </div>
      </div>
    </div>
  ),

  Card: ({ className }: { className?: string }) => (
    <div
      className={cn("bg-[#0a0a0a] rounded-md overflow-hidden p-4 md:p-5 flex flex-col gap-4 border border-border/10", className)}
      aria-busy="true"
      aria-label="Loading..."
    >
      <div className="flex gap-4 items-center">
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#1a1a1a] animate-boneyard-pulse shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="w-1/3 h-3 bg-[#1a1a1a] animate-boneyard-pulse rounded-md" />
          <div className="w-2/3 h-5 bg-[#1a1a1a] animate-boneyard-pulse rounded-md" />
        </div>
      </div>
      <div className="space-y-2 mt-2">
        <div className="w-full h-4 bg-[#1a1a1a] animate-boneyard-pulse rounded-md" />
        <div className="w-5/6 h-4 bg-[#1a1a1a] animate-boneyard-pulse rounded-md" />
      </div>
    </div>
  ),

  Table: ({ rows = 5, className }: { rows?: number; className?: string }) => (
    <div
      className={cn("w-full bg-[#0a0a0a] rounded-md p-4 md:p-6 space-y-3 border border-border/10", className)}
      aria-busy="true"
      aria-label="Loading..."
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 bg-[#1a1a1a] animate-boneyard-pulse rounded-full" />
        <div className="w-32 h-4 bg-[#1a1a1a] animate-boneyard-pulse rounded-md" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="w-full h-[60px] bg-[#1a1a1a] rounded-md flex items-center px-4 gap-4">
            <div className="w-4 h-4 rounded-md bg-[#2a2a2a] animate-boneyard-pulse" />
            <div className="w-8 h-6 rounded-md bg-[#2a2a2a] animate-boneyard-pulse" />
            <div className="flex-1 space-y-1">
              <div className="w-3/4 h-4 rounded-md bg-[#2a2a2a] animate-boneyard-pulse" />
              <div className="w-1/2 h-3 rounded-md bg-[#2a2a2a] animate-boneyard-pulse" />
            </div>
            <div className="w-12 h-5 rounded-md bg-[#2a2a2a] animate-boneyard-pulse" />
          </div>
        ))}
      </div>
    </div>
  ),

  List: ({ items = 3, className }: { items?: number; className?: string }) => (
    <div
      className={cn("w-full bg-[#0a0a0a] rounded-md p-6 border border-border/10", className)}
      aria-busy="true"
      aria-label="Loading..."
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 bg-[#1a1a1a] animate-boneyard-pulse rounded-md" />
        <div className="w-40 h-5 bg-[#1a1a1a] animate-boneyard-pulse rounded-md" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="w-full h-[120px] bg-[#1a1a1a] rounded-md p-4 flex flex-col justify-center">
            <div className="flex gap-3 mb-3">
              <div className="w-8 h-8 rounded-md bg-[#2a2a2a] animate-boneyard-pulse shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="w-3/4 h-4 bg-[#2a2a2a] animate-boneyard-pulse rounded-md" />
                <div className="w-1/2 h-3 bg-[#2a2a2a] animate-boneyard-pulse rounded-md" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-4 bg-[#2a2a2a] animate-boneyard-pulse rounded-md" />
              <div className="w-12 h-4 bg-[#2a2a2a] animate-boneyard-pulse rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};
