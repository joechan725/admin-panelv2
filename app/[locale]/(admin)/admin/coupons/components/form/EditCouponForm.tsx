'use client';

import { convertToDateTimeLocalString } from '@/lib/helpers/date/convertToDateTimeLocalString ';
import { useCoupon } from '@/lib/hooks/coupon/useCoupon';
import { Coupon } from '@/models/coupon/Coupon';
import { PrivateCoupon } from '@/models/coupon/PrivateCoupon';
import { CouponSchema, couponSchema } from '@/schemas/couponSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import CouponForm from './CouponForm';

interface EditCouponFormProps {
  coupon: Coupon | PrivateCoupon;
  onSuccess?: () => void;
}

const EditCouponForm = ({ coupon, onSuccess }: EditCouponFormProps) => {
  const { editCoupon, isWriting, error } = useCoupon();

  const defaultStartDate = coupon.startDate ? convertToDateTimeLocalString(new Date(coupon.startDate)) : undefined;
  const defaultEndDate = coupon.endDate ? convertToDateTimeLocalString(new Date(coupon.endDate)) : undefined;

  const {
    formState: { isSubmitting, errors },
    control,
    handleSubmit,
    register,
    setValue,
  } = useForm<CouponSchema>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: coupon.code,
      discountAmount: coupon.discountAmount,
      discountType: coupon.discountType,
      startDate: defaultStartDate as unknown as Date,
      endDate: defaultEndDate as unknown as Date,
      maximumDiscount: coupon.maximumDiscount,
      minimumSpend: coupon.minimumSpend,
      usageLimit: coupon.usageLimit,
      usageLimitPerUser: coupon.usageLimitPerUser,
      isPublic: coupon.isPublic,
      registeredUserOnly: coupon.registeredUserOnly,
      canBeUsedTogether: coupon.canBeUsedTogether,
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleEditCoupon: SubmitHandler<CouponSchema> = async (couponData) => {
    const res = await editCoupon({
      couponId: coupon.id,
      originalCode: coupon.code,
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
      mode="edit"
      onSubmit={handleSubmit(handleEditCoupon)}
      register={register}
      setValue={setValue}
      error={error}
    />
  );
};
export default EditCouponForm;
