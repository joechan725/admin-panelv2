'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useProduct } from '@/lib/hooks/product/useProduct';
import { Brand } from '@/models/classification/brand/Brand';
import { Category } from '@/models/classification/category/Category';
import { Collection } from '@/models/classification/collection/Collection';
import { ImageInput } from '@/models/ImageInput';
import { Tag } from '@/models/tag/Tag';
import { productSchema, ProductSchema } from '@/schemas/productSchema';
import { useRouter } from '@/navigation';
import ProductForm from './ProductForm';

interface CreateProductFormProps {
  brands: Brand[];
  collections: Collection[];
  categories: Category[];
  tags: Tag[];
}

const CreateProductForm = ({ brands, collections, categories, tags }: CreateProductFormProps) => {
  const router = useRouter();

  const [images, setImages] = useState<ImageInput[]>([]);
  const [detailImages, setDetailImages] = useState<ImageInput[]>([]);

  const { createProduct, error, isWriting } = useProduct();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
    setError,
    clearErrors,
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      isPublic: true,
    },
  });

  const handleCreateProduct: SubmitHandler<ProductSchema> = async (data) => {
    const foundCollection = collections.find((collection) => collection.id === data.collectionId);
    const foundCategory = categories.find((category) => category.id === data.categoryId);
    const foundBrand = brands.find((brand) => brand.id === data.brandId);

    const productData = {
      ...data,
      collectionId: foundCollection?.id,
      collectionNameZH: foundCollection?.nameZH,
      collectionNameEN: foundCollection?.nameEN,
      categoryId: foundCategory?.id,
      categoryNameZH: foundCategory?.nameZH,
      categoryNameEN: foundCategory?.nameEN,
      brandId: foundBrand?.id,
      brandNameZH: foundBrand?.nameZH,
      brandNameEN: foundBrand?.nameEN,
    };

    const res = await createProduct({ images, detailImages, productData });

    if (res) {
      router.push('/admin/products');
    }
  };

  const isPending = isWriting || isSubmitting;

  return (
    <ProductForm
      mode="create"
      brands={brands}
      categories={categories}
      collections={collections}
      tags={tags}
      control={control}
      detailImages={detailImages}
      errors={errors}
      images={images}
      isPending={isPending}
      error={error}
      register={register}
      clearErrors={clearErrors}
      setError={setError}
      setImages={setImages}
      setDetailImages={setDetailImages}
      onSubmit={handleSubmit(handleCreateProduct)}
    />
  );
};

export default CreateProductForm;
