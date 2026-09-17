import { ApplicationsMobileListSkeleton } from '@/features/applications/components/ApplicationsTableSkeleton';

export default function RecentApplicationsSkeleton() {
  return (
    <section className="flex-2 overflow-hidden rounded-lg border bg-white">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />

        <div className="flex shrink-0 items-center gap-3 md:gap-1">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200 sm:w-28" />
          <div className="size-4 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      <div className="md:hidden">
        <ApplicationsMobileListSkeleton />
      </div>

      <div className="hidden md:block">
        <div className="grid grid-cols-[18%_22%_13%_13%_14%_15%_7%] border-y bg-gray-50">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="px-4 py-3">
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="grid h-13 grid-cols-[18%_22%_13%_13%_14%_15%_5%] items-center border-b last:border-b-0"
          >
            <div className="px-4">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="px-4">
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="px-4">
              <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
            </div>

            <div className="px-4">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="px-4">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="px-4">
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="px-4">
              <div className="size-5 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
