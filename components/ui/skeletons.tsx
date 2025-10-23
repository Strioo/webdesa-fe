/**
 * Skeleton Components
 * 
 * Reusable skeleton loading components with shimmer effect.
 * Used as fallbacks during Suspense loading states.
 */

export function HeroSkeleton() {
  return (
    <div className="relative w-full h-screen flex items-center overflow-hidden -mt-[88px] pt-[88px] bg-gray-200 dark:bg-gray-800 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
      </div>
      
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-3xl mx-auto lg:mx-0 space-y-6">
          {/* Badge skeleton */}
          <div className="h-10 w-48 bg-white/20 rounded-full" />
          
          {/* Title skeleton */}
          <div className="space-y-3">
            <div className="h-12 sm:h-16 md:h-20 bg-white/30 rounded-lg w-full max-w-2xl" />
            <div className="h-12 sm:h-16 md:h-20 bg-white/30 rounded-lg w-3/4" />
          </div>
          
          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-6 bg-white/20 rounded w-full max-w-xl" />
            <div className="h-6 bg-white/20 rounded w-5/6 max-w-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-200 dark:bg-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer" />
      </div>
      
      {/* Content skeleton */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Title */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        
        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
        </div>
        
        {/* Footer */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
      </div>
    </div>
  )
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  )
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
          style={{
            width: index === lines - 1 ? '75%' : '100%',
          }}
        />
      ))}
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full animate-pulse">
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-t-lg border border-gray-200 dark:border-gray-700">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
        >
          {Array.from({ length: 4 }).map((_, colIndex) => (
            <div key={colIndex} className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function SectionSkeleton() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 animate-pulse">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto mb-4" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-96 mx-auto" />
        </div>
        
        {/* Content grid */}
        <CardGridSkeleton count={6} />
      </div>
    </section>
  )
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen">
      <HeroSkeleton />
      <SectionSkeleton />
    </div>
  )
}
