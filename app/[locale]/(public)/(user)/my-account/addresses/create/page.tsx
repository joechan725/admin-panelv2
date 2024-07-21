import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import CreateAddressModal from '../components/modal/CreateAddressModal';
import { Metadata } from 'next';

interface Params {
  locale: string;
}

interface CreateAddressProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('addAddress'),
  };
};

const CreateAddress = ({ params: { locale } }: CreateAddressProps) => {
  unstable_setRequestLocale(locale);

  return <CreateAddressModal />;
};

export default CreateAddress;
