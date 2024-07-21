export const convertFromDateTimeLocalString = (
  dateString: string,
  format: 'yyyy-mm-ddThh:mm' | 'yyyy-mm-dd' = 'yyyy-mm-ddThh:mm'
): Date => {
  if (format === 'yyyy-mm-ddThh:mm') {
    const year = +(dateString.split('-').at(0) as string);
    const month = +(dateString.split('-').at(1) as string);
    const day = +(dateString.split('-').at(2)?.split('T').at(0) as string);
    const hour = +(dateString.split('T').at(1)?.split(':').at(0) as string);
    const minutes = +(dateString.split('T').at(1)?.split(':').at(1) as string);

    return new Date(year, month - 1, day, hour, minutes);
  }

  const year = +(dateString.split('-').at(0) as string);
  const month = +(dateString.split('-').at(1) as string);
  const day = +(dateString.split('-').at(2) as string);

  return new Date(year, month - 1, day);
};
