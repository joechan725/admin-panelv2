'use client';

import BoxButton from '@/components/form/BoxButton';
import Plus from '@/components/icon/Plus';
import ItemsPerPageSelector from '@/components/search/ItemsPerPageSelector';
import PrintContainer from '@/components/search/PrintContainer';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import { Link } from '@/navigation';
import { Suspense, useState } from 'react';
import CouponsDeleteButton from '../list/CouponsDeleteButton';
import LoadCoupons from '../list/LoadCoupons';
import { useTranslations } from 'next-intl';

interface CouponFrameProps {}
const CouponFrame = ({}: CouponFrameProps) => {
  const t = useTranslations('Coupon.list');

  const [selectedCouponIds, setSelectCouponIds] = useState<string[]>([]);
  const handleSelect = (id: string) => {
    if (selectedCouponIds.includes(id)) {
      setSelectCouponIds((prevIds) => prevIds.filter((prevId) => prevId !== id));
      return;
    }
    setSelectCouponIds((prevIds) => [...prevIds, id]);
  };
  const handleClearIds = () => {
    setSelectCouponIds([]);
  };

  return (
    <PrintContainer
      heading={
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div className="max-w-96">
              <SearchQueryBarSuspense />
            </div>
            <CouponsDeleteButton onDelete={handleClearIds} selectedCouponIds={selectedCouponIds} />
          </div>
          <div>
            <ItemsPerPageSelector />
          </div>
        </div>
      }
      ending={
        <Link href="/admin/coupons/create">
          <BoxButton disabled={false} type="button" theme="primary">
            <Plus />
            {t('new')}
          </BoxButton>
        </Link>
      }
    >
      <Suspense>
        <LoadCoupons onSelect={handleSelect} selectedCouponIds={selectedCouponIds} />
      </Suspense>
    </PrintContainer>
  );
};
export default CouponFrame;
