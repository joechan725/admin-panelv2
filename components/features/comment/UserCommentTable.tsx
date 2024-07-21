'use client';

import Th from '@/components/table/Th';
import PaginationClient from '@/components/search/PaginationClient';
import PaginationIndicatorClient from '@/components/search/PaginationIndicatorClient';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import UserCommentSkeleton from './UserCommentSkeleton';
import { Comment } from '@/models/comment/Comment';
import TrHead from '@/components/table/TrHead';
import UserCommentList from './UserCommentList';
import { useTranslations } from 'next-intl';

interface UserCommentTableProps {
  isLoading: boolean;
  error?: string;
  displayComments: Comment[];
  comments: Comment[];
  mode: 'admin' | 'user';
}

const UserCommentTable = ({ isLoading, error, comments, displayComments, mode }: UserCommentTableProps) => {
  const t = useTranslations('Comment.list');

  return (
    <div className="mb-4 relative">
      {isLoading && <LoadingShimmer gradient="gray" roundedClassName="rounded-none" />}
      <table className="w-full">
        <thead>
          <TrHead>
            {/* product */}
            <Th searchParamsValue="product">{t('product')}</Th>
            {/* comment */}
            <Th searchParamsValue="comment">{t('comment')}</Th>
            {/* time */}
            <Th searchParamsValue="updateAt">{t('time')}</Th>
            {/* actions */}
            <Th>{t('actions')}</Th>
          </TrHead>
        </thead>
        {isLoading && <UserCommentSkeleton />}
        {!isLoading && (
          <tbody>
            <UserCommentList comments={displayComments} mode={mode} />
          </tbody>
        )}
      </table>
      {(!comments || comments.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItems')}</div>
      )}
      {comments && comments.length > 0 && (!displayComments || displayComments.length === 0) && (
        <div className="p-2 text-sm font-medium text-secondary-text">{t('noItemsMatchSearching')}</div>
      )}
      {error && <ErrorTranslation error={error} />}
      <div className="flex justify-between items-center mt-4 flex-wrap">
        <PaginationIndicatorClient itemName={t('indicator')} itemsLength={comments?.length} />
        <PaginationClient theme="primary" itemsLength={comments?.length} />
      </div>
    </div>
  );
};

export default UserCommentTable;
