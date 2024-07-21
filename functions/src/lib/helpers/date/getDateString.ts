import { Timestamp } from 'firebase-admin/firestore';

/**
 * Returns the object of data strings
 *
 * @param date? - Date or Timestamp or number by ServerTimestamp.toMillis() or new Date().getTime()
 * @returns The object of array of date string. Example: { futureDayStrings: ['2024-04-16', '2024-04-17', ...], futureMonthStrings: ['2024-04', '2024-05' ...], futureYearStrings: ['2024', '2025'] };
 */

export const getDateString = (date?: number | Date | Timestamp) => {
  const current = date ? (date instanceof Timestamp ? new Date(date.toMillis()) : new Date(date)) : new Date();
  const currentSecond = current.getSeconds();
  const currentMinute = current.getMinutes();
  const currentHour = current.getHours();
  const currentDate = current.getDate();
  const currentMonth = current.getMonth();
  const currentYear = current.getFullYear();

  // Helper function to format date strings
  const formatDateString = (date: Date) => {
    const offsetDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' }));

    const year = offsetDate.getFullYear();
    const month = offsetDate.getMonth();
    const day = offsetDate.getDate();

    return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  // Helper function to format mouth strings
  const formatMonthString = (date: Date) => {
    const offsetDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' }));

    const year = offsetDate.getFullYear();
    const month = offsetDate.getMonth();

    return `${year}-${(month + 1).toString().padStart(2, '0')}`;
  };

  // Helper function to format year strings
  const formatYearString = (date: Date) => {
    const offsetDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' }));

    const year = offsetDate.getFullYear();

    return `${year}`;
  };

  // Generate date strings for today and the next six days
  const futureDayStrings = Array.from({ length: 14 }, (_, i) => {
    const futureDate = new Date(currentYear, currentMonth, currentDate + i, currentHour, currentMinute, currentSecond);
    return formatDateString(futureDate);
  });

  const futureMonthStrings = Array.from({ length: 12 }, (_, i) => {
    const futureDate = new Date(currentYear, currentMonth + i, currentDate, currentHour, currentMinute, currentSecond);
    return formatMonthString(futureDate);
  });

  const futureYearStrings = Array.from({ length: 2 }, (_, i) => {
    const futureDate = new Date(currentYear + i, currentMonth, currentDate, currentHour, currentMinute, currentSecond);
    return formatYearString(futureDate);
  });

  return {
    futureDayStrings,
    futureMonthStrings,
    futureYearStrings,
  };
};
