import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

interface RegisterLinkProps {}

const RegisterLink = ({}: RegisterLinkProps) => {
  const t = useTranslations('UserAuth');

  return (
    <div className="flex gap-2 justify-center items-center text-slate-500">
      <span className="text-sm text-tertiary-text">{t('newMember')}</span>
      <Link
        href="/register"
        className="text-sm font-bold text-secondary-text transition-all hover:opacity-70 active:opacity-40"
      >
        {t('register')}
      </Link>
    </div>
  );
};

export default RegisterLink;
