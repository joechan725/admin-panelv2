import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

interface ForgotPassWordLinkProps {}

const ForgotPassWordLink = ({}: ForgotPassWordLinkProps) => {
  const t = useTranslations('UserAuth');

  return (
    <div className="flex gap-2 justify-center items-center">
      <Link
        href="/forgot-password"
        className="text-sm font-bold text-secondary-text transition-all hover:opacity-70 active:opacity-40"
      >
        {t('forgotPassword')}
      </Link>
    </div>
  );
};

export default ForgotPassWordLink;
