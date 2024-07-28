'use client';

import Th from '@/components/table/Th';
import PaginationClient from '@/components/search/PaginationClient';
import PaginationIndicatorClient from '@/components/search/PaginationIndicatorClient';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import CommentSkeleton from './CommentSkeleton';
import TrHead from '@/components/table/TrHead';
import CommentList from './CommentList';
import { Comment } from '@/models/comment/Comment';
import { useTranslations } from 'next-intl';
import ErrorTranslation from '@/components/form/ErrorTranslation';

type IdObject = { productId: string; commentId: string };

interface CommentTableProps {
  onSelect?: (idObject: IdObject) => void;
  selectedIds?: IdObject[];
  isLoading: boolean;
  error?: string;
  displayComments: Comment[];
  privateComments: Comment[];
}

const CommentTable = ({
  onSelect,
  selectedIds,
  displayComments,
  privateComments,
  isLoading,
  error,
}: CommentTableProps) => {
  const t = useTranslations('Comment.adminList');

  return (
    <div className="mb-4 relative">
      {isLoading && <LoadingShimmer gradient="gray" roundedClassName="rounded-none" />}
      <table className="w-full">
        <thead>
          <TrHead>
            {onSelect && <th></th>}
            {/* product */}
            <Th searchParamsValue="product">{t('product')}</Th>
            {/* user */}
            <Th searchParamsValue="user">{t('user')}</Th>
            {/* comment */}
            <Th searchParamsValue="comment">{t('comment')}</Th>
            {/* time */}
            <Th searchParamsValue="updateAt">{t('time')}</Th>
            {/* actions */}
            <Th>{t('actions')}</Th>
          </TrHead>
        </thead>
        <tbody>
          {isLoading && <CommentSkeleton />}
          {!isLoading && <CommentList comments={displayComments} onSelect={onSelect} selectedIds={selectedIds} />}
        </tbody>
      </table>
      {(!privateComments || privateComments.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItems')}</div>
      )}
      {privateComments && privateComments.length > 0 && (!displayComments || displayComments.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItemsMatchSearching')}</div>
      )}
      <ErrorTranslation error={error} />
      <div className="flex justify-between items-center mt-4 flex-wrap">
        <PaginationIndicatorClient itemName={t('indicator')} itemsLength={privateComments?.length} />
        <PaginationClient theme="primary" itemsLength={privateComments?.length} />
      </div>
    </div>
  );
};

export default CommentTable;
