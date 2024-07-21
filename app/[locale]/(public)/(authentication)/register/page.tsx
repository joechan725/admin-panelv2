import { Metadata } from 'next';
import RegisterForm from '../components/RegisterForm';
import ShadowBorder from '@/components/layout/container/ShadowBorder';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import PublicPageContainer from '@/components/layout/container/PublicPageContainer';

interface Params {
  locale: string;
}

interface RegisterProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('register'),
  };
};

const Register = ({ params: { locale } }: RegisterProps) => {
  unstable_setRequestLocale(locale);

  return (
    <PublicPageContainer>
      <div className="flex justify-center items-center h-screen">
        <ShadowBorder>
          <RegisterForm />
        </ShadowBorder>
      </div>
    </PublicPageContainer>
  );
};

export default Register;
