import {
  Select as SelectRechart,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import type { ActivityPeriod } from '@/features/dashboard/types/types';

type BaseData = {
  label: string;
  value: string;
};

type SelectorProps = {
  items: BaseData[];
  value: string;
  onValueChange: (value: ActivityPeriod) => void;
};

export default function Selector({ items, value, onValueChange }: SelectorProps) {
  return (
    <SelectRechart
      items={items}
      value={value}
      onValueChange={(item) => item && onValueChange(item as ActivityPeriod)}
    >
      <SelectTrigger className="w-30">
        <SelectValue placeholder="Period" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Period</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value} onClick={(item) => console.log(item)}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectRechart>
  );
}
