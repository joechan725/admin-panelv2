'use client';

import Th from '@/components/table/Th';
import PromotionSkeleton from './PromotionSkeleton';
import PaginationClient from '@/components/search/PaginationClient';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import PaginationIndicatorClient from '@/components/search/PaginationIndicatorClient';
import PromotionList from './PromotionList';
import { Promotion } from '@/models/promotion/Promotion';
import { useTranslations } from 'next-intl';

interface PromotionTableProps {
  isLoading: boolean;
  error?: string;
  promotions: Promotion[];
  displayPromotions: Promotion[];
}

const PromotionTable = ({ isLoading, error, displayPromotions, promotions }: PromotionTableProps) => {
  const t = useTranslations('Promotion.list');

  return (
    <div className="mb-4 relative">
      {isLoading && <LoadingShimmer gradient="gray" roundedClassName="rounded-none" />}
      <table className="w-full">
        <thead>
          <tr className="border-y border-slate-900/10 bg-gray-50/50">
            {/* Promotion Type */}
            <Th />
            {/* Receivers */}
            <Th>{t('receivers')}</Th>
            {/* Subject & Content */}
            <Th className="max-w-screen-md w-full line-clamp-1 text-ellipsis">{t('email')}</Th>
            {/* Time */}
            <Th searchParamsValue="time">{t('sent')}</Th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <PromotionSkeleton />}
          {!isLoading && <PromotionList promotions={displayPromotions} />}
        </tbody>
      </table>
      {!isLoading && (!promotions || promotions.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItems')}</div>
      )}
      {promotions && promotions.length > 0 && (!displayPromotions || displayPromotions.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItemsMatchSearching')}</div>
      )}
      <ErrorTranslation error={error} />
      <div className="flex justify-between items-center mt-4 flex-wrap">
        <PaginationIndicatorClient itemName={t('itemName')} itemsLength={promotions?.length} />
        <PaginationClient theme="primary" itemsLength={promotions?.length} />
      </div>
    </div>
  );
};

export default PromotionTable;
