'use client';

import { Address } from '@/models/Address';
import { AddressSchema, addressSchema } from '@/schemas/addressSchema';
import { useAddressStore } from '@/stores/useAddressStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import AddressForm from './AddressForm';

interface EditAddressFormProps {
  address: Address;
  onClose?: () => void;
}

const EditAddressForm = ({ address, onClose }: EditAddressFormProps) => {
  const { editAddress, isWriting, writingError } = useAddressStore((state) => ({
    writingError: state.writingError,
    isWriting: state.isWriting,
    editAddress: state.editAddress,
  }));

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      region: address.region as AddressSchema['region'],
      district: address.district as AddressSchema['district'],
      contactName: address.contactName,
      contactPhoneNumber: address.contactPhoneNumber,
      detailAddress: address.detailAddress,
      remark: address.remark,
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleEditAddress: SubmitHandler<AddressSchema> = async (data) => {
    const res = await editAddress({ address: data, addressId: address.id });
    if (res === true && onClose) {
      onClose();
    }
  };

  return (
    <AddressForm
      control={control}
      errors={errors}
      isPending={isPending}
      onSubmit={handleSubmit(handleEditAddress)}
      mode="edit"
      register={register}
      error={writingError}
    />
  );
};

export default EditAddressForm;
