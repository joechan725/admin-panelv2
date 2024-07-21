import { db } from '@/firebase/config';
import { classificationListConverter } from '@/firebase/converter/classification/classificationListConverter';
import { doc, getDoc } from 'firebase/firestore';

export const getClassificationList = async () => {
  // prepare
  const classificationListRef = doc(db, 'lists/classificationList').withConverter(classificationListConverter);

  // get
  const classificationListSnap = await getDoc(classificationListRef);

  const classificationList = classificationListSnap.data();

  return (
    classificationList ?? {
      brands: [],
      categories: [],
      collections: [],
      tags: [],
    }
  );
};
