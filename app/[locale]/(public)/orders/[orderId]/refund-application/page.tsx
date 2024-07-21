import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ApplyRefundModal from '../../components/modal/ApplyRefundModal';
import { Metadata } from 'next';

interface Params {
  locale: string;
}

interface RefundApplicationProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('applicationForRefund'),
  };
};

const RefundApplication = ({ params: { locale } }: RefundApplicationProps) => {
  unstable_setRequestLocale(locale);

  return <ApplyRefundModal />;
};

export default RefundApplication;
