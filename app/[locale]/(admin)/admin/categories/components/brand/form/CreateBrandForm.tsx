'use client';

import { useBrand } from '@/lib/hooks/classification/useBrand';
import { BrandSchema, brandSchema } from '@/schemas/brandSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import BrandForm from './BrandForm';

interface CreateBrandFormProps {
  onSuccess?: () => void;
}

const CreateBrandForm = ({ onSuccess }: CreateBrandFormProps) => {
  const { createBrand, isWriting, error } = useBrand();

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
  } = useForm<BrandSchema>({ resolver: zodResolver(brandSchema) });

  const isPending = isSubmitting || isWriting;

  const handleCreateBrand: SubmitHandler<BrandSchema> = async (data) => {
    const res = await createBrand({ formData: data });

    if (res === true && onSuccess) {
      onSuccess();
    }
  };

  return (
    <BrandForm
      errors={errors}
      isPending={isPending}
      mode="create"
      onSubmit={handleSubmit(handleCreateBrand)}
      register={register}
      error={error}
    />
  );
};
export default CreateBrandForm;
