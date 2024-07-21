'use client';

import { useSearching } from '@/lib/hooks/searchParam/useSearching';
import { useEffect, useState } from 'react';

interface SelectSearchProps {
  searchParamsKey: string;
  selectOptions: {
    option: string;
    searchParamsValue: string;
  }[];
  title?: string;
}

const SelectSearch = ({ searchParamsKey, selectOptions, title }: SelectSearchProps) => {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const { searchParams, loadSetSearchParams, loadRemoveSearchParams } = useSearching();

  const currentValue = searchParams.get(searchParamsKey) ?? undefined;

  useEffect(() => {
    if (currentValue === undefined) {
      setSearchQuery(currentValue);
    }
  }, [currentValue]);

  useEffect(() => {
    if (searchQuery) {
      let modifiedSearchQuery = searchQuery.trim();
      if (
        modifiedSearchQuery.toLowerCase() === searchParamsKey.toLowerCase() ||
        modifiedSearchQuery.toLowerCase() === title?.toLowerCase()
      ) {
        loadRemoveSearchParams({
          key: searchParamsKey,
        });
        return;
      }
      loadSetSearchParams({
        key: searchParamsKey,
        value: modifiedSearchQuery,
      });
      return;
    }
    loadRemoveSearchParams({
      key: searchParamsKey,
    });
  }, [searchQuery]);

  return (
    <select
      className="text-sm md:text-base font-medium text-primary-text relative flex gap-4 items-center px-4 min-w-max w-full py-2 rounded-md border focus:border-gray-500 focus:ring-gray-500/50 focus:ring-1 focus:outline-none scrollbar scrollbar-slate"
      onChange={(e) => setSearchQuery(e.target.value)}
      value={searchQuery}
    >
      {title && <option className="font-medium">{title}</option>}
      {selectOptions.length > 0 &&
        selectOptions.map(({ searchParamsValue, option }) => (
          <option key={searchParamsValue} value={searchParamsValue} className="font-medium">
            {option}
          </option>
        ))}
    </select>
  );
};

export default SelectSearch;
