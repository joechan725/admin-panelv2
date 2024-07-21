import { Comment } from '@/models/comment/Comment';
import UserCommentItem from './UserCommentItem';

interface UserCommentListProps {
  comments: Comment[];
  mode: 'admin' | 'user';
}

const UserCommentList = ({ comments, mode }: UserCommentListProps) => {
  return (
    comments &&
    comments.length > 0 &&
    comments.map((comment) => <UserCommentItem key={comment.id} comment={comment} mode={mode} />)
  );
};

export default UserCommentList;
