import { searchObjectsAllKeys } from '@/lib/helpers/objects/searchObjectsAllKeys';
import { sliceObjectsByPage } from '@/lib/helpers/objects/sliceObjectsByPage';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { DeliveryOptionUsageRecord } from '@/models/deliveryOption/usageRecord/DeliveryOptionUsageRecord';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface SearchAndOrderUsageRecordsParameters {
  deliveryOptionUsageRecords: DeliveryOptionUsageRecord[];
  searchParams: ReadonlyURLSearchParams;
}

export const searchAndOrderUsageRecords = ({
  deliveryOptionUsageRecords,
  searchParams,
}: SearchAndOrderUsageRecordsParameters) => {
  const search = searchParams.get('q');
  const page = +(searchParams.get('p') ?? 1);
  const orderby = searchParams.get('orderby');
  let displayUsageRecords = [...deliveryOptionUsageRecords];

  displayUsageRecords = searchObjectsAllKeys(displayUsageRecords, search);
  // sort by orderAt
  if (orderby === 'user-asc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'userFirstName', 'asc');
  }
  if (orderby === 'user-desc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'userFirstName', 'desc');
  }

  // sort by orderAt
  if (orderby === 'orderedAt-asc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'orderedAt', 'asc');
  }
  if (orderby === 'orderedAt-desc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'orderedAt', 'desc');
  }

  // sort by orderId
  if (orderby === 'orderId-asc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'orderId', 'asc');
  }
  if (orderby === 'orderId-desc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'orderId', 'desc');
  }

  // sort by totalPriceBeforeDiscount
  if (orderby === 'totalPriceBeforeDiscount-asc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'orderTotalPriceBeforeDiscount', 'asc');
  }
  if (orderby === 'totalPriceBeforeDiscount-desc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'orderTotalPriceBeforeDiscount', 'desc');
  }

  // sort by totalPriceAfterDisCount
  if (orderby === 'totalPriceAfterDiscount-asc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'orderTotalPriceAfterDiscount', 'asc');
  }
  if (orderby === 'totalPriceAfterDiscount-desc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'orderTotalPriceAfterDiscount', 'desc');
  }

  // sort by deliveryCharge
  if (orderby === 'deliveryCharge-asc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'deliveryChargeAtThisOrder', 'asc');
  }
  if (orderby === 'deliveryCharge-desc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'deliveryChargeAtThisOrder', 'desc');
  }

  displayUsageRecords = sliceObjectsByPage(displayUsageRecords, page, 10);

  return displayUsageRecords;
};
