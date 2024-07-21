import Clock from '@/components/icon/Clock';
import { formatDate } from '@/lib/helpers/date/formatDate';
import { Order } from '@/models/order/Order';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface GeneralInformationProps {
  order: Order;
}

const GeneralInformation = ({ order }: GeneralInformationProps) => {
  const t = useTranslations('Order.confirmation');

  const { id, paidAt, createdAt, queryCode } = order;

  return (
    <div className="text-center space-y-4">
      <div className="text-2xl font-semibold text-primary-text">{t('thankYou')}</div>
      <div className="space-y-1">
        <div className="text-sm font-medium text-secondary-text">
          {t('successfulStatement1')}
          <Link
            href={`/orders/${id}`}
            className="underline underline-offset-1 text-link transition-all hover:text-opacity-85 active:text-opacity-70"
          >
            #{id}
          </Link>{' '}
          {t('successfulStatement2')}
        </div>
        <div>
          <div>
            <span className="text-sm font-semibold text-primary-text">{t('queryCode')}</span>
            <span className="text-sm font-medium text-secondary-text">{queryCode}</span>
          </div>
          <div className="text-xs font-medium text-secondary-text">{t('queryCodeDescription')}</div>
        </div>
        <div className="text-sm font-medium text-secondary-text">{t('processStatement')}</div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Clock sizeClassName="size-4" className="inline-block" />
        <span className="text-sm font-semibold text-primary-text">{t('orderTime')}</span>
        <span className="text-sm font-medium text-secondary-text">{formatDate(paidAt ?? createdAt, 'detail')}</span>
      </div>
    </div>
  );
};

export default GeneralInformation;
