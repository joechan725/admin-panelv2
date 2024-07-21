import { db } from '@/firebase/config';
import { SubscriberList } from '@/models/product/other/SubscriberList';
import { ExtendWithFieldValue } from '@/types/ExtendWithFieldValue';
import { doc, FieldValue, setDoc } from 'firebase/firestore';

interface UpdateProductSubscriberListParameters {
  productId: string;
  subscriberListData: UpdateProductSubscriberListDataToFirestore;
}

export interface UpdateProductSubscriberListDataToFirestore
  extends ExtendWithFieldValue<Partial<Omit<SubscriberList, 'updatedAt'>>> {
  updatedAt: FieldValue;
}

export const updateProductSubscriberList = async ({
  productId,
  subscriberListData,
}: UpdateProductSubscriberListParameters) => {
  const subscriberListRef = doc(db, `/products/${productId}/others/subscriberList`);

  await setDoc(subscriberListRef, { ...subscriberListData }, { merge: true });
};
