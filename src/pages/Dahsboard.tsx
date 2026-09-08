import {
  applicationActivityMock,
  ApplicationsActivityDatas,
} from '@/features/dashboard/data/applicationActivity';
import ApplicationActivityChart from '../features/dashboard/components/ApplicationActivityChart';
import DashboardHeader from '../features/dashboard/components/DahsboardHeader';
import StatGrid from '@/features/dashboard/components/StatGrid';
import { useEffect, useState } from 'react';
import type { ApplicationActivity } from '@/features/dashboard/types/types';
import { getApplicationActivity } from '@/features/dashboard/services/dahsboard.service';
import ApplicationActivityChartSkeleton from '@/features/dashboard/components/ApplicationActivityChartSkeleton';

export default function Dashboard() {
  const [activityLoading, setActivityLoading] = useState<boolean>(true);
  const [applicationsActivity, setApplicationsActivity] = useState<ApplicationActivity[]>([]);

  useEffect(() => {
    async function loadApplicationsActivity() {
      getApplicationActivity().then((data) => {
        setActivityLoading(false);
        setApplicationsActivity(data);
      });
    }
    loadApplicationsActivity();
  });

  return (
    <main className="min-h-screen p-8 space-y-16">
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
        <div className="flex-1 bg-red-100"></div>
      </section>
    </main>
  );
}
