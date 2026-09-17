import { useTranslation } from 'react-i18next';

export default function DashboardHeader() {
  const { t } = useTranslation();

  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col text-gray-600">
        <h1 className="text-3xl font-semibold text-black sm:text-4xl">
          {t('dashboard.header.title')}
        </h1>
        <p>{t('dashboard.header.description')}</p>
      </div>
    </header>
  );
}
