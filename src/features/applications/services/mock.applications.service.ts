import type { Application, ApplicationStatus } from '@/models/applications';
import { APPLICATIONS_PAGE_SIZE } from '../constants';
import { applicationsMock } from '../data/applications';
import type { GetPaginatedApplicationsParams, ApplicationForm, StatusStat } from '../types/types';

export async function getPaginatedApplicationsMock({
  page,
  search = '',
  sort = undefined,
  field = undefined,
  status = undefined,
}: GetPaginatedApplicationsParams) {
  let results = [...applicationsMock];

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (search) {
    const query = search.trim().toLowerCase();

    results = applicationsMock.filter((application) =>
      application.company.toLowerCase().includes(query),
    );
  }

  if (sort) {
    results.sort((a, b) => {
      const dateA = new Date(a.appliedAt).getTime();
      const dateB = new Date(b.appliedAt).getTime();
      return sort === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }

  if (field && field !== 'all') results = results.filter((i) => i.field === field);

  if (status && status !== 'all') {
    results = results.filter((i) => i.status === status);
  }

  const totalPages = Math.ceil(results.length / APPLICATIONS_PAGE_SIZE);
  if (totalPages < page) {
    page = Math.max(totalPages, 1);
  }

  const start = (page - 1) * APPLICATIONS_PAGE_SIZE;
  const end = start + APPLICATIONS_PAGE_SIZE - 1;

  return {
    data: results.slice(start, end),
    page,
    total: results.length,
  };
}

export async function createApplicationMock(application: ApplicationForm): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newApplication: Application = {
    ...application,
    id: crypto.randomUUID(),
  };

  applicationsMock.unshift(newApplication);
}

export async function editApplicationMock(
  appID: string,
  application: ApplicationForm,
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const index = applicationsMock.findIndex((item) => item.id == appID);

  if (index === -1) {
    throw new Error('Application not found');
  }

  applicationsMock[index] = {
    ...application,
    id: appID,
  };
}

export async function deleteApplicationMock(appID: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = applicationsMock.findIndex((application) => application.id === appID);

  if (index === -1) {
    throw new Error('Application not found');
  }

  applicationsMock.splice(index, 1);
}

export async function getApplicationStatusDistributionMock(): Promise<StatusStat[]> {
  let results = [...applicationsMock];

  const counts = results.reduce(
    (acc, application) => {
      acc[application.status] = (acc[application.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<ApplicationStatus, number>,
  );

  return Object.entries(counts).map(([status, count]) => ({
    status: status as ApplicationStatus,
    count,
  }));
}
