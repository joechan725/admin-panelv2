import ContentBlockList from '@/components/content/ContentBlockList';
import PublicPageContainer from '@/components/layout/container/PublicPageContainer';
import { ContentBlock } from '@/models/content/ContentBlock';
import { Metadata } from 'next';
import { useLocale } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { aboutUsEN } from './aboutUsEN';
import { aboutUsZH } from './aboutUsZH';

interface Params {
  locale: string;
}

interface AboutUsProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('aboutUs'),
  };
};

const AboutUs = ({ params: { locale } }: AboutUsProps) => {
  unstable_setRequestLocale(locale);
  const localeHook = useLocale();

  return (
    <PublicPageContainer>
      <div className="mt-8 lg:mt-16 flex justify-center items-center">
        <ContentBlockList contentBlocks={localeHook === 'en' ? aboutUsEN : aboutUsZH} />
      </div>
    </PublicPageContainer>
  );
};

export default AboutUs;
