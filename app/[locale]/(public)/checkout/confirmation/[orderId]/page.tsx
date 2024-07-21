import { Metadata } from 'next';
import Stepper from '../../components/stepper/Stepper';
import LoadOrderConfirmation from '../../components/confirmation/LoadOrderConfirmation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import PublicPageContainer from '@/components/layout/container/PublicPageContainer';

interface Params {
  orderId: string;
  locale: string;
}

interface ConfirmationProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({
  params: { locale, orderId },
}: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('orderWithId', { orderId }),
  };
};

const Confirmation = ({ params: { locale } }: ConfirmationProps) => {
  unstable_setRequestLocale(locale);

  return (
    <PublicPageContainer>
      <Stepper step="confirmation" />
      <LoadOrderConfirmation />
    </PublicPageContainer>
  );
};

export default Confirmation;
