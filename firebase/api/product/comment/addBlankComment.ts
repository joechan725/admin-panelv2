import { addDoc, collection, FieldValue } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Comment } from '@/models/comment/Comment';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';

export interface AddBlankCommentFirestoreData
  extends ExtendWithFieldValue<
    Omit<Comment, 'title' | 'content' | 'images' | 'rating' | 'createdAt' | 'updatedAt' | 'id'>
  > {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

interface AddBlankCommentParameters {
  commentFirestoreData: AddBlankCommentFirestoreData;
}

export const addBlankComment = async ({ commentFirestoreData }: AddBlankCommentParameters) => {
  // Prepare
  const commentsRef = collection(db, `/comments`);

  // Add the comment
  const res = await addDoc(commentsRef, commentFirestoreData);

  const commentId = res.id;
  return commentId;
};
