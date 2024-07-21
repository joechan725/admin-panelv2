import Widget from '@/components/layout/container/Widget';
import AddAddressLink from './components/link/AddAddressLink';
import LoadAdminAddresses from '@/components/features/address/LoadAdminAddresses';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface AddressProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('userAddresses'),
  };
};

const Address = ({ params: { locale } }: AddressProps) => {
  unstable_setRequestLocale(locale);

  return null;
};

export default Address;
