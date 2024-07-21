'use client';

import { useAdminAddress } from '@/lib/hooks/user/admin/address/useAdminAddress';
import { Address } from '@/models/Address';
import { AddressSchema, addressSchema } from '@/schemas/addressSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import UserAddressForm from './UserAddressForm';

interface EditUserAddressFormProps {
  address: Address;
  onSuccess?: () => void;
}

const EditUserAddressForm = ({ address, onSuccess }: EditUserAddressFormProps) => {
  const params = useParams<{ userId: string }>();
  const { userId } = params;

  const { editAddress, error, isWriting } = useAdminAddress();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      region: address.region,
      district: address.district as AddressSchema['district'],
      contactName: address.contactName,
      contactPhoneNumber: address.contactPhoneNumber,
      detailAddress: address.detailAddress,
      remark: address.remark,
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleEditAddress: SubmitHandler<AddressSchema> = async (data) => {
    const res = await editAddress({ addressData: data, userId, addressId: address.id });
    if (res && onSuccess) {
      onSuccess();
    }
  };

  return (
    <UserAddressForm
      control={control}
      errors={errors}
      isPending={isPending}
      mode="edit"
      onSubmit={handleSubmit(handleEditAddress)}
      register={register}
      error={error}
    />
  );
};

export default EditUserAddressForm;
