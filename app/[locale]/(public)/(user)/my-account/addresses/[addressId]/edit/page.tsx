import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import EditAddressModal from '../../components/modal/EditAddressModal';
import { Metadata } from 'next';

interface Params {
  locale: string;
}

interface EditAddressProps {
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

const EditAddress = ({ params: { locale } }: EditAddressProps) => {
  unstable_setRequestLocale(locale);

  return <EditAddressModal />;
};

export default EditAddress;
