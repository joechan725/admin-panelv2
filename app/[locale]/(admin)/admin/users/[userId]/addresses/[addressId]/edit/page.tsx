import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import EditUserAddressModal from '../../components/modal/EditUserAddressModal';
import { Metadata } from 'next';

interface Params {
  locale: string;
}

interface EditUserAddressProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('editAddress'),
  };
};

const EditUserAddress = ({ params: { locale } }: EditUserAddressProps) => {
  unstable_setRequestLocale(locale);

  return <EditUserAddressModal />;
};

export default EditUserAddress;
