import { db } from '@/firebase/config';
import { promotionListConverter } from '@/firebase/converter/promotion/promotionListConverter';
import { Promotion } from '@/models/promotion/Promotion';
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const usePromotionListsListener = () => {
  const [promotions, setSaleRecords] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const promotionListsRef = collection(db, '/promotionLists').withConverter(promotionListConverter);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      promotionListsRef,
      (snapshot) => {
        const promotionListsData = snapshot.docs.map((doc) => doc.data());
        const promotionsData = promotionListsData.flat();

        setSaleRecords(promotionsData);
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

  return {
    promotions,
    isLoading,
    error,
  };
};
