import { ChevronLeft, ChevronRight } from 'lucide-react';

import { APPLICATIONS_PAGE_SIZE } from '@/features/applications/constants';

type ApplicationsPaginationProps = {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
  tableLoading: boolean;
};

function getVisiblePages(page: number, totalPages: number) {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (page === 1) {
    return [1, 2, 3];
  }

  if (page === totalPages) {
    return [totalPages - 2, totalPages - 1, totalPages];
  }

  return [page - 1, page, page + 1];
}

export default function ApplicationsPagination({
  page,
  total,
  onPageChange,
  tableLoading,
}: ApplicationsPaginationProps) {
  const totalPages = Math.ceil(total / APPLICATIONS_PAGE_SIZE);

  const start = (page - 1) * APPLICATIONS_PAGE_SIZE + 1;
  const end = Math.min(page * APPLICATIONS_PAGE_SIZE, total);

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="flex flex-col items-center justify-between space-y-3 border-t px-4 py-3 md:flex-row md:space-y-0">
      <p className="text-sm text-gray-500">
        Showing {start} to {end} of <span className="text-gray-900">{total} applications</span>
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

        {visiblePages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => page !== pageNumber && onPageChange(pageNumber)}
            className={`flex size-9 items-center justify-center rounded-md text-sm transition-colors ${
              page === pageNumber
                ? 'bg-blue-400 text-white'
                : 'border text-gray-600 hover:bg-gray-50'
            }`}
          >
            {pageNumber}
          </button>
        ))}

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
