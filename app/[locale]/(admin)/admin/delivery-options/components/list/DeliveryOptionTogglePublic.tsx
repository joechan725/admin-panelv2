'use client';

import ToggleSwitch from '@/components/form/ToggleSwitch';
import { useDeliveryOption } from '@/lib/hooks/deliveryOption/useDeliveryOption';
import { PrivateDeliveryOption } from '@/models/deliveryOption/PrivateDeliveryOption';
import { useState } from 'react';

interface DeliveryOptionTogglePublicProps {
  privateDeliveryOptions: PrivateDeliveryOption;
}
const DeliveryOptionTogglePublic = ({ privateDeliveryOptions }: DeliveryOptionTogglePublicProps) => {
  const { toggleIsPublic } = useDeliveryOption();
  const [isPublic, setIsPublic] = useState(privateDeliveryOptions.isPublic);

  const handleToggle = async () => {
    toggleIsPublic({ isPublic, setIsPublic, deliveryOption: privateDeliveryOptions });
  };

  return <ToggleSwitch isToggled={isPublic} onToggle={handleToggle} theme="success" />;
};
export default DeliveryOptionTogglePublic;
