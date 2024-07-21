'use client';

import { useCoupon } from '@/lib/hooks/coupon/useCoupon';
import { CouponSchema, couponSchema } from '@/schemas/couponSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import CouponForm from './CouponForm';

interface CreateCouponFormProps {
  onSuccess?: () => void;
}

const CreateCouponForm = ({ onSuccess }: CreateCouponFormProps) => {
  const { createCoupon, isWriting, error } = useCoupon();

  const {
    formState: { isSubmitting, errors },
    control,
    handleSubmit,
    register,
    setValue,
  } = useForm<CouponSchema>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      canBeUsedTogether: true,
      registeredUserOnly: true,
      isPublic: true,
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleCreateCoupon: SubmitHandler<CouponSchema> = async (couponData) => {
    const res = await createCoupon({
      couponData,
    });
    if (res && onSuccess) {
      onSuccess();
    }
  };

  return (
    <CouponForm
      control={control}
      errors={errors}
      isPending={isPending}
      mode="create"
      onSubmit={handleSubmit(handleCreateCoupon)}
      register={register}
      setValue={setValue}
      error={error}
    />
  );
};
export default CreateCouponForm;
