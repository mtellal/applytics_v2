import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Application } from '@/models/applications';
import { statusColorsConfig } from '@/constants/statusVisual';
import { useTranslation } from 'react-i18next';
import ApplicationMobileList from '@/components/common/ApplicationMobileList';

type RecentApplicationsProps = {
  applications: Application[];
};

export default function RecentApplications({ applications }: RecentApplicationsProps) {
  const { t, i18n } = useTranslation();

  return (
    <section className="flex-2 rounded-lg border bg-white h-fit">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <h2 className="min-w-0 flex-1 text-xl font-semibold">{t('RecentApplications.title')}</h2>

        <Link
          to="/applications"
          className="flex shrink-0 items-center gap-3 text-right text-sm text-blue-500 transition-colors hover:text-blue-400 md:gap-1"
        >
          <span className="sm:hidden">{t('RecentApplications.seeAll').split(' ')[0]}</span>
          <span className="hidden sm:inline">{t('RecentApplications.seeAll')}</span>
          <ArrowRight className="size-4 shrink-0" />
        </Link>
      </div>

      <div className="hidden grid-cols-[18%_22%_13%_13%_14%_15%_5%] border-y bg-gray-50 text-gray-600 md:grid">
        <p className="px-4 py-3">{t('RecentApplications.fields.company')}</p>

        <p className="px-4 py-3">{t('RecentApplications.fields.job')}</p>

        <p className="px-4 py-3">{t('RecentApplications.fields.status')}</p>

        <p className="px-4 py-3">{t('RecentApplications.fields.date')}</p>

        <p className="px-4 py-3">{t('RecentApplications.fields.location')}</p>

        <p className="px-4 py-3">{t('RecentApplications.fields.field')}</p>

        <p className="px-4 py-3">{t('RecentApplications.fields.link')}</p>
      </div>

      <div className="md:hidden">
        <ApplicationMobileList applications={applications} />
      </div>

      <div className="hidden md:block">
        {applications.map((item) => (
          <div
            key={item.id}
            className="grid h-13 grid-cols-[18%_22%_13%_13%_14%_15%_5%] items-center border-b text-sm text-gray-800 transition-colors last:border-b-0 hover:bg-gray-50"
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

            <div className="min-w-0 px-4">
              <p className="truncate text-gray-600">{item.field}</p>
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
