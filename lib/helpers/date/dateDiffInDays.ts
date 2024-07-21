export const dateDiffInDays = (a: Date | string | number, b: Date | string | number) => {
  const msPerDay = 1000 * 60 * 60 * 24;

  const date1 = new Date(a);
  const date2 = new Date(b);

  const diffInMilliseconds = Math.abs(date1.valueOf() - date2.valueOf());

  const diffInDay = Math.floor(diffInMilliseconds / msPerDay);

  return diffInDay;
};
