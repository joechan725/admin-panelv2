import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import CreateUserAddressModal from '../components/modal/CreateUserAddressModal';
import { Metadata } from 'next';

interface Params {
  locale: string;
}

interface CreateUserAddressProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('createAddress'),
  };
};

const CreateUserAddress = ({ params: { locale } }: CreateUserAddressProps) => {
  unstable_setRequestLocale(locale);

  return <CreateUserAddressModal />;
};

export default CreateUserAddress;
