'use client';

import ToggleSwitch from '@/components/form/ToggleSwitch';
import { useCoupon } from '@/lib/hooks/coupon/useCoupon';
import { PrivateCoupon } from '@/models/coupon/PrivateCoupon';
import { useState } from 'react';

interface CouponTogglePublicProps {
  privateCoupon: PrivateCoupon;
}

const CouponTogglePublic = ({ privateCoupon }: CouponTogglePublicProps) => {
  const { toggleIsPublic } = useCoupon();
  const [isPublic, setIsPublic] = useState(privateCoupon.isPublic);

  const handleToggle = async () => {
    toggleIsPublic({ isPublic, setIsPublic, coupon: privateCoupon });
  };

  return <ToggleSwitch isToggled={isPublic} onToggle={handleToggle} theme="success" />;
};

export default CouponTogglePublic;
