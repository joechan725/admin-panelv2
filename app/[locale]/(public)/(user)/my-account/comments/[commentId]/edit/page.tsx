import { unstable_setRequestLocale } from 'next-intl/server';
import EditCommentModal from '../../../components/modal/EditCommentModal';
import { Metadata } from 'next';

interface EditCommentProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'Edit a comment',
};

const EditComment = ({ params: { locale } }: EditCommentProps) => {
  unstable_setRequestLocale(locale);

  return <EditCommentModal />;
};

export default EditComment;
