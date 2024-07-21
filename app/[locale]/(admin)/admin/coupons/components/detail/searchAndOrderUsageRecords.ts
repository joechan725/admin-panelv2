import { searchObjectsAllKeys } from '@/lib/helpers/objects/searchObjectsAllKeys';
import { sliceObjectsByPage } from '@/lib/helpers/objects/sliceObjectsByPage';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { CouponUsageRecord } from '@/models/coupon/usageRecord/CouponUsageRecord';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface SearchAndOrderUsageRecordsParameters {
  couponUsageRecords: CouponUsageRecord[];
  searchParams: ReadonlyURLSearchParams;
}

export const searchAndOrderUsageRecords = ({
  couponUsageRecords,
  searchParams,
}: SearchAndOrderUsageRecordsParameters) => {
  const search = searchParams.get('q');
  const page = +(searchParams.get('p') ?? 1);
  const orderby = searchParams.get('orderby');
  let displayUsageRecords = [...couponUsageRecords];

  displayUsageRecords = searchObjectsAllKeys(displayUsageRecords, search);
  // sort by user
  if (orderby === 'user-asc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'userFirstName', 'asc');
  }
  if (orderby === 'user-desc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'userFirstName', 'desc');
  }

  // sort by usedAt
  if (orderby === 'usedAt-asc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'usedAt', 'asc');
  }
  if (orderby === 'usedAt-desc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'usedAt', 'desc');
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

  // sort by discount
  if (orderby === 'discount-asc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'discountAmountAtThisOrder', 'asc');
  }
  if (orderby === 'discount-desc') {
    displayUsageRecords = sortObjectsByKey(displayUsageRecords, 'discountAmountAtThisOrder', 'desc');
  }

  displayUsageRecords = sliceObjectsByPage(displayUsageRecords, page, 10);

  return displayUsageRecords;
};
