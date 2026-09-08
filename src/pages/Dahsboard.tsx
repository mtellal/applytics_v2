import ApplicationActivityChart from '../features/dashboard/components/ApplicationActivityChart';
import DashboardHeader from '../features/dashboard/components/DahsboardHeader';
import StatGrid from '@/features/dashboard/components/StatGrid';
import { useEffect, useState } from 'react';
import {
  type ApplicationActivity,
  type ApplicationStatusDistribution,
} from '@/features/dashboard/types/types';
import {
  getApplicationActivity,
  getApplicationStatusDistribution,
} from '@/features/dashboard/services/dahsboard.service';
import ApplicationActivityChartSkeleton from '@/features/dashboard/components/ApplicationActivityChartSkeleton';
import ApplicationStatusChart from '@/features/dashboard/components/ApplicationStatusChart';

export default function Dashboard() {
  const [activityLoading, setActivityLoading] = useState<boolean>(true);
  const [statusLoading, setStatusLoading] = useState(true);

  const [statusDistribution, setStatusDistribution] = useState<ApplicationStatusDistribution[]>([]);
  const [applicationsActivity, setApplicationsActivity] = useState<ApplicationActivity[]>([]);

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

    loadApplicationsActivity();
    loadApplicationStatusDistribution();
  });

  return (
    <main className="min-h-screen p-8 space-y-3">
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
        <ApplicationStatusChart data={statusDistribution} />
      </section>
    </main>
  );
}
