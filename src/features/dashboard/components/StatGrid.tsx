import StatCard, { type StatCardType } from './StatCard';
import StatCardSkeleton from './StatCardSkeleton';

type StatGridProps = {
  stats: StatCardType[];
  loading: boolean;
};

export default function StatGrid({ stats, loading }: StatGridProps) {
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
