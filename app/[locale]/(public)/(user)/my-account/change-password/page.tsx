import LightBorder from '@/components/layout/container/LightBorder';
import LoadPasswordForm from './components/form/LoadPasswordForm';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

interface Params {
  locale: string;
}

interface ChangePasswordProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('changePassword'),
  };
};

const ChangePassword = ({ params: { locale } }: ChangePasswordProps) => {
  unstable_setRequestLocale(locale);

  return (
    <LightBorder className="p-16 w-full max-w-md mx-auto">
      <LoadPasswordForm />
    </LightBorder>
  );
};

export default ChangePassword;
