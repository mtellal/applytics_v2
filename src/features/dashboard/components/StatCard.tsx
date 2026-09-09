import {
  CalendarDays,
  FileText,
  Minus,
  MoveDownRight,
  MoveUpRight,
  Trophy,
  type LucideIcon,
} from 'lucide-react';

export type StatCardIconType = 'applications' | 'responses' | 'interviews' | 'offers';

export type IconType = {
  icon: LucideIcon;
  primary: string;
  secondary: string;
};

const StatCardIcons: Record<StatCardIconType, IconType> = {
  applications: {
    icon: FileText,
    primary: 'text-blue-400',
    secondary: 'bg-blue-100',
  },
  responses: {
    icon: MoveUpRight,
    primary: 'text-green-400',
    secondary: 'bg-green-100',
  },
  interviews: {
    icon: CalendarDays,
    primary: 'text-violet-400',
    secondary: 'bg-violet-100',
  },
  offers: {
    icon: Trophy,
    primary: 'text-yellow-500',
    secondary: 'bg-yellow-100',
  },
};

export type StatCardType = {
  type: StatCardIconType;
  value?: number;
  label?: string;
  growth?: number;
  compare?: string;
};

export default function StatCard({
  type = 'applications',
  value = 42,
  label = 'Applications',
  growth = 12,
  compare = 'last month',
}: StatCardType) {
  const icon = StatCardIcons[type];
  const Icon = icon.icon;
  return (
    <div className="bg-white flex gap-6 py-3 px-5 w-fit items-start border border-gray-200 rounded-xl">
      <div className={`${icon.primary} ${icon.secondary} p-3 rounded-lg`}>
        <Icon />
      </div>

      <div className="flex flex-col content-start leading-3">
        <div>
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-slate-800">{label}</p>
        </div>

        <div className="flex flex-col pt-2 text-sm text-slate-500 gap-0 leading-4">
          <div
            className={[
              'flex gap-1 text-sm items-center',
              growth > 0 ? 'text-green-700' : growth < 0 ? 'text-red-600' : '',
            ].join(' ')}
          >
            {growth > 0 ? (
              <MoveUpRight className="w-4 h-4" />
            ) : growth === 0 ? (
              <Minus className="w-4" />
            ) : (
              <MoveDownRight className="w-4" />
            )}
            <p>
              {growth > 0 ? '+' : ''}
              {growth}%
            </p>
          </div>
          <p>vs. {compare}</p>
        </div>
      </div>
    </div>
  );
}
