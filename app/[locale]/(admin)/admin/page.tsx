import { Metadata } from 'next';
import LoadStatistics from '../components/dashboard/LoadStatistics';
import { Suspense } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface AdminProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('adminDashboard'),
  };
};

const Admin = ({ params: { locale } }: AdminProps) => {
  unstable_setRequestLocale(locale);

  return (
    <Suspense>
      <LoadStatistics />
    </Suspense>
  );
};

export default Admin;
