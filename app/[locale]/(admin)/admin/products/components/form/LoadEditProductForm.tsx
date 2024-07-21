'use client';

import ErrorTranslation from '@/components/form/ErrorTranslation';
import LoadingSpin from '@/components/loading/LoadingSpin';
import { usePrivateClassificationListListener } from '@/lib/hooks/classification/usePrivateClassificationListListener';
import { useProduct } from '@/lib/hooks/product/useProduct';
import { notFound, useParams } from 'next/navigation';
import EditProductForm from './EditProductForm';
import { useEffect } from 'react';

interface LoadEditProductFormProps {}

const LoadEditProductForm = ({}: LoadEditProductFormProps) => {
  const params = useParams<{ productId: string }>();

  const { productId } = params;

  const { isLoading: isLoadingProduct, error: productError, loadProduct, privateProduct } = useProduct();
  const {
    privateClassificationList,
    error: classificationError,
    isLoading: isLoadingClassification,
  } = usePrivateClassificationListListener();

  useEffect(() => {
    loadProduct(productId);
  }, []);

  if (isLoadingProduct || isLoadingClassification) {
    return <LoadingSpin theme="secondary" layout="global" />;
  }

  if (!privateProduct) {
    notFound();
  }

  if (productError || classificationError) {
    return <ErrorTranslation error={productError ?? classificationError} />;
  }

  const { privateBrands, privateCategories, privateCollections, tags } = privateClassificationList;

  return (
    <EditProductForm
      product={privateProduct}
      brands={privateBrands}
      categories={privateCategories}
      collections={privateCollections}
      tags={tags}
    />
  );
};

export default LoadEditProductForm;
