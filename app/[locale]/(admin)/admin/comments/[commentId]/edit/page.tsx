import { Metadata } from 'next';
import EditCommentModal from '../../components/modal/EditCommentModal';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface EditCommentProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('editComment'),
  };
};

const EditComment = ({ params: { locale } }: EditCommentProps) => {
  unstable_setRequestLocale(locale);

  return <EditCommentModal page="comment" />;
};

export default EditComment;
