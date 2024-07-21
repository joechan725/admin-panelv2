'use client';

import { convertFromDateTimeLocalString } from '@/lib/helpers/date/convertFromDateTimeLocalString';
import { convertToDateTimeLocalString } from '@/lib/helpers/date/convertToDateTimeLocalString ';
import { useSearching } from '@/lib/hooks/searchParam/useSearching';
import { useEffect, useState } from 'react';

interface DateSearchProps {
  searchParamsKey?: string;
  disabled?: boolean;
  title?: string;
  description?: string;
  type?: 'datetime-local' | 'date';
  canBeAfterToday: boolean;
}

const DateSearch = ({
  searchParamsKey = 'date',
  disabled = false,
  title,
  description,
  type = 'date',
  canBeAfterToday,
}: DateSearchProps) => {
  const currentDate = convertToDateTimeLocalString(
    new Date().getTime(),
    type === 'date' ? 'yyyy-mm-dd' : 'yyyy-mm-ddThh:mm'
  );

  const [date, setDate] = useState<string>(currentDate);

  const { searchParams, loadSetSearchParams } = useSearching();

  const searchDate = searchParams.get(searchParamsKey);

  useEffect(() => {
    loadSetSearchParams({
      key: searchParamsKey,
      value: date,
    });
  }, [date]);

  useEffect(() => {
    if (!searchDate) {
      return;
    }
    setDate(searchDate);
  }, [searchDate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (canBeAfterToday) {
      setDate(event.target.value);
      return;
    }
    const targetDate = convertFromDateTimeLocalString(
      event.target.value,
      type === 'date' ? 'yyyy-mm-dd' : 'yyyy-mm-ddThh:mm'
    );

    const currentDate = new Date();

    if (targetDate.getTime() > currentDate.getTime()) {
      return;
    }

    setDate(event.target.value);
  };

  return (
    <div className="mb-4">
      {title && <div className="mb-2 text-sm text-slate-600 font-semibold">{title}</div>}
      <input
        type={type}
        disabled={disabled}
        className="max-w-full px-4 w-full py-2 rounded-md border has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1"
        value={date}
        onChange={handleChange}
      />
      {description && <div className="block mb-2 text-xs mt-1 text-gray-500">{description}</div>}
    </div>
  );
};

export default DateSearch;
