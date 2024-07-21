import { db } from '@/firebase/config';
import { generateFakeReply } from './generateFakeReply';
import { addDoc, collection } from 'firebase/firestore';
import { fakerZH_CN as faker } from '@faker-js/faker';
import { getUsers } from '@/firebase/api/user/getUsers';

export const addFakeReplies = async (productAndCommentIds: { productId: string; commentId?: string }[]) => {
  const users = await getUsers();

  for (let i = 0; i < productAndCommentIds.length; i++) {
    const productAndCommentId = productAndCommentIds[i];
    const { productId, commentId } = productAndCommentId;
    if (!commentId) {
      continue;
    }
    const adminUsers = users.filter((user) => user.isAdmin);

    const adminUser = adminUsers[faker.number.int({ min: 0, max: adminUsers.length - 1 })];
    if (!adminUser) {
      return;
    }

    const reply = generateFakeReply({ commentId, productId, user: adminUser });
    const repliesRef = collection(db, '/replies');
    await addDoc(repliesRef, reply);
    console.log(`Create Fake Replies ${i + 1}/${productAndCommentIds.length}`);
  }
};
