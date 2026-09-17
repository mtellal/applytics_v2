import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';

import type { InformationCardType } from '@/components/ui/InformationCard';
import { cardVisualConfig } from '@/constants/cardVisual';

import {
  deleteApplication,
  getApplicationStatusDistribution,
  getPaginatedApplications,
} from '../services/applications.service';

import type {
  ApplicationFiltersState,
  FieldFilter,
  SortFilter,
  StatusFilter,
  StatusStat,
} from '../types/types';

import type { Application } from '@/models/applications';
import { useTranslation } from 'react-i18next';

const initialFilters: ApplicationFiltersState = {
  search: '',
  sort: 'newest',
  field: 'all',
  status: 'all',
};

export function useApplications() {
  const [statusStats, setStatusStats] = useState<StatusStat[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [page, setPage] = useState(1);
  const [totalApplications, setTotalApplications] = useState(0);

  const [filters, setFilters] = useState<ApplicationFiltersState>(initialFilters);

  const [loadingCards, setLoadingCards] = useState(true);
  const [appLoading, setAppLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<Application>();

  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const { t } = useTranslation();

  const cards: InformationCardType[] = [
    {
      label: t('applicationsCards.applications.label'),
      value: statusStats.reduce((total, item) => total + item.count, 0),
      icon: FileText,
      textColor: 'text-gray-400',
      bgColor: 'bg-gray-100',
    },
    ...statusStats.map((item) => ({
      label: t(cardVisualConfig[item.status].label),
      value: item.count,
      icon: cardVisualConfig[item.status].icon,
      textColor: cardVisualConfig[item.status].iconColor,
      bgColor: cardVisualConfig[item.status].iconBackground,
    })),
  ];

  const loadCards = async () => {
    setLoadingCards(true);
    try {
      setStatusStats(await getApplicationStatusDistribution());
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

  useEffect(() => {
    let active = true;

    const loadInitialData = async () => {
      await Promise.all([
        getApplicationStatusDistribution()
          .then((data) => {
            if (active) setStatusStats(data);
          })
          .catch(console.error)
          .finally(() => {
            if (active) setLoadingCards(false);
          }),
        getPaginatedApplications({ page: 1, ...initialFilters })
          .then((result) => {
            if (active) {
              setApplications(result.data);
              setPage(result.page);
              setTotalApplications(result.total);
            }
          })
          .catch(console.error),
      ]);
      if (active) setAppLoading(false);
    };

    void loadInitialData();
    return () => {
      active = false;
    };
  }, []);

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
    setPage(1);
    loadApplications(1, nextFilters);
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
  };
}
