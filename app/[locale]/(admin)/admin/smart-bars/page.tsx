import Widget from '@/components/layout/container/Widget';
import SmartBarFrame from './components/frame/SmartBarFrame';
import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface SmartBarsProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('smartBars'),
  };
};

const SmartBars = ({ params: { locale } }: SmartBarsProps) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('SmartBar.list');

  return (
    <div className="space-y-5">
      <h2 className="ml-2 text-2xl text-slate-700 font-semibold">{t('title')}</h2>
      <Widget className="p-4">
        <SmartBarFrame />
      </Widget>
    </div>
  );
};

export default SmartBars;
