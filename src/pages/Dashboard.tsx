import ApplicationActivityChart from '@/features/dashboard/components/ApplicationActivityChart';
import ApplicationActivityChartSkeleton from '@/features/dashboard/components/ApplicationActivityChartSkeleton';

import ApplicationStatusChart from '@/features/dashboard/components/ApplicationStatusChart';
import ApplicationStatusChartSkeleton from '@/features/dashboard/components/ApplicationStatusChartSkeleton';

import DashboardHeader from '@/features/dashboard/components/DahsboardHeader';

import RecentApplications from '@/features/dashboard/components/RecentApplications';
import RecentApplicationsSkeleton from '@/features/dashboard/components/RecentApplicationsSkeleton';

import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import useAuth from '@/features/auth/hooks/useAuth';
import InformationCardSkeleton from '@/components/ui/InformationCardSkeleton';
import InformationCard from '@/components/ui/InformationCard';

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

  const {} = useAuth();

  const { user } = useAuth();

  return (
    <main className="min-h-screen space-y-3 p-4">
      <DashboardHeader name={user?.identities?.[0].identity_data?.name.split(' ')[0]} />

      <section className="flex gap-2">
        {loadingCards
          ? Array.from({ length: 5 }).map((_, i) => <InformationCardSkeleton key={i} />)
          : cards.map((item) => <InformationCard key={item.label} {...item} />)}
      </section>

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
