'use client';

import { useSearching } from '@/lib/hooks/searchParam/useSearching';
import ChevronUp from '../icon/ChevronUp';
import ChevronDown from '../icon/ChevronDown';
import clsx from 'clsx/lite';

interface ThProps {
  children?: React.ReactNode;
  className?: string;
  searchParamsValue?: string;
  hidden?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const Th = ({ children, className, searchParamsValue, hidden }: ThProps) => {
  const { searchParams, loadSetSearchParams } = useSearching();

  let modifiedSearchParamsValue = searchParamsValue ? searchParamsValue.trim() : undefined;

  const orderBy = searchParams.get('orderby');
  const handleToggle = () => {
    if (modifiedSearchParamsValue) {
      if (orderBy && orderBy === modifiedSearchParamsValue + '-asc') {
        loadSetSearchParams({ key: 'orderby', value: modifiedSearchParamsValue + '-desc' });
      } else {
        loadSetSearchParams({ key: 'orderby', value: modifiedSearchParamsValue + '-asc' });
      }
    }
  };

  return (
    <th
      className={clsx(
        'p-2',
        className,
        hidden === 'sm' && 'hidden sm:table-cell',
        hidden === 'md' && 'hidden md:table-cell',
        hidden === 'lg' && 'hidden lg:table-cell',
        hidden === 'xl' && 'hidden xl:table-cell',
        hidden === '2xl' && 'hidden 2xl:table-cell'
      )}
    >
      <div
        className={clsx(
          'w-full text-left flex justify-between items-center',
          modifiedSearchParamsValue && 'hover:cursor-pointer'
        )}
        onClick={handleToggle}
      >
        <span className="text-sm font-semibold text-primary-text">{children}</span>
        {searchParamsValue && (
          <div>
            <ChevronUp
              sizeClassName="size-3"
              className={clsx(orderBy === modifiedSearchParamsValue + '-asc' ? 'text-black' : 'text-gray-400')}
            />
            <ChevronDown
              sizeClassName="size-3"
              className={clsx(orderBy === modifiedSearchParamsValue + '-desc' ? 'text-black' : 'text-gray-400')}
            />
          </div>
        )}
      </div>
    </th>
  );
};

export default Th;
