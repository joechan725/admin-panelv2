import { db } from '@/firebase/config';
import { storeAddressConverter } from '@/firebase/converter/storeAddress/storeAddressConverter';
import { collection, getDocs } from 'firebase/firestore';

export const getStoreAddresses = async () => {
  // prepare the address ref.
  const storeAddressesRef = collection(db, `storeAddresses`).withConverter(storeAddressConverter);

  // get the document
  const storeAddressesSnap = await getDocs(storeAddressesRef);

  // return the store addresses
  const storeAddresses = storeAddressesSnap.docs.map((doc) => ({ ...doc.data() }));
  return storeAddresses;
};
