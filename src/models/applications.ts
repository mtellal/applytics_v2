import type { FieldFilter } from '@/features/applications/types/types';

export type ApplicationStatus = 'in-progress' | 'rejected' | 'interview' | 'offer';
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
