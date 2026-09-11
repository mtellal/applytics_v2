export function ApplicationsTableBodySkeleton() {
  return (
    <tbody>
      {Array.from({ length: 10 }).map((_, index) => (
        <tr key={index} className="border-b last:border-b-0 [&>td]:px-4 [&>td]:py-3">
          <td>
            <div className="flex items-center gap-2">
              <div className="size-8 shrink-0 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          </td>
          <td>
            <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
          </td>
          <td>
            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
          </td>
          <td>
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </td>
          <td>
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
          </td>
          <td>
            <div className="size-5 animate-pulse rounded bg-gray-200" />
          </td>
          <td>
            <div className="size-8 animate-pulse rounded-md bg-gray-200" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default function ApplicationsTableSkeleton() {
  return (
    <section className="overflow-hidden rounded-lg border bg-white">
      <table className="w-full text-left">
        <thead className="text-gray-600 border-b bg-gray-50">
          <tr className="[&>th]:px-4 [&>th]:py-3">
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
            <th>Date</th>
            <th>Location</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index} className="border-b last:border-b-0 [&>td]:px-4 [&>td]:py-3">
              <td>
                <div className="flex items-center gap-2">
                  <div className="size-8 shrink-0 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                </div>
              </td>
              <td>
                <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
              </td>
              <td>
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
              </td>
              <td>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              </td>
              <td>
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
              </td>
              <td>
                <div className="size-5 animate-pulse rounded bg-gray-200" />
              </td>
              <td>
                <div className="size-8 animate-pulse rounded-md bg-gray-200" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-t px-4 py-3">
        <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />

        <div className="flex items-center gap-2">
          <div className="size-8 animate-pulse rounded-md bg-gray-200" />
          <div className="size-8 animate-pulse rounded-md bg-gray-200" />
          <div className="size-8 animate-pulse rounded-md bg-gray-200" />
        </div>
      </div>
    </section>
  );
}
