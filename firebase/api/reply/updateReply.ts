import { doc, FieldValue, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';
import { Reply } from '@/models/reply/Reply';

export interface UpdateReplyFirestoreData
  extends ExtendWithFieldValue<Partial<Omit<Reply, 'createdAt' | 'updatedAt' | 'id'>>> {
  updatedAt: FieldValue;
}

interface UpdateCommentParameters {
  replyId: string;
  replyFirestoreData: UpdateReplyFirestoreData;
}

export const updateReply = async ({ replyId, replyFirestoreData }: UpdateCommentParameters) => {
  // Prepare
  const replyRef = doc(db, `/replies/${replyId}`);

  const updatedReply = {
    ...replyFirestoreData,
  };

  // Update the reply
  await updateDoc(replyRef, updatedReply);
};
