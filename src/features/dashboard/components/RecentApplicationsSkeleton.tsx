export default function RecentApplicationsSkeleton() {
  return (
    <section className="flex-2 space-y-3 rounded-lg border bg-white">
      <div className="flex justify-between px-4 pt-3">
        <div className="h-7 w-48 animate-pulse rounded bg-gray-200" />

        <div className="flex items-center gap-1">
          <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-4 animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      <div>
        <div className="grid grid-cols-[1.5fr_2fr_1fr_1fr_1.5fr_48px] border-y px-4 py-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-3 w-16 animate-pulse rounded bg-gray-200" />
          ))}
        </div>

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[1.5fr_2fr_1fr_1fr_1.5fr_48px] items-center px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

            <div className="mr-5 flex justify-center">
              <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
            </div>

            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />

            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

            <div className="flex h-8 w-8 items-center justify-center">
              <div className="h-5 w-5 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
