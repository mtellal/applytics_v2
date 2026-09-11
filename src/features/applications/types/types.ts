import type { Application, ApplicationField, ApplicationStatus } from '@/models/applications';

export type PaginatedApplications = {
  data: Application[];
  page: number;
  total: number;
};

export type SortFilter = 'newest' | 'oldest';
export type StatusFilter = 'all' | 'in-progress' | 'interview' | 'offer' | 'rejected';
export type FieldFilter =
  'all' | 'frontend' | 'backend' | 'full-stack' | 'mobile' | 'devops' | 'cybersecurity';

export type ApplicationForm = {
  company: string;
  jobTitle: string;
  field: ApplicationField;
  status: ApplicationStatus;
  appliedAt: string;
  location: string;
  link?: string;
  notes?: string;
};
