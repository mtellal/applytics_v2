import { useEffect, useState } from 'react';
import StatCard, { type StatCardType } from './StatCard';
import { getDashboardStats } from '../services/dahsboard.service';
import StatCardSkeleton from './StatCardSkeleton';

export default function StatGrid() {
  const [stats, setStats] = useState<StatCardType[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    getDashboardStats().then((datas: StatCardType[]) => {
      setLoading(false);
      setStats(datas);
    });
  }, []);

  return (
    <section aria-busy={loading as boolean} className="flex gap-3">
      {loading ? (
        <>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </>
      ) : (
        <>
          {stats.map((item) => {
            return <StatCard {...item} />;
          })}
        </>
      )}
    </section>
  );
}
