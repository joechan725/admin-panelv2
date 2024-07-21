'use client';

import BarButton from '@/components/form/BarButton';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import TextInput from '@/components/form/TextInput';
import Lock from '@/components/icon/Lock';
import { changePasswordSchema, ChangePasswordSchema } from '@/schemas/user/changePasswordSchema';
import { useSessionStore } from '@/stores/useSessionStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ChangePasswordFormProps {}

const ChangePasswordForm = ({}: ChangePasswordFormProps) => {
  const t = useTranslations('UserAuth');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { error, isLoggingIn, isLoading, isWriting, changePassword } = useSessionStore((state) => ({
    error: state.error,
    isLoggingIn: state.isLoggingIn,
    isLoading: state.isLoading,
    isWriting: state.isWriting,
    changePassword: state.changePassword,
  }));

  const handleSignIn: SubmitHandler<ChangePasswordSchema> = async (data) => {
    const { oldPassword, newPassword } = data;

    const res = await changePassword(oldPassword, newPassword);

    if (res === true) {
      reset();
    }
  };

  const isPending = isSubmitting || isLoggingIn || isWriting;

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <div className="mb-2 text-center text-lg font-semibold text-primary-text">{t('changePassword')}</div>
      <TextInput
        disabled={isPending}
        type="password"
        starting={<Lock sizeClassName="size-5" className="text-slate-600/80" />}
        placeholder={t('originalPassword')}
        register={register}
        registerName="oldPassword"
        errors={errors}
      />
      <TextInput
        disabled={isPending}
        type="password"
        starting={<Lock sizeClassName="size-5" className="text-slate-600/80" />}
        placeholder={t('newPassword')}
        register={register}
        registerName="newPassword"
        errors={errors}
      />
      <TextInput
        disabled={isPending}
        type="password"
        starting={<Lock sizeClassName="size-5" className="text-slate-600/80" />}
        placeholder={t('confirmPassword')}
        register={register}
        registerName="confirmPassword"
        errors={errors}
      />
      <BarButton type="submit" disabled={isPending || isLoading} theme="primary">
        {t('save')}
      </BarButton>
      <ErrorTranslation error={error} />
    </form>
  );
};

export default ChangePasswordForm;
