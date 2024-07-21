import { Metadata } from 'next';
import ContentBlockList from '@/components/content/ContentBlockList';
import { privacyPolicyEN } from './privacyPolicyEN';
import { privacyPolicyZH } from './privacyPolicyZH';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import PublicPageContainer from '@/components/layout/container/PublicPageContainer';

interface Params {
  locale: string;
}

interface PrivacyPolicyProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('privacyPolicy'),
  };
};

const PrivacyPolicy = async ({ params: { locale } }: PrivacyPolicyProps) => {
  unstable_setRequestLocale(locale);

  return (
    <PublicPageContainer>
      <div className="space-y-8 pb-16">
        <ContentBlockList contentBlocks={locale === 'en' ? privacyPolicyEN : privacyPolicyZH} />
      </div>
    </PublicPageContainer>
  );
};

export default PrivacyPolicy;
