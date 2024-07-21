import { Suspense } from 'react';
import MagnifyingGlass from '../icon/MagnifyingGlass';
import SearchQueryBar from './SearchQueryBar';

interface SearchQueryBarSuspenseProps {
  href?: string;
  sizeClassName?: string;
  searchParamsKey?: string;
  placeholder?: string;
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
}

const SearchQueryBarSuspense = ({
  placeholder,
  href,
  searchParamsKey,
  sizeClassName,
  fontSize,
}: SearchQueryBarSuspenseProps) => {
  return (
    <div className={sizeClassName}>
      <div className="relative flex gap-4 items-center px-4 w-full py-2 rounded-md border has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1">
        <MagnifyingGlass sizeClassName="size-5" className="text-slate-600/80" />
        <Suspense>
          <SearchQueryBar placeholder={placeholder} href={href} searchParamsKey={searchParamsKey} fontSize={fontSize} />
        </Suspense>
      </div>
    </div>
  );
};

export default SearchQueryBarSuspense;
