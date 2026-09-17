import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { statusColorsConfig } from '@/constants/statusVisual';
import ApplicationActions from '@/features/applications/components/ApplicationsActions';
import type { Application } from '@/models/applications';

type ApplicationMobileCardProps = {
  application: Application;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ApplicationMobileCard({
  application,
  onEdit,
  onDelete,
}: ApplicationMobileCardProps) {
  const { t, i18n } = useTranslation();

  const hasActions = onEdit && onDelete;

  const formattedDate = new Date(application.appliedAt).toLocaleDateString(
    i18n.language === 'fr' ? 'fr-FR' : 'en-US',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  );

  return (
    <article className="border-b px-4 py-3 text-sm last:border-b-0">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-gray-900">{application.company}</p>

          <p className="mt-1 truncate text-gray-600">{application.jobTitle}</p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-[1.5px] text-xs ${
            statusColorsConfig[application.status].bgColor
          } ${statusColorsConfig[application.status].textColor}`}
        >
          {t(`ApplicationsTable.status.${application.status}`)}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-xs text-gray-500">
          {application.location}
          {' · '}
          {formattedDate}
          {' · '}
          {application.field}
        </p>

        <div className="flex shrink-0 items-center gap-3">
          {application.link && (
            <a
              href={application.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('ApplicationsTable.fields.link')}
              className="text-gray-500 transition-colors hover:text-blue-500"
            >
              <ExternalLink className="size-4" />
            </a>
          )}

          {hasActions && <ApplicationActions onEdit={onEdit} onDelete={onDelete} />}
        </div>
      </div>
    </article>
  );
}
