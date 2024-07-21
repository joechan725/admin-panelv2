import { Comment } from '@/models/comment/Comment';
import { Reply } from '@/models/reply/Reply';
import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface CommentData extends Omit<Comment, 'id' | 'createdAt' | 'updatedAt' | 'replies' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
  replies?: (ReplyData & { id: string })[];
}

interface ReplyData extends Omit<Reply, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}

export const commentConverter = {
  toFirestore: (comment: Comment) => {
    return comment;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Comment => {
    const comment = snapshot.data(options) as CommentData;

    const replies = comment.replies?.map(
      (reply): Reply => ({
        ...reply,
        createdAt: reply.createdAt?.toMillis(),
        updatedAt: reply.updatedAt?.toMillis(),
        deletedAt: reply.deletedAt?.toMillis(),
      })
    );

    return {
      ...comment,
      replies,
      id: snapshot.id,
      createdAt: comment.createdAt?.toMillis(),
      updatedAt: comment.updatedAt?.toMillis(),
      deletedAt: comment.deletedAt?.toMillis(),
    };
  },
};
