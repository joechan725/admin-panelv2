import { Product } from '@/models/product/Product';

interface GetRelatedProductsParameters {
  currentProduct: Product;
  allProducts: Product[];
}

/**
 * Get the related products by categories / brands / collection or tags
 *
 * @param currentProduct - The current product data
 * @param allProducts - All of the product data
 * @returns related products
 */

export const getRelatedProducts = ({ allProducts, currentProduct }: GetRelatedProductsParameters): Product[] => {
  const { id, categoryId, brandId, collectionId, tags } = currentProduct;

  // Filter products by category, brand, collection and exclude the current product
  const relatedProducts = allProducts.filter(
    (product) =>
      product.id !== id &&
      (product.categoryId === categoryId ||
        product.brandId === brandId ||
        product.collectionId === collectionId ||
        product.tags.some((tag) => tags.includes(tag)))
  );

  // Disrupt the order of products
  const disruptedProducts = relatedProducts.sort(() => Math.random() - 0.5);

  // Slice the products
  const slicedProducts = disruptedProducts.slice(0, 4);

  // Return the relatedProducts
  return slicedProducts;
};
