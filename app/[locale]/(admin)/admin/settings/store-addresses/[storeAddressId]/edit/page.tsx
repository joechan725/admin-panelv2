import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import EditStoreAddressModal from '../../components/modal/EditStoreAddressModal';
import { Metadata } from 'next';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface EditStoreAddressProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('editStoreAddress'),
  };
};

const EditStoreAddress = ({ params: { locale } }: EditStoreAddressProps) => {
  unstable_setRequestLocale(locale);

  return <EditStoreAddressModal />;
};

export default EditStoreAddress;
