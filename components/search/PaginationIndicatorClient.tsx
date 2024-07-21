'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

interface PaginationIndicatorClientProps {
  itemsLength: number | undefined;
  itemName: string;
  itemsPerPage?: number;
  searchParamsKey?: string;
}

const PaginationIndicatorClient = ({
  itemsLength,
  itemName,
  itemsPerPage,
  searchParamsKey = 'page',
}: PaginationIndicatorClientProps) => {
  const t = useTranslations('Pagination');
  const modifiedItemsLength = itemsLength ?? 1;
  const searchParams = useSearchParams();
  const currentPage = +(searchParams.get(searchParamsKey) ?? 1);
  const limit = +(searchParams.get('limit') ?? itemsPerPage ?? 10);

  const start = Math.min((currentPage - 1) * limit + 1, modifiedItemsLength);

  const end = Math.min(currentPage * limit, modifiedItemsLength);

  return (
    <div className="text-xs font-medium text-secondary-text">
      {t('indicator', { start, end, itemsLength, itemName })}
    </div>
  );
};

export default PaginationIndicatorClient;
