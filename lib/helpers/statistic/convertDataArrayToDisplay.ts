interface ConvertDataArrayToDisplayParameters {
  dataDaily: (number | undefined)[];
  dataMonthly: (number | undefined)[];
  dataYearly: (number | undefined)[];
  dataAll: number | undefined;
  viewOption: string;
}

export const convertDataArrayToDisplay = ({
  dataDaily,
  dataMonthly,
  dataYearly,
  dataAll,
  viewOption,
}: ConvertDataArrayToDisplayParameters) => {
  // Handle daily data
  const dataToday = dataDaily[0] ?? 0;
  const data1DayAgo = dataDaily[1] ?? 0;
  const dailyDifferent = +(((dataToday - data1DayAgo) / data1DayAgo) * 100).toFixed(0);

  let dataToShow = dataToday;
  let percentDifferent = dailyDifferent;

  // Handle weekly data
  if (viewOption === 'weekly') {
    // Divide the 14 days data into 2 weekly
    const dataThisWeek =
      dataDaily.reduce((accumulator = 0, data = 0, index): number => {
        if (index < 7) {
          return accumulator + data;
        }
        return accumulator;
      }, 0) ?? 0;
    const data1WeekAgo =
      dataDaily.reduce((accumulator = 0, data = 0, index): number => {
        if (index >= 7) {
          return accumulator + data;
        }
        return accumulator;
      }, 0) ?? 0;
    const weeklyDifferent = +(((dataThisWeek - data1WeekAgo) / data1WeekAgo) * 100).toFixed(0);

    dataToShow = dataThisWeek;
    percentDifferent = weeklyDifferent;
  }

  // Handle monthly data
  if (viewOption === 'monthly') {
    const dataThisMonth = dataMonthly[0] ?? 0;
    const data1MonthAgo = dataMonthly[1] ?? 0;
    const monthlyDifferent = +(((dataThisMonth - data1MonthAgo) / data1MonthAgo) * 100).toFixed(0);

    dataToShow = dataThisMonth;
    percentDifferent = monthlyDifferent;
  }

  // Handle yearly data
  if (viewOption === 'year') {
    const dataThisYear = dataYearly[0] ?? 0;
    const data1YearAgo = dataYearly[1] ?? 0;
    const yearlyDifferent = +(((dataThisYear - data1YearAgo) / data1YearAgo) * 100).toFixed(0);

    dataToShow = dataThisYear ?? 0;
    percentDifferent = yearlyDifferent;
  }

  // Handle all history data
  if (viewOption === 'all') {
    dataToShow = dataAll ?? 0;
    percentDifferent = 0;
  }

  // Turn percentDifferent to 0 if it is NaN
  if (isNaN(percentDifferent)) {
    percentDifferent = 0;
  }

  // Turn percentDifferent to 100 if it is infinity
  if (percentDifferent === Infinity) {
    percentDifferent = 100;
  }

  return { dataToShow, percentDifferent };
};
