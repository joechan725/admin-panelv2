import { db } from '@/firebase/config';
import { convertFromDateTimeLocalString } from '@/lib/helpers/date/convertFromDateTimeLocalString';
import { convertToDateTimeLocalString } from '@/lib/helpers/date/convertToDateTimeLocalString ';
import { isValidDateString } from '@/lib/helpers/date/isValidDateString';
import { YearlyStatistic } from '@/models/statistic/YearlyStatistic';
import { doc, onSnapshot } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useYearlyStatisticListener = (fetch = true) => {
  const [isFetch, setIsFetch] = useState(fetch);
  const [isLoading, setIsLoading] = useState(true);
  const [yearlyStatistic, setYearlyStatistic] = useState<YearlyStatistic | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();

  const queryDate = searchParams.get('date');
  const searchDate =
    queryDate !== null && isValidDateString(queryDate, 'yyyy-mm-dd')
      ? queryDate
      : convertToDateTimeLocalString(new Date(), 'yyyy-mm-dd');
  const targetDate = convertFromDateTimeLocalString(searchDate, 'yyyy-mm-dd');
  const yearString = convertToDateTimeLocalString(targetDate, 'yyyy');
  const yearlyStatisticRef = doc(db, `yearlyStatistics/${yearString}`);

  useEffect(() => {
    if (!isFetch) {
      return;
    }

    const unsubscribe = onSnapshot(
      yearlyStatisticRef,
      (snap) => {
        const yearlyStatisticData = snap.data() as YearlyStatistic | undefined;
        setYearlyStatistic(yearlyStatisticData);
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
  }, [yearString, isFetch]);

  const loadYearlyStatistic = () => {
    setIsFetch(true);
  };

  return {
    yearlyStatistic,
    error,
    isLoading,
    loadYearlyStatistic,
  };
};
