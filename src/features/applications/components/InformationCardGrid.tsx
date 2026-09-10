import type { InformationCardType } from '@/components/ui/InformationCard';
import InformationCard from '@/components/ui/InformationCard';

type InformationCardGridProps = {
  data: InformationCardType[];
};

export default function InformationCardGrid({ data }: InformationCardGridProps) {
  return (
    <section className="flex gap-2">
      {data.map((item) => {
        return <InformationCard {...item} />;
      })}
    </section>
  );
}
