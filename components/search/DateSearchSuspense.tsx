import { Suspense } from 'react';
import DateSearch from './DateSearch';

interface DateSearchSuspenseProps {
  searchParamsKey?: string;
  disabled?: boolean;
  title?: string;
  description?: string;
  type?: 'datetime-local' | 'date';
  canBeAfterToday: boolean;
}

const DateSearchSuspense = ({
  searchParamsKey = 'date',
  disabled = false,
  title,
  description,
  type = 'date',
  canBeAfterToday,
}: DateSearchSuspenseProps) => {
  return (
    <Suspense>
      <DateSearch
        searchParamsKey={searchParamsKey}
        canBeAfterToday={canBeAfterToday}
        description={description}
        disabled={disabled}
        title={title}
        type={type}
      />
    </Suspense>
  );
};

export default DateSearchSuspense;
