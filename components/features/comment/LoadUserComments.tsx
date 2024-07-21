'use client';

import { useUserCommentListsListener } from '@/lib/hooks/user/user/comment/useUserCommentListsListener';
import { useSearchParams } from 'next/navigation';
import { searchAndOrderComments } from './searchAndOrderComments';
import UserCommentTable from './UserCommentTable';
import { useLocale } from 'next-intl';

interface LoadUserCommentsProps {}

const LoadUserComments = ({}: LoadUserCommentsProps) => {
  const locale = useLocale();

  const { comments, error, isLoading } = useUserCommentListsListener();
  const searchParams = useSearchParams();
  const displayComments = searchAndOrderComments({ searchParams, comments, locale });

  return (
    <UserCommentTable
      comments={comments}
      displayComments={displayComments}
      isLoading={isLoading}
      error={error}
      mode="user"
    />
  );
};

export default LoadUserComments;
