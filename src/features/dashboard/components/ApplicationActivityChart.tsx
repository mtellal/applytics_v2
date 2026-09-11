import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ActivityPeriod, ApplicationActivity } from '../types/types';
import Selector from '@/components/ui/Selector';

type ApplicationActivityChartProps = {
  data: ApplicationActivity[];
};

const periods = [
  {
    label: '7 days ago',
    value: '7d',
  },
  {
    label: '14 days ago',
    value: '14d',
  },
  {
    label: '30 days ago',
    value: '30d',
  },
  {
    label: 'All time',
    value: 'All',
  },
];

const filterActivityByPeriod = (data: ApplicationActivity[], period: string) => {
  if (period === 'All') return data;
  const days = Number.parseInt(period);
  return data.slice(-days);
};

export default function ApplicationActivityChart({ data }: ApplicationActivityChartProps) {
  const [period, setPeriod] = useState<ActivityPeriod>('14d');

  const filteredData = filterActivityByPeriod(data, period);

  return (
    <section className="flex-3 border p-3 rounded-lg bg-white space-y-3">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl leading-5 mt-1 font-semibold">Applications activity</h2>
          <p className="text-sm text-gray-700">Number of applications sent</p>
        </div>

        <Selector items={periods} value={period} onValueChange={setPeriod} />
      </div>

      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              minTickGap={24}
              tick={{
                fontSize: 13,
                fill: '#6B7280',
              }}
              tickFormatter={(value) => {
                const date = new Date(value);

                if (period === '7d' || period === '14d') {
                  return date.toLocaleDateString('en-US', {
                    weekday: 'short',
                  });
                }

                return date.toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                });
              }}
            />
            <YAxis width="auto" axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              cursor={{ fill: '#fafafa' }}
              labelFormatter={(label) =>
                new Date(label as string).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })
              }
              formatter={(value) => [value, 'Applications']}
            />
            <Bar dataKey="applications" fill="#93C5FD" radius={[6, 6, 0, 0]} maxBarSize={36} />{' '}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
