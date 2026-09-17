import ActionButton from '@/components/ui/ActionButton';
import { Plus, Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export type ApplicationHeaderProps = {
  openCreateDialog: () => void;
  openDialogImport: (e: boolean) => void;
};

export default function ApplicationHeader({
  openCreateDialog,
  openDialogImport,
}: ApplicationHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-col text-gray-600">
        <h1 className="text-3xl font-semibold text-black sm:text-4xl">{t('Applications.title')}</h1>

        <p>{t('Applications.description')}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:flex lg:gap-3">
        <ActionButton variant="secondary" icon={Upload} onClick={() => openDialogImport(true)}>
          {t('Applications.header.import')}
        </ActionButton>

        <ActionButton variant="primary" icon={Plus} onClick={openCreateDialog}>
          {t('Applications.header.new')}
        </ActionButton>
      </div>
    </header>
  );
}
