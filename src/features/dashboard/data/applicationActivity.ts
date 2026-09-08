import type { ApplicationActivity } from '../types/types';

export const ApplicationsActivityDatas: ApplicationActivity[] = [
  { date: '2026-09-7', applications: 3 },
  { date: '2026-09-6', applications: 0 },
  { date: '2026-09-5', applications: 2 },
  { date: '2026-09-4', applications: 8 },
  { date: '2026-09-3', applications: 10 },
  { date: '2026-09-2', applications: 6 },
  { date: '2026-09-1', applications: 8 },
  { date: '2026-08-31', applications: 3 },
];

export const applicationActivityMock: ApplicationActivity[] = Array.from(
  { length: 60 },
  (_, index) => {
    const date = new Date();

    date.setDate(date.getDate() - (59 - index));

    return {
      date: date.toISOString().split('T')[0],
      applications: Math.floor(Math.random() * 12),
    };
  },
);
