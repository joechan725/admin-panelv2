import { db } from '@/firebase/config';
import { privateClassificationListConverter } from '@/firebase/converter/classification/privateClassificationListConverter';
import { doc, getDoc } from 'firebase/firestore';

export const getPrivateClassificationList = async () => {
  // prepare
  const privateClassificationListRef = doc(db, 'privateLists/privateClassificationList').withConverter(
    privateClassificationListConverter
  );

  // get
  const privateClassificationListSnap = await getDoc(privateClassificationListRef);

  const privateClassificationList = privateClassificationListSnap.data();

  return (
    privateClassificationList ?? {
      privateBrands: [],
      privateCategories: [],
      privateCollections: [],
      tags: [],
    }
  );
};
