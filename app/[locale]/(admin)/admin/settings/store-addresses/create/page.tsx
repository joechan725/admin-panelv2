import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import CreateStoreAddressModal from '../components/modal/CreateStoreAddressModal';
import { Metadata } from 'next';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface CreateStoreAddressProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('createStoreAddress'),
  };
};

const CreateStoreAddress = ({ params: { locale } }: CreateStoreAddressProps) => {
  unstable_setRequestLocale(locale);

  return <CreateStoreAddressModal />;
};

export default CreateStoreAddress;
