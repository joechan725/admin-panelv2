'use client';

import { useSmartBar } from '@/lib/hooks/smartBar/useSmartBar';
import { SmartBar as SmartBarModal } from '@/models/smartBar/SmartBar';
import { SmartBarSchema, smartBarSchema } from '@/schemas/smartBarSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import SmartBarForm from './SmartBarForm';

interface EditSmartBarForm {
  smartBar: SmartBarModal;
}

const EditSmartBarForm = ({ smartBar }: EditSmartBarForm) => {
  const router = useRouter();

  const { isWriting, error, editSmartBar } = useSmartBar();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    control,
  } = useForm<SmartBarSchema>({
    resolver: zodResolver(smartBarSchema),
    defaultValues: {
      link: smartBar.link,
      linkDescriptionZH: smartBar.linkDescriptionZH,
      linkDescriptionEN: smartBar.linkDescriptionEN,
      messageZH: smartBar.messageZH,
      messageEN: smartBar.messageEN,
      titleZH: smartBar.titleZH,
      titleEN: smartBar.titleEN,
      backgroundColor: smartBar.backgroundColor,
      textColor: smartBar.textColor,
      isPublic: smartBar.isPublic,
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleEditSmartBar: SubmitHandler<SmartBarSchema> = async (smartBarData) => {
    const res = await editSmartBar({ smartBarId: smartBar.id, originalIsPublic: smartBar.isPublic, smartBarData });
    if (res) {
      router.push('/admin/smart-bars');
    }
  };

  return (
    <SmartBarForm
      control={control}
      errors={errors}
      isPending={isPending}
      mode="edit"
      onSubmit={handleSubmit(handleEditSmartBar)}
      register={register}
      error={error}
    />
  );
};

export default EditSmartBarForm;
