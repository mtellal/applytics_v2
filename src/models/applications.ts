import type { ApplicationField } from '@/generated/applicationFields';
export { APPLICATION_FIELDS, type ApplicationField } from '@/generated/applicationFields';

export const APPLICATIONS_STATUSES = ['in-progress', 'rejected', 'interview', 'offer'] as const;

export type ApplicationStatus = (typeof APPLICATIONS_STATUSES)[number];

export type ApplicationStatusDistribution = {
  status: ApplicationStatus;
  count: number;
};

export type Application = {
  id: string;
  company: string;
  companyLogo?: string;
  jobTitle: string;
  field: ApplicationField;
  status: ApplicationStatus;
  appliedAt: string;
  location: string;
  link?: string;
  notes?: string;
};
