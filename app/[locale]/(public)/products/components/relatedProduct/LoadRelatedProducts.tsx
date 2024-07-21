import { getProduct } from '@/firebase/api/product/getProduct';
import { getProductLists } from '@/firebase/api/product/getProductLists';
import { getRelatedProducts } from './getRelatedProducts';
import RelatedProductGrid from './RelatedProductGrid';
import { useTranslations } from 'next-intl';

interface LoadRelatedProductsProps {
  productId: string;
}

const LoadRelatedProducts = async ({ productId }: LoadRelatedProductsProps) => {
  const tError = useTranslations('Error');

  try {
    const t = useTranslations('Product.detail');
    const currentProduct = await getProduct(productId);
    if (!currentProduct) {
      return <div className="text-sm font-medium text-secondary-text">{tError('unexpectedError')}</div>;
    }

    const allProducts = await getProductLists([productId]);

    const relatedProducts = getRelatedProducts({ allProducts, currentProduct });

    if (relatedProducts.length === 0) {
      return <div className="text-sm font-medium text-secondary-text">{t('noRelatedProducts')}</div>;
    }

    return <RelatedProductGrid relatedProducts={relatedProducts} />;
  } catch (error) {
    return <div className="text-sm font-medium text-secondary-text">{tError('unexpectedError')}</div>;
  }
};

export default LoadRelatedProducts;
