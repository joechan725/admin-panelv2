import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { Comment } from '@/models/comment/Comment';
import { fakerZH_TW as faker } from '@faker-js/faker';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import { generateFakeImage } from '../image/generateFakeImage';

interface CommentData extends Partial<Omit<Comment, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
  deletedAt?: FieldValue;
}

export const generateFakeComment = (orderId: string): CommentData => {
  const title = faker.lorem.sentence();

  return removeEmptyFieldFormObject({
    title,
    orderId,
    content: faker.lorem.paragraphs(2),
    images: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => generateFakeImage(title)),
    rating: faker.number.int({ min: 1, max: 5 }) as CommentData['rating'],
    published: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
