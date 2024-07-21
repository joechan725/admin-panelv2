import { useTranslations } from 'next-intl';
import toast, { ToastOptions } from 'react-hot-toast';

export const useToast = () => {
  const tSuccess = useTranslations('FormSubmit.success');
  const tError = useTranslations('FormSubmit.error');

  const toastSuccess = (message: string, toastOption?: ToastOptions) => {
    toast.success(tSuccess(message), toastOption);
  };

  const toastError = (message: string, toastOption?: ToastOptions) => {
    toast.error(tError(message), toastOption);
  };

  return {
    toastSuccess,
    toastError,
  };
};
