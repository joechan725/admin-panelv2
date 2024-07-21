'use client';

import BoxButton from '@/components/form/BoxButton';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import SelectInput from '@/components/form/SelectInput';
import TextareaInput from '@/components/form/TextareaInput';
import TextInput from '@/components/form/TextInput';
import { useOrder } from '@/lib/hooks/order/useOrder';
import { Order } from '@/models/order/Order';
import { OrderStatus } from '@/models/order/OrderStatus';
import { OrderStatusSchema, orderStatusSchema } from '@/schemas/order/orderStatusSchema';
import { TranslationFunction } from '@/types/TranslationFunction';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';

interface EditOrderStatusForm {
  order: Order;
  onSuccess?: () => void;
}

const getStatusSelectOptions = (
  isPickUp: boolean,
  currentStatus: Order['status'],
  tStatus: TranslationFunction
): { value: OrderStatus; option: string }[] => {
  if (
    currentStatus === 'Placed' ||
    currentStatus === 'Paid' ||
    currentStatus === 'Refund Request Reject' ||
    currentStatus === 'Refund Pending' ||
    currentStatus === 'Refunded' ||
    currentStatus === 'Refund Cancelled' ||
    currentStatus === 'Refund Failed' ||
    currentStatus === 'Ready for Pickup' ||
    currentStatus === 'Delivering' ||
    currentStatus === 'Picked Up' ||
    currentStatus === 'Delivered'
  ) {
    return [
      {
        value: (isPickUp ? 'Ready For Pickup' : 'Delivery') as OrderStatus,
        option: isPickUp ? tStatus('readyForPickup') : tStatus('delivering'),
      },
      {
        value: (isPickUp ? 'Picked Up' : 'Delivered') as OrderStatus,
        option: isPickUp ? tStatus('pickedUp') : tStatus('delivered'),
      },
    ].filter((option) => option.option !== currentStatus);
  }

  if (currentStatus === 'Application for Refund') {
    return [
      {
        value: 'Refund Request Reject',
        option: tStatus('Refund Request Reject'),
      },
    ];
  }

  return [];
};

const EditOrderStatusForm = ({ order, onSuccess }: EditOrderStatusForm) => {
  const tStatus = useTranslations('Order.statusHistory');
  const t = useTranslations('Order.editStatusForm');

  const { isPickUp, status, id } = order;
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<OrderStatusSchema>({ resolver: zodResolver(orderStatusSchema) });

  const { error, isWriting, updateOrderStatus } = useOrder();

  const handleEditOrderStatus: SubmitHandler<OrderStatusSchema> = async (formData) => {
    const res = await updateOrderStatus({ formData, orderId: id });
    if (res && onSuccess) {
      onSuccess();
    }
  };

  const isPending = isSubmitting || isWriting;

  return (
    <form onSubmit={handleSubmit(handleEditOrderStatus)}>
      <div className="space-y-5">
        <div className="text-2xl font-semibold text-primary-text">{t('title')}</div>
        <div className="space-y-2">
          <SelectInput
            blankOption={false}
            disabled={isPending}
            register={register}
            registerName="status"
            title={t('status')}
            selectOptions={getStatusSelectOptions(isPickUp, status, tStatus)}
          />
          <TextareaInput
            disabled={isPending}
            register={register}
            registerName="message"
            title={t('message')}
            rows={3}
            errors={errors}
          />
          <TextInput
            disabled={isPending}
            register={register}
            registerName="referenceNumber"
            title={t('referenceNumber')}
            type="text"
            errors={errors}
          />
          <TextInput
            disabled={isPending}
            register={register}
            registerName="referenceUrl"
            title={t('referenceUrl')}
            type="url"
            errors={errors}
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <BoxButton type="submit" disabled={isPending} theme="primary" fontSize="sm">
          {t('save')}
        </BoxButton>
      </div>
      <ErrorTranslation error={errors.root?.message} align="right" />
      <ErrorTranslation error={error} align="right" />
    </form>
  );
};
export default EditOrderStatusForm;
