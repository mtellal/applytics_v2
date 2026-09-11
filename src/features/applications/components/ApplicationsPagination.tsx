import { ChevronLeft, ChevronRight } from 'lucide-react';

import { APPLICATIONS_PAGE_SIZE } from '@/features/applications/constants';

type ApplicationsPaginationProps = {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
  tableLoading: boolean;
};

export default function ApplicationsPagination({
  page,
  total,
  onPageChange,
  tableLoading,
}: ApplicationsPaginationProps) {
  const totalPages = Math.ceil(total / APPLICATIONS_PAGE_SIZE);

  const start = (page - 1) * APPLICATIONS_PAGE_SIZE + 1;
  const end = Math.min(page * APPLICATIONS_PAGE_SIZE, total);

  return (
    <div className="flex items-center justify-between border-t px-4 py-3">
      <p className="text-sm text-gray-500">
        Showing {start} to {end} of {total} applications
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={tableLoading || page === 1 || !totalPages}
          onClick={() => onPageChange(page - 1)}
          className="flex size-9 items-center justify-center rounded-md border text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="size-4" />
        </button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              disabled={tableLoading}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={`flex size-9 items-center justify-center rounded-md text-sm transition-colors ${
                page === pageNumber
                  ? 'bg-blue-400 text-white'
                  : 'border text-gray-600 hover:bg-gray-50'
              }  hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          type="button"
          disabled={tableLoading || page === totalPages || !totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex size-9 items-center justify-center rounded-md border text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
