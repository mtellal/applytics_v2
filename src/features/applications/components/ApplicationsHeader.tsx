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
    <header className="flex justify-between items-center">
      <div className="flex flex-col text-gray-600">
        <h1 className="font-semibold text-4xl text-black">{t('Applications.title')}</h1>
        <p>{t('Applications.description')}</p>
      </div>

      <div className="flex gap-3">
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
