import EditCommentModal from '@/app/[locale]/(admin)/admin/comments/components/modal/EditCommentModal';
import { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  userId: string;
  commentId: string;
  locale: string;
}

interface EditCommentProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('editComment'),
  };
};

const EditComment = ({ params: { locale, userId } }: EditCommentProps) => {
  unstable_setRequestLocale(locale);

  return <EditCommentModal page="user" userId={userId} />;
};

export default EditComment;
