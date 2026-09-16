import { useTranslation } from 'react-i18next';

export type DashboardHeaderProps = {
  name: string;
};

export default function DashboardHeader({ name = 'Jean' }: DashboardHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col text-gray-600">
        <p>{t('dashboard.header.welcome', { name: name })}</p>
        <h1 className="font-semibold text-4xl text-black">{t('dashboard.header.title')}</h1>
        <p>{t('dashboard.header.description')}</p>
      </div>
    </header>
  );
}
