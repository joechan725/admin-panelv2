import ShadowBorder from '@/components/layout/container/ShadowBorder';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import PublicPageContainer from '@/components/layout/container/PublicPageContainer';

interface Params {
  locale: string;
}

interface ForgotPasswordProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('forgotPassword'),
  };
};

const ForgotPassword = ({ params: { locale } }: ForgotPasswordProps) => {
  unstable_setRequestLocale(locale);

  return (
    <PublicPageContainer>
      <div className="flex justify-center items-center h-screen">
        <ShadowBorder>
          <ForgotPasswordForm />
        </ShadowBorder>
      </div>
    </PublicPageContainer>
  );
};

export default ForgotPassword;
