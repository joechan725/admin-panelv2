import { Metadata } from 'next';
import CreateSmartBarForm from '../components/form/CreateSmartBarForm';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface CreateSmartBarProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('createSmartBar'),
  };
};

const CreateSmartBar = ({ params: { locale } }: CreateSmartBarProps) => {
  unstable_setRequestLocale(locale);

  return <CreateSmartBarForm />;
};

export default CreateSmartBar;
