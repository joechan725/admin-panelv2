import { searchObjectsAllKeys } from '@/lib/helpers/objects/searchObjectsAllKeys';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { PrivateCategory } from '@/models/classification/category/PrivateCategory';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface SearchAndOrderCategoriesParameters {
  searchParams: ReadonlyURLSearchParams;
  privateCategories: PrivateCategory[];
  locale: string;
}

export const searchAndOrderCategories = ({
  searchParams,
  privateCategories,
  locale,
}: SearchAndOrderCategoriesParameters) => {
  const searchQuery = searchParams.get('search');
  const orderBy = searchParams.get('orderby');

  let displayCategory = privateCategories;

  // search by query
  if (displayCategory && searchQuery) {
    displayCategory = searchObjectsAllKeys(displayCategory, searchQuery);
  }

  // sort by name
  if (displayCategory && orderBy === 'name-asc') {
    displayCategory = sortObjectsByKey(displayCategory, locale === 'en' ? 'nameEN' : 'nameZH', 'asc');
  }
  if (displayCategory && orderBy === 'name-desc') {
    displayCategory = sortObjectsByKey(displayCategory, locale === 'en' ? 'nameEN' : 'nameZH', 'desc');
  }

  // sort by totalProductCount
  if (displayCategory && orderBy === 'totalProductCount-asc') {
    displayCategory = sortObjectsByKey(displayCategory, 'totalProductCount', 'asc');
  }
  if (displayCategory && orderBy === 'totalProductCount-desc') {
    displayCategory = sortObjectsByKey(displayCategory, 'totalProductCount', 'desc');
  }

  // sort by publicProductCount
  if (displayCategory && orderBy === 'publicProductCount-asc') {
    displayCategory = sortObjectsByKey(displayCategory, 'publicProductCount', 'asc');
  }
  if (displayCategory && orderBy === 'publicProductCount-desc') {
    displayCategory = sortObjectsByKey(displayCategory, 'publicProductCount', 'desc');
  }

  // sort by privateProductCount
  if (displayCategory && orderBy === 'privateProductCount-asc') {
    displayCategory = sortObjectsByKey(displayCategory, 'privateProductCount', 'asc');
  }
  if (displayCategory && orderBy === 'privateProductCount-desc') {
    displayCategory = sortObjectsByKey(displayCategory, 'privateProductCount', 'desc');
  }

  // sort by revenue
  if (displayCategory && orderBy === 'revenue-asc') {
    displayCategory = sortObjectsByKey(displayCategory, 'revenue', 'asc');
  }
  if (displayCategory && orderBy === 'revenue-desc') {
    displayCategory = sortObjectsByKey(displayCategory, 'revenue', 'desc');
  }

  // sort by sales
  if (displayCategory && orderBy === 'sales-asc') {
    displayCategory = sortObjectsByKey(displayCategory, 'sales', 'asc');
  }
  if (displayCategory && orderBy === 'sales-desc') {
    displayCategory = sortObjectsByKey(displayCategory, 'sales', 'desc');
  }

  // sort by updatedAt
  if (displayCategory && orderBy === 'updatedAt-asc') {
    displayCategory = sortObjectsByKey(displayCategory, 'updatedAt', 'asc');
  }
  if (displayCategory && orderBy === 'updatedAt-desc') {
    displayCategory = sortObjectsByKey(displayCategory, 'updatedAt', 'desc');
  }

  return displayCategory;
};
