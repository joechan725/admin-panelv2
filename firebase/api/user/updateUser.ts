import { db } from '@/firebase/config';
import { User } from '@/models/user/User';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';
import { doc, FieldValue, updateDoc } from 'firebase/firestore';

interface UpdateUserParameters {
  userId: string;
  userData: UpdateUserFirestoreData;
}

export interface UpdateUserFirestoreData
  extends ExtendWithFieldValue<
    Partial<
      Omit<
        User,
        | 'createdAt'
        | 'updatedAt'
        | 'totalSpent'
        | 'dateOfBirth'
        | 'orderCount'
        | 'totalDiscountAmount'
        | 'couponUsedCount'
        | 'notificationCount'
        | 'cartItemCount'
        | 'addressCount'
      >
    >
  > {
  dateOfBirth?: Date | FieldValue;
  updatedAt: FieldValue;
}

export const updateUser = async ({ userId, userData }: UpdateUserParameters) => {
  // prepare
  const userRef = doc(db, `users/${userId}`);

  await updateDoc(userRef, { ...userData });
};
