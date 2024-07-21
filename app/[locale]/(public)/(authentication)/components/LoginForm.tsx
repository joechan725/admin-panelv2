'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextInput from '@/components/form/TextInput';
import { useSessionStore } from '@/stores/useSessionStore';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import Email from '@/components/icon/Email';
import Lock from '@/components/icon/Lock';
import BarButton from '@/components/form/BarButton';
import ProviderLogin from './ProviderLogin';
import { loginSchema, LoginSchema } from '@/schemas/user/loginSchema';
import ForgotPassWordLink from './ForgotPassWordLink';
import RegisterLink from './RegisterLink';
import { useTranslations } from 'next-intl';
import PolicyStatement from './PolicyStatement';

interface LoginFormProps {}

const LoginForm = ({}: LoginFormProps) => {
  const t = useTranslations('UserAuth');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { loginWithEmailAndPassword, error, isLoggingIn, isLoading } = useSessionStore((state) => ({
    loginWithEmailAndPassword: state.loginWithEmailAndPassword,
    error: state.error,
    isLoggingIn: state.isLoggingIn,
    isLoading: state.isLoading,
  }));

  const handleSignIn: SubmitHandler<LoginSchema> = async (data) => {
    await loginWithEmailAndPassword(data.email, data.password);
  };

  const isPending = isSubmitting || isLoggingIn;

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="w-full">
      <div className="text-2xl mb-6 text-center font-medium text-primary-text">{t('login')}</div>
      {/* email */}
      <TextInput
        disabled={isPending}
        type="email"
        starting={<Email sizeClassName="size-5" />}
        placeholder={t('email')}
        register={register}
        registerName="email"
        errors={errors}
      />
      {/* password */}
      <TextInput
        disabled={isPending}
        type="password"
        starting={<Lock sizeClassName="size-5" />}
        placeholder={t('password')}
        register={register}
        registerName="password"
        errors={errors}
      />
      {/* submit button */}
      <BarButton type="submit" disabled={isPending || isLoading} theme="black">
        {t('login')}
      </BarButton>
      {/* error message */}
      <ErrorTranslation error={errors?.root?.message} />
      <ErrorTranslation error={error} />
      {/* login with provider */}
      <ProviderLogin isSubmitting={isPending || isLoading} />
      {/* other auth links */}
      <div className="space-y-2 mt-6">
        <RegisterLink />
        <ForgotPassWordLink />
      </div>
      <PolicyStatement />
    </form>
  );
};

export default LoginForm;
