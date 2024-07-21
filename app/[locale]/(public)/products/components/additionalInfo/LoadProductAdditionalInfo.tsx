import { getProduct } from '@/firebase/api/product/getProduct';
import ProductAdditionalInfo from './ProductAdditionalInfo';
import { useTranslations } from 'next-intl';

interface LoadProductAdditionalInfoProps {
  productId: string;
}

const LoadProductAdditionalInfo = async ({ productId }: LoadProductAdditionalInfoProps) => {
  const t = useTranslations('Error');

  try {
    const product = await getProduct(productId);
    if (!product) {
      return <div className="text-sm font-medium text-secondary-text">{t('unexpectedError')}</div>;
    }
    return <ProductAdditionalInfo product={product} />;
  } catch (error) {
    return <div className="text-sm font-medium text-secondary-text">{t('unexpectedError')}</div>;
  }
};

export default LoadProductAdditionalInfo;
