import type { ApplicationStatus } from '@/models/applications';

type StatusColor = {
  textColor: string;
  bgColor: string;
};

export const statusColorsConfig: Record<ApplicationStatus, StatusColor> = {
  'in-progress': {
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
  },
  interview: {
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
  },
  offer: {
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
  },
  rejected: {
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
  },
};

export type ApplicationStatusConfig = {
  label: string;
  color: string;
  dotClass: string;
};

export const applicationStatusConfig: Record<ApplicationStatus, ApplicationStatusConfig> = {
  'in-progress': {
    label: 'In progress',
    color: '#93C5FD',
    dotClass: 'bg-blue-300',
  },

  interview: {
    label: 'Interviews',
    color: '#C4B5FD',
    dotClass: 'bg-green-300',
  },

  offer: {
    label: 'Offers',
    color: '#86EFAC',
    dotClass: 'bg-yellow-300',
  },

  rejected: {
    label: 'Rejected',
    color: '#FCA5A5',
    dotClass: 'bg-red-300',
  },
};
