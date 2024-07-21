import { PrivateProduct } from '@/models/product/PrivateProduct';
import { Product } from '@/models/product/Product';

export const sortProductsByPrice = <T extends Product | PrivateProduct>(
  products: T[],
  sortOrder: 'asc' | 'desc'
): T[] => {
  const sortedProducts = products.sort((a, b) => {
    const valueA = a.sellingPrice ?? a.markedPrice;
    const valueB = b.sellingPrice ?? b.markedPrice;

    if (sortOrder === 'asc') {
      return valueA - valueB;
    }
    if (sortOrder === 'desc') {
      return valueB - valueA;
    }
    return 0;
  });

  return sortedProducts;
};
