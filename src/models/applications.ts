import type { FieldFilter } from '@/features/applications/types/types';

export const APPLICATIONS_STATUSES = ['in-progress', 'rejected', 'interview', 'offer'] as const;

export type ApplicationStatus = (typeof APPLICATIONS_STATUSES)[number];

export type ApplicationField =
  'frontend' | 'backend' | 'full-stack' | 'mobile' | 'devops' | 'cybersecurity';

export type ApplicationStatusDistribution = {
  status: ApplicationStatus;
  count: number;
};

export type Application = {
  id: string;
  company: string;
  companyLogo?: string;
  jobTitle: string;
  field: FieldFilter;
  status: ApplicationStatus;
  appliedAt: string;
  location: string;
  link?: string;
  notes?: string;
};
