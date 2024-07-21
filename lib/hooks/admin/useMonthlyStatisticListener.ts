import { db } from '@/firebase/config';
import { convertFromDateTimeLocalString } from '@/lib/helpers/date/convertFromDateTimeLocalString';
import { convertToDateTimeLocalString } from '@/lib/helpers/date/convertToDateTimeLocalString ';
import { isValidDateString } from '@/lib/helpers/date/isValidDateString';
import { MonthlyStatistic } from '@/models/statistic/MonthlyStatistic';
import { doc, onSnapshot } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useMonthlyStatisticListener = (fetch = true) => {
  const [isFetch, setIsFetch] = useState(fetch);
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyStatistic, setMonthlyStatistic] = useState<MonthlyStatistic | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();

  const queryDate = searchParams.get('date');
  const searchDate =
    queryDate !== null && isValidDateString(queryDate, 'yyyy-mm-dd')
      ? queryDate
      : convertToDateTimeLocalString(new Date(), 'yyyy-mm-dd');
  const targetDate = convertFromDateTimeLocalString(searchDate, 'yyyy-mm-dd');
  const monthString = convertToDateTimeLocalString(targetDate, 'yyyy-mm');
  const monthlyStatisticRef = doc(db, `monthlyStatistics/${monthString}`);

  useEffect(() => {
    if (!isFetch) {
      return;
    }
    const unsubscribe = onSnapshot(
      monthlyStatisticRef,
      (snap) => {
        const monthlyStatisticData = snap.data() as MonthlyStatistic | undefined;
        setMonthlyStatistic(monthlyStatisticData);
        setIsLoading(false);
      },
      () => {
        setError('Unexpected error. Please try again later');
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [monthString, isFetch]);

  const loadMonthlyStatistic = () => {
    setIsFetch(true);
  };

  return {
    monthlyStatistic,
    error,
    isLoading,
    loadMonthlyStatistic,
  };
};
