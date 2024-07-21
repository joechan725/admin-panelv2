import { db } from '@/firebase/config';
import { generateFakeComment } from './generateFakeComment';
import { doc, updateDoc } from 'firebase/firestore';

export const addFakeComments = async (productAndCommentIds: { productId: string; commentId?: string }[]) => {
  for (let i = 0; i < productAndCommentIds.length; i++) {
    const productAndCommentId = productAndCommentIds[i];
    const { commentId } = productAndCommentId;
    if (!commentId) {
      continue;
    }
    const comment = generateFakeComment();
    const commentRef = doc(db, `/comments/${commentId}`);
    await updateDoc(commentRef, { ...comment });
    console.log(`Create Fake Comments ${i + 1}/${productAndCommentIds.length}`);
  }
};
