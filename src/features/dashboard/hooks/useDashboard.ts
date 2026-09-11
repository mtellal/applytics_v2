import { useEffect, useState } from 'react';

import type { Application } from '@/models/applications';
import type { ApplicationStatusDistribution } from '@/models/applications';
import type { ApplicationActivity } from '../types/types';

import {
  getApplicationActivity,
  getApplicationStatusDistribution,
  getDashboardStats,
  getRecentApplications,
} from '../services/dahsboard.service';
import type { StatCardType } from '../components/StatCard';

export function useDashboard() {
  const [stats, setStats] = useState<StatCardType[]>([]);

  const [applicationsActivity, setApplicationsActivity] = useState<ApplicationActivity[]>([]);

  const [statusDistribution, setStatusDistribution] = useState<ApplicationStatusDistribution[]>([]);

  const [recents, setRecents] = useState<Application[]>([]);

  const [activityLoading, setActivityLoading] = useState(true);

  const [statusLoading, setStatusLoading] = useState(true);

  const [loadingRecents, setLoadingRecents] = useState(true);

  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    await Promise.all([
      loadStats(),
      loadApplicationsActivity(),
      loadApplicationStatusDistribution(),
      loadRecentApplications(),
    ]);
  };

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } finally {
      setStatsLoading(false);
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
    stats,
    applicationsActivity,
    statusDistribution,
    recents,

    statsLoading,
    activityLoading,
    statusLoading,
    loadingRecents,

    refreshDashboard: loadDashboard,
  };
}
