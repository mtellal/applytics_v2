import { supabase } from '@/lib/supabase';
import { isProduction, APPLICATIONS_PAGE_SIZE } from '../constants';
import type {
  GetPaginatedApplicationsParams,
  PaginatedApplications,
  ApplicationForm,
  StatusStat,
} from '../types/types';
import { mapApplication } from './applications.service';
import { APPLICATIONS_STATUSES } from '@/models/applications';
import { getPaginatedApplicationsMock } from './mock.applications.service';

export async function getPaginatedApplicationsSupabase({
  page,
  search = '',
  sort = undefined,
  field = undefined,
  status = undefined,
}: GetPaginatedApplicationsParams): Promise<PaginatedApplications> {
  if (!isProduction) {
    getPaginatedApplicationsMock({
      page,
      search,
      sort,
      field,
      status,
    });
  }

  const from = (page - 1) * APPLICATIONS_PAGE_SIZE;
  const to = from + APPLICATIONS_PAGE_SIZE - 1;

  let query = supabase.from('applications').select('*', { count: 'exact' });

  if (search.trim()) {
    query = query.ilike('company', `%${search.trim()}%`);
  }

  if (field !== 'all') {
    query = query.eq('field', field);
  }

  if (status !== 'all') {
    query = query.eq('status', status);
  }

  query = query.order('applied_at', {
    ascending: sort === 'oldest',
  });

  query = query.order('id', {
    ascending: true,
  });

  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    data: (data ?? []).map(mapApplication),
    page: page,
    total: count ?? 0,
  };
}

export async function createApplicationSupabase(
  application: ApplicationForm,
  userID?: string,
): Promise<void> {
  if (!userID) throw 'User ID is required';

  const { error } = await supabase.from('applications').insert({
    user_id: userID,
    company: application.company,
    job_title: application.jobTitle,
    field: application.field,
    status: application.status,
    location: application.location,
    link: application.link,
    notes: application.notes,
  });

  if (error) throw error;
}

export async function editApplicationSupabase(
  appID: string,
  application: ApplicationForm,
): Promise<void> {
  const { error } = await supabase
    .from('applications')
    .update({
      company: application.company,
      job_title: application.jobTitle,
      field: application.field,
      status: application.status,
      applied_at: application.appliedAt,
      location: application.location,
      link: application.link,
      notes: application.notes,
    })
    .eq('id', appID);

  if (error) throw error;
}

export async function deleteApplicationSupabase(appID: string): Promise<void> {
  const { error } = await supabase.from('applications').delete().eq('id', appID);
  if (error) throw error;
}

export async function getApplicationStatusDistributionSupabase(): Promise<StatusStat[]> {
  const { data, error } = await supabase.from('applications').select('status');
  if (error) throw error;

  return APPLICATIONS_STATUSES.map((s) => ({
    status: s,
    count: data.reduce((acc, value) => (value.status === s ? acc + 1 : acc), 0),
  }));
}
