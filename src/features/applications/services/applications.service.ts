import { isProduction } from '../constants';
import type {
  ApplicationForm,
  ApplicationRow,
  GetPaginatedApplicationsParams,
  PaginatedApplications,
  StatusStat,
} from '../types/types';
import { type Application } from '@/models/applications';

import {
  getPaginatedApplicationsMock,
  createApplicationMock,
  editApplicationMock,
  deleteApplicationMock,
  getApplicationStatusDistributionMock,
} from './mock.applications.service';
import {
  getPaginatedApplicationsSupabase,
  createApplicationSupabase,
  editApplicationSupabase,
  deleteApplicationSupabase,
  getApplicationStatusDistributionSupabase,
} from './supabase.applications.service';
import { supabase } from '@/lib/supabase';

export function mapApplication(row: ApplicationRow): Application {
  return {
    id: row.id,
    company: row.company,
    jobTitle: row.job_title,
    field: row.field,
    status: row.status,
    appliedAt: row.applied_at,
    location: row.location,
    link: row.link ?? undefined,
    notes: row.notes ?? undefined,
  };
}

export async function getPaginatedApplications({
  page,
  search = '',
  sort = undefined,
  field = undefined,
  status = undefined,
}: GetPaginatedApplicationsParams): Promise<PaginatedApplications> {
  if (isProduction) return getPaginatedApplicationsSupabase({ page, search, sort, field, status });
  else return getPaginatedApplicationsMock({ page, search, sort, field, status });
}

export async function createApplication(
  application: ApplicationForm,
  userID?: string,
): Promise<void> {
  if (isProduction) return createApplicationSupabase(application, userID);
  else return createApplicationMock(application);
}

export async function editApplication(appID: string, application: ApplicationForm): Promise<void> {
  if (isProduction) return editApplicationSupabase(appID, application);
  else return editApplicationMock(appID, application);
}

export async function deleteApplication(appID: string): Promise<void> {
  if (isProduction) return deleteApplicationSupabase(appID);
  else return deleteApplicationMock(appID);
}

export async function getApplicationStatusDistribution(): Promise<StatusStat[]> {
  if (isProduction) return getApplicationStatusDistributionSupabase();
  else return getApplicationStatusDistributionMock();
}

export async function importApplicationsSupabase(
  applications: ApplicationForm[],
  userId: string,
): Promise<void> {
  const rows = applications.map((application) => ({
    user_id: userId,
    company: application.company,
    job_title: application.jobTitle,
    field: application.field,
    status: application.status,
    applied_at: application.appliedAt,
    location: application.location,
    link: application.link || null,
    notes: application.notes || null,
  }));

  const { error } = await supabase.from('applications').insert(rows);

  if (error) throw error;
}
