import { Reply } from '@/models/reply/Reply';
import ReplyItem from './ReplyItem';

interface ReplyListProps {
  replies?: Reply[];
}

const ReplyList = ({ replies }: ReplyListProps) => {
  return (
    replies &&
    replies.length > 0 && (
      <div className="mt-2 space-y-2">
        {replies.map((reply, index) => (
          <ReplyItem key={reply.id} reply={reply} isLastOne={index === replies.length - 1} />
        ))}
      </div>
    )
  );
};

export default ReplyList;
