import { getProductCommentLists } from '@/firebase/api/product/comment/getProductCommentLists';
import CommentFrame from './CommentFrame';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { sliceObjectsByPage } from '@/lib/helpers/objects/sliceObjectsByPage';
import { commentsPerPage } from './commentsPerPage';
import { Comment } from '@/models/comment/Comment';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface LoadCommentsProps {
  productId: string;
  pageNumber: number;
}

const LoadComments = async ({ productId, pageNumber }: LoadCommentsProps) => {
  const t = useTranslations('Error');

  let comments: Comment[];

  try {
    comments = await getProductCommentLists(productId);
  } catch (error) {
    return <div className="text-sm font-medium text-secondary-text">{t('unexpectedError')}</div>;
  }

  // sort comments by updatedAt
  const sortedComments = sortObjectsByKey(comments, 'updatedAt', 'desc');

  // pagination
  const paginatedComments = sliceObjectsByPage(sortedComments, pageNumber, commentsPerPage);

  if (pageNumber !== 1 && paginatedComments.length === 0) {
    notFound();
  }

  // return
  return (
    <CommentFrame
      productId={productId}
      pageNumber={pageNumber}
      commentsLength={comments.length}
      displayComments={paginatedComments}
    />
  );
};

export default LoadComments;
