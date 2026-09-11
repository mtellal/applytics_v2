import type { LucideIcon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SelectOption<T extends string> = {
  label: string;
  value: T;
};

type FormInputSelectProps<T extends string> = {
  label: string;
  value: T;
  options: SelectOption<T>[];
  placeholder?: string;
  required?: boolean;
  icon?: LucideIcon;
  onValueChange: (value: T) => void;
};

export default function FormInputSelect<T extends string>({
  label,
  value,
  options,
  placeholder,
  required = false,
  icon: Icon,
  onValueChange,
}: FormInputSelectProps<T>) {
  return (
    <div className="space-y-2">
      <label>
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <Select value={value} onValueChange={(value) => onValueChange(value as T)}>
        <SelectTrigger className="w-full">
          {Icon && <Icon className="mr-2 size-4 text-gray-500" />}

          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent alignItemWithTrigger={false}>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
