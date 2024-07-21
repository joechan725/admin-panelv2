'use client';

import { useDeliveryOption } from '@/lib/hooks/deliveryOption/useDeliveryOption';
import { DeliveryOptionSchema, deliveryOptionSchema } from '@/schemas/deliveryOptionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import DeliveryOptionForm from './DeliveryOptionForm';

interface CreateDeliveryOptionFormProps {
  onSuccess?: () => void;
}

const CreateDeliveryOptionForm = ({ onSuccess }: CreateDeliveryOptionFormProps) => {
  const { createDeliveryOption, isWriting, error } = useDeliveryOption();

  const {
    formState: { isSubmitting, errors },
    control,
    handleSubmit,
    register,
    setValue,
  } = useForm<DeliveryOptionSchema>({
    resolver: zodResolver(deliveryOptionSchema),
    defaultValues: {
      applyThresholdBeforeCoupons: true,
      isPublic: true,
      isPickUp: false,
      deliveryCharge: undefined,
      freeDeliveryThreshold: undefined,
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleCreateDeliveryOption: SubmitHandler<DeliveryOptionSchema> = async (data) => {
    const res = await createDeliveryOption({
      deliveryOptionData: data,
    });

    if (res && onSuccess) {
      onSuccess();
    }
  };

  return (
    <DeliveryOptionForm
      control={control}
      errors={errors}
      isPending={isPending}
      mode="edit"
      onSubmit={handleSubmit(handleCreateDeliveryOption)}
      register={register}
      setValue={setValue}
      error={error}
    />
  );
};
export default CreateDeliveryOptionForm;
