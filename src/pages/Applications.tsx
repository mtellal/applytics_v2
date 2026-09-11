import type { InformationCardType } from '@/components/ui/InformationCard';
import InformationCard from '@/components/ui/InformationCard';
import InformationCardSkeleton from '@/components/ui/InformationCardSkeleton';
import { cardVisualConfig } from '@/constants/cardVisual';
import ApplicationDialog from '@/features/applications/components/ApplicationDialog';
import ApplicationFilters from '@/features/applications/components/ApplicationsFilters';
import ApplicationHeader from '@/features/applications/components/ApplicationsHeader';
import ApplicationsTable from '@/features/applications/components/ApplicationsTable';
import ApplicationsTableSkeleton from '@/features/applications/components/ApplicationsTableSkeleton';
import {
  deleteApplication,
  getPaginatedApplications,
} from '@/features/applications/services/applications.service';
import {
  type FieldFilter,
  type SortFilter,
  type StatusFilter,
} from '@/features/applications/types/types';
import { getApplicationStatusDistribution } from '@/features/dashboard/services/dahsboard.service';
import type { Application, ApplicationStatusDistribution } from '@/models/applications';
import { FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Applications() {
  const [cards, setCards] = useState<InformationCardType[]>([]);
  const [loadingCards, setLoadingCards] = useState(true);

  const [applications, setApplications] = useState<Application[]>([]);
  const [appLoading, setAppLoading] = useState<boolean>(true);

  const [tableLoading, setTableLoading] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');

  const [sort, setSort] = useState<SortFilter>('newest');

  const [field, setField] = useState<FieldFilter>('all');

  const [status, setStatus] = useState<StatusFilter>('all');

  const [dialogOpen, setDialogOpen] = useState(false);

  const [currentApplication, setCurrentApplication] = useState<Application>();

  useEffect(() => {
    async function loadInformationCards() {
      getApplicationStatusDistribution().then((data: ApplicationStatusDistribution[]) => {
        const totalApplications = data.reduce((acc, d) => d.count + acc, 0);

        const formattedData: InformationCardType[] = [
          {
            label: 'Applications',
            value: totalApplications,
            icon: FileText,
            textColor: 'text-gray-400',
            bgColor: 'bg-gray-100',
          },
          ...data.map((item) => ({
            label: cardVisualConfig[item.status].label,
            value: item.count,
            icon: cardVisualConfig[item.status].icon,
            textColor: cardVisualConfig[item.status].iconColor,
            bgColor: cardVisualConfig[item.status].iconBackground,
          })),
        ];
        setCards(formattedData);
        setLoadingCards(false);
      });
    }

    async function loadApplications() {
      const app = await getPaginatedApplications({
        page: page,
        search: '',
        sort: undefined,
        field: undefined,
      });

      setApplications(app.data);
      setPage(app.page);
      setTotalApplications(app.total);
      setAppLoading(false);
    }

    loadInformationCards();
    loadApplications();
  }, []);

  const loadApplications = async (
    newPage: number,
    newSearch: string,
    sort?: SortFilter,
    field?: FieldFilter,
    status?: StatusFilter,
  ) => {
    if (tableLoading) return;

    setTableLoading(true);

    try {
      const app = await getPaginatedApplications({
        page: newPage,
        search: newSearch,
        sort,
        field,
        status,
      });

      setApplications(app.data);
      setPage(app.page);
      setTotalApplications(app.total);
    } finally {
      setTableLoading(false);
    }
  };

  const onPageChange = (newPage: number) => {
    loadApplications(newPage, search, sort, field, status);
  };

  const onSearch = (newSearch: string) => {
    setSearch(newSearch);
    loadApplications(1, newSearch, sort, field, status);
  };

  const onSort = (s: SortFilter) => {
    setSort(s);
    loadApplications(page, search, s, field, status);
  };

  const onFieldChange = (f: FieldFilter) => {
    setField(f);
    loadApplications(page, search, sort, f, status);
  };

  const onStatusChange = (s: StatusFilter) => {
    setStatus(s);
    loadApplications(page, search, sort, field, s);
  };

  const onApplicationCreated = () => {
    try {
      loadApplications(page, search, sort, field, status);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const onEdit = (item?: Application) => {
    setDialogOpen(true);
    setCurrentApplication(item);
  };

  const onDelete = async (id: string) => {
    try {
      await deleteApplication(id);
      loadApplications(page, search, sort, field, status);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <main className="min-h-screen p-4 space-y-3">
      <ApplicationHeader onClick={onEdit} />
      <ApplicationFilters
        value={searchInput}
        onValueChange={setSearchInput}
        onSearch={onSearch}
        sort={sort}
        onSort={onSort}
        field={field}
        onFieldChange={onFieldChange}
        status={status}
        onStatusChange={onStatusChange}
      />
      <section className="flex gap-2">
        {loadingCards
          ? Array.from({ length: 5 }).map((_, i) => <InformationCardSkeleton key={i} />)
          : cards.map((item, i) => <InformationCard key={i} {...item} />)}
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
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}

      <ApplicationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onApplicationCreated={onApplicationCreated}
        currentApplication={currentApplication}
      />
    </main>
  );
}
