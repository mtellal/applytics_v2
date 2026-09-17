import type { InformationCardType } from './InformationCard';
import InformationCard from './InformationCard';
import InformationCardSkeleton from './InformationCardSkeleton';

type InformationCardGridProps = {
  cards: InformationCardType[];
  loading: boolean;
};

export default function InformationCardGrid({ cards, loading }: InformationCardGridProps) {
  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-[repeat(5,minmax(0,220px))]">
      {loading
        ? Array.from({ length: 5 }).map((_, i) => <InformationCardSkeleton key={i} />)
        : cards.map((item) => <InformationCard key={item.label} {...item} />)}
    </section>
  );
}
