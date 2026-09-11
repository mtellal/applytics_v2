import ActionButton from '@/components/ui/ActionButton';
import { Plus, Upload } from 'lucide-react';

export type ApplicationHeaderProps = {
  openCreateDialog: () => void;
};

export default function ApplicationHeader({ openCreateDialog }: ApplicationHeaderProps) {
  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col text-gray-600">
        <h1 className="font-semibold text-4xl text-black">Applications</h1>
        <p>Manage and follow all your applications.</p>
      </div>

      <div className="flex gap-3">
        <ActionButton variant="secondary" icon={Upload}>
          Import CSV
        </ActionButton>

        <ActionButton variant="primary" icon={Plus} onClick={openCreateDialog}>
          New application
        </ActionButton>
      </div>
    </header>
  );
}
