import { fakerZH_TW as faker } from '@faker-js/faker';
import { db } from '@/firebase/config';
import { addDoc, collection } from 'firebase/firestore';
import { generateFakePromotion } from './generateFakePromotion';
import { addFakeNotification } from './addFakeNotification';

export const addFakePromotions = async (numberOfPromotions: number) => {
  const promotionsRef = collection(db, '/promotions');
  for (let i = 0; i < numberOfPromotions; i++) {
    const promotion = generateFakePromotion();
    const { promoteByEmail, promoteByNotification, html, subject } = promotion;
    if (promoteByEmail) {
      // No fake email is add otherwise the email will be actually sent
      promotion.emailId = faker.database.mongodbObjectId();
    }
    if (promoteByNotification) {
      const notificationId = await addFakeNotification({ html, subject });
      promotion.notificationId = notificationId;
    }
    await addDoc(promotionsRef, promotion);
    console.log(`Create Fake Store Promotions ${i + 1}/${numberOfPromotions}`);
  }
};
