'use client';

import BarButton from '@/components/form/BarButton';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import TextInput from '@/components/form/TextInput';
import Email from '@/components/icon/Email';
import Lock from '@/components/icon/Lock';
import { registerSchema, RegisterSchema } from '@/schemas/user/registerSchema';
import { useSessionStore } from '@/stores/useSessionStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserInfo } from 'firebase/auth';
import { useRouter } from '@/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import AddPasswordStatement from './AddPasswordStatement';
import ProviderVerifyStatement from './ProviderVerifyStatement';
import { useTranslations } from 'next-intl';

interface AddEmailPasswordFormProps {
  userInfos: UserInfo[];
}

const AddEmailPasswordForm = ({ userInfos }: AddEmailPasswordFormProps) => {
  const t = useTranslations('UserAuth');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { error, isLoggingIn, isLoading, isWriting, addEmailAndPassword } = useSessionStore((state) => ({
    error: state.error,
    isLoggingIn: state.isLoggingIn,
    isLoading: state.isLoading,
    isWriting: state.isWriting,
    addEmailAndPassword: state.addEmailAndPassword,
  }));

  const handleSignIn: SubmitHandler<RegisterSchema> = async (data) => {
    const { email, password } = data;

    const res = await addEmailAndPassword(email, password);

    if (res === true) {
      router.refresh();
    }
  };

  const isPending = isSubmitting || isLoggingIn || isWriting;

  return (
    <form onSubmit={handleSubmit(handleSignIn)}>
      <div className="mb-2 text-center text-lg font-semibold text-primary-text">{t('addEmailAndPassword')}</div>
      <AddPasswordStatement userInfos={userInfos} />
      <TextInput
        disabled={isPending}
        type="email"
        starting={<Email sizeClassName="size-5" className="text-primary-text/80" />}
        placeholder={t('email')}
        register={register}
        registerName="email"
        errors={errors}
      />
      <TextInput
        disabled={isPending}
        type="password"
        starting={<Lock sizeClassName="size-5" className="text-primary-text/80" />}
        placeholder={t('password')}
        register={register}
        registerName="password"
        errors={errors}
      />
      <TextInput
        disabled={isPending}
        type="password"
        starting={<Lock sizeClassName="size-5" className="text-primary-text/80" />}
        placeholder={t('confirmPassword')}
        register={register}
        registerName="confirmPassword"
        errors={errors}
      />
      <BarButton type="submit" disabled={isPending || isLoading} theme="primary">
        {t('save')}
      </BarButton>
      <ProviderVerifyStatement userInfos={userInfos} />
      <ErrorTranslation error={error} />
    </form>
  );
};

export default AddEmailPasswordForm;
