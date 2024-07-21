import { Comment } from '@/models/comment/Comment';
import CommentList from './CommentList';
import PaginationIndicatorServer from '@/components/search/PaginationIndicatorServer';
import PaginationServer from '@/components/search/PaginationServer';
import { commentsPerPage } from './commentsPerPage';
import { useTranslations } from 'next-intl';

interface CommentFrameProps {
  displayComments: Comment[];
  pageNumber: number;
  commentsLength: number;
  productId: string;
}

const CommentFrame = ({ displayComments, pageNumber, commentsLength, productId }: CommentFrameProps) => {
  const t = useTranslations('Product.detail');

  return (
    <>
      {(!displayComments || displayComments.length === 0) && (
        <div className="font-medium text-secondary-text">{t('noComments')}</div>
      )}
      <CommentList comments={displayComments} />
      <div className="flex justify-between items-center mt-4 flex-wrap">
        <PaginationIndicatorServer
          currentPage={pageNumber}
          itemsPerPage={commentsPerPage}
          itemName="products"
          itemsLength={commentsLength}
        />
        <PaginationServer
          redirectPath={(pageNumber: string | number) => `/products/${productId}/comments/page/${pageNumber}`}
          currentPage={pageNumber}
          theme="primary"
          itemsPerPage={commentsPerPage}
          itemsLength={commentsLength}
        />
      </div>
    </>
  );
};

export default CommentFrame;
