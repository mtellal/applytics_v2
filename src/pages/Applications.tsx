import InformationCard from '@/components/ui/InformationCard';
import InformationCardSkeleton from '@/components/ui/InformationCardSkeleton';

import ApplicationDialog from '@/features/applications/components/ApplicationDialog';
import ApplicationFilters from '@/features/applications/components/ApplicationsFilters';
import ApplicationHeader from '@/features/applications/components/ApplicationsHeader';
import ApplicationsTable from '@/features/applications/components/ApplicationsTable';
import ApplicationsTableSkeleton from '@/features/applications/components/ApplicationsTableSkeleton';
import { ImportCsvDialog } from '@/features/applications/components/ImportCsvDialog';

import { useApplications } from '@/features/applications/hooks/useApplications';

export default function Applications() {
  const {
    cards,
    applications,
    page,
    totalApplications,
    filters,

    loadingCards,
    appLoading,
    tableLoading,

    searchInput,
    setSearchInput,

    dialogOpen,
    setDialogOpen,
    importDialogOpen,
    setImportDialogOpen,
    currentApplication,

    onPageChange,
    onSearch,
    onSort,
    onFieldChange,
    onStatusChange,

    openCreateDialog,
    openEditDialog,
    onDelete,

    refreshApplications,
  } = useApplications();

  return (
    <main className="min-h-screen space-y-3 p-4">
      <ApplicationHeader
        openCreateDialog={openCreateDialog}
        openDialogImport={setImportDialogOpen}
      />

      <ApplicationFilters
        value={searchInput}
        onValueChange={setSearchInput}
        onSearch={onSearch}
        sort={filters.sort}
        onSort={onSort}
        field={filters.field}
        onFieldChange={onFieldChange}
        status={filters.status}
        onStatusChange={onStatusChange}
      />

      <section className="flex gap-2">
        {loadingCards
          ? Array.from({ length: 5 }).map((_, i) => <InformationCardSkeleton key={i} />)
          : cards.map((item) => <InformationCard key={item.label} {...item} />)}
      </section>

      {appLoading ? (
        <ApplicationsTableSkeleton />
      ) : (
        <ApplicationsTable
          applications={applications}
          page={page}
          total={totalApplications}
          onPageChange={onPageChange}
          tableLoading={tableLoading}
          openEditDialog={openEditDialog}
          onDelete={onDelete}
        />
      )}

      <ApplicationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onApplicationChange={refreshApplications}
        currentApplication={currentApplication}
      />

      <ImportCsvDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onImported={refreshApplications}
      />
    </main>
  );
}
