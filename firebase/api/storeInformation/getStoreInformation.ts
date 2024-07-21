import { db } from '@/firebase/config';
import { storeInformationConverter } from '@/firebase/converter/store/storeInformationConverter';
import { doc, getDoc } from 'firebase/firestore';

export const getStoreInformation = async () => {
  const storeInformationRef = doc(db, '/store/information').withConverter(storeInformationConverter);

  const storeInformationSnap = await getDoc(storeInformationRef);

  const storeInformation = storeInformationSnap.data();

  return storeInformation;
};
