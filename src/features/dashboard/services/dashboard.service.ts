import type { Application } from '@/models/applications';
import type { ApplicationActivity } from '../types/types';
import { isProduction } from '@/features/applications/constants';
import { getRecentApplicationsMock, getApplicationActivityMock } from './mock.dashboard.service';
import {
  getRecentApplicationsSupabase,
  getApplicationActivitySupabase,
} from './supabase.dashboard.service';

export async function getRecentApplications(): Promise<Application[]> {
  if (isProduction) return getRecentApplicationsSupabase();
  else return getRecentApplicationsMock();
}

export async function getApplicationActivity(): Promise<ApplicationActivity[]> {
  if (isProduction) return getApplicationActivitySupabase();
  else return getApplicationActivityMock();
}
