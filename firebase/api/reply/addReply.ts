import { db } from '@/firebase/config';
import { Reply } from '@/models/reply/Reply';
import { addDoc, collection, FieldValue } from 'firebase/firestore';

export interface AddReplyFirestoreData extends Omit<Reply, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

interface AddReplyParameters {
  replyData: AddReplyFirestoreData;
}

export const addReply = async ({ replyData }: AddReplyParameters) => {
  // prepare
  const repliesRef = collection(db, '/replies');

  // upload the new reply
  const res = await addDoc(repliesRef, replyData);

  // return the reply id
  const id = res.id;
  return id;
};
