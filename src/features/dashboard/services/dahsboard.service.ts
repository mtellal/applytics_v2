import type { StatCardType } from '../components/StatCard';
import { applicationActivityMock, ApplicationsActivityDatas } from '../data/applicationActivity';
import { applicationStatusDistributionMock } from '../data/applicationStatusDistribution';
import { recentApplicationsMock } from '../data/recentApplications';
import { StatCardDatas } from '../data/stats';
import type {
  ApplicationActivity,
  ApplicationStatusDistribution,
  RecentApplication,
} from '../types/types';

export async function getDashboardStats(): Promise<StatCardType[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(StatCardDatas);
    }, 800);
  });
}

export async function getApplicationActivity(): Promise<ApplicationActivity[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(applicationActivityMock);
    }, 800);
  });
}

export async function getApplicationStatusDistribution(): Promise<ApplicationStatusDistribution[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(applicationStatusDistributionMock);
    }, 800);
  });
}

export async function getRecentApplications(): Promise<RecentApplication[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(recentApplicationsMock);
    }, 800);
  });
}
