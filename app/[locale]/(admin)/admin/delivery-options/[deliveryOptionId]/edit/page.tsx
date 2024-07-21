import { Metadata } from 'next';
import EditDeliveryOptionModal from '../../components/modal/EditDeliveryOptionModal';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface EditDeliveryOptionProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('editDeliveryOptions'),
  };
};

const EditDeliveryOption = ({ params: { locale } }: EditDeliveryOptionProps) => {
  unstable_setRequestLocale(locale);

  return <EditDeliveryOptionModal />;
};

export default EditDeliveryOption;
