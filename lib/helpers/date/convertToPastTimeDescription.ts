import { TranslationFunction } from '@/types/TranslationFunction';
export const convertToPastTimeDescription = (
  a: Date | string | number,
  b: Date | string | number,
  t?: TranslationFunction
) => {
  const msPerSecond = 1000;

  const date1 = new Date(a);
  const date2 = new Date(b);

  const diffInMilliseconds = Math.abs(date1.valueOf() - date2.valueOf());
  const diffInSeconds = Math.floor(diffInMilliseconds / msPerSecond);

  // Less than a minute
  if (diffInSeconds < 60) {
    return t ? t('justNow') : 'Just now';
  }

  // Lager than a minute and less than a hour
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) {
    return t ? t('minutesAgo', { minutes }) : `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }

  // Lager than a hour and less than a day
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return t ? t('hoursAgo', { hours }) : `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  // Lager than a day and less than a month
  const days = Math.floor(hours / 24);
  if (days < 30) {
    return t ? t('daysAgo', { days }) : `${days} day${days > 1 ? 's' : ''} ago`;
  }

  // Lager than a month and less than a year
  // Calculating full months difference
  const yearsDiff = date2.getFullYear() - date1.getFullYear();
  const monthsDiff = date2.getMonth() - date1.getMonth();
  const daysDiff = date2.getDate() - date1.getDate();

  let months = yearsDiff * 12 + monthsDiff;
  if (daysDiff < 0) {
    months -= 1; // Reduce by one month if the day component is not complete
  }

  if (months < 12) {
    return t ? t('monthsAgo', { months }) : `${months} month${months > 1 ? 's' : ''} ago`;
  }

  // Lager than a year
  const years = Math.floor(months / 12);
  return t ? t('yearsAgo', { years }) : `${years} year${years > 1 ? 's' : ''} ago`;
};
