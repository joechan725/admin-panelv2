'use client';

import { useDeliveryOption } from '@/lib/hooks/deliveryOption/useDeliveryOption';
import { DeliveryOption } from '@/models/deliveryOption/DeliveryOption';
import { PrivateDeliveryOption } from '@/models/deliveryOption/PrivateDeliveryOption';
import { DeliveryOptionSchema, deliveryOptionSchema } from '@/schemas/deliveryOptionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import DeliveryOptionForm from './DeliveryOptionForm';

interface EditDeliveryOptionFormProps {
  deliveryOption: DeliveryOption | PrivateDeliveryOption;
  onSuccess?: () => void;
}

const EditDeliveryOptionForm = ({ deliveryOption, onSuccess }: EditDeliveryOptionFormProps) => {
  const { editDeliveryOption, isWriting, error } = useDeliveryOption();

  const {
    formState: { isSubmitting, errors },
    control,
    handleSubmit,
    register,
    setValue,
  } = useForm<DeliveryOptionSchema>({
    resolver: zodResolver(deliveryOptionSchema),
    defaultValues: {
      nameEN: deliveryOption.nameEN,
      nameZH: deliveryOption.nameZH,
      descriptionEN: deliveryOption.descriptionEN,
      descriptionZH: deliveryOption.descriptionZH,
      deliveryCharge: deliveryOption.deliveryCharge,
      deliveryProviderEN: deliveryOption.deliveryProviderEN,
      deliveryProviderZH: deliveryOption.deliveryProviderZH,
      estimatedTimeEN: deliveryOption.estimatedTimeEN,
      estimatedTimeZH: deliveryOption.estimatedTimeZH,
      freeDeliveryThreshold: deliveryOption.freeDeliveryThreshold,
      applyThresholdBeforeCoupons: deliveryOption.applyThresholdBeforeCoupons,
      isPickUp: deliveryOption.isPickUp,
      isPublic: deliveryOption.isPublic,
      storeAddressId: deliveryOption.storeAddressId,
      storeAddressDetailAddress: deliveryOption.storeAddressDetailAddress,
      storeAddressDistrict: deliveryOption.storeAddressDistrict as DeliveryOptionSchema['storeAddressDistrict'],
      storeAddressName: deliveryOption.storeAddressName as DeliveryOptionSchema['storeAddressName'],
      storeAddressPhoneNumber:
        deliveryOption.storeAddressPhoneNumber as DeliveryOptionSchema['storeAddressPhoneNumber'],
      storeAddressRegion: deliveryOption.storeAddressRegion as DeliveryOptionSchema['storeAddressRegion'],
      storeAddressBusinessHours: deliveryOption.storeAddressBusinessHours,
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleEditDeliveryOption: SubmitHandler<DeliveryOptionSchema> = async (data) => {
    const res = await editDeliveryOption({
      deliveryOptionId: deliveryOption.id,
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
      onSubmit={handleSubmit(handleEditDeliveryOption)}
      register={register}
      setValue={setValue}
      error={error}
    />
  );
};
export default EditDeliveryOptionForm;
