'use client';

import Th from '@/components/table/Th';
import PaginationClient from '@/components/search/PaginationClient';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import PaginationIndicatorClient from '@/components/search/PaginationIndicatorClient';
import DeliveryOptionSkeleton from './DeliveryOptionSkeleton';
import DeliveryOptionList from './DeliveryOptionList';
import TrHead from '@/components/table/TrHead';
import { PrivateDeliveryOption } from '@/models/deliveryOption/PrivateDeliveryOption';
import { useTranslations } from 'next-intl';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface DeliveryOptionTableProps {
  displayDeliveryOptions: PrivateDeliveryOption[];
  privateDeliveryOptions: PrivateDeliveryOption[];
  isLoading: boolean;
  error?: string;
  onSelect?: (id: string) => void;
  selectedDeliveryOptionIds?: string[];
}
const DeliveryOptionTable = ({
  displayDeliveryOptions,
  privateDeliveryOptions,
  isLoading,
  error,
  onSelect,
  selectedDeliveryOptionIds,
}: DeliveryOptionTableProps) => {
  const t = useTranslations('DeliveryOption.list');

  return (
    <div className="mb-4 relative">
      {isLoading && <LoadingShimmer gradient="gray" roundedClassName="rounded-none" />}
      <table className="w-full">
        <thead>
          <TrHead>
            {onSelect && <th></th>}
            {/* name */}
            <Th searchParamsValue="name">{t('deliveryOption')}</Th>
            {/* deliveryCharge */}
            <Th searchParamsValue="delivery-charge">
              <div>{t('deliveryCharge')}</div>
            </Th>
            {/* freeDeliveryThreshold */}
            <Th searchParamsValue="free-delivery-threshold">
              <div>{t('freeDeliveryThreshold')}</div>
            </Th>
            {/* apply threshold before coupons? */}
            <Th searchParamsValue="apply-threshold-before-coupons">
              <div>{t('applyThresholdBeforeCoupons')}</div>
            </Th>
            {/* published? */}
            <Th searchParamsValue="is-public">{t('published')}</Th>
            {/* usageCount */}
            <Th searchParamsValue="usage-count">{t('usageCount')}</Th>
            {/* accumulativeDeliveryCharge */}
            <Th searchParamsValue="accumulative-delivery-charge">
              <div>{t('accumulativeDeliveryCharge')}</div>
            </Th>
            {/* time */}
            <Th searchParamsValue="updated-at">{t('editTime')}</Th>
            {/* actions */}
            <Th>{t('actions')}</Th>
          </TrHead>
        </thead>
        <tbody>
          {isLoading && <DeliveryOptionSkeleton />}
          {!isLoading && (
            <DeliveryOptionList
              deliveryOptions={displayDeliveryOptions}
              onSelect={onSelect}
              selectedDeliveryOptionIds={selectedDeliveryOptionIds}
            />
          )}
        </tbody>
      </table>
      {!isLoading && (!privateDeliveryOptions || privateDeliveryOptions.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItems')}</div>
      )}
      {privateDeliveryOptions &&
        privateDeliveryOptions.length > 0 &&
        (!displayDeliveryOptions || displayDeliveryOptions.length === 0) && (
          <div className="p-2 text-sm font-medium text-secondary-text">{t('noItemsMatchSearching')}</div>
        )}
      <ErrorTranslation error={error} />
      <div className="flex justify-between items-center mt-4 flex-wrap">
        <PaginationIndicatorClient itemName={t('indicator')} itemsLength={privateDeliveryOptions?.length} />
        <PaginationClient theme="primary" itemsLength={privateDeliveryOptions?.length} />
      </div>
    </div>
  );
};
export default DeliveryOptionTable;
