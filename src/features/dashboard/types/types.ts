export type ApplicationActivity = {
  date: string;
  applications: number;
};

export type ActivityPeriod = '7d' | '14d' | '30d' | 'all';
