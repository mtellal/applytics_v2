import type { LucideIcon } from 'lucide-react';

export type InformationCardType = {
  label: string;
  value: number;
  icon: LucideIcon;
  textColor: string;
  bgColor: string;
};

export default function InformationCard({
  label,
  value,
  icon: Icon,
  textColor,
  bgColor,
}: InformationCardType) {
  return (
    <section className="flex min-w-45 items-center gap-4 px-5 py-3 bg-white border rounded-lg">
      <Icon className={`h-10 w-10 p-2 rounded-lg ${textColor} ${bgColor}`} />
      <div className="flex flex-col">
        <span className="text-2xl font-semibold">{value}</span>
        <span className="text-gray-800">{label}</span>
      </div>
    </section>
  );
}
