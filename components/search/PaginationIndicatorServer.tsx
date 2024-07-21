import { useTranslations } from 'next-intl';

interface PaginationIndicatorServerProps {
  itemsLength: number | undefined;
  itemName: string;
  currentPage: number;
  itemsPerPage: number;
}

const PaginationIndicatorServer = ({
  itemsLength,
  itemName,
  currentPage,
  itemsPerPage,
}: PaginationIndicatorServerProps) => {
  const t = useTranslations('Pagination');

  const modifiedItemsLength = itemsLength ?? 1;

  const start = Math.min((currentPage - 1) * itemsPerPage + 1, modifiedItemsLength);

  const end = Math.min(currentPage * itemsPerPage, modifiedItemsLength);

  return (
    <div className="text-xs font-medium text-secondary-text">
      {t('indicator', { start, end, itemsLength, itemName })}
    </div>
  );
};

export default PaginationIndicatorServer;
