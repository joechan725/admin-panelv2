'use client';

import { useSessionStore } from '@/stores/useSessionStore';
import BarButton from '@/components/form/BarButton';
import Apple from '@/components/icon/Apple';
import GoogleColored from '@/components/icon/GoogleColored';
import Facebook from '@/components/icon/Facebook';
import OrDividerLine from '@/components/form/OrDividerLine';
import { useTranslations } from 'next-intl';

interface ProviderLoginProps {
  isSubmitting: boolean;
}

const ProviderLogin = ({ isSubmitting }: ProviderLoginProps) => {
  const t = useTranslations('UserAuth');

  const { loginWithProvider } = useSessionStore((state) => ({
    loginWithProvider: state.loginWithProvider,
  }));

  return (
    <div className="mb-4">
      <OrDividerLine>{t('orContinueWith')}</OrDividerLine>
      <div className="space-y-2">
        <BarButton type="button" disabled={isSubmitting} theme="white" onClick={() => loginWithProvider('Google')}>
          <GoogleColored sizeClassName="size-4" /> Google
        </BarButton>
        <BarButton type="button" disabled={isSubmitting} theme="black" onClick={() => loginWithProvider('Apple')}>
          <Apple sizeClassName="size-4" /> Apple
        </BarButton>
        <BarButton type="button" disabled={isSubmitting} theme="facebook" onClick={() => loginWithProvider('Facebook')}>
          <Facebook sizeClassName="size-4" /> Facebook
        </BarButton>
      </div>
    </div>
  );
};

export default ProviderLogin;
