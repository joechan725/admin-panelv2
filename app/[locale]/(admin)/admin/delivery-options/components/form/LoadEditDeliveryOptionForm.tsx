'use client';

import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDeliveryOption } from '@/lib/hooks/deliveryOption/useDeliveryOption';
import EditDeliveryOptionForm from './EditDeliveryOptionForm';
import LoadingSpin from '@/components/loading/LoadingSpin';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface LoadEditDeliveryOptionFormProps {
  onSuccess?: () => void;
}

const LoadEditDeliveryOptionForm = ({ onSuccess }: LoadEditDeliveryOptionFormProps) => {
  const params = useParams();

  const { deliveryOptionId } = params;

  const { loadDeliveryOption, deliveryOption, isLoading, error } = useDeliveryOption();
  useEffect(() => {
    if (!deliveryOptionId || typeof deliveryOptionId !== 'string') {
      return;
    }
    loadDeliveryOption({ deliveryOptionId });
  }, [deliveryOptionId]);

  if (!isLoading && !error && !deliveryOption) {
    notFound();
  }

  return (
    <div>
      {isLoading && <LoadingSpin theme="secondary" layout="global" />}
      {!isLoading && deliveryOption && <EditDeliveryOptionForm deliveryOption={deliveryOption} onSuccess={onSuccess} />}
      {!isLoading && error && <ErrorTranslation error={error} />}
    </div>
  );
};

export default LoadEditDeliveryOptionForm;
