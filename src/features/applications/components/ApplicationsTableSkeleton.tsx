import { useTranslation } from 'react-i18next';
import { APPLICATIONS_PAGE_SIZE } from '../constants';

export function ApplicationsMobileListSkeleton() {
  return (
    <div>
      {Array.from({ length: APPLICATIONS_PAGE_SIZE }).map((_, i) => (
        <article key={i} className="border-b px-4 py-3 last:border-b-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />

              <div className="mt-2 h-3.5 w-40 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200" />
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div className="h-3 w-48 max-w-[70%] animate-pulse rounded bg-gray-200" />

            <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
          </div>
        </article>
      ))}
    </div>
  );
}

export function ApplicationsTableBodySkeleton() {
  return (
    <tbody>
      {Array.from({ length: APPLICATIONS_PAGE_SIZE }).map((_, index) => (
        <tr key={index} className="h-13 border-b last:border-b-0 [&>td]:px-4">
          <td>
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </td>
          <td>
            <div className="h-4 w-36 animate-pulse rounded bg-gray-200" />
          </td>
          <td>
            <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
          </td>
          <td>
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </td>
          <td>
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
          </td>
          <td>
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
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
  const { t } = useTranslation();

  return (
    <section className="overflow-hidden rounded-lg border bg-white">
      <table className="hidden w-full table-fixed text-left md:table">
        <thead className="border-b bg-gray-50 text-gray-600">
          <tr className="[&>th]:px-4 [&>th]:py-3">
            <th className="w-[18%]">{t('ApplicationsTable.fields.company')}</th>

            <th className="w-[22%]">{t('ApplicationsTable.fields.job')}</th>

            <th className="w-[12%]">{t('ApplicationsTable.fields.status')}</th>

            <th className="w-[12%]">{t('ApplicationsTable.fields.date')}</th>

            <th className="w-[12%]">{t('ApplicationsTable.fields.location')}</th>

            <th className="w-[12%]">{t('ApplicationsTable.fields.field')}</th>

            <th className="w-[5%]">{t('ApplicationsTable.fields.link')}</th>

            <th className="w-[7%]">{t('ApplicationsTable.fields.actions')}</th>
          </tr>
        </thead>
        <ApplicationsTableBodySkeleton />
      </table>

      <div className="md:hidden">
        <ApplicationsMobileListSkeleton />
      </div>

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
