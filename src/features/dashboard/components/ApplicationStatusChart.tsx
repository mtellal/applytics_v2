import { applicationStatusConfig } from '@/constants/statusVisual';
import type { ApplicationStatus, ApplicationStatusDistribution } from '@/models/applications';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Sector, type PieSectorShapeProps } from 'recharts';

const renderStatusShape = (props: PieSectorShapeProps) => {
  const status: ApplicationStatus = props.name as ApplicationStatus;
  const config = applicationStatusConfig[status];
  return <Sector {...props} fill={config.color} tabIndex={-1} style={{ outline: 'none' }} />;
};

type ApplicationStatusChartProps = {
  data: ApplicationStatusDistribution[];
};

export default function ApplicationStatusChart({ data }: ApplicationStatusChartProps) {
  const totalApplications = data.reduce((total, item) => total + item.count, 0);

  const { t } = useTranslation();

  return (
    <section className="flex-2 border p-3  pb-0 rounded-lg bg-white">
      <h2 className="text-lg leading-5 mt-1 font-semibold">{t('ApplicationStatusChart.title')}</h2>

      <div className="flex flex-1  items-center ">
        <div className="relative flex flex-1 items-center">
          <PieChart
            responsive
            accessibilityLayer={false}
            style={{
              width: '100%',
              aspectRatio: 1,
            }}
          >
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              outerRadius="80%"
              innerRadius="60%"
              isAnimationActive={false}
              shape={renderStatusShape}
            />
          </PieChart>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-gray-900">{totalApplications}</span>

            <span className="text-xs text-gray-500">{t('_Applications')}</span>
          </div>
        </div>

        <ul className="flex flex-col flex-1  pl-2 h-full gap-2 justify-center">
          {data.map((item) => {
            return (
              <li
                key={item.status}
                className="flex items-center gap-2 text-sm font-medium text-gray-600  "
              >
                <div
                  className={`h-2.5 w-2.5 rounded-full ${applicationStatusConfig[item.status].dotClass}`}
                ></div>
                <span className="flex-1">{t(`applicationsCards.${item.status}.label`)}</span>
                <span className="w-8 text-right font-semibold text-gray-900">{item.count}</span>
                <span className="w-10 text-right">
                  {totalApplications
                    ? `${Math.round((item.count / totalApplications) * 100)}%`
                    : ''}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
