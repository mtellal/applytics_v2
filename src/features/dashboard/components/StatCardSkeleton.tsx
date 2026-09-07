export default function StatCardSkeleton() {
  return (
    <div className="bg-white flex gap-6 p-5 w-fit items-start border border-gray-200 rounded-xl">
      <div className=" h-12 w-12 animate-pulse rounded-lg bg-gray-200 " />

      <div className="flex flex-col">
        <div className="space-y-1">
          <div className="h-7 w-12 animate-pulse bg-gray-200" />
          <div className="h-4 w-20 animate-pulse bg-gray-200" />
        </div>

        <div className="pt-3 space-y-1">
          <div className="h-4 w-16 animate-pulse bg-gray-200"></div>
          <div className="h-4 w-20 animate-pulse bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
