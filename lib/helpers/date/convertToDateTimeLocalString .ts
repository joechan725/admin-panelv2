export const convertToDateTimeLocalString = (
  date: Date | number,
  format: 'yyyy-mm-ddThh:mm' | 'yyyy-mm-dd' | 'yyyy-mm' | 'yyyy' = 'yyyy-mm-ddThh:mm'
) => {
  const targetDate = new Date(date);

  const year = targetDate.getFullYear();
  const month = (targetDate.getMonth() + 1).toString().padStart(2, '0');
  const day = targetDate.getDate().toString().padStart(2, '0');
  const hours = targetDate.getHours().toString().padStart(2, '0');
  const minutes = targetDate.getMinutes().toString().padStart(2, '0');

  if (format === 'yyyy-mm-ddThh:mm') {
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  if (format === 'yyyy-mm-dd') {
    return `${year}-${month}-${day}`;
  }
  if (format === 'yyyy-mm') {
    return `${year}-${month}`;
  }
  return `${year}`;
};
