import {
  CalendarDays,
  FileText,
  MoveUpRight,
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
    label: 'Applications',
    icon: FileText,
    iconColor: 'text-blue-400',
    iconBackground: 'bg-blue-100',
  },

  interview: {
    label: 'Interviews',
    icon: CalendarDays,
    iconColor: 'text-violet-400',
    iconBackground: 'bg-violet-100',
  },

  offer: {
    label: 'Offers',
    icon: Trophy,
    iconColor: 'text-green-500',
    iconBackground: 'bg-green-100',
  },

  'in-progress': {
    label: 'In progress',
    icon: Send,
    iconColor: 'text-blue-400',
    iconBackground: 'bg-blue-100',
  },

  rejected: {
    label: 'Rejected',
    icon: X,
    iconColor: 'text-red-400',
    iconBackground: 'bg-red-100',
  },
};
