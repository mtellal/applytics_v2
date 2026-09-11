import type { ComponentProps } from 'react';
import type { LucideIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormInputProps = ComponentProps<typeof Input> & {
  label: string;
  icon?: LucideIcon;
};

export default function FormInput({
  label,
  icon: Icon,
  required = false,
  id,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>

      <div className="relative">
        {Icon && <Icon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />}

        <Input
          id={id}
          required={required}
          className={`${Icon ? 'pl-9' : ''} ${className ?? ''}`}
          {...props}
        />
      </div>
    </div>
  );
}
