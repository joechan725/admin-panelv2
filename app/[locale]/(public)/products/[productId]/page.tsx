import { Suspense } from 'react';
import LoadProductAdditionalInfo from '../components/additionalInfo/LoadProductAdditionalInfo';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

interface AdditionalInfoProps {
  params: {
    productId: string;
    locale: string;
  };
}

const AdditionalInfo = ({ params: { locale, productId } }: AdditionalInfoProps) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Product.detail');

  return (
    <div className="space-y-4 mx-auto max-w-screen-lg">
      <div className="flex justify-center">
        <div className="text-base md:text-xl font-semibold text-primary-text px-4 pb-2 border-b-2 border-secondary-bg mb-2">
          {t('productDetail')}
        </div>
      </div>
      <Suspense>
        <LoadProductAdditionalInfo productId={productId} />
      </Suspense>
    </div>
  );
};

export default AdditionalInfo;
