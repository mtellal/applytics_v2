import type { Application } from '@/models/applications';
import { applicationActivityMock } from '../data/applicationActivity';
import { recentApplicationsMock } from '../data/recentApplications';
import type { ApplicationActivity } from '../types/types';

export async function getRecentApplicationsMock(): Promise<Application[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(recentApplicationsMock);
    }, 800);
  });
}

export async function getApplicationActivityMock(): Promise<ApplicationActivity[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(applicationActivityMock);
    }, 800);
  });
}
