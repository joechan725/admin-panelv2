'use client';

import Th from '@/components/table/Th';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import CategorySkeleton from './CategorySkeleton';
import { searchAndOrderCategories } from './searchAndOrderCategories';
import { useSearchParams } from 'next/navigation';
import { PrivateCategory } from '@/models/classification/category/PrivateCategory';
import CategoryList from './CategoryList';
import { useLocale, useTranslations } from 'next-intl';

interface CategoryTableProps {
  privateCategories: PrivateCategory[];
  isLoading: boolean;
  onSelect?: (id: string) => void;
  selectedCategoryIds?: string[];
}

const CategoryTable = ({ privateCategories, isLoading, onSelect, selectedCategoryIds }: CategoryTableProps) => {
  const t = useTranslations('Category.list');
  const locale = useLocale();

  const searchParams = useSearchParams();

  const displayCategories = searchAndOrderCategories({ searchParams, privateCategories, locale });

  return (
    <div className="mb-4 relative">
      {isLoading && <LoadingShimmer gradient="gray" roundedClassName="rounded-none" />}
      <table className="w-full">
        <thead>
          <tr className="border-y border-slate-900/10 bg-gray-50/50">
            {onSelect && <th></th>}
            {/* name */}
            <Th searchParamsValue="name">{t('category')}</Th>
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
          {isLoading && <CategorySkeleton />}
          {!isLoading && (
            <CategoryList
              categories={displayCategories}
              onSelect={onSelect}
              selectedCategoryIds={selectedCategoryIds}
            />
          )}
        </tbody>
      </table>
      {!isLoading && (!displayCategories || displayCategories.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noCategories')}</div>
      )}
      {displayCategories && displayCategories.length > 0 && (!displayCategories || displayCategories.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noCategoriesMatchSearching')}</div>
      )}
    </div>
  );
};

export default CategoryTable;
