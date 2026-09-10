import type { InformationCardType } from '@/components/ui/InformationCard';
import { cardVisualConfig } from '@/constants/cardVisual';
import ApplicationFilters from '@/features/applications/components/ApplicationsFilters';
import ApplicationHeader from '@/features/applications/components/ApplicationsHeader';
import InformationCardGrid from '@/features/applications/components/InformationCardGrid';
import { applicationStatusConfig } from '@/features/dashboard/components/ApplicationStatusChart';
import { getApplicationStatusDistribution } from '@/features/dashboard/services/dahsboard.service';
import type {
  ApplicationStatus,
  ApplicationStatusDistribution,
} from '@/features/dashboard/types/types';
import { Calendar, FileText, Send, Trophy, X, type LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const statusIconConfig: Record<ApplicationStatus, LucideIcon> = {
  'in-progress': Send,
  rejected: X,
  offer: Trophy,
  interview: Calendar,
};

export default function Applications() {
  const [cards, setCards] = useState<InformationCardType[]>([]);

  useEffect(() => {
    async function loadInformationCards() {
      getApplicationStatusDistribution().then((data: ApplicationStatusDistribution[]) => {
        const totalApplications = data.reduce((acc, d) => d.count + acc, 0);

        const formattedData: InformationCardType[] = [
          {
            label: 'Applications',
            value: totalApplications,
            icon: FileText,
            textColor: 'text-gray-400',
            bgColor: 'bg-gray-100',
          },
          ...data.map((item) => ({
            label: cardVisualConfig[item.status].label,
            value: item.count,
            icon: cardVisualConfig[item.status].icon,
            textColor: cardVisualConfig[item.status].iconColor,
            bgColor: cardVisualConfig[item.status].iconBackground,
          })),
        ];
        setCards(formattedData);
      });
    }
    loadInformationCards();
  }, []);

  return (
    <main className="min-h-screen p-4 space-y-3">
      <ApplicationHeader />
      <ApplicationFilters />
      <InformationCardGrid data={cards} />
    </main>
  );
}
