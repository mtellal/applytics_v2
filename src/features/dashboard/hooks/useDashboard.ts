import { useCallback, useEffect, useState } from 'react';

import type { Application } from '@/models/applications';
import type { ApplicationStatusDistribution } from '@/models/applications';
import type { ApplicationActivity } from '../types/types';

import { getApplicationActivity, getRecentApplications } from '../services/dashboard.service';
import { getApplicationStatusDistribution } from '@/features/applications/services/applications.service';
import type { InformationCardType } from '@/components/ui/InformationCard';
import { FileText } from 'lucide-react';
import { cardVisualConfig } from '@/constants/cardVisual';
import { useTranslation } from 'react-i18next';

export function useDashboard() {
  const [applicationsActivity, setApplicationsActivity] = useState<ApplicationActivity[]>([]);

  const [statusDistribution, setStatusDistribution] = useState<ApplicationStatusDistribution[]>([]);

  const [recents, setRecents] = useState<Application[]>([]);

  const [activityLoading, setActivityLoading] = useState(true);

  const [statusLoading, setStatusLoading] = useState(true);

  const [loadingRecents, setLoadingRecents] = useState(true);

  const [loadingCards, setLoadingCards] = useState(true);

  const { t } = useTranslation();

  const cards: InformationCardType[] = [
    {
      label: t('applicationsCards.applications.label'),
      value: statusDistribution.reduce((total, item) => total + item.count, 0),
      icon: FileText,
      textColor: 'text-gray-400',
      bgColor: 'bg-gray-100',
    },
    ...statusDistribution.map((item) => ({
      label: t(cardVisualConfig[item.status].label),
      value: item.count,
      icon: cardVisualConfig[item.status].icon,
      textColor: cardVisualConfig[item.status].iconColor,
      bgColor: cardVisualConfig[item.status].iconBackground,
    })),
  ];

  const loadDashboard = useCallback(async (isActive: () => boolean = () => true) => {
    await Promise.all([
      getApplicationStatusDistribution()
        .then((data) => {
          if (isActive()) setStatusDistribution(data);
        })
        .catch(console.error)
        .finally(() => {
          if (isActive()) {
            setStatusLoading(false);
            setLoadingCards(false);
          }
        }),
      getApplicationActivity()
        .then((data) => {
          if (isActive()) setApplicationsActivity(data);
        })
        .catch(console.error)
        .finally(() => {
          if (isActive()) setActivityLoading(false);
        }),
      getRecentApplications()
        .then((data) => {
          if (isActive()) setRecents(data);
        })
        .catch(console.error)
        .finally(() => {
          if (isActive()) setLoadingRecents(false);
        }),
    ]);
  }, []);

  useEffect(() => {
    let active = true;
    void loadDashboard(() => active);
    return () => {
      active = false;
    };
  }, [loadDashboard]);

  const refreshDashboard = async () => {
    setLoadingCards(true);
    setActivityLoading(true);
    setStatusLoading(true);
    setLoadingRecents(true);
    await loadDashboard();
  };

  return {
    cards,
    applicationsActivity,
    statusDistribution,
    recents,

    loadingCards,
    activityLoading,
    statusLoading,
    loadingRecents,

    refreshDashboard,
  };
}
