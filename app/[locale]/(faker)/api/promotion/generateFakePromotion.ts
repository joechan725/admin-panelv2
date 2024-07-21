import { removeEmptyFieldFormObject } from '@/lib/helpers/objects/removeEmptyFieldFormObject';
import { Promotion } from '@/models/promotion/Promotion';
import { fakerZH_TW as faker } from '@faker-js/faker';
import { FieldValue, serverTimestamp } from 'firebase/firestore';

interface PromotionData extends Omit<Promotion, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export const generateFakePromotion = (): PromotionData => {
  const promoteByEmail = faker.datatype.boolean();
  const promoteByNotification = faker.datatype.boolean();
  return removeEmptyFieldFormObject({
    promoteByEmail,
    promoteByNotification,
    bcc: promoteByEmail
      ? Array.from({ length: faker.number.int({ min: 0, max: 100 }) }, () => faker.internet.email())
      : undefined,
    subject: faker.lorem.sentence(),
    html: faker.lorem.paragraphs(3),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
