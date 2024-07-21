import { searchObjectsAllKeys } from '@/lib/helpers/objects/searchObjectsAllKeys';
import { sliceObjectsByPage } from '@/lib/helpers/objects/sliceObjectsByPage';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { Promotion } from '@/models/promotion/Promotion';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface SearchAndOrderPromotionsParameters {
  searchParams: ReadonlyURLSearchParams;
  promotions: Promotion[];
}

export const searchAndOrderPromotions = ({ searchParams, promotions }: SearchAndOrderPromotionsParameters) => {
  const searchQuery = searchParams.get('search');
  const orderBy = searchParams.get('orderby');
  const currentPage = +(searchParams.get('page') ?? 1);
  const itemsPerPage = +(searchParams.get('limit') ?? 10);

  let displayPromotions = promotions;

  // search by query
  if (displayPromotions && searchQuery) {
    displayPromotions = searchObjectsAllKeys(displayPromotions, searchQuery);
  }

  // sort by updatedAt
  if (displayPromotions && orderBy === 'time-asc') {
    displayPromotions = sortObjectsByKey(displayPromotions, 'updatedAt', 'asc');
  }
  if (displayPromotions && orderBy === 'time-asc') {
    displayPromotions = sortObjectsByKey(displayPromotions, 'updatedAt', 'desc');
  }

  // pagination
  if (displayPromotions) {
    displayPromotions = sliceObjectsByPage(displayPromotions, currentPage, itemsPerPage);
  }

  return displayPromotions;
};
