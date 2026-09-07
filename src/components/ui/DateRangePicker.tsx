import { Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import type { DateRange } from '@daypicker/react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Calendar } from './calendar';
import { useState } from 'react';

export default function DateRangePicker() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: sevenDaysAgo,
    to: new Date(),
  });

  return (
    <Popover>
      <PopoverTrigger>
        <button className="cursor-pointer flex items-center gap-3 border bg-white p-2 rounded-lg border-gray-200 text-gray-700 text-sm">
          <CalendarIcon />
          <div className="flex gap-1">
            <span>
              {dateRange?.from?.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
            <span>-</span>
            <span>
              {dateRange?.to?.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
          <ChevronDown className="w-4" />
        </button>
        <PopoverContent className="w-auto" align="end">
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
          />
        </PopoverContent>
      </PopoverTrigger>
    </Popover>
  );
}
