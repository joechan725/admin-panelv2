'use client';

import { usePrivateClassificationListListener } from '@/lib/hooks/classification/usePrivateClassificationListListener';
import CategoryFrame from './CategoryFrame';

interface LoadClassificationListProps {}

const LoadClassificationList = ({}: LoadClassificationListProps) => {
  const { privateClassificationList, error, isLoading } = usePrivateClassificationListListener();
  const { privateBrands, privateCategories, privateCollections } = privateClassificationList;

  return (
    <CategoryFrame
      error={error}
      isLoading={isLoading}
      privateBrands={privateBrands}
      privateCategories={privateCategories}
      privateCollections={privateCollections}
    />
  );
};

export default LoadClassificationList;
