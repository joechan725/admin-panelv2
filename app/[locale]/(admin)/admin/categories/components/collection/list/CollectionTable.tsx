'use client';

import Th from '@/components/table/Th';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import CollectionSkeleton from './CollectionSkeleton';
import { searchAndOrderCollections } from './searchAndOrderCollections';
import { useSearchParams } from 'next/navigation';
import { PrivateCollection } from '@/models/classification/collection/PrivateCollection';
import CollectionList from './CollectionList';
import { useLocale, useTranslations } from 'next-intl';

interface CollectionTableProps {
  privateCollections: PrivateCollection[];
  isLoading: boolean;
  onSelect?: (id: string) => void;
  selectedCollectionIds?: string[];
}

const CollectionTable = ({ privateCollections, isLoading, onSelect, selectedCollectionIds }: CollectionTableProps) => {
  const t = useTranslations('Category.list');
  const locale = useLocale();

  const searchParams = useSearchParams();

  const displayCollections = searchAndOrderCollections({ searchParams, privateCollections, locale });

  return (
    <div className="mb-4 relative">
      {isLoading && <LoadingShimmer gradient="gray" roundedClassName="rounded-none" />}
      <table className="w-full">
        <thead>
          <tr className="border-y border-slate-900/10 bg-gray-50/50">
            {onSelect && <th></th>}
            {/* name */}
            <Th searchParamsValue="name">{t('collection')}</Th>
            {/* totalProductCount */}
            <Th searchParamsValue="totalProductCount">{t('totalProducts')}</Th>
            {/* publicProductCount */}
            <Th searchParamsValue="publicProductCount">{t('publicProducts')}</Th>
            {/* privateProductCount */}
            <Th searchParamsValue="privateProductCount">{t('privateProducts')}</Th>
            {/* revenue */}
            <Th searchParamsValue="revenue">{t('revenue')}</Th>
            {/* sales */}
            <Th searchParamsValue="sales">{t('sales')}</Th>
            {/* time */}
            <Th searchParamsValue="updatedAt">{t('editTime')}</Th>
            {/* actions */}
            <Th>{t('actions')}</Th>
          </tr>
        </thead>
        <tbody>
          {isLoading && <CollectionSkeleton />}
          {!isLoading && (
            <CollectionList
              collections={displayCollections}
              onSelect={onSelect}
              selectedCollectionIds={selectedCollectionIds}
            />
          )}
        </tbody>
      </table>
      {!isLoading && (!displayCollections || displayCollections.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noCollections')}</div>
      )}
      {displayCollections &&
        displayCollections.length > 0 &&
        (!displayCollections || displayCollections.length === 0) && (
          <div className="p-2 text-sm font-medium text-secondary-text">{t('noCollectionsMatchSearching')}</div>
        )}
    </div>
  );
};

export default CollectionTable;
