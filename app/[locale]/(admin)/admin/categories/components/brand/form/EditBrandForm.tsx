'use client';

import { useBrand } from '@/lib/hooks/classification/useBrand';
import { Brand } from '@/models/classification/brand/Brand';
import { PrivateBrand } from '@/models/classification/brand/PrivateBrand';
import { BrandSchema, brandSchema } from '@/schemas/brandSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import BrandForm from './BrandForm';

interface EditBrandFormProps {
  brand: Brand | PrivateBrand;
  onSuccess?: () => void;
}

const EditBrandForm = ({ brand, onSuccess }: EditBrandFormProps) => {
  const { editBrand, isWriting, error } = useBrand();

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
  } = useForm<BrandSchema>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      nameZH: brand.nameZH,
      nameEN: brand.nameEN,
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleEditBrand: SubmitHandler<BrandSchema> = async (data) => {
    const res = await editBrand({ formData: data, brandId: brand.id });

    if (res === true && onSuccess) {
      onSuccess();
    }
  };

  return (
    <BrandForm
      errors={errors}
      isPending={isPending}
      mode="edit"
      onSubmit={handleSubmit(handleEditBrand)}
      register={register}
      error={error}
    />
  );
};
export default EditBrandForm;
