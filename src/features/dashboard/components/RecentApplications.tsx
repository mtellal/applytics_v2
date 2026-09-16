import { ArrowRight, Ellipsis, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Application } from '@/models/applications';
import { applicationStatusConfig, statusColorsConfig } from '@/constants/statusVisual';
import { useTranslation } from 'react-i18next';

type RecentApplciationsProps = {
  data: Application[];
};

export default function RecentApplications({ data }: RecentApplciationsProps) {
  const { t } = useTranslation();

  return (
    <section className="flex-2 space-y-3 items-center rounded-lg border bg-white">
      <div className="px-4 pt-3 flex justify-between">
        <h2 className="text-xl font-semibold">{t('RecentApplications.title')}</h2>
        <div className=" items-center flex text-sm gap-1 text-blue-500 cursor-pointer hover:text-blue-400">
          <Link to="/applications">{t('RecentApplications.seeAll')}</Link>
          <ArrowRight className="w-4" />
        </div>
      </div>

      <div>
        <div className="grid grid-cols-[1.5fr_2fr_1fr_1fr_1.5fr_50px] border-y px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
          <p>{t('RecentApplications.fields.company')}</p>
          <p>{t('RecentApplications.fields.job')}</p>
          <p>{t('RecentApplications.fields.status')}</p>
          <p>{t('RecentApplications.fields.date')}</p>
          <p>{t('RecentApplications.fields.location')}</p>
          <p>{t('RecentApplications.fields.link')}</p>
        </div>
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1.5fr_2fr_1fr_1fr_1.5fr_50px] px-4 py-2 text-sm items-center text-gray-800 hover:bg-gray-50"
            >
              <p className="truncate ">{item.company}</p>
              <p className="truncate ">{item.jobTitle}</p>
              <span className={`flex items-center mr-5 rounded-full truncate`}>
                <p
                  className={`px-3 py-[2px] rounded-full ${applicationStatusConfig[item.status]} ${statusColorsConfig[item.status].textColor} ${statusColorsConfig[item.status].bgColor}`}
                >
                  {t(`applicationsCards.${item.status}.label`)}
                </p>
              </span>
              <p>
                {new Date(item.appliedAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <p className="truncate text-gray-600">{item.location}</p>
              <a href="">
                <ExternalLink className="w-5 h-5 text-gray-500" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
