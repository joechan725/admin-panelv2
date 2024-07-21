'use client';

import { useStoreAddress } from '@/lib/hooks/storeAddress/useStoreAddress';
import { ImageInput } from '@/models/ImageInput';
import { storeAddressSchema, StoreAddressSchema } from '@/schemas/storeAddressSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import StoreAddressForm from './StoreAddressForm';

interface CreateStoreAddressFormProps {
  onSuccess?: () => void;
}

const CreateStoreAddressForm = ({ onSuccess }: CreateStoreAddressFormProps) => {
  const [images, setImages] = useState<ImageInput[]>([]);

  const { createStoreAddress, error, isWriting } = useStoreAddress();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<StoreAddressSchema>({
    resolver: zodResolver(storeAddressSchema),
    defaultValues: {
      region: 'Hong Kong Island',
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleCreateAddress: SubmitHandler<StoreAddressSchema> = async (storeAddressData) => {
    const res = await createStoreAddress({ images, storeAddressData });
    if (res && onSuccess) {
      onSuccess();
    }
  };

  return (
    <StoreAddressForm
      onSubmit={handleSubmit(handleCreateAddress)}
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

export default CreateStoreAddressForm;
