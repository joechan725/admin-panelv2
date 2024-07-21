import { db } from '@/firebase/config';
import { storeAddressListConverter } from '@/firebase/converter/storeAddress/storeAddressListConverter';
import { StoreAddress } from '@/models/store/StoreAddress';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useStoreAddressListListener = () => {
  const [storeAddresses, setStoreAddresses] = useState<StoreAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storeAddressListRef = doc(db, `lists/storeAddressList`).withConverter(storeAddressListConverter);
    const unsubscribe = onSnapshot(
      storeAddressListRef,
      (snapshot) => {
        const storeAddressListData = snapshot.data() ?? [];
        setStoreAddresses(storeAddressListData);
        setIsLoading(false);
      },
      (error) => {
        setError('unexpectedError');
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return { storeAddresses, isLoading, error };
};
