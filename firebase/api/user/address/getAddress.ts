import { db } from '@/firebase/config';
import { addressConverter } from '@/firebase/converter/user/address/addressConverter';
import { doc, getDoc } from 'firebase/firestore';

interface GetAddressParameter {
  userId: string;
  addressId: string;
}

export const getAddress = async ({ userId, addressId }: GetAddressParameter) => {
  // prepare the address ref.
  const addressRef = doc(db, `/users/${userId}/addresses/${addressId}`).withConverter(addressConverter);

  // get the document
  const addressSnap = await getDoc(addressRef);

  // return the address
  const address = addressSnap.data();
  return address;
};
