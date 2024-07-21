import { TranslationValues, useTranslations } from 'next-intl';

interface ToastErrorMessageProps {
  message: string;
  translationValues?: TranslationValues;
}

const ToastErrorMessage = ({ message, translationValues }: ToastErrorMessageProps) => {
  const t = useTranslations('FormSubmit.error');

  return t(message, translationValues);
};

export default ToastErrorMessage;
