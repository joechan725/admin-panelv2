import { db } from '@/firebase/config';
import { generateFakeComment } from './generateFakeComment';
import { doc, updateDoc } from 'firebase/firestore';

export const addFakeComments = async (ids: { productId: string; commentId?: string; orderId: string }[]) => {
  for (let i = 0; i < ids.length; i++) {
    const idObject = ids[i];
    const { commentId, orderId } = idObject;
    if (!commentId) {
      continue;
    }
    const comment = generateFakeComment(orderId);
    const commentRef = doc(db, `/comments/${commentId}`);
    await updateDoc(commentRef, { ...comment });
    console.log(`Create Fake Comments ${i + 1}/${ids.length}`);
  }
};
