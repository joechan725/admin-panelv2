'use client';

interface CurrentYearProps {}

const CurrentYear = ({}: CurrentYearProps) => {
  const current = new Date();
  const currentYear = current.getFullYear();

  return currentYear;
};

export default CurrentYear;
