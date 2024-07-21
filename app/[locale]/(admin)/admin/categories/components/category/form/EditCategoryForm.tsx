'use client';

import { useCategory } from '@/lib/hooks/classification/useCategory';
import { Category } from '@/models/classification/category/Category';
import { PrivateCategory } from '@/models/classification/category/PrivateCategory';
import { CategorySchema, categorySchema } from '@/schemas/categorySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import CategoryForm from './CategoryForm';

interface EditCategoryFormProps {
  category: Category | PrivateCategory;
  onSuccess?: () => void;
}

const EditCategoryForm = ({ category, onSuccess }: EditCategoryFormProps) => {
  const { editCategory, isWriting, error } = useCategory();

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      nameZH: category.nameZH,
      nameEN: category.nameEN,
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleEditCategory: SubmitHandler<CategorySchema> = async (data) => {
    const res = await editCategory({ formData: data, categoryId: category.id });

    if (res === true && onSuccess) {
      onSuccess();
    }
  };

  return (
    <CategoryForm
      errors={errors}
      isPending={isPending}
      mode="edit"
      onSubmit={handleSubmit(handleEditCategory)}
      register={register}
      error={error}
    />
  );
};
export default EditCategoryForm;
