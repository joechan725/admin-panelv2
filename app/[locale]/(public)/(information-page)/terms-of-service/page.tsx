import { Metadata } from 'next';
import ContentBlockList from '@/components/content/ContentBlockList';
import { termsOfServiceZH } from './termsOfServiceZH';
import { termsOfServiceEN } from './termsOfServiceEN';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import PublicPageContainer from '@/components/layout/container/PublicPageContainer';

interface Params {
  locale: string;
}

interface TermsOfServiceProps {
  params: {
    locale: string;
  };
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('termsOfService'),
  };
};

const TermsOfService = async ({ params: { locale } }: TermsOfServiceProps) => {
  unstable_setRequestLocale(locale);

  return (
    <PublicPageContainer>
      <div className="space-y-8 pb-16">
        <ContentBlockList contentBlocks={locale === 'en' ? termsOfServiceEN : termsOfServiceZH} />
      </div>
    </PublicPageContainer>
  );
};

export default TermsOfService;
