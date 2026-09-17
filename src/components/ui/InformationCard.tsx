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
    <section className="w-full max-w-60 flex items-center gap-4 rounded-lg border bg-white px-5 py-3">
      <Icon className={`size-10 p-2 rounded-lg ${textColor} ${bgColor}`} />
      <div className="flex flex-col">
        <span className="text-2xl font-semibold">{value}</span>
        <span className="text-gray-800">{label}</span>
      </div>
    </section>
  );
}
