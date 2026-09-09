import ApplicationFilters from '@/features/applications/components/ApplicationsFilters';
import ApplicationHeader from '@/features/applications/components/ApplicationsHeader';

export default function Applications() {
  return (
    <main className="min-h-screen p-4 space-y-3">
      <ApplicationHeader />
      <ApplicationFilters />
    </main>
  );
}
