'use client';

import { useSmartBar } from '@/lib/hooks/smartBar/useSmartBar';
import { SmartBarSchema, smartBarSchema } from '@/schemas/smartBarSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import SmartBarForm from './SmartBarForm';

interface CreateSmartBarForm {}

const CreateSmartBarForm = ({}: CreateSmartBarForm) => {
  const router = useRouter();

  const { isWriting, error, createSmartBar } = useSmartBar();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    control,
  } = useForm<SmartBarSchema>({
    resolver: zodResolver(smartBarSchema),
    defaultValues: {
      backgroundColor: '#000000',
      textColor: '#ffffff',
      isPublic: true,
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleCreateSmartBar: SubmitHandler<SmartBarSchema> = async (smartBarData) => {
    const res = await createSmartBar(smartBarData);
    if (res) {
      router.push('/admin/smart-bars');
    }
  };

  return (
    <SmartBarForm
      control={control}
      errors={errors}
      isPending={isPending}
      mode="create"
      onSubmit={handleSubmit(handleCreateSmartBar)}
      register={register}
      error={error}
    />
  );
};

export default CreateSmartBarForm;
