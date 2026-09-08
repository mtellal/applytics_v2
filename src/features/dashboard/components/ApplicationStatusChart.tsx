import type { ApplicationStatus, ApplicationStatusDistribution } from '../types/types';

import { PieChart, Pie, Label, Cell, Sector, type PieSectorShapeProps } from 'recharts';

type ApplicationStatusChartProps = {
  data: ApplicationStatusDistribution[];
};

type ApplicationStatusConfig = {
  label: string;
  color: string;
  dotClass: string;
};

const applicationStatusConfig: Record<ApplicationStatus, ApplicationStatusConfig> = {
  'in-progress': {
    label: 'In progress',
    color: '#3B82F6',
    dotClass: 'bg-blue-500',
  },
  interview: {
    label: 'Interviews',
    color: '#8B5CF6',
    dotClass: 'bg-violet-500',
  },
  offer: {
    label: 'Offers',
    color: '#22C55E',
    dotClass: 'bg-green-500',
  },
  rejected: {
    label: 'Rejected',
    color: '#EF4444',
    dotClass: 'bg-red-500',
  },
};

const renderStatusShape = (props: PieSectorShapeProps) => {
  const status: ApplicationStatus = props.name as ApplicationStatus;
  const config = applicationStatusConfig[status];
  return <Sector {...props} fill={config.color} />;
};

type CenterLabelProps = {
  cx: number;
  cy: number;
  total: number;
};

function CenterLabel({ cx, cy, total }: CenterLabelProps) {
  return (
    <g>
      <text
        x={cx}
        y={cy - 5}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-gray-900 text-2xl font-semibold"
      >
        {total}
      </text>

      <text
        x={cx}
        y={cy + 18}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-gray-500 text-xs"
      >
        Applications
      </text>
    </g>
  );
}

export default function ApplicationStatusChart({ data }: ApplicationStatusChartProps) {
  const totalApplications = data.reduce((total, item) => total + item.count, 0);

  return (
    <section className="flex-2 border p-3  rounded-lg bg-white">
      <h2 className="text-lg leading-5 mt-1 font-semibold">Status applications</h2>

      <div className="flex flex-1 h-full items-center">
        <div className="relative flex flex-1 items-center">
          <PieChart
            responsive
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

            <span className="text-xs text-gray-500">Applications</span>
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
                <span className="flex-1">{item.status}</span>
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
