import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Application } from '@/models/applications';
import { statusColorsConfig } from '@/constants/statusVisual';
import { useTranslation } from 'react-i18next';

type RecentApplicationsProps = {
  data: Application[];
};

export default function RecentApplications({ data }: RecentApplicationsProps) {
  const { t, i18n } = useTranslation();

  return (
    <section className="flex-2 overflow-hidden rounded-lg border bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-xl font-semibold">{t('RecentApplications.title')}</h2>

        <Link
          to="/applications"
          className="flex items-center gap-1 text-sm text-blue-500 transition-colors hover:text-blue-400"
        >
          {t('RecentApplications.seeAll')}
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid grid-cols-[20%_26%_15%_15%_19%_5%] border-y bg-gray-50 text-gray-600">
        <p className="px-4 py-3">{t('RecentApplications.fields.company')}</p>

        <p className="px-4 py-3">{t('RecentApplications.fields.job')}</p>

        <p className="px-4 py-3">{t('RecentApplications.fields.status')}</p>

        <p className="px-4 py-3">{t('RecentApplications.fields.date')}</p>

        <p className="px-4 py-3">{t('RecentApplications.fields.location')}</p>

        <p className="px-4 py-3">{t('RecentApplications.fields.link')}</p>
      </div>

      <div>
        {data.map((item) => (
          <div
            key={item.id}
            className="grid h-13 grid-cols-[20%_26%_15%_15%_19%_5%] items-center border-b text-sm text-gray-800 transition-colors last:border-b-0 hover:bg-gray-50"
          >
            <div className="min-w-0 px-4">
              <p className="truncate">{item.company}</p>
            </div>

            <div className="min-w-0 px-4">
              <p className="truncate">{item.jobTitle}</p>
            </div>

            <div className="min-w-0 px-4">
              <span
                className={`inline-block max-w-full truncate rounded-full px-3 py-[1.5px] ${
                  statusColorsConfig[item.status].bgColor
                } ${statusColorsConfig[item.status].textColor}`}
              >
                {t(`applicationsCards.${item.status}.label`)}
              </span>
            </div>

            <div className="min-w-0 px-4">
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
            </div>

            <div className="min-w-0 px-4">
              <p className="truncate text-gray-600">{item.location}</p>
            </div>

            <div className="px-4">
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="size-5 text-gray-500" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
