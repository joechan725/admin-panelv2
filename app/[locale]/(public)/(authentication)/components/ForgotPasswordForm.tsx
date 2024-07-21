'use client';

import BarButton from '@/components/form/BarButton';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import TextInput from '@/components/form/TextInput';
import Email from '@/components/icon/Email';
import { forgotPasswordSchema, ForgotPasswordSchema } from '@/schemas/user/forgotPasswordSchema';
import { useSessionStore } from '@/stores/useSessionStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import RegisterLink from './RegisterLink';
import LoginLink from './LoginLink';
import { useTranslations } from 'next-intl';

interface ForgotPasswordFormProps {}

const ForgotPasswordForm = ({}: ForgotPasswordFormProps) => {
  const t = useTranslations('UserAuth');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { forgotPassword, error, isLoading } = useSessionStore((state) => ({
    forgotPassword: state.forgotPassword,
    error: state.error,
    isLoading: state.isLoading,
  }));

  const handleForgotPassword: SubmitHandler<ForgotPasswordSchema> = async (data) => {
    await forgotPassword(data.email);
  };

  const isPending = isSubmitting || isLoading;

  return (
    <form onSubmit={handleSubmit(handleForgotPassword)} className="w-full">
      <div className="text-2xl mb-4 text-center font-medium text-primary-text">{t('forgotPasswordTitle')}</div>
      <TextInput
        disabled={isPending}
        type="email"
        starting={<Email sizeClassName="size-5" className="text-primary-text/80" />}
        placeholder={t('email')}
        register={register}
        registerName="email"
        errors={errors}
      />
      <BarButton type="submit" disabled={isPending || isLoading} theme="black">
        {t('sendPasswordResetEmail')}
      </BarButton>
      <ErrorTranslation error={errors?.root?.message} />
      <ErrorTranslation error={error} />
      <div className="space-y-2 mt-6">
        <RegisterLink />
        <LoginLink />
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
