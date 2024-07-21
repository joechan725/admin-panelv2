import { clsx } from 'clsx/lite';
import { useTranslations } from 'next-intl';

interface ErrorTranslationProps {
  error?: string;
  align?: 'right' | 'center' | 'left';
}

const ErrorTranslation = ({ error, align }: ErrorTranslationProps) => {
  const t = useTranslations('FormSubmit.error');

  if (!error) {
    return null;
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
      <p className="text-sm font-medium text-danger">{t(error)}</p>
    </div>
  );
};

export default ErrorTranslation;
