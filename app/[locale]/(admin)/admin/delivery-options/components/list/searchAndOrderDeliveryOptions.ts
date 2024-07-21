import { searchObjectsAllKeys } from '@/lib/helpers/objects/searchObjectsAllKeys';
import { sliceObjectsByPage } from '@/lib/helpers/objects/sliceObjectsByPage';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { PrivateDeliveryOption } from '@/models/deliveryOption/PrivateDeliveryOption';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface SearchAndOrderDeliveryOptionsParameters {
  searchParams: ReadonlyURLSearchParams;
  privateDeliveryOptions: PrivateDeliveryOption[];
}
export const searchAndOrderDeliveryOptions = ({
  searchParams,
  privateDeliveryOptions,
}: SearchAndOrderDeliveryOptionsParameters) => {
  const searchQuery = searchParams.get('search');
  const orderBy = searchParams.get('orderby');
  const currentPage = +(searchParams.get('page') ?? 1);
  const itemsPerPage = +(searchParams.get('limit') ?? 10);

  let displayDeliveryOption = privateDeliveryOptions;

  // search by query
  if (displayDeliveryOption && searchQuery) {
    displayDeliveryOption = searchObjectsAllKeys(displayDeliveryOption, searchQuery);
  }

  // sort by name
  if (displayDeliveryOption && orderBy === 'name-asc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'nameZH', 'asc');
  }
  if (displayDeliveryOption && orderBy === 'name-desc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'nameZH', 'desc');
  }

  // sort by estimated-time
  if (displayDeliveryOption && orderBy === 'estimated-time-asc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'estimatedTimeZH', 'asc');
  }
  if (displayDeliveryOption && orderBy === 'estimated-time-desc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'estimatedTimeZH', 'desc');
  }

  // sort by delivery-charge
  if (displayDeliveryOption && orderBy === 'delivery-charge-asc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'deliveryCharge', 'asc');
  }
  if (displayDeliveryOption && orderBy === 'delivery-charge-desc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'deliveryCharge', 'desc');
  }

  // sort by free-delivery-threshold
  if (displayDeliveryOption && orderBy === 'free-delivery-threshold-asc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'freeDeliveryThreshold', 'asc');
  }
  if (displayDeliveryOption && orderBy === 'free-delivery-threshold-asc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'freeDeliveryThreshold', 'desc');
  }

  // sort by apply-threshold-before-coupons
  if (displayDeliveryOption && orderBy === 'apply-threshold-before-coupons-asc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'applyThresholdBeforeCoupons', 'asc');
  }
  if (displayDeliveryOption && orderBy === 'apply-threshold-before-coupons-desc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'applyThresholdBeforeCoupons', 'desc');
  }

  // sort by is public
  if (displayDeliveryOption && orderBy === 'is-public-asc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'isPublic', 'asc');
  }
  if (displayDeliveryOption && orderBy === 'is-public-desc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'isPublic', 'desc');
  }

  // sort by usage-count
  if (displayDeliveryOption && orderBy === 'usage-count-asc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'usageCount', 'asc');
  }
  if (displayDeliveryOption && orderBy === 'usage-count-desc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'usageCount', 'desc');
  }

  // sort by accumulative-delivery-charge
  if (displayDeliveryOption && orderBy === 'accumulative-delivery-charge-asc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'accumulativeDeliveryCharge', 'asc');
  }
  if (displayDeliveryOption && orderBy === 'accumulative-delivery-charge-desc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'accumulativeDeliveryCharge', 'desc');
  }

  // sort by time
  if (displayDeliveryOption && orderBy === 'updated-at-asc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'updatedAt', 'asc');
  }
  if (displayDeliveryOption && orderBy === 'updated-at-desc') {
    displayDeliveryOption = sortObjectsByKey(displayDeliveryOption, 'updatedAt', 'desc');
  }

  // pagination
  if (displayDeliveryOption) {
    displayDeliveryOption = sliceObjectsByPage(displayDeliveryOption, currentPage, itemsPerPage);
  }

  return displayDeliveryOption;
};
