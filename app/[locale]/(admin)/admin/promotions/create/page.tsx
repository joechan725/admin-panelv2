import { Metadata } from 'next';
import CreatePromotionForm from '../components/form/CreatePromotionForm';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface CreatePromotionProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('createPromotion'),
  };
};

const CreatePromotion = ({ params: { locale } }: CreatePromotionProps) => {
  unstable_setRequestLocale(locale);

  return <CreatePromotionForm />;
};

export default CreatePromotion;
