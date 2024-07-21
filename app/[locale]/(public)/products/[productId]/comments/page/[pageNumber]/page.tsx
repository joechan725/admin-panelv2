import { useTranslations } from 'next-intl';
import CommentSkeleton from '../../../../components/comment/CommentSkeleton';
import LoadComments from '../../../../components/comment/LoadComments';
import { Suspense } from 'react';
import { unstable_setRequestLocale } from 'next-intl/server';

interface ProductCommentsProps {
  params: {
    productId: string;
    pageNumber: string;
    locale: string;
  };
}

const ProductComments = ({ params: { locale, pageNumber, productId } }: ProductCommentsProps) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Product.detail');

  return (
    <div className="space-y-4 mx-auto max-w-screen-xl">
      <div className="flex justify-center">
        <div className="text-base md:text-xl font-semibold text-primary-text px-4 pb-2 border-b-2 border-secondary-bg mb-2">
          {t('clientsComments')}
        </div>
      </div>
      <Suspense fallback={<CommentSkeleton />}>
        <LoadComments productId={productId} pageNumber={+pageNumber} />
      </Suspense>
    </div>
  );
};

export default ProductComments;
