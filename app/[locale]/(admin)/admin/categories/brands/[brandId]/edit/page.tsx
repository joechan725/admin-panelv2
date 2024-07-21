import { Metadata } from 'next';
import EditBrandModal from '../../../components/brand/modal/EditBrandModal';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface EditBrandProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('editBrand'),
  };
};

const EditBrand = ({ params: { locale } }: EditBrandProps) => {
  unstable_setRequestLocale(locale);

  return <EditBrandModal />;
};
export default EditBrand;
