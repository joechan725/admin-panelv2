import LoadingSpin from '@/components/loading/LoadingSpin';
import { useComment } from '@/lib/hooks/comment/useComment';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import EditCommentForm from './EditCommentForm';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface LoadEditCommentFormProps {
  onSuccess?: () => void;
}

const LoadEditCommentForm = ({ onSuccess }: LoadEditCommentFormProps) => {
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

  if (!error && !comment) {
    notFound();
  }

  return (
    <div>
      {!isLoading && comment && <EditCommentForm comment={comment} onSuccess={onSuccess} />}
      {!isLoading && error && <ErrorTranslation error={error} />}
    </div>
  );
};

export default LoadEditCommentForm;
