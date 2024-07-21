'use client';

import { usePrivateClassificationListListener } from '@/lib/hooks/classification/usePrivateClassificationListListener';
import CreateProductForm from './CreateProductForm';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface LoadCreateProductFormProps {}

const LoadCreateProductForm = ({}: LoadCreateProductFormProps) => {
  const { privateClassificationList, error } = usePrivateClassificationListListener();

  if (error) {
    return <ErrorTranslation error={error} />;
  }

  const { privateBrands, privateCategories, privateCollections, tags } = privateClassificationList;

  return (
    <CreateProductForm
      brands={privateBrands}
      categories={privateCategories}
      collections={privateCollections}
      tags={tags}
    />
  );
};

export default LoadCreateProductForm;
