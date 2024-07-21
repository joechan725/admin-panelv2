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
import { RegisterSchema, registerSchema } from '@/schemas/user/registerSchema';
import ForgotPassWordLink from './ForgotPassWordLink';
import LoginLink from './LoginLink';
import PolicyStatement from './PolicyStatement';
import { useTranslations } from 'next-intl';

interface RegisterFormProps {}

const RegisterForm = ({}: RegisterFormProps) => {
  const t = useTranslations('UserAuth');

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { registerWithEmailAndPassword, error, isLoggingIn, isLoading } = useSessionStore((state) => ({
    registerWithEmailAndPassword: state.registerWithEmailAndPassword,
    error: state.error,
    isLoggingIn: state.isLoggingIn,
    isLoading: state.isLoading,
  }));

  const handleRegister: SubmitHandler<RegisterSchema> = async (formData) => {
    const { email, password } = formData;
    await registerWithEmailAndPassword(email, password);
  };

  const isPending = isSubmitting || isLoggingIn;

  return (
    <form onSubmit={handleSubmit(handleRegister)} className="w-full">
      <div className="text-2xl mb-6 text-center font-medium text-primary-text">{t('register')}</div>
      {/* email */}
      <TextInput
        disabled={isPending}
        starting={<Email sizeClassName="size-5" className="text-slate-600/80" />}
        placeholder={t('email')}
        type="email"
        register={register}
        registerName="email"
        errors={errors}
      />
      {/* password */}
      <TextInput
        disabled={isPending}
        starting={<Lock sizeClassName="size-5" className="text-slate-600/80" />}
        placeholder={t('password')}
        type="password"
        register={register}
        registerName="password"
        errors={errors}
      />
      {/* confirm password */}
      <TextInput
        disabled={isPending}
        starting={<Lock sizeClassName="size-5" className="text-slate-600/80" />}
        placeholder={t('confirmPassword')}
        type="password"
        register={register}
        registerName="confirmPassword"
        errors={errors}
      />
      {/* submit button */}
      <BarButton type="submit" disabled={isPending || isLoading} theme="black">
        {t('register')}
      </BarButton>
      {/* error message */}
      <ErrorTranslation error={errors?.root?.message} />
      <ErrorTranslation error={error} />
      {/* login with provider */}
      <ProviderLogin isSubmitting={isPending || isLoading} />
      {/* other auth links */}
      <div className="space-y-2 mt-6">
        <LoginLink />
        <ForgotPassWordLink />
      </div>
      {/* Policy statement */}
      <PolicyStatement />
    </form>
  );
};

export default RegisterForm;
