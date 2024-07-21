import { searchObjectsAllKeys } from '@/lib/helpers/objects/searchObjectsAllKeys';
import { sliceObjectsByPage } from '@/lib/helpers/objects/sliceObjectsByPage';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { PrivateCoupon } from '@/models/coupon/PrivateCoupon';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface SearchAndOrderCouponsParameters {
  searchParams: ReadonlyURLSearchParams;
  privateCoupons: PrivateCoupon[];
}

export const searchAndOrderCoupons = ({ searchParams, privateCoupons }: SearchAndOrderCouponsParameters) => {
  const searchQuery = searchParams.get('search');
  const orderBy = searchParams.get('orderby');
  const currentPage = +(searchParams.get('page') ?? 1);
  const itemsPerPage = +(searchParams.get('limit') ?? 10);

  let displayCoupon = privateCoupons;

  // search by query
  if (displayCoupon && searchQuery) {
    displayCoupon = searchObjectsAllKeys(displayCoupon, searchQuery);
  }

  // sort by code
  if (displayCoupon && orderBy === 'code-asc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'code', 'asc');
  }
  if (displayCoupon && orderBy === 'code-desc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'code', 'desc');
  }

  // sort by discount type
  if (displayCoupon && orderBy === 'discount-type-asc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'discountType', 'asc');
  }
  if (displayCoupon && orderBy === 'discount-type-desc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'discountType', 'desc');
  }

  // sort by minimum-spend
  if (displayCoupon && orderBy === 'minimum-spend-asc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'minimumSpend', 'asc');
  }
  if (displayCoupon && orderBy === 'minimum-spend-desc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'minimumSpend', 'desc');
  }

  // sort by usage limit
  if (displayCoupon && orderBy === 'usage-limit-asc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'usageLimit', 'asc');
  }
  if (displayCoupon && orderBy === 'usage-limit-desc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'usageLimit', 'desc');
  }

  // sort by color
  if (displayCoupon && orderBy === 'usage-limit-per-user-asc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'usageLimitPerUser', 'asc');
  }
  if (displayCoupon && orderBy === 'usage-limit-per-user-desc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'usageLimitPerUser', 'desc');
  }

  // sort by usage count
  if (displayCoupon && orderBy === 'usage-count-asc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'usageCount', 'asc');
  }
  if (displayCoupon && orderBy === 'usage-count-desc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'usageCount', 'desc');
  }

  // sort by accumulative-discount-amount
  if (displayCoupon && orderBy === 'accumulative-discount-amount-asc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'accumulativeDiscountAmount', 'asc');
  }
  if (displayCoupon && orderBy === 'accumulative-discount-amount-desc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'accumulativeDiscountAmount', 'desc');
  }

  // sort by effective time
  if (displayCoupon && orderBy === 'effective-time-asc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'endDate', 'asc');
  }
  if (displayCoupon && orderBy === 'effective-time-desc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'endDate', 'desc');
  }

  // sort by time
  if (displayCoupon && orderBy === 'updated-at-asc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'updatedAt', 'asc');
  }
  if (displayCoupon && orderBy === 'updated-at-desc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'updatedAt', 'desc');
  }

  // sort by registered user only
  if (displayCoupon && orderBy === 'registered-user-only-asc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'registeredUserOnly', 'asc');
  }
  if (displayCoupon && orderBy === 'registered-user-only-desc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'registeredUserOnly', 'desc');
  }

  // sort by is public
  if (displayCoupon && orderBy === 'is-public-asc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'isPublic', 'asc');
  }
  if (displayCoupon && orderBy === 'is-public-desc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'isPublic', 'desc');
  }

  // sort by can be used together
  if (displayCoupon && orderBy === 'can-be-used-together-asc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'canBeUsedTogether', 'asc');
  }
  if (displayCoupon && orderBy === 'can-be-used-together-desc') {
    displayCoupon = sortObjectsByKey(displayCoupon, 'canBeUsedTogether', 'desc');
  }

  // pagination
  if (displayCoupon) {
    displayCoupon = sliceObjectsByPage(displayCoupon, currentPage, itemsPerPage);
  }

  return displayCoupon;
};
