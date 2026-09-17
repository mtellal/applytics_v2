import FilterSelect from '@/components/ui/FilterSelect';
import Searchbar from '@/components/ui/SearchBar';
import { ArrowUpDown, BriefcaseBusiness, Star } from 'lucide-react';
import type { FieldFilter } from '../types/types';

export const statusOptions = [
  {
    label: 'ApplicationFilters.statusOptions.all',
    value: 'all',
  },
  {
    label: 'ApplicationFilters.statusOptions.in-progress',
    value: 'in-progress',
  },
  {
    label: 'ApplicationFilters.statusOptions.interview',
    value: 'interview',
  },
  {
    label: 'ApplicationFilters.statusOptions.offer',
    value: 'offer',
  },
  {
    label: 'ApplicationFilters.statusOptions.rejected',
    value: 'rejected',
  },
];

export const fieldOptions: Array<{ label: string; value: FieldFilter }> = [
  {
    label: 'ApplicationFilters.fieldOptions.all',
    value: 'all',
  },
  {
    label: 'Frontend',
    value: 'frontend',
  },
  {
    label: 'Backend',
    value: 'backend',
  },
  {
    label: 'Full-stack',
    value: 'full-stack',
  },
  {
    label: 'Mobile',
    value: 'mobile',
  },
  {
    label: 'DevOps',
    value: 'devops',
  },
  {
    label: 'Cybersecurity',
    value: 'cybersecurity',
  },
];

export const sortOptions = [
  {
    label: 'ApplicationFilters.sortOptions.mostRecent',
    value: 'newest',
  },
  {
    label: 'ApplicationFilters.sortOptions.oldest',
    value: 'oldest',
  },
];

type ApplicationFiltersProps<T extends string, Y extends string, Z extends string> = {
  value: string;
  onValueChange: (s: string) => void;
  onSearch: (s: string) => void;
  sort: T;
  onSort: (s: T) => void;
  field: Y;
  onFieldChange: (f: Y) => void;
  status: Z;
  onStatusChange: (s: Z) => void;
};

export default function ApplicationFilters<T extends string, Y extends string, Z extends string>({
  value,
  onValueChange,
  onSearch,
  sort,
  onSort,
  field,
  onFieldChange,
  status,
  onStatusChange,
}: ApplicationFiltersProps<T, Y, Z>) {
  return (
    <section className="flex flex-col gap-2 lg:flex-row">
      <div className="w-full lg:flex-1">
        <Searchbar value={value} onChange={onValueChange} onSearch={onSearch} />
      </div>

      <div className="grid grid-cols-2 gap-2 md:flex md:flex-2">
        <FilterSelect
          label="ApplicationFilters.status"
          icon={Star}
          value={status}
          onValueChange={onStatusChange}
          options={statusOptions}
        />

        <FilterSelect
          label="ApplicationFilters.field"
          icon={BriefcaseBusiness}
          value={field}
          onValueChange={onFieldChange}
          options={fieldOptions}
        />

        <div className="col-span-2 lg:col-span-1">
          <FilterSelect
            label="ApplicationFilters.sort"
            icon={ArrowUpDown}
            value={sort}
            onValueChange={onSort}
            options={sortOptions}
          />
        </div>
      </div>
    </section>
  );
}
