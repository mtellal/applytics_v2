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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const selectedItem = items.find((item) => item.value === value);

  return (
    <SelectRechart
      items={items}
      value={value}
      onValueChange={(item) => item && onValueChange(item as ActivityPeriod)}
    >
      <SelectTrigger className="w-30">
        <SelectValue>
          {selectedItem ? t(selectedItem.label) : t('ApplicationActivity.periods.all')}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t('common.period')}</SelectLabel>

          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {t(item.label)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </SelectRechart>
  );
}
