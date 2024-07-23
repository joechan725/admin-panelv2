import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

interface PolicyStatementProps {}

const PolicyStatement = ({}: PolicyStatementProps) => {
  const t = useTranslations('Order.checkoutForm');

  return (
    <div className="text-xs font-medium text-tertiary-text mt-2">
      {t('policyStatementPart1')}
      <Link
        className="underline-offset-1 underline text-link transition-all hover:text-opacity-85 active:text-opacity-70"
        href="/privacy-policy"
      >
        {t('privacyPolicy')}
      </Link>
      {t('and1')}
      <Link
        className="underline-offset-1 underline text-link transition-all hover:text-opacity-85 active:text-opacity-70"
        href="/terms-of-service"
      >
        {t('termsOfService')}
      </Link>
      {t('and2')}
      <Link
        className="underline-offset-1 underline text-link transition-all hover:text-opacity-85 active:text-opacity-70"
        href="/return-and-exchange-policy"
      >
        {t('returnAndExchangePolicy')}
      </Link>
    </div>
  );
};

export default PolicyStatement;
