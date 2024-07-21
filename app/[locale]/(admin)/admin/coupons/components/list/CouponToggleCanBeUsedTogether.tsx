'use client';

import ToggleSwitch from '@/components/form/ToggleSwitch';
import { useCoupon } from '@/lib/hooks/coupon/useCoupon';
import { PrivateCoupon } from '@/models/coupon/PrivateCoupon';
import { useState } from 'react';

interface CouponToggleCanBeUsedTogetherProps {
  privateCoupon: PrivateCoupon;
}

const CouponToggleCanBeUsedTogether = ({ privateCoupon }: CouponToggleCanBeUsedTogetherProps) => {
  const { toggleCanBeUsedTogether } = useCoupon();
  const [canBeUsedTogether, setCanBeUsedTogether] = useState(privateCoupon.canBeUsedTogether);

  const handleToggle = async () => {
    toggleCanBeUsedTogether({ canBeUsedTogether, setCanBeUsedTogether, coupon: privateCoupon });
  };

  return <ToggleSwitch isToggled={canBeUsedTogether} onToggle={handleToggle} theme="success" />;
};

export default CouponToggleCanBeUsedTogether;
