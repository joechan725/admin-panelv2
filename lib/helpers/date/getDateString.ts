/**
 * Returns the object of data strings
 *
 * @param date? - Date or number by ServerTimestamp.toMillis() or new Date().getTime()
 * @returns The object of date string. Example: { dateString: '20240416', monthString: '202404', yearString: '2024' };
 */
export const getDateString = (date?: number | Date) => {
  const current = date ? new Date(date) : new Date();
  const currentDate = current.getDate();
  const currentMonth = current.getMonth();
  const currentYear = current.getFullYear();

  const dateString = `${currentYear}${(currentMonth + 1).toString().padStart(2, '0')}${currentDate}`;
  const monthString = `${currentYear}${(currentMonth + 1).toString().padStart(2, '0')}`;
  const yearString = `${currentYear}`;
  return { dateString, monthString, yearString };
};
