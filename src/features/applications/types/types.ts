import type { Application, ApplicationField, ApplicationStatus } from '@/models/applications';

export type PaginatedApplications = {
  data: Application[];
  page: number;
  total: number;
};

export type SortFilter = 'newest' | 'oldest';
export type StatusFilter = 'all' | 'in-progress' | 'interview' | 'offer' | 'rejected';
export type FieldFilter = 'all' | ApplicationField;

export type StatusStat = {
  status: ApplicationStatus;
  count: number;
};

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

export type ApplicationFiltersState = {
  search: string;
  sort: SortFilter;
  status: StatusFilter;
  field: FieldFilter;
};

export type ApplicationRow = {
  id: string;
  user_id: string;
  company: string;
  job_title: string;
  field: ApplicationField;
  status: ApplicationStatus;
  applied_at: string;
  location: string;
  link?: string;
  notes?: string;
};

export type GetPaginatedApplicationsParams = {
  page: number;
  search?: string;
  sort?: SortFilter;
  field?: FieldFilter;
  status?: StatusFilter;
};
