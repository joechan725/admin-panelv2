import { Reply } from '@/models/reply/Reply';
import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from 'firebase/firestore';

interface ReplyData extends Omit<Reply, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const replyConverter = {
  toFirestore: (reply: Reply) => {
    return reply;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Reply => {
    const reply = snapshot.data(options) as ReplyData;

    return {
      ...reply,
      id: snapshot.id,
      createdAt: reply.createdAt.toMillis(),
      updatedAt: reply.updatedAt.toMillis(),
    };
  },
};
