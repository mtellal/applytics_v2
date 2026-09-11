import { ArrowUpDown, type LucideIcon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FilterOption = {
  label: string;
  value: string;
};

type FilterSelectProps<T extends string> = {
  label: string;
  icon: LucideIcon;
  value: T;
  options: FilterOption[];
  onValueChange: (value: T) => void;
};

export default function FilterSelect<T extends string>({
  label,
  icon: Icon,
  value,
  options,
  onValueChange,
}: FilterSelectProps<T>) {
  return (
    <Select value={value} onValueChange={(d) => (d ? onValueChange(d) : '')}>
      <SelectTrigger className="bg-white min-w-48 px-4 py-6">
        <div className="flex items-center gap-3">
          <Icon className="size-6 text-gray-600" />
          <div className="flex flex-col items-start">
            <span className="text-xs text-gray-500">{label}</span>
            <SelectValue />
          </div>
        </div>
      </SelectTrigger>

      <SelectContent alignItemWithTrigger={false}>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer rounded-md px-3 py-2 text-sm text-gray-700"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
