import BoxButton from '@/components/form/BoxButton';
import DNDImagesUploader from '@/components/form/DNDImagesUploader';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import TextareaInput from '@/components/form/TextareaInput';
import { useOrder } from '@/lib/hooks/order/useOrder';
import { ImageInput } from '@/models/ImageInput';
import { applyRefundSchema, ApplyRefundSchema } from '@/schemas/order/refundApplicationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ApplyRefundFormProps {
  onSuccess?: () => {};
}

const ApplyRefundForm = ({ onSuccess }: ApplyRefundFormProps) => {
  const t = useTranslations('Order.applyRefundForm');

  const params = useParams<{ orderId: string }>();
  const { orderId } = params;
  const shareParams = useSearchParams();
  const queryCode = shareParams.get('queryCode');
  const [images, setImages] = useState<ImageInput[]>([]);

  const { refundApplication, isWriting, error } = useOrder();

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
  } = useForm<ApplyRefundSchema>({ resolver: zodResolver(applyRefundSchema) });

  const isPending = isSubmitting || isWriting;

  const handleApplyRefund: SubmitHandler<ApplyRefundSchema> = async (formData) => {
    const res = await refundApplication({ formData, images, orderId, queryCode: queryCode ?? undefined });
    if (res && onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleApplyRefund)}>
      <div className="space-y-5">
        <div className="text-2xl font-semibold text-primary-text">{t('title')}</div>
        <div className="space-y-2">
          <TextareaInput
            disabled={isPending}
            register={register}
            registerName="refundReason"
            title={t('refundReason')}
            rows={3}
            errors={errors}
          />
          <DNDImagesUploader disabled={isPending} images={images} setImages={setImages} title={t('images')} />
        </div>
      </div>
      <div className="flex justify-end">
        <BoxButton type="submit" disabled={isPending} theme="primary" fontSize="sm">
          {t('save')}
        </BoxButton>
      </div>
      <ErrorTranslation error={errors.root?.message} align="right" />
      <ErrorTranslation error={error} align="right" />
    </form>
  );
};

export default ApplyRefundForm;
