import { applicationsMock } from '../data/applications';
import { APPLICATIONS_PAGE_SIZE } from '../constants';
import type { ApplicationForm, FieldFilter, SortFilter, StatusFilter } from '../types/types';
import type { Application } from '@/models/applications';
import { applicationActivityMock } from '@/features/dashboard/data/applicationActivity';

type GetPaginatedApplicationsParams = {
  page: number;
  search?: string;
  sort?: SortFilter;
  field?: FieldFilter;
  status?: StatusFilter;
};

export async function getPaginatedApplications({
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
  const end = start + APPLICATIONS_PAGE_SIZE;

  return {
    data: results.slice(start, end),
    page,
    total: results.length,
  };
}

export async function createApplication(
  application: Omit<Application, 'id'>,
): Promise<Application> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const newApplication: Application = {
    ...application,
    id: crypto.randomUUID(),
  };

  applicationsMock.unshift(newApplication);

  return newApplication;
}

export async function deleteApplication(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = applicationsMock.findIndex((application) => application.id === id);

  if (index === -1) {
    throw new Error('Application not found');
  }

  applicationsMock.splice(index, 1);
}

export async function editApplication(app: Application): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const index = applicationsMock.findIndex((item) => item.id == app.id);

  if (index === -1) {
    throw new Error('Application not found');
  }

  applicationsMock[index] = {
    ...app,
  };
}
