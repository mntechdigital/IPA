import React from 'react';

interface SkeletonProps {
  className?: string;
}

/**
 * Primitive Skeleton block with subtle pulsing and linear shimmer wave.
 */
export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden bg-[#E7EEE9] rounded-xl ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer pointer-events-none" />
    </div>
  );
};

/**
 * Full card skeleton mirroring the layout of WorkCard.tsx
 */
export const WorkCardSkeleton: React.FC<{ index?: number }> = ({ index = 0 }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] overflow-hidden shadow-sm">
      <div className={`grid grid-cols-1 lg:grid-cols-12 ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        {/* Visual Column Skeleton */}
        <div
          className={`lg:col-span-5 relative overflow-hidden bg-[#F0F5F2] ${
            isEven ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <div className="relative h-72 sm:h-88 lg:h-full min-h-[320px] p-6 flex flex-col justify-between">
            <Skeleton className="w-full h-full absolute inset-0 rounded-none bg-[#E4ECE6]" />
            <div className="relative z-10 flex justify-between items-start">
              <Skeleton className="w-20 h-6 rounded-full" />
              <Skeleton className="w-28 h-6 rounded-full" />
            </div>
            <div className="relative z-10 self-end">
              <Skeleton className="w-24 h-6 rounded-full" />
            </div>
          </div>
        </div>

        {/* Content Column Skeleton */}
        <div
          className={`lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 ${
            isEven ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <div>
            {/* Top Tag Row */}
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="w-28 h-5 rounded-full" />
              <Skeleton className="w-16 h-4 rounded-md" />
            </div>

            {/* Title & Tagline */}
            <Skeleton className="w-4/5 h-8 sm:h-10 rounded-xl mb-3" />
            <Skeleton className="w-3/5 h-5 rounded-lg mb-5" />

            {/* Description lines */}
            <div className="space-y-2 mb-6">
              <Skeleton className="w-full h-3.5 rounded" />
              <Skeleton className="w-11/12 h-3.5 rounded" />
              <Skeleton className="w-4/5 h-3.5 rounded" />
            </div>

            {/* Methodologies */}
            <div className="pt-5 border-t border-[#E2EAE4] space-y-3 mb-6">
              <Skeleton className="w-36 h-3 rounded" />
              <div className="flex flex-wrap gap-2">
                <Skeleton className="w-28 h-7 rounded-xl" />
                <Skeleton className="w-32 h-7 rounded-xl" />
                <Skeleton className="w-24 h-7 rounded-xl" />
                <Skeleton className="w-30 h-7 rounded-xl" />
              </div>
            </div>

            {/* Sample Inquiries */}
            <div className="pt-5 border-t border-[#E2EAE4] space-y-2.5">
              <Skeleton className="w-44 h-3 rounded mb-2" />
              <Skeleton className="w-full h-3 rounded" />
              <Skeleton className="w-5/6 h-3 rounded" />
            </div>
          </div>

          {/* Card Footer */}
          <div className="pt-6 border-t border-[#E2EAE4] flex items-center justify-between">
            <Skeleton className="w-36 h-4 rounded" />
            <Skeleton className="w-40 h-8 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Team Card Skeleton mirroring TeamCard.tsx
 */
export const TeamCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] flex flex-col justify-between overflow-hidden shadow-sm">
      <div>
        {/* Photo Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-[#F0F5F2] border-b border-[#E2EAE4]">
          <Skeleton className="w-full h-full rounded-none bg-[#E2EAE4]" />
          <div className="absolute top-3 right-3">
            <Skeleton className="w-24 h-5 rounded-full" />
          </div>
        </div>

        {/* Member Details */}
        <div className="p-6 sm:p-7 space-y-4">
          <Skeleton className="w-28 h-5 rounded-full" />
          <Skeleton className="w-3/4 h-7 rounded-xl" />

          {/* Bio text lines */}
          <div className="space-y-2">
            <Skeleton className="w-full h-3.5 rounded" />
            <Skeleton className="w-11/12 h-3.5 rounded" />
            <Skeleton className="w-4/5 h-3.5 rounded" />
          </div>

          {/* Research tags */}
          <div className="pt-4 border-t border-[#E2EAE4] space-y-2">
            <Skeleton className="w-32 h-3 rounded" />
            <div className="flex flex-wrap gap-1.5">
              <Skeleton className="w-20 h-6 rounded-lg" />
              <Skeleton className="w-24 h-6 rounded-lg" />
              <Skeleton className="w-28 h-6 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-6 sm:p-7 pt-0">
        <div className="pt-4 border-t border-[#E2EAE4] flex items-center justify-between">
          <Skeleton className="w-24 h-4 rounded" />
          <Skeleton className="w-4 h-4 rounded-full" />
        </div>
      </div>
    </div>
  );
};

/**
 * Pillar Card Skeleton for Work modalities
 */
export const PillarCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-3xl border border-[#E2EAE4] bg-[#FFFFFF] p-7 sm:p-8 flex flex-col justify-between shadow-sm space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="w-20 h-5 rounded-full" />
          <Skeleton className="w-16 h-4 rounded" />
        </div>
        <Skeleton className="w-4/5 h-7 rounded-xl mb-2" />
        <Skeleton className="w-32 h-4 rounded mb-4" />
        <div className="space-y-2 mb-6">
          <Skeleton className="w-full h-3.5 rounded" />
          <Skeleton className="w-5/6 h-3.5 rounded" />
        </div>
      </div>
      <div className="pt-4 border-t border-[#E2EAE4] space-y-2">
        <Skeleton className="w-24 h-3 rounded" />
        <Skeleton className="w-3/4 h-3.5 rounded" />
        <Skeleton className="w-2/3 h-3.5 rounded" />
      </div>
    </div>
  );
};
