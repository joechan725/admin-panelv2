'use client';

import { AddressSchema, addressSchema } from '@/schemas/addressSchema';
import { useAddressStore } from '@/stores/useAddressStore';
import { useSessionStore } from '@/stores/useSessionStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import AddressForm from './AddressForm';
import { useLanguage } from '@/lib/hooks/language/useLanguage';

interface CreateAddressFormProps {
  onClose?: () => void;
}

const CreateAddressForm = ({ onClose }: CreateAddressFormProps) => {
  const { convertUserName } = useLanguage();

  const { createAddress, writingError } = useAddressStore((state) => ({
    createAddress: state.createAddress,
    writingError: state.writingError,
  }));

  const { user } = useSessionStore((state) => ({ user: state.user }));

  const userFullName = convertUserName({ firstName: user?.firstName, lastName: user?.lastName, fallbackName: '' });

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      region: 'Hong Kong Island',
      contactName: userFullName,
    },
  });

  const isPending = isSubmitting;

  const handleCreateAddress: SubmitHandler<AddressSchema> = async (data) => {
    const res = await createAddress(data);
    if (res === true && onClose) {
      onClose();
    }
  };

  return (
    <AddressForm
      control={control}
      errors={errors}
      error={writingError}
      isPending={isPending}
      mode="create"
      onSubmit={handleSubmit(handleCreateAddress)}
      register={register}
    />
  );
};

export default CreateAddressForm;
