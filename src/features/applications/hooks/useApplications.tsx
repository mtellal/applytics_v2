import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';

import type { InformationCardType } from '@/components/ui/InformationCard';
import { cardVisualConfig } from '@/constants/cardVisual';

import { deleteApplication, getPaginatedApplications } from '../services/applications.service';

import type {
  ApplicationFiltersState,
  FieldFilter,
  SortFilter,
  StatusFilter,
} from '../types/types';

import { getApplicationStatusDistribution } from '@/features/dashboard/services/dahsboard.service';

import type { Application } from '@/models/applications';

export function useApplications() {
  const [cards, setCards] = useState<InformationCardType[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [page, setPage] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);

  const [filters, setFilters] = useState<ApplicationFiltersState>({
    search: '',
    sort: 'newest',
    field: 'all',
    status: 'all',
  });

  const [loadingCards, setLoadingCards] = useState(true);
  const [appLoading, setAppLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<Application>();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      await Promise.all([loadCards(), loadApplications(1, filters)]);
    } finally {
      setAppLoading(false);
    }
  };

  const loadCards = async () => {
    setLoadingCards(true);

    try {
      const data = await getApplicationStatusDistribution();

      const totalApplications = data.reduce((acc, item) => acc + item.count, 0);

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
    } finally {
      setLoadingCards(false);
    }
  };

  const loadApplications = async (
    newPage: number = page,
    newFilters: ApplicationFiltersState = filters,
  ) => {
    if (tableLoading) return;

    setTableLoading(true);

    try {
      const app = await getPaginatedApplications({
        page: newPage,
        search: newFilters.search,
        sort: newFilters.sort,
        field: newFilters.field,
        status: newFilters.status,
      });

      setApplications(app.data);
      setPage(app.page);
      setTotalApplications(app.total);
    } finally {
      setTableLoading(false);
    }
  };

  const refreshApplications = async () => {
    await Promise.all([loadApplications(page, filters), loadCards()]);
  };

  const onPageChange = (newPage: number) => {
    loadApplications(newPage, filters);
  };

  const updateFilter = <K extends keyof ApplicationFiltersState>(
    key: K,
    value: ApplicationFiltersState[K],
  ) => {
    const nextFilters = {
      ...filters,
      [key]: value,
    };

    setFilters(nextFilters);
    loadApplications(page, nextFilters);
  };

  const onSearch = (search: string) => {
    const nextFilters = {
      ...filters,
      search,
    };

    setFilters(nextFilters);
    loadApplications(1, nextFilters);
  };

  const onSort = (sort: SortFilter) => {
    updateFilter('sort', sort);
  };

  const onFieldChange = (field: FieldFilter) => {
    updateFilter('field', field);
  };

  const onStatusChange = (status: StatusFilter) => {
    updateFilter('status', status);
  };

  const openCreateDialog = () => {
    setCurrentApplication(undefined);
    setDialogOpen(true);
  };

  const openEditDialog = (application: Application) => {
    setCurrentApplication(application);
    setDialogOpen(true);
  };

  const onDelete = async (id: string) => {
    try {
      await deleteApplication(id);
      await refreshApplications();
    } catch (error) {
      console.error(error);
    }
  };

  return {
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
  };
}
