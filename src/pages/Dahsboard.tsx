import ApplicationActivityChart from '../features/dashboard/components/ApplicationActivityChart';
import DashboardHeader from '../features/dashboard/components/DahsboardHeader';
import StatGrid from '@/features/dashboard/components/StatGrid';
import { useEffect, useState } from 'react';
import {
  type ApplicationActivity,
  type ApplicationStatusDistribution,
  type RecentApplication,
} from '@/features/dashboard/types/types';
import {
  getApplicationActivity,
  getApplicationStatusDistribution,
  getRecentApplications,
} from '@/features/dashboard/services/dahsboard.service';
import ApplicationActivityChartSkeleton from '@/features/dashboard/components/ApplicationActivityChartSkeleton';
import ApplicationStatusChart from '@/features/dashboard/components/ApplicationStatusChart';
import ApplicationStatusChartSkeleton from '@/features/dashboard/components/ApplicationStatusChartSkeleton';
import RecentApplciations from '@/features/dashboard/components/RecentApplications';
import RecentApplicationsSkeleton from '@/features/dashboard/components/RecentApplicationsSkeleton';

export default function Dashboard() {
  const [applicationsActivity, setApplicationsActivity] = useState<ApplicationActivity[]>([]);
  const [activityLoading, setActivityLoading] = useState<boolean>(true);

  const [statusDistribution, setStatusDistribution] = useState<ApplicationStatusDistribution[]>([]);
  const [statusLoading, setStatusLoading] = useState(true);

  const [recents, setRecents] = useState<RecentApplication[]>([]);
  const [loadingRecents, setLoadingRecents] = useState(true);

  useEffect(() => {
    async function loadApplicationsActivity() {
      getApplicationActivity().then((data) => {
        setActivityLoading(false);
        setApplicationsActivity(data);
      });
    }

    async function loadApplicationStatusDistribution() {
      getApplicationStatusDistribution().then((data) => {
        setStatusLoading(false);
        setStatusDistribution(data);
      });
    }

    async function loadRecentApplications() {
      getRecentApplications().then((data) => {
        setLoadingRecents(false);
        setRecents(data);
      });
    }

    loadApplicationsActivity();
    loadApplicationStatusDistribution();
    loadRecentApplications();
  });

  return (
    <main className="min-h-screen p-4 space-y-3">
      <DashboardHeader name="Jean" />
      <StatGrid />
      <section className="flex gap-5">
        {activityLoading ? (
          <ApplicationActivityChartSkeleton />
        ) : (
          <>
            <ApplicationActivityChart data={applicationsActivity} />
          </>
        )}
        {statusLoading ? (
          <ApplicationStatusChartSkeleton />
        ) : (
          <ApplicationStatusChart data={statusDistribution} />
        )}
      </section>
      {loadingRecents ? <RecentApplicationsSkeleton /> : <RecentApplciations data={recents} />}
    </main>
  );
}
