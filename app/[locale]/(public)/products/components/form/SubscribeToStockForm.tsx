'use client';

import BoxButton from '@/components/form/BoxButton';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import TextInput from '@/components/form/TextInput';
import Email from '@/components/icon/Email';
import { useProduct } from '@/lib/hooks/product/useProduct';
import { StockSubscriptionSchema, stockSubscriptionSchema } from '@/schemas/stockSubscriptionSchema';
import { useSessionStore } from '@/stores/useSessionStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';

interface SubscribeToStockFormProps {
  onSuccess?: () => void;
  productId: string;
}

const SubscribeToStockForm = ({ onSuccess, productId }: SubscribeToStockFormProps) => {
  const t = useTranslations('Product.restockForm');

  const { user } = useSessionStore((state) => ({ user: state.user }));
  const { subscribeToStock, isWriting, error } = useProduct();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<StockSubscriptionSchema>({
    resolver: zodResolver(stockSubscriptionSchema),
    defaultValues: {
      email: user?.email,
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleSubscribeToStock: SubmitHandler<StockSubscriptionSchema> = async (formData) => {
    const res = await subscribeToStock({ formData, productId });
    if (res === true && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit(handleSubscribeToStock)}>
        <div className="mb-2 text-lg font-semibold text-primary-text">{t('title')}</div>
        <div className="mb-2 text-sm font-medium text-slate-500">{t('subtitle')}</div>
        <TextInput
          register={register}
          disabled={isPending}
          registerName="email"
          starting={<Email sizeClassName="size-5" className="text-primary-text/80" />}
          placeholder={t('email')}
          type="text"
          errors={errors}
        />
        <div className="flex justify-end">
          <BoxButton disabled={isPending} theme="primary" type="submit" fontSize="sm">
            {t('notifyMe')}
          </BoxButton>
        </div>
        <ErrorTranslation error={errors.root?.message} align="right" />
        <ErrorTranslation error={error} align="right" />
      </form>
    </div>
  );
};

export default SubscribeToStockForm;
