import { db } from '@/firebase/config';
import { storeAddressConverter } from '@/firebase/converter/storeAddress/storeAddressConverter';
import { doc, getDoc } from 'firebase/firestore';

export const getStoreAddress = async (storeAddressId: string) => {
  // prepare the store address ref.
  const storeAddressRef = doc(db, `storeAddresses/${storeAddressId}`).withConverter(storeAddressConverter);

  // get the document
  const storeAddressSnap = await getDoc(storeAddressRef);

  // return the store address
  const storeAddress = storeAddressSnap.data();
  return storeAddress;
};
