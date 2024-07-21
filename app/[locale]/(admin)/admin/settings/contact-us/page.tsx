import { Metadata } from 'next';
import LoadEditStoreInfoForm from './components/form/LoadEditStoreInfoForm';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface ContactUsProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('contactUs'),
  };
};

const ContactUs = ({ params: { locale } }: ContactUsProps) => {
  unstable_setRequestLocale(locale);

  return <LoadEditStoreInfoForm />;
};
export default ContactUs;
