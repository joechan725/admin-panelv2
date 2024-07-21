export const dateDiffInSeconds = (a: Date | string | number, b: Date | string | number) => {
  const msPerSecond = 1000;

  const date1 = new Date(a);
  const date2 = new Date(b);

  const diffInMilliseconds = Math.abs(date1.valueOf() - date2.valueOf());

  const diffInSeconds = Math.floor(diffInMilliseconds / msPerSecond);

  return diffInSeconds;
};
