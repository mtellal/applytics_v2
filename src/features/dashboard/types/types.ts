export type ApplicationActivity = {
  date: string;
  applications: number;
};

export type ActivityPeriod = '7d' | '14d' | '30d' | 'all';

export type ApplicationStatus = 'in-progress' | 'rejected' | 'interview' | 'offer';

export type ApplicationStatusDistribution = {
  status: ApplicationStatus;
  count: number;
};

export type RecentApplication = {
  id: string;
  company: string;
  companyLogo?: string;
  position: string;
  status: ApplicationStatus;
  appliedAt: string;
  location: string;
  link: string;
};
