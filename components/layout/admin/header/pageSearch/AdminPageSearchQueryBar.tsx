'use client';

import { KeyboardEvent, useEffect, useState } from 'react';
import { useSearching } from '@/lib/hooks/searchParam/useSearching';
import MagnifyingGlass from '@/components/icon/MagnifyingGlass';

interface AdminPageSearchQueryBarProps {
  sizeClassName?: string;
  searchParamsKey?: string;
  placeholder: string;
}

const AdminPageSearchQueryBar = ({
  sizeClassName,
  searchParamsKey = 'page-search',
  placeholder,
}: AdminPageSearchQueryBarProps) => {
  const { loadSetSearchParams, loadRemoveSearchParams, searchParams } = useSearching();

  const searchQueryData = searchParams.get(searchParamsKey) ?? '';

  // useState and useEffect are used to provide a smoother behavior for input with two-way-blinding
  const [searchQuery, setSearchQuery] = useState(searchQueryData);
  useEffect(() => {
    if (searchQuery) {
      loadSetSearchParams({ key: searchParamsKey, value: searchQuery });
    } else {
      loadRemoveSearchParams({ key: searchParamsKey });
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQueryData === '') {
      setSearchQuery('');
    }
  }, [searchQueryData]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setSearchQuery('');
    }
  };

  return (
    <div className={sizeClassName}>
      <div className="flex gap-4 items-center px-4 w-full py-2 rounded-md">
        <MagnifyingGlass sizeClassName="size-5" className="text-primary-text/80" />
        <input
          value={searchQuery}
          className="w-full focus:outline-none font-medium text-primary-text disabled:bg-transparent"
          placeholder={placeholder}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default AdminPageSearchQueryBar;
