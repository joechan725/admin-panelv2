import { searchObjectsAllKeys } from '@/lib/helpers/objects/searchObjectsAllKeys';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { PrivateBrand } from '@/models/classification/brand/PrivateBrand';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface SearchAndOrderBrandsParameters {
  searchParams: ReadonlyURLSearchParams;
  privateBrands: PrivateBrand[];
  locale: string;
}

export const searchAndOrderBrands = ({ searchParams, privateBrands, locale }: SearchAndOrderBrandsParameters) => {
  const searchQuery = searchParams.get('search');
  const orderBy = searchParams.get('orderby');

  let displayBrand = privateBrands;

  // search by query
  if (displayBrand && searchQuery) {
    displayBrand = searchObjectsAllKeys(displayBrand, searchQuery);
  }

  // sort by name
  if (displayBrand && orderBy === 'name-asc') {
    displayBrand = sortObjectsByKey(displayBrand, locale === 'en' ? 'nameEN' : 'nameZH', 'asc');
  }
  if (displayBrand && orderBy === 'name-desc') {
    displayBrand = sortObjectsByKey(displayBrand, locale === 'en' ? 'nameEN' : 'nameZH', 'desc');
  }

  // sort by totalProductCount
  if (displayBrand && orderBy === 'totalProductCount-asc') {
    displayBrand = sortObjectsByKey(displayBrand, 'totalProductCount', 'asc');
  }
  if (displayBrand && orderBy === 'totalProductCount-desc') {
    displayBrand = sortObjectsByKey(displayBrand, 'totalProductCount', 'desc');
  }

  // sort by publicProductCount
  if (displayBrand && orderBy === 'publicProductCount-asc') {
    displayBrand = sortObjectsByKey(displayBrand, 'publicProductCount', 'asc');
  }
  if (displayBrand && orderBy === 'publicProductCount-desc') {
    displayBrand = sortObjectsByKey(displayBrand, 'publicProductCount', 'desc');
  }

  // sort by privateProductCount
  if (displayBrand && orderBy === 'privateProductCount-asc') {
    displayBrand = sortObjectsByKey(displayBrand, 'privateProductCount', 'asc');
  }
  if (displayBrand && orderBy === 'privateProductCount-desc') {
    displayBrand = sortObjectsByKey(displayBrand, 'privateProductCount', 'desc');
  }

  // sort by revenue
  if (displayBrand && orderBy === 'revenue-asc') {
    displayBrand = sortObjectsByKey(displayBrand, 'revenue', 'asc');
  }
  if (displayBrand && orderBy === 'revenue-desc') {
    displayBrand = sortObjectsByKey(displayBrand, 'revenue', 'desc');
  }

  // sort by usage count
  if (displayBrand && orderBy === 'sales-asc') {
    displayBrand = sortObjectsByKey(displayBrand, 'sales', 'asc');
  }
  if (displayBrand && orderBy === 'sales-desc') {
    displayBrand = sortObjectsByKey(displayBrand, 'sales', 'desc');
  }

  // sort by updatedAt
  if (displayBrand && orderBy === 'updatedAt-asc') {
    displayBrand = sortObjectsByKey(displayBrand, 'updatedAt', 'asc');
  }
  if (displayBrand && orderBy === 'updatedAt-desc') {
    displayBrand = sortObjectsByKey(displayBrand, 'updatedAt', 'desc');
  }

  return displayBrand;
};
