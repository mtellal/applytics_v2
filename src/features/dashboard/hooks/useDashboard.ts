import { useEffect, useState } from 'react';

import type { Application } from '@/models/applications';
import type { ApplicationStatusDistribution } from '@/models/applications';
import type { ApplicationActivity } from '../types/types';

import { getApplicationActivity, getRecentApplications } from '../services/dashboard.service';
import { getApplicationStatusDistribution } from '@/features/applications/services/applications.service';
import type { InformationCardType } from '@/components/ui/InformationCard';
import { FileText } from 'lucide-react';
import { cardVisualConfig } from '@/constants/cardVisual';
import { getApplicationActivitySupabase } from '../services/supabase.dashboard.service';

export function useDashboard() {
  const [cards, setCards] = useState<InformationCardType[]>([]);

  const [applicationsActivity, setApplicationsActivity] = useState<ApplicationActivity[]>([]);

  const [statusDistribution, setStatusDistribution] = useState<ApplicationStatusDistribution[]>([]);

  const [recents, setRecents] = useState<Application[]>([]);

  const [activityLoading, setActivityLoading] = useState(true);

  const [statusLoading, setStatusLoading] = useState(true);

  const [loadingRecents, setLoadingRecents] = useState(true);

  const [loadingCards, setLoadingCards] = useState(true);

  useEffect(() => {
    loadDashboard();
    getApplicationActivitySupabase();
  }, []);

  const loadDashboard = async () => {
    await Promise.all([
      loadCards(),
      loadApplicationsActivity(),
      loadApplicationStatusDistribution(),
      loadRecentApplications(),
    ]);
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

  const loadApplicationsActivity = async () => {
    setActivityLoading(true);

    try {
      const data = await getApplicationActivity();
      setApplicationsActivity(data);
    } finally {
      setActivityLoading(false);
    }
  };

  const loadApplicationStatusDistribution = async () => {
    setStatusLoading(true);

    try {
      const data = await getApplicationStatusDistribution();

      setStatusDistribution(data);
    } finally {
      setStatusLoading(false);
    }
  };

  const loadRecentApplications = async () => {
    setLoadingRecents(true);

    try {
      const data = await getRecentApplications();

      setRecents(data);
    } finally {
      setLoadingRecents(false);
    }
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

    refreshDashboard: loadDashboard,
  };
}
