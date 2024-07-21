import { Metadata } from 'next';
import CreateReplyModal from '../../../components/modal/CreateReplyModal';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface CreateReplyProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('replyComment'),
  };
};

const CreateReply = ({ params: { locale } }: CreateReplyProps) => {
  unstable_setRequestLocale(locale);

  return <CreateReplyModal />;
};

export default CreateReply;
