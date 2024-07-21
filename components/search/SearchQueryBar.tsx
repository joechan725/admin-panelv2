'use client';

import { useEffect, useState } from 'react';
import { useSearching } from '@/lib/hooks/searchParam/useSearching';
import clsx from 'clsx/lite';
import { useTranslations } from 'next-intl';

interface SearchQueryBarProps {
  href?: string;
  searchParamsKey?: string;
  placeholder?: string;
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
}

const SearchQueryBar = ({ href, searchParamsKey = 'search', placeholder, fontSize = 'base' }: SearchQueryBarProps) => {
  const t = useTranslations('Searching');

  const { loadSetSearchParams, loadRemoveSearchParams, searchParams, path, router } = useSearching();

  const searchQueryData = searchParams.get(searchParamsKey) ?? '';

  // useState and useEffect are used to provide a smoother behavior for input with two-way-blinding
  const [searchQuery, setSearchQuery] = useState(searchQueryData);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (href && path !== href && searchQuery !== '') {
        router.push(`${href}?${searchParamsKey}=${searchQuery}`);
        return;
      }

      if (searchQuery !== '') {
        loadSetSearchParams({ key: searchParamsKey, value: searchQuery });
        return;
      }
      loadRemoveSearchParams({ key: searchParamsKey });
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  return (
    <input
      value={searchQuery}
      className={clsx(
        fontSize === 'xs' && 'text-xs',
        fontSize === 'sm' && 'text-xs md:text-sm',
        fontSize === 'base' && 'text-sm md:text-base',
        fontSize === 'lg' && 'text-base md:text-lg',
        fontSize === 'xl' && 'text-base md:text-xl',
        fontSize === '2xl' && 'text-base md:text-2xl',
        'w-full focus:outline-none font-medium text-primary-text bg-transparent'
      )}
      placeholder={placeholder ?? t('searchBarPlaceholder')}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchQueryBar;
