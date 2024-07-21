import { Timestamp } from 'firebase/firestore';

type Mode = 'short' | 'medium' | 'detail';

export const formatDate = (
  dateInput: number | Date | Timestamp | undefined | null,
  mode: Mode,
  fallback?: string
): string => {
  if (!dateInput) {
    return fallback ?? '';
  }

  const date = dateInput instanceof Timestamp ? dateInput.toDate() : new Date(dateInput);

  const options: { [key in Mode]: Intl.DateTimeFormatOptions } = {
    short: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    },
    medium: {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
    },
    detail: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      hour12: false,
      minute: '2-digit',
      second: '2-digit',
    },
  };

  const selectedOptions = options[mode];

  const formatter = new Intl.DateTimeFormat('en-US', selectedOptions);

  return formatter.format(date);
};
