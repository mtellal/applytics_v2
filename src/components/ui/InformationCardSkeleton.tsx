export default function InformationCardSkeleton() {
  return (
    <section className="flex bg-gray-200 animate-pulse min-w-45 items-center gap-4 px-5 py-3 bg-white border rounded-lg">
      <div className="h-10 w-10 bg-gray-200 rounded"></div>
      <div className="flex flex-col space-y-2">
        <div className="h-7 w-9 rounded bg-gray-200"></div>
        <div className="h-4 w-20 rounded bg-gray-200"></div>
      </div>
    </section>
  );
}
