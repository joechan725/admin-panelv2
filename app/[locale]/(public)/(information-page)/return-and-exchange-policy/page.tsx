import { Metadata } from 'next';
import ContentBlockList from '@/components/content/ContentBlockList';
import { returnsAndExchangesPolicyZH } from './returnsAndExchangesPolicyZH';
import { returnsAndExchangesPolicyEN } from './returnsAndExchangesPolicyEN';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import PublicPageContainer from '@/components/layout/container/PublicPageContainer';

interface Params {
  locale: string;
}

interface ReturnAndExchangePolicyProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('returnsAndExchangesPolicy'),
  };
};

const ReturnAndExchangePolicy = async ({ params: { locale } }: ReturnAndExchangePolicyProps) => {
  unstable_setRequestLocale(locale);

  return (
    <PublicPageContainer>
      <div className="space-y-8 pb-16">
        <ContentBlockList contentBlocks={locale === 'en' ? returnsAndExchangesPolicyEN : returnsAndExchangesPolicyZH} />
      </div>
    </PublicPageContainer>
  );
};

export default ReturnAndExchangePolicy;
