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
