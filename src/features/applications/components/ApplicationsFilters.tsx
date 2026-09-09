import FilterSelect from '@/components/ui/FilterSelect';
import Searchbar from '@/components/ui/SearchBar';
import { ArrowUpDown, BriefcaseBusiness, Star } from 'lucide-react';
import { useState } from 'react';

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

export const positionOptions = [
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

export default function ApplicationFilters() {
  const [position, setPosition] = useState('all');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('newest');
  const [searchValue, setSearchValue] = useState('');

  const onSearch = (input: string) => {
    console.log('Calling API to search ', input);
    setSearchValue('');
  };

  return (
    <section className="flex gap-2">
      <div className="flex-1">
        <Searchbar value={searchValue} onChange={setSearchValue} onSearch={onSearch} />
      </div>
      <div className="flex flex-2 gap-2">
        <FilterSelect
          label="Status"
          icon={Star}
          value={status}
          onValueChange={setStatus}
          options={statusOptions}
        />
        <FilterSelect
          label="Position"
          icon={BriefcaseBusiness}
          value={position}
          onValueChange={setPosition}
          options={positionOptions}
        />
        <FilterSelect
          label="Sort"
          icon={ArrowUpDown}
          value={sort}
          onValueChange={setSort}
          options={sortOptions}
        />
      </div>
    </section>
  );
}
