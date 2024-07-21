import { Metadata } from 'next';
import LoadEditSmartBarForm from '../../components/form/LoadEditSmartBarForm';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface EditSmartBarProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('editSmartBar'),
  };
};

const EditSmartBar = ({ params: { locale } }: EditSmartBarProps) => {
  unstable_setRequestLocale(locale);

  return <LoadEditSmartBarForm />;
};

export default EditSmartBar;
