import { db } from '@/firebase/config';
import { convertFromDateTimeLocalString } from '@/lib/helpers/date/convertFromDateTimeLocalString';
import { convertToDateTimeLocalString } from '@/lib/helpers/date/convertToDateTimeLocalString ';
import { isValidDateString } from '@/lib/helpers/date/isValidDateString';
import { DailyStatistic } from '@/models/statistic/DailyStatistic';
import { doc, onSnapshot } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useDailyStatisticListener = (fetch = true) => {
  const [isFetch, setIsFetch] = useState(fetch);
  const [isLoading, setIsLoading] = useState(true);
  const [dailyStatistic, setDailyStatistic] = useState<DailyStatistic | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();

  const queryDate = searchParams.get('date');
  const searchDate =
    queryDate !== null && isValidDateString(queryDate, 'yyyy-mm-dd')
      ? queryDate
      : convertToDateTimeLocalString(new Date(), 'yyyy-mm-dd');
  const targetDate = convertFromDateTimeLocalString(searchDate, 'yyyy-mm-dd');
  const dateString = convertToDateTimeLocalString(targetDate, 'yyyy-mm-dd');
  const dailyStatisticRef = doc(db, `dailyStatistics/${dateString}`);

  useEffect(() => {
    if (!isFetch) {
      return;
    }
    const unsubscribe = onSnapshot(
      dailyStatisticRef,
      (snap) => {
        const dailyStatisticData = snap.data() as DailyStatistic | undefined;
        setDailyStatistic(dailyStatisticData);
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
  }, [dateString, isFetch]);

  const loadDailyStatistic = () => {
    setIsFetch(true);
  };

  return {
    dailyStatistic,
    error,
    isLoading,
    loadDailyStatistic,
  };
};
