import { Comment } from '@/models/comment/Comment';
import { Reply } from '@/models/reply/Reply';
import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface ReplyData extends Omit<Reply, 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
}

interface CommentData extends Omit<Comment, 'createdAt' | 'updatedAt' | 'replies' | 'deletedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  deletedAt?: Timestamp;
  replies: (ReplyData & { id: string })[];
}

interface CommentListData {
  comments: (CommentData & { id: string })[];
  ids: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const commentListConverter = {
  toFirestore: (comments: Comment[]): DocumentData => {
    return comments;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Comment[] => {
    const commentListData = snapshot.data(options) as CommentListData;

    const commentsData = commentListData.comments;

    const comments: Comment[] = commentsData.map((commentData): Comment => {
      const replies = commentData.replies?.map(
        (reply): Reply => ({
          ...reply,
          createdAt: reply.createdAt.toMillis(),
          updatedAt: reply.updatedAt.toMillis(),
          deletedAt: reply.deletedAt?.toMillis(),
        })
      );

      return {
        ...commentData,
        replies,
        createdAt: commentData.createdAt.toMillis(),
        updatedAt: commentData.updatedAt.toMillis(),
        deletedAt: commentData.deletedAt?.toMillis(),
      };
    });

    return comments;
  },
};
