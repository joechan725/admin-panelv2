import { doc, FieldValue, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Comment } from '@/models/comment/Comment';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';

export interface UpdateCommentFirestoreData
  extends ExtendWithFieldValue<Partial<Omit<Comment, 'createdAt' | 'updatedAt' | 'id'>>> {
  updatedAt: FieldValue;
}

interface UpdateCommentParameters {
  commentId: string;
  commentFirestoreData: UpdateCommentFirestoreData;
}

export const updateComment = async ({ commentId, commentFirestoreData }: UpdateCommentParameters) => {
  // Prepare
  const commentRef = doc(db, `/comments/${commentId}`);

  const updatedComment = {
    ...commentFirestoreData,
  };

  // Update the comment
  await updateDoc(commentRef, updatedComment);
};
