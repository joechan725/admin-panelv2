import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface StoreAddressesProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('storeAddresses'),
  };
};

const StoreAddresses = ({ params: { locale } }: StoreAddressesProps) => {
  unstable_setRequestLocale(locale);

  return null;
};

export default StoreAddresses;
