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
    label: 'applicationsCards.in-progress.label',
    color: '#93C5FD',
    dotClass: 'bg-blue-300',
  },

  interview: {
    label: 'applicationsCards.interview.label',
    color: '#86EFAC',
    dotClass: 'bg-green-300',
  },

  offer: {
    label: 'applicationsCards.offer.label',
    color: '#FDE047',
    dotClass: 'bg-yellow-300',
  },

  rejected: {
    label: 'applicationsCards.rejected.label',
    color: '#FCA5A5',
    dotClass: 'bg-red-300',
  },
};
