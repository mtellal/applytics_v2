export default function ApplicationStatusChartSkeleton() {
  return (
    <section className="flex-2 space-y-3 rounded-lg border bg-white p-3">
      <div className="mt-1 h-5 w-40 animate-pulse rounded bg-gray-200" />

      <div className="flex h-full flex-1 items-center">
        <div className="flex flex-1 items-center justify-center">
          <div className="relative h-44 w-44 animate-pulse rounded-full bg-gray-200">
            <div className="absolute inset-8 rounded-full bg-white" />
          </div>
        </div>

        <ul className="flex h-full flex-1 flex-col justify-center gap-2 pl-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 flex-1 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
