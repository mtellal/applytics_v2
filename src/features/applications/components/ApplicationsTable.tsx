import type { Application } from '@/models/applications';
import { ExternalLink } from 'lucide-react';
import ApplicationsPagination from './ApplicationsPagination';
import {
  ApplicationsMobileListSkeleton,
  ApplicationsTableBodySkeleton,
} from './ApplicationsTableSkeleton';
import { APPLICATIONS_PAGE_SIZE } from '../constants';

import ApplicationActions from './ApplicationsActions';
import { statusColorsConfig } from '@/constants/statusVisual';
import { useTranslation } from 'react-i18next';
import ApplicationMobileList from '@/components/common/ApplicationMobileList';

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

  const { t, i18n } = useTranslation();

  return (
    <section className="prounded-lg border bg-white">
      <div className="hidden md:block">
        <table className="w-full table-fixed text-left">
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

          {tableLoading ? (
            <ApplicationsTableBodySkeleton />
          ) : (
            <tbody>
              {applications.map((item) => (
                <tr
                  key={item.id}
                  className="h-13 border-b text-sm text-gray-800 transition-colors last:border-b-0 hover:bg-gray-50 [&>td]:px-4"
                >
                  <td>
                    <p className="truncate">{item.company}</p>
                  </td>

                  <td>
                    <p className="truncate">{item.jobTitle}</p>
                  </td>

                  <td>
                    <span className="mr-5 flex rounded-full">
                      <p
                        className={`inline truncate rounded-full px-3 py-[1.5px] ${
                          statusColorsConfig[item.status].bgColor
                        } ${statusColorsConfig[item.status].textColor}`}
                      >
                        {t(`ApplicationsTable.status.${item.status}`)}
                      </p>
                    </span>
                  </td>

                  <td>
                    <p className="truncate">
                      {new Date(item.appliedAt).toLocaleDateString(
                        i18n.language === 'fr' ? 'fr-FR' : 'en-US',
                        {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        },
                      )}
                    </p>
                  </td>

                  <td>
                    <p className="truncate">{item.location}</p>
                  </td>

                  <td>
                    <p className="truncate">{item.field}</p>
                  </td>

                  <td>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-5 text-gray-500" />
                      </a>
                    )}
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
                <tr key={`empty-${i}`} className="h-13 last:border-b-0" aria-hidden="true">
                  <td colSpan={8} className="p-0" />
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      <div className="md:hidden">
        {tableLoading ? (
          <ApplicationsMobileListSkeleton />
        ) : (
          <ApplicationMobileList
            applications={applications}
            openEditDialog={openEditDialog}
            onDelete={onDelete}
          />
        )}
      </div>

      <ApplicationsPagination
        page={page}
        total={total}
        onPageChange={onPageChange}
        tableLoading={tableLoading}
      />
    </section>
  );
}
