import { Metadata } from 'next';
import CreateBrandModal from '../../components/brand/modal/CreateBrandModal';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface CreateBrandProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('createBrand'),
  };
};

const CreateBrand = ({ params: { locale } }: CreateBrandProps) => {
  unstable_setRequestLocale(locale);

  return <CreateBrandModal />;
};

export default CreateBrand;
