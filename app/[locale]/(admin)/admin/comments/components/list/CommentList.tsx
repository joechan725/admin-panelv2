import { Comment } from '@/models/comment/Comment';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  onSelect?: (commentId: string) => void;
  selectedIds?: string[];
}

const CommentList = ({ comments, onSelect, selectedIds }: CommentListProps) => {
  return (
    comments &&
    comments.length > 0 &&
    comments.map((comment) => (
      <CommentItem
        key={comment.id}
        comment={comment}
        onSelect={onSelect}
        isSelect={selectedIds && selectedIds.includes(comment.id)}
      />
    ))
  );
};

export default CommentList;
