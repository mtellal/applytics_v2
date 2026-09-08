export default function ApplicationActivityChartSkeleton() {
  return (
    <section className=" flex-2 rounded-xl border bg-white p-3 animate-pulse">
      <div className="mb-6 flex items-start justify-between">
        <div className="space-y-2">
          <div className="h-5 w-40 rounded bg-gray-200" />
          <div className="h-4 w-56 rounded bg-gray-200" />
        </div>

        <div className="h-8 w-36 rounded-md bg-gray-200" />
      </div>

      <div className="flex h-64 items-end gap-3">
        <div className="h-20 flex-1 rounded-t bg-gray-200" />
        <div className="h-32 flex-1 rounded-t bg-gray-200" />
        <div className="h-24 flex-1 rounded-t bg-gray-200" />
        <div className="h-44 flex-1 rounded-t bg-gray-200" />
        <div className="h-28 flex-1 rounded-t bg-gray-200" />
        <div className="h-36 flex-1 rounded-t bg-gray-200" />
        <div className="h-24 flex-1 rounded-t bg-gray-200" />
      </div>
    </section>
  );
}
