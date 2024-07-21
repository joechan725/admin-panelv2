'use client';

import ToggleSwitch from '@/components/form/ToggleSwitch';
import { useCoupon } from '@/lib/hooks/coupon/useCoupon';
import { PrivateCoupon } from '@/models/coupon/PrivateCoupon';
import { useState } from 'react';

interface CouponToggleRegisteredUserOnlyProps {
  privateCoupon: PrivateCoupon;
}

const CouponToggleRegisteredUserOnly = ({ privateCoupon }: CouponToggleRegisteredUserOnlyProps) => {
  const { toggleRegisteredUserOnly } = useCoupon();
  const [registeredUserOnly, setRegisteredUserOnly] = useState(privateCoupon.registeredUserOnly);

  const handleToggle = async () => {
    toggleRegisteredUserOnly({ registeredUserOnly, setRegisteredUserOnly, coupon: privateCoupon });
  };

  return <ToggleSwitch isToggled={registeredUserOnly} onToggle={handleToggle} theme="success" />;
};

export default CouponToggleRegisteredUserOnly;
