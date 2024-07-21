'use client';

import { useCategory } from '@/lib/hooks/classification/useCategory';
import { CategorySchema, categorySchema } from '@/schemas/categorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import CategoryForm from './CategoryForm';

interface CreateCategoryFormProps {
  onSuccess?: () => void;
}

const CreateCategoryForm = ({ onSuccess }: CreateCategoryFormProps) => {
  const { createCategory, isWriting, error } = useCategory();

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
  } = useForm<CategorySchema>({ resolver: zodResolver(categorySchema) });

  const isPending = isSubmitting || isWriting;

  const handleCreateCategory: SubmitHandler<CategorySchema> = async (data) => {
    const res = await createCategory({ formData: data });

    if (res === true && onSuccess) {
      onSuccess();
    }
  };

  return (
    <CategoryForm
      errors={errors}
      isPending={isPending}
      mode="create"
      onSubmit={handleSubmit(handleCreateCategory)}
      register={register}
      error={error}
    />
  );
};
export default CreateCategoryForm;
