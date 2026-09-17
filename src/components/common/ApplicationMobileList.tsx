import type { Application } from '@/models/applications';
import ApplicationMobileCard from './ApplicationMobileCard';

type ApplicationMobileListProps = {
  applications: Application[];
  openEditDialog?: (application: Application) => void;
  onDelete?: (id: string) => void;
};

export default function ApplicationMobileList({
  applications,
  openEditDialog,
  onDelete,
}: ApplicationMobileListProps) {
  return (
    <div>
      {applications.map((application) => (
        <ApplicationMobileCard
          key={application.id}
          application={application}
          onEdit={openEditDialog ? () => openEditDialog(application) : undefined}
          onDelete={onDelete ? () => onDelete(application.id) : undefined}
        />
      ))}
    </div>
  );
}
