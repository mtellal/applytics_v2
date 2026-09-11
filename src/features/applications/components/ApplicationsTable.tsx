import type { Application } from '@/models/applications';
import { ExternalLink } from 'lucide-react';
import ApplicationsPagination from './ApplicationsPagination';
import { ApplicationsTableBodySkeleton } from './ApplicationsTableSkeleton';
import { APPLICATIONS_PAGE_SIZE } from '../constants';

import ApplicationActions from './ApplicationsActions';
import { cardVisualConfig } from '@/constants/cardVisual';

export type ApplicationtableProps = {
  applications: Application[];
  page: number;
  total: number;
  onPageChange: (page: number) => void;
  tableLoading: boolean;
  openEditDialog: (a: Application) => void;
  onDelete: (id: string) => void;
};

export default function ApplicationsTable({
  applications,
  page,
  total,
  onPageChange,
  tableLoading,
  openEditDialog,
  onDelete,
}: ApplicationtableProps) {
  const emptyRows = APPLICATIONS_PAGE_SIZE - applications.length;

  return (
    <section className=" border bg-white rounded-lg">
      <table className="w-full text-left">
        <thead className="text-gray-600 border-b bg-gray-50">
          <tr className="[&>th]:px-4 [&>th]:py-3">
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
            <th>Date</th>
            <th>Location</th>
            <th>Field</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>

        {tableLoading ? (
          <ApplicationsTableBodySkeleton />
        ) : (
          <tbody className="h">
            {applications.map((item) => (
              <tr
                key={item.id}
                className="h-14 border-b text-sm text-gray-800 transition-colors last:border-b-0 hover:bg-gray-50 [&>td]:px-4 [&>td]:py-3"
              >
                <td>
                  <div className="flex items-center gap-2">
                    <img className="w-8 h-8 rounded-full " src={item.companyLogo} />

                    <p>{item.company}</p>
                  </div>
                </td>

                <td>
                  <p>{item.jobTitle}</p>
                </td>

                <td>
                  <span className={`flex items-center justify-center mr-5 rounded-full`}>
                    <p
                      className={`px-3 py-[2px] rounded-full  ${cardVisualConfig[item.status].iconColor} ${cardVisualConfig[item.status].iconBackground}`}
                    >
                      {item.status}
                    </p>
                  </span>
                </td>

                <td>
                  {new Date(item.appliedAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>

                <td className="truncate">{item.location}</td>
                <td>{item.field}</td>

                <td>
                  <a href={item.link}>
                    <ExternalLink className="size-5 text-gray-500" />
                  </a>
                </td>

                <td>
                  <ApplicationActions
                    onEdit={() => openEditDialog(item)}
                    onDelete={() => onDelete(item.id)}
                  />
                </td>
              </tr>
            ))}
            {Array.from({ length: emptyRows }).map((_, i) => (
              <tr key={`empty-${i}`} className="h-14 last:border-b-0" aria-hidden="true">
                <td colSpan={7} className="p-0" />
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <ApplicationsPagination
        page={page}
        total={total}
        onPageChange={onPageChange}
        tableLoading={tableLoading}
      />
    </section>
  );
}
