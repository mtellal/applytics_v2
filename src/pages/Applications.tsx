import InformationCard from '@/components/ui/InformationCard';
import InformationCardGrid from '@/components/ui/InformationCardGrid';
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
    <div className="space-y-3 ">
      <ApplicationHeader
        openCreateDialog={openCreateDialog}
        openDialogImport={setImportDialogOpen}
      />

      <div className="flex flex-col gap-3">
        <div className="order-2 md:order-1">
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
        </div>

        <div className="order-1 md:order-2">
          <InformationCardGrid cards={cards} loading={loadingCards} />
        </div>
      </div>

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
    </div>
  );
}
