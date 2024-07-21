import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

interface LoginLinkProps {}

const LoginLink = ({}: LoginLinkProps) => {
  const t = useTranslations('UserAuth');

  return (
    <div className="flex gap-2 justify-center items-center">
      <span className="text-sm text-tertiary-text">{t('alreadyHaveAnAccount')}</span>
      <Link
        href="/login"
        className="text-sm font-bold text-secondary-text transition-all hover:opacity-70 active:opacity-40"
      >
        {t('login')}
      </Link>
    </div>
  );
};

export default LoginLink;
