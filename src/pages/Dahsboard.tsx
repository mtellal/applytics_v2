import ApplicationActivityChart from '@/features/dashboard/components/ApplicationActivityChart';
import ApplicationActivityChartSkeleton from '@/features/dashboard/components/ApplicationActivityChartSkeleton';

import ApplicationStatusChart from '@/features/dashboard/components/ApplicationStatusChart';
import ApplicationStatusChartSkeleton from '@/features/dashboard/components/ApplicationStatusChartSkeleton';

import DashboardHeader from '@/features/dashboard/components/DahsboardHeader';
import StatGrid from '@/features/dashboard/components/StatGrid';

import RecentApplications from '@/features/dashboard/components/RecentApplications';
import RecentApplicationsSkeleton from '@/features/dashboard/components/RecentApplicationsSkeleton';

import { useDashboard } from '@/features/dashboard/hooks/useDashboard';

export default function Dashboard() {
  const {
    stats,
    applicationsActivity,
    statusDistribution,
    recents,

    statsLoading,
    activityLoading,
    statusLoading,
    loadingRecents,
  } = useDashboard();

  return (
    <main className="min-h-screen space-y-3 p-4">
      <DashboardHeader name="Jean" />

      <StatGrid stats={stats} loading={statsLoading} />

      <section className="flex gap-5">
        {activityLoading ? (
          <ApplicationActivityChartSkeleton />
        ) : (
          <ApplicationActivityChart data={applicationsActivity} />
        )}

        {statusLoading ? (
          <ApplicationStatusChartSkeleton />
        ) : (
          <ApplicationStatusChart data={statusDistribution} />
        )}
      </section>

      {loadingRecents ? <RecentApplicationsSkeleton /> : <RecentApplications data={recents} />}
    </main>
  );
}
