'use client';

import Th from '@/components/table/Th';
import SmartBarSkeleton from './SmartBarSkeleton';
import PaginationClient from '@/components/search/PaginationClient';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import PaginationIndicatorClient from '@/components/search/PaginationIndicatorClient';
import SmartBarList from './SmartBarList';
import { SmartBar } from '@/models/smartBar/SmartBar';
import { SmartBarIdAndIsPublic } from '@/lib/hooks/smartBar/useSmartBar';
import { useTranslations } from 'next-intl';

interface SmartBarTableProps {
  onSelect?: ({}: SmartBarIdAndIsPublic) => void;
  selectedSmartBars?: SmartBarIdAndIsPublic[];
  isLoading: boolean;
  error?: string;
  smartBars: SmartBar[];
  displaySmartBars: SmartBar[];
}

const SmartBarTable = ({
  onSelect,
  selectedSmartBars,
  isLoading,
  error,
  displaySmartBars,
  smartBars,
}: SmartBarTableProps) => {
  const t = useTranslations('SmartBar.list');

  return (
    <div className="mb-4 relative">
      {isLoading && <LoadingShimmer gradient="gray" roundedClassName="rounded-none" />}
      <table className="w-full">
        <thead>
          <tr className="border-y border-slate-900/10 bg-gray-50/50">
            {onSelect && <th></th>}
            <Th searchParamsValue="preview">{t('preview')}</Th>
            <Th searchParamsValue="time">{t('time')}</Th>
            <Th searchParamsValue="is-public">{t('published')}</Th>
            <Th>{t('actions')}</Th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <SmartBarSkeleton />}
          {!isLoading && (
            <SmartBarList smartBars={displaySmartBars} onSelect={onSelect} selectedSmartBars={selectedSmartBars} />
          )}
        </tbody>
      </table>
      {!isLoading && (!smartBars || smartBars.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItems')}</div>
      )}
      {smartBars && smartBars.length > 0 && (!displaySmartBars || displaySmartBars.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItemsMatchSearching')}</div>
      )}
      <ErrorTranslation error={error} />
      <div className="flex justify-between items-center mt-4 flex-wrap">
        <PaginationIndicatorClient itemName={t('itemName')} itemsLength={smartBars?.length} />
        <PaginationClient theme="primary" itemsLength={smartBars?.length} />
      </div>
    </div>
  );
};

export default SmartBarTable;
