import {
  CalendarDays,
  FileText,
  Send,
  Trophy,
  X,
  type LucideIcon,
} from 'lucide-react';

export type CardVisualType = 'applications' | 'in-progress' | 'rejected' | 'interview' | 'offer';

type CardVisualConfig = {
  label: string;
  icon: LucideIcon;
  iconColor: string;
  iconBackground: string;
};

export const cardVisualConfig: Record<CardVisualType, CardVisualConfig> = {
  applications: {
    label: 'applicationsCards.applications.label',
    icon: FileText,
    iconColor: 'text-blue-400',
    iconBackground: 'bg-blue-100',
  },

  interview: {
    label: 'applicationsCards.interview.label',
    icon: CalendarDays,
    iconColor: 'text-green-400',
    iconBackground: 'bg-green-100',
  },

  offer: {
    label: 'applicationsCards.offer.label',
    icon: Trophy,
    iconColor: 'text-yellow-500',
    iconBackground: 'bg-yellow-100',
  },

  'in-progress': {
    label: 'applicationsCards.in-progress.label',
    icon: Send,
    iconColor: 'text-blue-400',
    iconBackground: 'bg-blue-100',
  },

  rejected: {
    label: 'applicationsCards.rejected.label',
    icon: X,
    iconColor: 'text-red-400',
    iconBackground: 'bg-red-100',
  },
};
