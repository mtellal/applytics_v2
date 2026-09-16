import type { ApplicationStatusDistribution } from '@/models/applications';

export const applicationStatusDistributionMock: ApplicationStatusDistribution[] = [
  { status: 'in-progress', count: 24 },
  { status: 'interview', count: 3 },
  { status: 'offer', count: 1 },
  { status: 'rejected', count: 15 },
];
