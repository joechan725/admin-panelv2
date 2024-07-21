'use client';

import { useStoreAddress } from '@/lib/hooks/storeAddress/useStoreAddress';
import { ImageInput } from '@/models/ImageInput';
import { StoreAddress } from '@/models/store/StoreAddress';
import { storeAddressSchema, StoreAddressSchema } from '@/schemas/storeAddressSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import StoreAddressForm from './StoreAddressForm';

interface EditStoreAddressFormProps {
  storeAddress: StoreAddress;
  onSuccess?: () => void;
}

const EditStoreAddressForm = ({ storeAddress, onSuccess }: EditStoreAddressFormProps) => {
  const [images, setImages] = useState<ImageInput[]>(storeAddress?.images ?? []);

  const { editStoreAddress, isWriting, error } = useStoreAddress();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<StoreAddressSchema>({
    resolver: zodResolver(storeAddressSchema),
    defaultValues: {
      region: storeAddress.region as StoreAddressSchema['region'],
      district: storeAddress.district as StoreAddressSchema['district'],
      phoneNumber: storeAddress.phoneNumber,
      detailAddress: storeAddress.detailAddress,
      name: storeAddress.name,
      businessHours: storeAddress.businessHours,
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleEditAddress: SubmitHandler<StoreAddressSchema> = async (storeAddressData) => {
    const res = await editStoreAddress({ storeAddressId: storeAddress.id, storeAddressData, images });
    if (res && onSuccess) {
      onSuccess();
    }
  };

  return (
    <StoreAddressForm
      onSubmit={handleSubmit(handleEditAddress)}
      mode="edit"
      register={register}
      setImages={setImages}
      images={images}
      control={control}
      isPending={isPending}
      errors={errors}
      error={error}
    />
  );
};

export default EditStoreAddressForm;
