import { Metadata } from 'next';
import CreateDeliveryOptionModal from '../components/modal/CreateDeliveryOptionModal';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface CreateDeliveryOptionProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('createDeliveryOptions'),
  };
};

const CreateDeliveryOption = ({ params: { locale } }: CreateDeliveryOptionProps) => {
  unstable_setRequestLocale(locale);

  return <CreateDeliveryOptionModal />;
};

export default CreateDeliveryOption;
