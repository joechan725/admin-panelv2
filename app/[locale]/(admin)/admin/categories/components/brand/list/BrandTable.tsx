'use client';

import Th from '@/components/table/Th';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import BrandSkeleton from './BrandSkeleton';
import { searchAndOrderBrands } from './searchAndOrderBrands';
import { useSearchParams } from 'next/navigation';
import { PrivateBrand } from '@/models/classification/brand/PrivateBrand';
import BrandList from './BrandList';
import { useLocale, useTranslations } from 'next-intl';

interface BrandTableProps {
  privateBrands: PrivateBrand[];
  isLoading: boolean;
  onSelect?: (id: string) => void;
  selectedBrandIds?: string[];
}

const BrandTable = ({ privateBrands, isLoading, onSelect, selectedBrandIds }: BrandTableProps) => {
  const t = useTranslations('Category.list');
  const locale = useLocale();

  const searchParams = useSearchParams();

  const displayBrands = searchAndOrderBrands({ searchParams, privateBrands, locale });

  return (
    <div className="mb-4 relative">
      {isLoading && <LoadingShimmer gradient="gray" roundedClassName="rounded-none" />}
      <table className="w-full">
        <thead>
          <tr className="border-y border-slate-900/10 bg-gray-50/50">
            {onSelect && <th></th>}
            {/* name */}
            <Th searchParamsValue="name">{t('brand')}</Th>
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
          {isLoading && <BrandSkeleton />}
          {!isLoading && <BrandList onSelect={onSelect} brands={displayBrands} selectedBrandIds={selectedBrandIds} />}
        </tbody>
      </table>
      {!isLoading && (!privateBrands || privateBrands.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noBrands')}</div>
      )}
      {privateBrands && privateBrands.length > 0 && (!displayBrands || displayBrands.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noBrandsMatchSearching')}</div>
      )}
    </div>
  );
};

export default BrandTable;
