'use client';

import { useEmail } from '@/lib/hooks/email/useEmail';
import { promotionSchema, PromotionSchema } from '@/schemas/promotionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNotification } from '@/lib/hooks/notification/useNotification';
import { usePromotion } from '@/lib/hooks/promotion/usePromotion';
import toast from 'react-hot-toast';
import PromotionForm from './PromotionForm';

interface CreatePromotionForm {}

const CreatePromotionForm = ({}: CreatePromotionForm) => {
  const router = useRouter();

  const { isWriting: isWritingEmail, error: emailError, handleSendEmail } = useEmail();
  const { isWriting: isWritingNotification, error: notificationError, createGlobalNotification } = useNotification();
  const { isWriting: isWritingPromotion, error: promotionError, createPromotion } = usePromotion();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
    clearErrors,
    control,
  } = useForm<PromotionSchema>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      toSubscribers: true,
      promoteByEmail: true,
      promoteByNotification: true,
    },
  });

  const isPending = isSubmitting || isWritingEmail || isWritingNotification || isWritingPromotion;

  const handleCreatePromotion: SubmitHandler<PromotionSchema> = async (formData) => {
    const { promoteByEmail, promoteByNotification } = formData;
    let emailId: undefined | string;
    let bcc: undefined | string[];
    let notificationId: undefined | string;
    if (promoteByEmail) {
      const res = await handleSendEmail({ formData });
      emailId = res.emailId;
      bcc = res.bcc;
    }
    if (promoteByNotification) {
      const res = await createGlobalNotification({ formData });
      notificationId = res.notificationId;
    }
    const res = await createPromotion({ formData, bcc, emailId, notificationId });
    if (res) {
      toast.success('Create a promotion successfully.');
      router.push('/admin/promotions');
    }
  };

  return (
    <PromotionForm
      mode="create"
      control={control}
      errors={errors}
      notificationError={notificationError}
      promotionError={promotionError}
      emailError={emailError}
      isPending={isPending}
      setError={setError}
      clearErrors={clearErrors}
      register={register}
      onSubmit={handleSubmit(handleCreatePromotion)}
    />
  );
};

export default CreatePromotionForm;
