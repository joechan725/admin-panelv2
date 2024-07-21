import Widget from '@/components/layout/container/Widget';
import { useTranslations } from 'next-intl';
import CouponFrame from '../frame/CouponFrame';
import CouponSummary from '../summary/CouponSummary';

interface CouponRootProps {}

const CouponRoot = ({}: CouponRootProps) => {
  const t = useTranslations('Coupon.list');

  return (
    <div className="space-y-5">
      <h2 className="ml-2 text-2xl text-slate-700 font-semibold">{t('title')}</h2>
      <div className="space-y-6">
        <Widget className="p-4">
          <CouponSummary />
        </Widget>
        <Widget className="p-4">
          <CouponFrame />
        </Widget>
      </div>
    </div>
  );
};

export default CouponRoot;
