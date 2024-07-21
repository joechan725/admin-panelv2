'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useProduct } from '@/lib/hooks/product/useProduct';
import { Brand } from '@/models/classification/brand/Brand';
import { Category } from '@/models/classification/category/Category';
import { Collection } from '@/models/classification/collection/Collection';
import { ImageInput } from '@/models/ImageInput';
import { PrivateProduct } from '@/models/product/PrivateProduct';
import { Product } from '@/models/product/Product';
import { Tag } from '@/models/tag/Tag';
import { ProductSchema, productSchema } from '@/schemas/productSchema';
import { useRouter } from 'next/navigation';
import ProductForm from './ProductForm';

interface EditProductFormProps {
  product: Product | PrivateProduct;
  brands: Brand[];
  collections: Collection[];
  categories: Category[];
  tags: Tag[];
}

const EditProductForm = ({ product, brands, collections, categories, tags }: EditProductFormProps) => {
  const router = useRouter();

  const [images, setImages] = useState<ImageInput[]>(product.images ?? []);
  const [detailImages, setDetailImages] = useState<ImageInput[]>(product.detailImages ?? []);

  const { editProduct, error, isWriting } = useProduct();

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    register,
    control,
    setError,
    clearErrors,
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      brandId: product.brandId,
      categoryId: product.categoryId,
      collectionId: product.collectionId,
      descriptionZH: product.descriptionZH,
      descriptionEN: product.descriptionEN,
      markedPrice: product.markedPrice,
      nameZH: product.nameZH,
      nameEN: product.nameEN,
      sellingPrice: product.sellingPrice,
      stock: product.stock,
      tags: product.tags,
      isPublic: product.isPublic,
      detailZH: product.detailZH,
      detailEN: product.detailEN,
    },
  });

  const handleEditProduct: SubmitHandler<ProductSchema> = async (data) => {
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

    const res = await editProduct({ productId: product.id, images, detailImages, productData });

    if (res) {
      router.push('/admin/products');
    }
  };

  const isPending = isWriting || isSubmitting;

  return (
    <ProductForm
      mode="edit"
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
      onSubmit={handleSubmit(handleEditProduct)}
    />
  );
};

export default EditProductForm;
