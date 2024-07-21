import { searchObjectsAllKeys } from '@/lib/helpers/objects/searchObjectsAllKeys';
import { searchObjectsByKeys } from '@/lib/helpers/objects/searchObjectsByKeys';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { sortProductsByPrice } from '@/lib/helpers/objects/sortProductsByPrice';
import { Product } from '@/models/product/Product';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface searchAndOrderProductsParameters {
  searchParams: ReadonlyURLSearchParams;
  products: Product[];
  locale: string;
}

export const searchAndOrderProducts = ({ searchParams, products, locale }: searchAndOrderProductsParameters) => {
  const searchQuery = searchParams.get('search');
  const rating = searchParams.get('rating');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const onSale = searchParams.get('onSale');
  const inStock = searchParams.get('inStock');
  const orderBy = searchParams.get('orderby');
  const collections = searchParams.getAll('collection');
  const categories = searchParams.getAll('category');
  const brands = searchParams.getAll('brand');
  const tags = searchParams.getAll('tag');

  let displayProducts = products;

  // search by query
  if (displayProducts && searchQuery) {
    displayProducts = searchObjectsAllKeys(displayProducts, searchQuery);
  }

  // search by collections
  if (displayProducts && collections.length > 0) {
    displayProducts = searchObjectsByKeys(displayProducts, ['collectionNameEN', 'collectionNameZH'], collections);
  }

  // search by categories
  if (displayProducts && categories.length > 0) {
    displayProducts = searchObjectsByKeys(displayProducts, ['categoryNameEN', 'categoryNameZH'], categories);
  }

  // search by brands
  if (displayProducts && brands.length > 0) {
    displayProducts = searchObjectsByKeys(displayProducts, ['brandNameEN', 'brandNameZH'], brands);
  }

  // search by tags
  if (displayProducts && tags.length > 0) {
    displayProducts = searchObjectsByKeys(displayProducts, ['tags'], tags);
  }

  // search by rating
  if (displayProducts && rating) {
    const modifiedRating = +rating;
    if (
      modifiedRating === 1 ||
      modifiedRating === 2 ||
      modifiedRating === 3 ||
      modifiedRating === 4 ||
      modifiedRating === 5
    ) {
      displayProducts = displayProducts.filter((product) => product.rating && product.rating >= modifiedRating);
    }
  }

  // search by maxPrice
  if (displayProducts && maxPrice) {
    const modifiedMaxPrice = +maxPrice;
    if (!isNaN(modifiedMaxPrice)) {
      displayProducts = displayProducts.filter((product) =>
        product.sellingPrice ? product.sellingPrice < modifiedMaxPrice : product.markedPrice < modifiedMaxPrice
      );
    }
  }

  // search by minPrice
  if (displayProducts && minPrice) {
    const modifiedMinPrice = +minPrice;
    if (!isNaN(modifiedMinPrice)) {
      displayProducts = displayProducts.filter((product) =>
        product.sellingPrice ? product.sellingPrice > modifiedMinPrice : product.markedPrice > modifiedMinPrice
      );
    }
  }

  // search by onSale
  if (displayProducts && onSale) {
    displayProducts = displayProducts.filter((product) => product.sellingPrice !== undefined);
  }

  // search by inStock
  if (displayProducts && inStock) {
    displayProducts = displayProducts.filter((product) => product.stock > 0);
  }

  // sort by product name
  if (displayProducts && orderBy === 'product-asc') {
    displayProducts = sortObjectsByKey(displayProducts, locale === 'en' ? 'nameEN' : 'nameZH', 'asc');
  }
  if (displayProducts && orderBy === 'product-desc') {
    displayProducts = sortObjectsByKey(displayProducts, locale === 'en' ? 'nameEN' : 'nameZH', 'desc');
  }

  // sort by price
  if (displayProducts && orderBy === 'price-asc') {
    displayProducts = sortProductsByPrice(displayProducts, 'asc');
  }
  if (displayProducts && orderBy === 'price-desc') {
    displayProducts = sortProductsByPrice(displayProducts, 'desc');
  }

  // sort by comment
  if (displayProducts && orderBy === 'comment-asc') {
    displayProducts = sortObjectsByKey(displayProducts, 'commentCount', 'asc');
  }
  if (displayProducts && orderBy === 'comment-desc') {
    displayProducts = sortObjectsByKey(displayProducts, 'commentCount', 'desc');
  }

  // sort by rating
  if (displayProducts && orderBy === 'rating-asc') {
    displayProducts = sortObjectsByKey(displayProducts, 'rating', 'asc');
  }
  if (displayProducts && orderBy === 'rating-desc') {
    displayProducts = sortObjectsByKey(displayProducts, 'rating', 'desc');
  }

  return displayProducts;
};
