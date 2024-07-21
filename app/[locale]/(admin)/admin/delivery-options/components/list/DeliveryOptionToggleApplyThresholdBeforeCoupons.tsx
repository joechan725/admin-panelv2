'use client';

import ToggleSwitch from '@/components/form/ToggleSwitch';
import { useDeliveryOption } from '@/lib/hooks/deliveryOption/useDeliveryOption';
import { PrivateDeliveryOption } from '@/models/deliveryOption/PrivateDeliveryOption';
import { useState } from 'react';

interface DeliveryOptionToggleApplyThresholdBeforeCouponsProps {
  privateDeliveryOptions: PrivateDeliveryOption;
}
const DeliveryOptionToggleApplyThresholdBeforeCoupons = ({
  privateDeliveryOptions,
}: DeliveryOptionToggleApplyThresholdBeforeCouponsProps) => {
  const { toggleApplyThresholdBeforeCoupons } = useDeliveryOption();
  const [applyThresholdBeforeCoupons, setApplyThresholdBeforeCoupons] = useState(
    privateDeliveryOptions.applyThresholdBeforeCoupons
  );

  const handleToggle = async () => {
    toggleApplyThresholdBeforeCoupons({
      applyThresholdBeforeCoupons,
      setApplyThresholdBeforeCoupons,
      deliveryOption: privateDeliveryOptions,
    });
  };

  return <ToggleSwitch isToggled={applyThresholdBeforeCoupons} onToggle={handleToggle} theme="success" />;
};
export default DeliveryOptionToggleApplyThresholdBeforeCoupons;
