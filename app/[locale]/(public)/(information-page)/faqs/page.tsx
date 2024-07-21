import ContentBlockList from '@/components/content/ContentBlockList';
import { Metadata } from 'next';
import { faqsCN } from './faqsCN';
import { faqsEN } from './faqsEN';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import PublicPageContainer from '@/components/layout/container/PublicPageContainer';

interface Params {
  locale: string;
}

interface FAQsProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('faqs'),
  };
};

const FAQs = async ({ params: { locale } }: FAQsProps) => {
  unstable_setRequestLocale(locale);

  return (
    <PublicPageContainer>
      <div className="space-y-8 pb-16">
        <ContentBlockList contentBlocks={locale === 'en' ? faqsEN : faqsCN} />
      </div>
    </PublicPageContainer>
  );
};

export default FAQs;
