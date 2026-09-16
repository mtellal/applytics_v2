import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ActivityPeriod, ApplicationActivity } from '../types/types';
import Selector from '@/components/ui/Selector';
import { useTranslation } from 'react-i18next';

type ApplicationActivityChartProps = {
  data: ApplicationActivity[];
};

const periods = [
  {
    label: 'ApplicationActivity.periods.7d',
    value: '7d',
  },
  {
    label: 'ApplicationActivity.periods.14d',
    value: '14d',
  },
  {
    label: 'ApplicationActivity.periods.30d',
    value: '30d',
  },
  {
    label: 'ApplicationActivity.periods.all',
    value: 'All',
  },
];

const filterActivityByPeriod = (data: ApplicationActivity[], period: string) => {
  if (period === 'All') return data;
  const days = Number.parseInt(period);
  return data.slice(-days);
};

export default function ApplicationActivityChart({ data }: ApplicationActivityChartProps) {
  const [period, setPeriod] = useState<ActivityPeriod>('all');

  const { t } = useTranslation();
  const filteredData = filterActivityByPeriod(data, period);

  return (
    <section className="flex-3 border p-3 rounded-lg bg-white space-y-3">
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl leading-5 mt-1 font-semibold">{t('ApplicationActivity.title')}</h2>
          <p className="text-sm text-gray-700">{t('ApplicationActivity.description')}</p>
        </div>

        <Selector items={periods} value={period} onValueChange={setPeriod} />
      </div>

      <div className="h-60 w-full [&_svg_*:focus]:outline-none">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData} accessibilityLayer={false}>
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
