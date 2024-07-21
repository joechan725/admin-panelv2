import ShareButton from '@/components/features/share/ShareButton';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import LoadProductDetail from './LoadProductDetail';

interface ProductDetailRootProps {
  productId: string;
}

const ProductDetailRoot = ({ productId }: ProductDetailRootProps) => {
  const t = useTranslations('Product.detail');

  const shareUrl = `${process.env.HOST}/products/${productId}`;

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="space-y-6">
        <Suspense>
          <LoadProductDetail productId={productId} />
        </Suspense>
        <div className="space-y-2">
          <div className="text-sm font-medium text-tertiary-text">{t('shareTo')}</div>
          <div className="flex gap-2 items-center">
            <ShareButton shareTo="facebook" url={shareUrl} />
            <ShareButton shareTo="x" url={shareUrl} />
            <ShareButton shareTo="whatsapp" url={shareUrl} />
            <ShareButton shareTo="signal" url={shareUrl} />
            <ShareButton shareTo="copyLink" url={shareUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailRoot;
