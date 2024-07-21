import { Reply } from '@/models/reply/Reply';
import ReplyItem from './ReplyItem';

interface ReplyListProps {
  replies?: Reply[];
}

const ReplyList = ({ replies }: ReplyListProps) => {
  return replies && replies.length > 0 && replies.map((reply) => <ReplyItem key={reply.id} reply={reply} />);
};

export default ReplyList;
