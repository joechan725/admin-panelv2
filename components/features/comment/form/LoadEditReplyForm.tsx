import LoadingSpin from '@/components/loading/LoadingSpin';
import { useReply } from '@/lib/hooks/reply/useReply';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import EditReplyForm from './EditReplyForm';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface LoadEditReplyFormProps {
  onSuccess?: () => void;
}

const LoadEditReplyForm = ({ onSuccess }: LoadEditReplyFormProps) => {
  const params = useParams<{ commentId: string; replyId: string }>();

  const { replyId } = params;

  const { reply, error, isLoading, loadReply } = useReply();

  useEffect(() => {
    loadReply(replyId);
  }, [replyId]);

  if (isLoading) {
    return (
      <div>
        <LoadingSpin theme="secondary" layout="global" />
      </div>
    );
  }

  if (!reply) {
    notFound();
  }

  return (
    <div>
      {!isLoading && reply && <EditReplyForm reply={reply} onSuccess={onSuccess} />}
      {!isLoading && error && <ErrorTranslation error={error} />}
    </div>
  );
};

export default LoadEditReplyForm;
