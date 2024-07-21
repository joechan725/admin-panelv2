import LoadingSpin from '@/components/loading/LoadingSpin';
import { useComment } from '@/lib/hooks/comment/useComment';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import CreateReplyForm from './CreateReplyForm';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface LoadCreateReplyFormProps {
  onSuccess?: () => void;
}

const LoadCreateReplyForm = ({ onSuccess }: LoadCreateReplyFormProps) => {
  const params = useParams<{ commentId: string }>();

  const { commentId } = params;

  const { comment, error, isLoading, loadComment } = useComment();

  useEffect(() => {
    loadComment(commentId);
  }, [commentId]);

  if (isLoading) {
    return (
      <div>
        <LoadingSpin theme="secondary" layout="global" />
      </div>
    );
  }

  if (!isLoading && !error && !comment) {
    notFound();
  }

  return (
    <div>
      {!isLoading && comment && <CreateReplyForm comment={comment} onSuccess={onSuccess} />}
      {!isLoading && <ErrorTranslation error={error} />}
    </div>
  );
};

export default LoadCreateReplyForm;
