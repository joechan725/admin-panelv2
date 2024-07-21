'use client';

import { useEffect, useRef, useState } from 'react';
import MagnifyingGlass from '../icon/MagnifyingGlass';
import { useSearching } from '@/lib/hooks/searchParam/useSearching';
import clsx from 'clsx/lite';

interface SearchQueryBarWithButtonProps {
  theme: 'black' | 'slate-dark';
  searchParamsKey?: string;
  placeholder: string;
}

const SearchQueryBarWithButton = ({
  theme,
  searchParamsKey = 'search',
  placeholder,
}: SearchQueryBarWithButtonProps) => {
  const { loadSetSearchParams, loadRemoveSearchParams, searchParams } = useSearching();

  const searchQueryData = searchParams.get(searchParamsKey) ?? '';

  // useState and useEffect are used to provide a smoother behavior for input with two-way-blinding
  const [searchQuery, setSearchQuery] = useState(searchQueryData);
  const inputRef = useRef<HTMLInputElement>(null);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(inputRef.current?.value ?? '');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative flex gap-4 items-center w-full rounded-md border has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1 overflow-hidden">
        <MagnifyingGlass sizeClassName="size-5" className="text-slate-600/80 ml-4" />
        <input
          defaultValue={searchQueryData}
          ref={inputRef}
          className="w-full focus:outline-none font-medium text-primary-text disabled:bg-transparent"
          placeholder={placeholder}
        />
        <button
          type="submit"
          className={clsx(
            'h-full px-4 py-2 text-white',
            theme === 'black' && 'bg-black hover:bg-black/85 active:bg-black/70',
            theme === 'slate-dark' && 'bg-slate-700 hover:bg-slate-700/85 active:bg-slate-700/70'
          )}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchQueryBarWithButton;
