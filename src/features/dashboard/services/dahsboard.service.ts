import type { StatCardType } from '../components/StatCard';
import { StatCardDatas } from '../data/stats';

export async function getDashboardStats(): Promise<StatCardType[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(StatCardDatas);
    }, 800);
  });
}
