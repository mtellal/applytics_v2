import ApplicationActivityChart from '@/features/dashboard/components/ApplicationActivityChart';
import ApplicationActivityChartSkeleton from '@/features/dashboard/components/ApplicationActivityChartSkeleton';

import ApplicationStatusChart from '@/features/dashboard/components/ApplicationStatusChart';
import ApplicationStatusChartSkeleton from '@/features/dashboard/components/ApplicationStatusChartSkeleton';

import DashboardHeader from '@/features/dashboard/components/DahsboardHeader';

import RecentApplications from '@/features/dashboard/components/RecentApplications';
import RecentApplicationsSkeleton from '@/features/dashboard/components/RecentApplicationsSkeleton';

import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import useAuth from '@/features/auth/hooks/useAuth';
import InformationCardGrid from '@/components/ui/InformationCardGrid';

export default function Dashboard() {
  const {
    cards,
    applicationsActivity,
    statusDistribution,
    recents,
    loadingCards,
    activityLoading,
    statusLoading,
    loadingRecents,
  } = useDashboard();

  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <DashboardHeader />

      <InformationCardGrid cards={cards} loading={loadingCards} />

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[2fr_1fr]">
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

      {loadingRecents ? (
        <RecentApplicationsSkeleton />
      ) : (
        <RecentApplications applications={recents} />
      )}
    </div>
  );
}
