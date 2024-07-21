import { db } from '@/firebase/config';
import { salesRecordListConverter } from '@/firebase/converter/salesRecord/salesRecordListConverter';
import { SalesRecord } from '@/models/salesRecord/SalesRecord';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useSalesRecordListsListener = () => {
  const [salesRecords, setSaleRecords] = useState<SalesRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const current = new Date();
  const currentYear = current.getFullYear();
  const targetDate = new Date(currentYear, 0, 1);

  const salesRecordListsRef = collection(db, '/salesRecordLists').withConverter(salesRecordListConverter);
  const salesRecordListsQuery = query(salesRecordListsRef, where('updatedAt', '>=', targetDate));

  useEffect(() => {
    const unsubscribe = onSnapshot(
      salesRecordListsQuery,
      (snapshot) => {
        const salesRecordListsData = snapshot.docs.map((doc) => doc.data());
        const salesRecordsData = salesRecordListsData.flat();

        setSaleRecords(salesRecordsData);
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
    salesRecords,
    isLoading,
    error,
  };
};
