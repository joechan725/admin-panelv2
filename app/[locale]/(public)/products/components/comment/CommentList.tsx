import { Comment } from '@/models/comment/Comment';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Comment[];
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    comments && comments.length > 0 && comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)
  );
};

export default CommentList;
