import FilterSelect from '@/components/ui/FilterSelect';
import Searchbar from '@/components/ui/SearchBar';
import { ArrowUpDown, BriefcaseBusiness, Star } from 'lucide-react';
import type { FieldFilter } from '../types/types';

export const statusOptions = [
  {
    label: 'All statuses',
    value: 'all',
  },
  {
    label: 'In progress',
    value: 'in-progress',
  },
  {
    label: 'Interview',
    value: 'interview',
  },
  {
    label: 'Offer',
    value: 'offer',
  },
  {
    label: 'Rejected',
    value: 'rejected',
  },
];

export const fieldOptions: Array<{ label: string; value: FieldFilter }> = [
  {
    label: 'All positions',
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
    label: 'Most recent',
    value: 'newest',
  },
  {
    label: 'Oldest',
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
    <section className="flex gap-2">
      <div className="flex-1">
        <Searchbar value={value} onChange={onValueChange} onSearch={onSearch} />
      </div>
      <div className="flex flex-2 gap-2">
        <FilterSelect
          label="Status"
          icon={Star}
          value={status}
          onValueChange={onStatusChange}
          options={statusOptions}
        />
        <FilterSelect
          label="Position"
          icon={BriefcaseBusiness}
          value={field}
          onValueChange={onFieldChange}
          options={fieldOptions}
        />
        <FilterSelect
          label="Sort"
          icon={ArrowUpDown}
          value={sort}
          onValueChange={onSort}
          options={sortOptions}
        />
      </div>
    </section>
  );
}
