import { Search } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

type SearchBarProps = {
  label?: string;
  value: string;
  onChange: (s: string) => void;
  onSearch?: (s: string) => void;
};

export default function Searchbar({
  label = 'ApplicationFilters.searchBar',
  value,
  onChange,
  onSearch,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        inputRef.current?.blur();
        onSearch?.(value);
      }}
      className="h-full flex gap-3 bg-white border items-center px-3 rounded-lg"
    >
      <Search className="h-5 w-5 text-gray-500" />
      <input
        ref={inputRef}
        className="h-full  w-full outline-none text-base text-gray-800 placeholder:text-gray-500"
        placeholder={t(label)}
        value={value}
        onChange={(e) => {
          if (e) onChange(e.target.value);
        }}
      />
    </form>
  );
}
