import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { Reply } from '@/models/reply/Reply';
import { fakerZH_TW as faker } from '@faker-js/faker';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { User } from '@/models/user/User';
import { generateFakeImage } from '../image/generateFakeImage';

interface ReplyData extends Omit<Reply, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  deletedAt?: FieldValue;
}

interface GenerateFakeReplyParameters {
  productId: string;
  commentId: string;
  user: User;
}

export const generateFakeReply = ({ commentId, productId, user }: GenerateFakeReplyParameters): ReplyData => {
  const title = faker.lorem.sentence();

  return removeEmptyFieldFormObject({
    productId,
    commentId,
    userId: user.id,
    userRole: user.role,
    userAvatar: user.avatar,
    userEmail: user.email,
    userFirstName: user.firstName,
    userLastName: user.lastName,
    title,
    content: faker.lorem.paragraphs(2),
    images: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => generateFakeImage(title)),
    published: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
