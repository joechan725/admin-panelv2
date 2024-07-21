import { searchObjectsAllKeys } from '@/lib/helpers/objects/searchObjectsAllKeys';
import { sliceObjectsByPage } from '@/lib/helpers/objects/sliceObjectsByPage';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { SmartBar } from '@/models/smartBar/SmartBar';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface SearchAndOrderSmartBarsParameters {
  searchParams: ReadonlyURLSearchParams;
  smartBars: SmartBar[];
  locale: string;
}

export const searchAndOrderSmartBars = ({ searchParams, smartBars, locale }: SearchAndOrderSmartBarsParameters) => {
  const searchQuery = searchParams.get('search');
  const orderBy = searchParams.get('orderby');
  const currentPage = +(searchParams.get('page') ?? 1);
  const itemsPerPage = +(searchParams.get('limit') ?? 10);

  let displaySmartBars = smartBars;

  // search by query
  if (displaySmartBars && searchQuery) {
    displaySmartBars = searchObjectsAllKeys(displaySmartBars, searchQuery);
  }

  // sort by title
  if (displaySmartBars && orderBy === 'preview-asc') {
    displaySmartBars = sortObjectsByKey(displaySmartBars, locale === 'en' ? 'messageEN' : 'messageZH', 'asc');
  }
  if (displaySmartBars && orderBy === 'preview-desc') {
    displaySmartBars = sortObjectsByKey(displaySmartBars, locale === 'en' ? 'messageEN' : 'messageZH', 'desc');
  }

  // sort by updatedAt
  if (displaySmartBars && orderBy === 'time-asc') {
    displaySmartBars = sortObjectsByKey(displaySmartBars, 'updatedAt', 'asc');
  }
  if (displaySmartBars && orderBy === 'time-asc') {
    displaySmartBars = sortObjectsByKey(displaySmartBars, 'updatedAt', 'desc');
  }

  // sort by isPublic
  if (displaySmartBars && orderBy === 'is-public-asc') {
    displaySmartBars = sortObjectsByKey(displaySmartBars, 'isPublic', 'asc');
  }
  if (displaySmartBars && orderBy === 'is-public-desc') {
    displaySmartBars = sortObjectsByKey(displaySmartBars, 'isPublic', 'desc');
  }

  // pagination
  if (displaySmartBars) {
    displaySmartBars = sliceObjectsByPage(displaySmartBars, currentPage, itemsPerPage);
  }

  return displaySmartBars;
};
