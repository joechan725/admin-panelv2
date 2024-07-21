'use client';

import { useAdminCommentListsListener } from '@/lib/hooks/user/admin/comment/useAdminCommentListsListener';
import { useParams, useSearchParams } from 'next/navigation';
import { searchAndOrderComments } from './searchAndOrderComments';
import UserCommentTable from './UserCommentTable';
import { useLocale } from 'next-intl';

interface LoadAdminCommentsProps {}

const LoadAdminComments = ({}: LoadAdminCommentsProps) => {
  const locale = useLocale();

  const params = useParams<{ userId: string }>();
  const searchParams = useSearchParams();
  const { userId } = params;
  const { comments, error, isLoading } = useAdminCommentListsListener(userId);
  const displayComments = searchAndOrderComments({ searchParams, comments, locale });

  return (
    <UserCommentTable
      comments={comments}
      displayComments={displayComments}
      isLoading={isLoading}
      error={error}
      mode="admin"
    />
  );
};

export default LoadAdminComments;
