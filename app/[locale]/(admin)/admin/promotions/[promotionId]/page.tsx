import Widget from '@/components/layout/container/Widget';
import LoadPromotion from '../components/detail/LoadPromotion';
import Link from 'next/link';
import TextButton from '@/components/form/TextButton';
import LeftArrow from '@/components/icon/LeftArrow';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface PromotionProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('viewPromotionDetail'),
  };
};

const Promotion = ({ params: { locale } }: PromotionProps) => {
  unstable_setRequestLocale(locale);

  return (
    <div className="space-y-5">
      <Link href="/admin/promotions">
        <TextButton type="button" theme="primary" className="ml-4 flex items-center gap-2">
          <LeftArrow sizeClassName="size-4" />
          <span>Back</span>
        </TextButton>
      </Link>
      <Widget className="p-6 space-x-4">
        <LoadPromotion />
      </Widget>
    </div>
  );
};

export default Promotion;
