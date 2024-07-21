import clsx from 'clsx/lite';
import ChevronRight from '../icon/ChevronRight';
import ChevronDoubleRight from '../icon/ChevronDoubleRight';
import ChevronDoubleLeft from '../icon/ChevronDoubleLeft';
import ChevronLeft from '../icon/ChevronLeft';
import { Link } from '@/navigation';
import { getPagination } from '@/lib/helpers/pagination/getPagination';

interface PaginationServerProps {
  redirectPath: (pageNumber: string | number) => string;
  currentPage: number;
  theme: 'black' | 'primary' | 'secondary';
  itemsLength: number;
  itemsPerPage: number;
}

const PaginationServer = ({ redirectPath, currentPage, theme, itemsLength, itemsPerPage }: PaginationServerProps) => {
  const { shortPageNumbers, longPageNumbers, totalPageCount } = getPagination({
    currentPage,
    itemsLength,
    itemsPerPage,
  });

  return (
    <div className="flex items-center gap-1">
      <span className="hidden sm:block">
        <Link
          href={redirectPath(1)}
          className="flex justify-center items-center text-xs size-7 md:size-8 rounded-md text-center border border-gray-500/50 hover:bg-gray-500/10 active:bg-gray-500/20"
        >
          <ChevronDoubleLeft sizeClassName="size-2.5 md:size-3" />
        </Link>
      </span>
      <span>
        <Link
          href={redirectPath(currentPage - 1 < 1 ? 1 : currentPage - 1)}
          className="flex justify-center items-center text-xs size-7 md:size-8 rounded-md text-center border border-gray-500/50 hover:bg-gray-500/10 active:bg-gray-500/20"
        >
          <ChevronLeft sizeClassName="size-2.5 md:size-3" />
        </Link>
      </span>
      {/* Page options for screen size > sm */}
      {longPageNumbers.map((pageNumber, index) => (
        <span key={index} className="hidden sm:block">
          {pageNumber !== '...' && (
            <Link
              href={redirectPath(pageNumber)}
              className={clsx(
                'flex justify-center items-center text-xs size-7 md:size-8 rounded-md',
                'border border-gray-500/50',
                pageNumber !== currentPage && 'hover:bg-gray-500/10 active:bg-gray-500/20',
                pageNumber === currentPage && 'text-white',
                pageNumber === currentPage && theme === 'black' && 'bg-black',
                pageNumber === currentPage && theme === 'primary' && 'bg-primary-bg',
                pageNumber === currentPage && theme === 'secondary' && 'bg-secondary-bg'
              )}
            >
              {pageNumber}
            </Link>
          )}
          {pageNumber === '...' && (
            <span className="flex justify-center items-center text-xs size-7 md:size-8 rounded-md">{pageNumber}</span>
          )}
        </span>
      ))}
      {shortPageNumbers.map((pageNumber, index) => (
        <span key={index} className="block sm:hidden">
          {pageNumber !== '...' && (
            <Link
              href={redirectPath(pageNumber)}
              className={clsx(
                'flex justify-center items-center text-xs size-7 md:size-8 rounded-md',
                'border border-gray-500/50',
                pageNumber !== currentPage && 'hover:bg-gray-500/10 active:bg-gray-500/20',
                pageNumber === currentPage && 'text-white',
                pageNumber === currentPage && theme === 'black' && 'bg-black',
                pageNumber === currentPage && theme === 'primary' && 'bg-primary-bg',
                pageNumber === currentPage && theme === 'secondary' && 'bg-secondary-bg'
              )}
            >
              {pageNumber}
            </Link>
          )}
          {pageNumber === '...' && (
            <span className="flex justify-center items-center text-xs size-7 md:size-8 rounded-md">{pageNumber}</span>
          )}
        </span>
      ))}
      <span>
        <Link
          href={redirectPath(currentPage + 1 > totalPageCount ? totalPageCount : currentPage + 1)}
          className="flex justify-center items-center text-xs size-7 md:size-8 rounded-md text-center border border-gray-500/50 hover:bg-gray-500/10 active:bg-gray-500/20"
        >
          <ChevronRight sizeClassName="size-2.5 md:size-3" />
        </Link>
      </span>
      <span className="hidden sm:block">
        <Link
          href={redirectPath(totalPageCount)}
          className="flex justify-center items-center text-xs size-7 md:size-8 rounded-md text-center border border-gray-500/50 hover:bg-gray-500/10 active:bg-gray-500/20"
        >
          <ChevronDoubleRight sizeClassName="size-2.5 md:size-3" />
        </Link>
      </span>
    </div>
  );
};

export default PaginationServer;
