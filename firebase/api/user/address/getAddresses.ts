import { db } from '@/firebase/config';
import { addressConverter } from '@/firebase/converter/user/address/addressConverter';
import { collection, getDocs } from 'firebase/firestore';

interface GetAddressesParameter {
  userId: string;
}

export const getAddresses = async ({ userId }: GetAddressesParameter) => {
  // prepare the address ref.
  const addressesRef = collection(db, `/users/${userId}/addresses`).withConverter(addressConverter);

  // get the document
  const addressesSnap = await getDocs(addressesRef);

  // return the address
  const addresses = addressesSnap.docs.map((doc) => ({ ...doc.data() }));
  return addresses;
};
