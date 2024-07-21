'use client';

import clsx from 'clsx/lite';
import ChevronRight from '../icon/ChevronRight';
import ChevronDoubleRight from '../icon/ChevronDoubleRight';
import ChevronDoubleLeft from '../icon/ChevronDoubleLeft';
import ChevronLeft from '../icon/ChevronLeft';
import { usePage } from '@/lib/hooks/page/usePage';
import { useSearchParams } from 'next/navigation';
import { getPagination } from '@/lib/helpers/pagination/getPagination';

interface PaginationClientProps {
  theme: 'black' | 'primary' | 'secondary';
  itemsLength?: number;
  itemsPerPage?: number;
  searchParamsKey?: string;
}

const PaginationClient = ({ theme, itemsLength, itemsPerPage, searchParamsKey }: PaginationClientProps) => {
  const searchParams = useSearchParams();
  const limit = +(searchParams.get('limit') ?? itemsPerPage ?? 10);

  const modifiedItemsLength = itemsLength ?? 1;
  const totalPageCount = Math.max(Math.ceil(modifiedItemsLength / limit), 1);

  const { currentPage, goToFirstPage, goToLastPage, incrementPage, decrementPage, setPageNumber } = usePage(
    totalPageCount,
    searchParamsKey
  );

  const { shortPageNumbers, longPageNumbers } = getPagination({
    currentPage,
    itemsLength: modifiedItemsLength,
    itemsPerPage: limit,
  });

  return (
    <div className="flex items-center gap-1">
      <span className="hidden sm:block">
        <button
          onClick={() => goToFirstPage()}
          className="flex justify-center items-center text-xs size-7 md:size-8 rounded-md text-center border border-gray-500/50 hover:bg-gray-500/10 active:bg-gray-500/20"
        >
          <ChevronDoubleLeft sizeClassName="size-2.5 md:size-3" />
        </button>
      </span>
      <span>
        <button
          onClick={() => decrementPage()}
          className="flex justify-center items-center text-xs size-7 md:size-8 rounded-md text-center border border-gray-500/50 hover:bg-gray-500/10 active:bg-gray-500/20"
        >
          <ChevronLeft sizeClassName="size-2.5 md:size-3" />
        </button>
      </span>
      {longPageNumbers.map((pageNumber, index) => (
        <span key={index} className="hidden sm:block">
          <button
            onClick={typeof pageNumber === 'number' ? () => setPageNumber(pageNumber) : undefined}
            disabled={pageNumber === '...'}
            className={clsx(
              'flex justify-center items-center text-xs size-7 md:size-8 rounded-md',
              pageNumber !== '...' && 'border border-gray-500/50',
              pageNumber !== '...' && pageNumber !== currentPage && 'hover:bg-gray-500/10 active:bg-gray-500/20',
              pageNumber === currentPage && 'text-white',
              pageNumber === currentPage && theme === 'black' && 'bg-black',
              pageNumber === currentPage && theme === 'primary' && 'bg-primary-bg',
              pageNumber === currentPage && theme === 'secondary' && 'bg-secondary-bg'
            )}
          >
            {pageNumber}
          </button>
        </span>
      ))}
      {shortPageNumbers.map((pageNumber, index) => (
        <span key={index} className="block sm:hidden">
          <button
            onClick={typeof pageNumber === 'number' ? () => setPageNumber(pageNumber) : undefined}
            disabled={pageNumber === '...'}
            className={clsx(
              'flex justify-center items-center text-xs size-7 md:size-8 rounded-md',
              pageNumber !== '...' && 'border border-gray-500/50',
              pageNumber !== '...' && pageNumber !== currentPage && 'hover:bg-gray-500/10 active:bg-gray-500/20',
              pageNumber === currentPage && 'text-white',
              pageNumber === currentPage && theme === 'black' && 'bg-black',
              pageNumber === currentPage && theme === 'primary' && 'bg-primary-bg',
              pageNumber === currentPage && theme === 'secondary' && 'bg-secondary-bg'
            )}
          >
            {pageNumber}
          </button>
        </span>
      ))}
      <span>
        <button
          onClick={() => incrementPage()}
          className="flex justify-center items-center text-xs size-7 md:size-8 rounded-md text-center border border-gray-500/50 hover:bg-gray-500/10 active:bg-gray-500/20"
        >
          <ChevronRight sizeClassName="size-2.5 md:size-3" />
        </button>
      </span>
      <span className="hidden sm:block">
        <button
          onClick={() => goToLastPage()}
          className="flex justify-center items-center text-xs size-7 md:size-8 rounded-md text-center border border-gray-500/50 hover:bg-gray-500/10 active:bg-gray-500/20"
        >
          <ChevronDoubleRight sizeClassName="size-2.5 md:size-3" />
        </button>
      </span>
    </div>
  );
};

export default PaginationClient;
