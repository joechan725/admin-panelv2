import { Metadata } from 'next';
import EditReplyModal from '../../../../components/modal/EditReplyModal';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface EditReplyProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('editReply'),
  };
};

const EditReply = ({ params: { locale } }: EditReplyProps) => {
  unstable_setRequestLocale(locale);

  return <EditReplyModal />;
};

export default EditReply;
