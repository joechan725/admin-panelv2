import clsx from 'clsx/lite';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

interface ErrorMessageProps {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | string | undefined | null;
  align?: 'right' | 'center' | 'left';
}

const ErrorMessage = ({ error, align = 'left' }: ErrorMessageProps) => {
  if (!error) {
    return null;
  }

  if (typeof error === 'string') {
    return (
      <div
        className={clsx(
          'flex',
          align === 'left' && 'justify-start',
          align === 'center' && 'justify-center',
          align === 'right' && 'justify-end'
        )}
      >
        <p className="text-sm font-medium text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'flex',
        align === 'left' && 'justify-start',
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end'
      )}
    >
      <p className="text-sm font-medium text-danger">{error.message?.toString()}</p>
    </div>
  );
};

export default ErrorMessage;
