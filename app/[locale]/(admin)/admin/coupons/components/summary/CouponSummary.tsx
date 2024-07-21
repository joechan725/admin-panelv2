'use client';

import Globe from '@/components/icon/Globe';
import { useAllHistoryStatisticListener } from '@/lib/hooks/admin/useAllHistoryStatisticListener';
import Ticket from '@/components/icon/Ticket';
import BankNotes from '@/components/icon/BankNotes';
import PaperClip from '@/components/icon/PaperClip';
import { useTranslations } from 'next-intl';

interface CouponSummaryProps {}
const CouponSummary = ({}: CouponSummaryProps) => {
  const t = useTranslations('Coupon.summary');

  const { allHistoryStatistic } = useAllHistoryStatisticListener(true);

  return (
    <div className="grid grid-cols-4 divide-x divide-black/20">
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{allHistoryStatistic?.totalCouponCount ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('coupons')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <PaperClip className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{allHistoryStatistic?.publicCouponCount ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('publicCoupons')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <Globe className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{allHistoryStatistic?.couponUsageCount ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('couponsUsed')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <Ticket className="text-slate-500" />
          </div>
        </div>
      </div>
      <div className="first:pl-0 last:pr-0 px-6 flex justify-between">
        <div className="space-y-2">
          <div className="text-2xl text-gray-600 font-semibold">{allHistoryStatistic?.discountAmount ?? 0}</div>
          <div className="text-sm text-gray-500 font-medium">{t('discountAmount')}</div>
        </div>
        <div>
          <div className="p-1.5 bg-slate-300/50 rounded-md size-10 flex items-center justify-center">
            <BankNotes className="text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CouponSummary;
