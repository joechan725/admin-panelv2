import { searchObjectsAllKeys } from '@/lib/helpers/objects/searchObjectsAllKeys';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { PrivateCategory } from '@/models/classification/category/PrivateCategory';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface SearchAndOrderCollectionsParameters {
  searchParams: ReadonlyURLSearchParams;
  privateCollections: PrivateCategory[];
  locale: string;
}

export const searchAndOrderCollections = ({
  searchParams,
  privateCollections,
  locale,
}: SearchAndOrderCollectionsParameters) => {
  const searchQuery = searchParams.get('search');
  const orderBy = searchParams.get('orderby');

  let displayCollections = privateCollections;

  // search by query
  if (displayCollections && searchQuery) {
    displayCollections = searchObjectsAllKeys(displayCollections, searchQuery);
  }

  // sort by name
  if (displayCollections && orderBy === 'name-asc') {
    displayCollections = sortObjectsByKey(displayCollections, locale === 'en' ? 'nameEN' : 'nameZH', 'asc');
  }
  if (displayCollections && orderBy === 'name-desc') {
    displayCollections = sortObjectsByKey(displayCollections, locale === 'en' ? 'nameEN' : 'nameZH', 'desc');
  }

  // sort by totalProductCount
  if (displayCollections && orderBy === 'totalProductCount-asc') {
    displayCollections = sortObjectsByKey(displayCollections, 'totalProductCount', 'asc');
  }
  if (displayCollections && orderBy === 'totalProductCount-desc') {
    displayCollections = sortObjectsByKey(displayCollections, 'totalProductCount', 'desc');
  }

  // sort by publicProductCount
  if (displayCollections && orderBy === 'publicProductCount-asc') {
    displayCollections = sortObjectsByKey(displayCollections, 'publicProductCount', 'asc');
  }
  if (displayCollections && orderBy === 'publicProductCount-desc') {
    displayCollections = sortObjectsByKey(displayCollections, 'publicProductCount', 'desc');
  }

  // sort by privateProductCount
  if (displayCollections && orderBy === 'privateProductCount-asc') {
    displayCollections = sortObjectsByKey(displayCollections, 'privateProductCount', 'asc');
  }
  if (displayCollections && orderBy === 'privateProductCount-desc') {
    displayCollections = sortObjectsByKey(displayCollections, 'privateProductCount', 'desc');
  }

  // sort by revenue
  if (displayCollections && orderBy === 'revenue-asc') {
    displayCollections = sortObjectsByKey(displayCollections, 'revenue', 'asc');
  }
  if (displayCollections && orderBy === 'revenue-desc') {
    displayCollections = sortObjectsByKey(displayCollections, 'revenue', 'desc');
  }

  // sort by usage count
  if (displayCollections && orderBy === 'sales-asc') {
    displayCollections = sortObjectsByKey(displayCollections, 'sales', 'asc');
  }
  if (displayCollections && orderBy === 'sales-desc') {
    displayCollections = sortObjectsByKey(displayCollections, 'sales', 'desc');
  }

  // sort by updatedAt
  if (displayCollections && orderBy === 'updatedAt-asc') {
    displayCollections = sortObjectsByKey(displayCollections, 'updatedAt', 'asc');
  }
  if (displayCollections && orderBy === 'updatedAt-desc') {
    displayCollections = sortObjectsByKey(displayCollections, 'updatedAt', 'desc');
  }

  return displayCollections;
};
