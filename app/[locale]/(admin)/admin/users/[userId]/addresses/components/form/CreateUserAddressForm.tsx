'use client';

import { useAdminAddress } from '@/lib/hooks/user/admin/address/useAdminAddress';
import { addressSchema, AddressSchema } from '@/schemas/addressSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import UserAddressForm from './UserAddressForm';

interface CreateUserAddressFormProps {
  onSuccess?: () => void;
}

const CreateUserAddressForm = ({ onSuccess }: CreateUserAddressFormProps) => {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;

  const { createAddress, error, isWriting } = useAdminAddress();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      region: 'Hong Kong Island',
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleCreateAddress: SubmitHandler<AddressSchema> = async (data) => {
    const res = await createAddress({ addressData: data, userId });
    if (res && onSuccess) {
      onSuccess();
    }
  };

  return (
    <UserAddressForm
      control={control}
      errors={errors}
      isPending={isPending}
      mode="create"
      onSubmit={handleSubmit(handleCreateAddress)}
      register={register}
      error={error}
    />
  );
};

export default CreateUserAddressForm;
