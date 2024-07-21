import { useTranslations } from 'next-intl';

interface ToastSuccessMessageProps {
  message: string;
}

const ToastSuccessMessage = ({ message }: ToastSuccessMessageProps) => {
  const t = useTranslations('FormSubmit.success');

  return t(message);
};

export default ToastSuccessMessage;
