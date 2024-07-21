import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

interface PolicyStatementProps {}

const PolicyStatement = ({}: PolicyStatementProps) => {
  const tGeneral = useTranslations('General');
  const t = useTranslations('UserAuth');

  return (
    <div className="text-[10px] text-tertiary-text font-medium mt-2">
      {t('policyStatementPart1')}
      <Link
        className="underline-offset-1 font-semibold underline transition-all hover:text-opacity-85 active:text-opacity-70"
        href="/privacy-policy"
      >
        {t('privacyPolicy')}
      </Link>
      ,{' '}
      <Link
        className="underline-offset-1 font-semibold underline transition-all hover:text-opacity-85 active:text-opacity-70"
        href="/terms-of-service"
      >
        {t('termsOfService')}
      </Link>
      {t('policyStatementPart2', { companyName: tGeneral('companyName') })}
    </div>
  );
};

export default PolicyStatement;
