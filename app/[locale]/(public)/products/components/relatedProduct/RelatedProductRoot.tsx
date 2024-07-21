import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import LoadRelatedProducts from './LoadRelatedProducts';

interface RelatedProductRootProps {
  productId: string;
}

const RelatedProductRoot = ({ productId }: RelatedProductRootProps) => {
  const t = useTranslations('Product.detail');

  return (
    <div className="space-y-4 mx-auto max-w-screen-xl">
      <div className="flex justify-center">
        <div className="text-base md:text-xl font-semibold text-primary-text px-4 pb-2 border-b-2 border-secondary-bg mb-2">
          {t('relatedProducts')}
        </div>
      </div>
      <Suspense>
        <LoadRelatedProducts productId={productId} />
      </Suspense>
    </div>
  );
};

export default RelatedProductRoot;
