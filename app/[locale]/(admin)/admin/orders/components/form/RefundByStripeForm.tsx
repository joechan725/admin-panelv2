'use client';

import clsx from 'clsx/lite';
import BarButton from '@/components/form/BarButton';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import RadioHollow from '@/components/form/RadioHollow';
import TextInput from '@/components/form/TextInput';
import { useOrder } from '@/lib/hooks/order/useOrder';
import { Order } from '@/models/order/Order';
import { OrderRefundSchema, orderRefundSchema } from '@/schemas/order/orderRefundSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useTranslations } from 'next-intl';

interface RefundByStripeFormProps {
  orderId: string;
  order: Order;
  onSuccess?: () => void;
}

const RefundByStripeForm = ({ orderId, order, onSuccess }: RefundByStripeFormProps) => {
  const t = useTranslations('Order.refundForm');

  const { refundByStripe, isWriting, error } = useOrder();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
    setValue,
  } = useForm<OrderRefundSchema>({ resolver: zodResolver(orderRefundSchema), defaultValues: { refundAmount: 'all' } });

  const isPending = isSubmitting || isWriting;

  const { refundAmount } = useWatch({ control });

  const { amountToPay } = order;

  const handleRefund: SubmitHandler<OrderRefundSchema> = async (formData) => {
    const res = await refundByStripe({
      orderId,
      order,
      formData,
    });
    if (res && onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleRefund)}>
      <div className="text-lg font-semibold text-secondary-text">{t('refundByStripe')}</div>
      <div className="font-medium text-tertiary-text">{t('refundByStripeDescription')}</div>
      <div>
        <span className="text-sm font-semibold text-primary-text">{t('orderAmount')}</span>
        <span className="text-sm font-medium text-secondary-text">{amountToPay}</span>
      </div>
      <button type="button" className="flex gap-2 items-center group" onClick={() => setValue('refundAmount', 'all')}>
        <RadioHollow isSelected={refundAmount === 'all'} theme="primary" size="sm" />
        <div
          className={clsx(
            'font-medium text-secondary-text',
            refundAmount !== 'all' && 'group-hover:text-opacity-85 group-active:text-opacity-70 transition-all'
          )}
        >
          {t('refundAll')}
        </div>
      </button>
      <TextInput
        hidden={refundAmount === 'all'}
        register={register}
        title={t('refundAmount')}
        registerName="refundAmount"
        disabled={isPending}
        type="number"
        errors={errors}
      />
      <TextInput
        register={register}
        title={t('message')}
        registerName="message"
        disabled={isPending}
        type="text"
        errors={errors}
      />
      <TextInput
        register={register}
        title={t('referenceNumber')}
        registerName="referenceNumber"
        disabled={isPending}
        type="text"
        errors={errors}
      />
      <TextInput
        register={register}
        title={t('referenceUrl')}
        registerName="referenceUrl"
        disabled={isPending}
        type="url"
        errors={errors}
      />
      <BarButton disabled={isPending} type="submit" fontSize="sm" theme="stripe">
        {t('refundByStripe')}
      </BarButton>
      <ErrorTranslation error={errors.root?.message} />
      <ErrorTranslation error={error} />
    </form>
  );
};

export default RefundByStripeForm;
