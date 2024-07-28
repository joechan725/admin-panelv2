'use client';

import { usePrivateCommentListsListener } from '@/lib/hooks/comment/usePrivateCommentListsListener';
import { useSearchParams } from 'next/navigation';
import { searchAndOrderComments } from './searchAndOrderComments';
import CommentTable from './CommentTable';
import { useLocale } from 'next-intl';

type IdObject = { productId: string; commentId: string };

interface LoadCommentsProps {
  onSelect?: (idObject: IdObject) => void;
  selectedIds?: IdObject[];
}

const LoadComments = ({ onSelect, selectedIds }: LoadCommentsProps) => {
  const locale = useLocale();

  const { privateComments, error, isLoading } = usePrivateCommentListsListener();
  const searchParams = useSearchParams();

  const displayComments = searchAndOrderComments({ searchParams, privateComments, locale });

  return (
    <CommentTable
      displayComments={displayComments}
      privateComments={privateComments}
      isLoading={isLoading}
      error={error}
      onSelect={onSelect}
      selectedIds={selectedIds}
    />
  );
};
export default LoadComments;
