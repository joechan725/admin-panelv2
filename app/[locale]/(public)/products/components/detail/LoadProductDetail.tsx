import { getProduct } from '@/firebase/api/product/getProduct';
import ProductDetail from './ProductDetail';
import { useTranslations } from 'next-intl';

interface LoadProductDetailProps {
  productId: string;
}

const LoadProductDetail = async ({ productId }: LoadProductDetailProps) => {
  const t = useTranslations('Error');
  try {
    const product = await getProduct(productId);
    return <ProductDetail product={product} />;
  } catch (error) {
    return <div className="text-sm font-medium text-secondary-text">{t('unexpectedError')}</div>;
  }
};

export default LoadProductDetail;
