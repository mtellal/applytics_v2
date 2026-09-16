import { mapApplication } from '@/features/applications/services/applications.service';
import type { Application } from '@/models/applications';
import type { ApplicationActivity } from '../types/types';
import { supabase } from '@/lib/supabase';

export async function getRecentApplicationsSupabase(): Promise<Application[]> {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('applied_at', { ascending: false })
    .order('id', { ascending: true })
    .limit(5);

  if (error) throw error;

  return data.map(mapApplication);
}

export async function getApplicationActivitySupabase(): Promise<ApplicationActivity[]> {
  const { data, error } = await supabase
    .from('applications')
    .select('applied_at')
    .order('applied_at', { ascending: true });

  if (error) throw error;

  const results = data.reduce(
    (acc, app) => {
      acc[app.applied_at] = (acc[app.applied_at] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const final = Object.entries(results).map(([appliedAt, count]) => ({
    date: appliedAt,
    applications: count,
  }));

  return final;
}
