import { Comment } from '@/models/comment/Comment';
import CommentItem from './CommentItem';

type IdObject = { productId: string; commentId: string };

interface CommentListProps {
  comments: Comment[];
  onSelect?: (idObject: IdObject) => void;
  selectedIds?: IdObject[];
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
        isSelect={selectedIds && selectedIds.includes({ commentId: comment.id, productId: comment.productId })}
      />
    ))
  );
};

export default CommentList;
