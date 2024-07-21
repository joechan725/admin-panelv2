import { searchObjectsAllKeys } from '@/lib/helpers/objects/searchObjectsAllKeys';
import { searchObjectsByKeys } from '@/lib/helpers/objects/searchObjectsByKeys';
import { sliceObjectsByPage } from '@/lib/helpers/objects/sliceObjectsByPage';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { sortProductsByPrice } from '@/lib/helpers/objects/sortProductsByPrice';
import { PrivateProduct } from '@/models/product/PrivateProduct';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface searchAndOrderProductsParameters {
  searchParams: ReadonlyURLSearchParams;
  privateProducts: PrivateProduct[];
  sliceProductsByPage?: boolean;
  locale: string;
}

export const searchAndOrderProducts = ({
  searchParams,
  privateProducts,
  sliceProductsByPage = true,
  locale,
}: searchAndOrderProductsParameters) => {
  const searchQuery = searchParams.get('search');
  const collection = searchParams.get('collection');
  const category = searchParams.get('category');
  const brand = searchParams.get('brand');
  const orderBy = searchParams.get('orderby');
  const itemsPerPage = +(searchParams.get('limit') ?? 10);
  const currentPage = +(searchParams.get('page') ?? 1);

  let displayProducts = privateProducts;

  // search by query
  if (displayProducts && searchQuery) {
    displayProducts = searchObjectsAllKeys(displayProducts, searchQuery);
  }

  // search by collection
  if (displayProducts && collection) {
    displayProducts = searchObjectsByKeys(displayProducts, ['collectionNameZH', 'collectionNameEN'], collection);
  }

  // search by category
  if (displayProducts && category) {
    displayProducts = searchObjectsByKeys(displayProducts, ['collectionNameZH', 'collectionNameEN'], category);
  }

  // search by brand
  if (displayProducts && brand) {
    displayProducts = searchObjectsByKeys(displayProducts, ['collectionNameZH', 'collectionNameEN'], brand);
  }

  // sort by product name
  if (displayProducts && orderBy === 'product-asc') {
    displayProducts = sortObjectsByKey(displayProducts, locale === 'en' ? 'nameEN' : 'nameZH', 'asc');
  }
  if (displayProducts && orderBy === 'product-desc') {
    displayProducts = sortObjectsByKey(displayProducts, locale === 'en' ? 'nameEN' : 'nameZH', 'desc');
  }

  // sort by collectionName
  if (displayProducts && orderBy === 'collection-asc') {
    displayProducts = sortObjectsByKey(
      displayProducts,
      locale === 'en' ? 'collectionNameEN' : 'collectionNameZH',
      'asc'
    );
  }
  if (displayProducts && orderBy === 'collection-desc') {
    displayProducts = sortObjectsByKey(
      displayProducts,
      locale === 'en' ? 'collectionNameEN' : 'collectionNameZH',
      'desc'
    );
  }

  // sort by categoryName
  if (displayProducts && orderBy === 'category-asc') {
    displayProducts = sortObjectsByKey(displayProducts, locale === 'en' ? 'categoryNameEN' : 'categoryNameZH', 'asc');
  }
  if (displayProducts && orderBy === 'category-desc') {
    displayProducts = sortObjectsByKey(displayProducts, locale === 'en' ? 'categoryNameEN' : 'categoryNameZH', 'desc');
  }

  // sort by brandName
  if (displayProducts && orderBy === 'brand-asc') {
    displayProducts = sortObjectsByKey(displayProducts, locale === 'en' ? 'brandNameEN' : 'brandNameZH', 'asc');
  }
  if (displayProducts && orderBy === 'brand-desc') {
    displayProducts = sortObjectsByKey(displayProducts, locale === 'en' ? 'brandNameEN' : 'brandNameZH', 'desc');
  }

  // sort by price
  if (displayProducts && orderBy === 'price-asc') {
    displayProducts = sortProductsByPrice(displayProducts, 'asc');
  }
  if (displayProducts && orderBy === 'price-desc') {
    displayProducts = sortProductsByPrice(displayProducts, 'desc');
  }
  // sort by stock
  if (displayProducts && orderBy === 'stock-asc') {
    displayProducts = sortObjectsByKey(displayProducts, 'stock', 'asc');
  }
  if (displayProducts && orderBy === 'stock-desc') {
    displayProducts = sortObjectsByKey(displayProducts, 'stock', 'desc');
  }

  // sort by sales
  if (displayProducts && orderBy === 'sales-asc') {
    displayProducts = sortObjectsByKey(displayProducts, 'sales', 'asc');
  }
  if (displayProducts && orderBy === 'sales-desc') {
    displayProducts = sortObjectsByKey(displayProducts, 'sales', 'desc');
  }

  // sort by revenue
  if (displayProducts && orderBy === 'revenue-asc') {
    displayProducts = sortObjectsByKey(displayProducts, 'revenue', 'asc');
  }
  if (displayProducts && orderBy === 'revenue-desc') {
    displayProducts = sortObjectsByKey(displayProducts, 'revenue', 'desc');
  }

  // sort by comment
  if (displayProducts && orderBy === 'comment-asc') {
    displayProducts = sortObjectsByKey(displayProducts, 'commentCount', 'asc');
  }
  if (displayProducts && orderBy === 'comment-desc') {
    displayProducts = sortObjectsByKey(displayProducts, 'commentCount', 'desc');
  }

  // sort by updatedAt
  if (displayProducts && orderBy === 'updatedAt-asc') {
    displayProducts = sortObjectsByKey(displayProducts, 'updatedAt', 'asc');
  }
  if (displayProducts && orderBy === 'updatedAt-desc') {
    displayProducts = sortObjectsByKey(displayProducts, 'updatedAt', 'desc');
  }

  // sort by isPublic
  if (displayProducts && orderBy === 'isPublic-asc') {
    displayProducts = sortObjectsByKey(displayProducts, 'isPublic', 'asc');
  }
  if (displayProducts && orderBy === 'isPublic-desc') {
    displayProducts = sortObjectsByKey(displayProducts, 'isPublic', 'desc');
  }

  // pagination
  if (sliceProductsByPage && displayProducts) {
    displayProducts = sliceObjectsByPage(displayProducts, currentPage, itemsPerPage);
  }

  return displayProducts;
};
