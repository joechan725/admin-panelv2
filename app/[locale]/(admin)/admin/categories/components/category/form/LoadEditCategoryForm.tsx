'use client';

import { useEffect } from 'react';
import EditCategoryForm from './EditCategoryForm';
import { notFound, useParams } from 'next/navigation';
import { useCategory } from '@/lib/hooks/classification/useCategory';
import LoadingSpin from '@/components/loading/LoadingSpin';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface LoadEditCategoryFormProps {
  onSuccess?: () => void;
}

const LoadEditCategoryForm = ({ onSuccess }: LoadEditCategoryFormProps) => {
  const { loadCategory, category, isLoading, error } = useCategory();

  const params = useParams<{ categoryId: string }>();

  const categoryId = params.categoryId;

  useEffect(() => {
    loadCategory(categoryId);
  }, [categoryId]);

  if (!isLoading && !error && !category) {
    notFound();
  }

  return (
    <div>
      {isLoading && <LoadingSpin theme="secondary" layout="global" />}
      {category && <EditCategoryForm category={category} onSuccess={onSuccess} />}
      {error && <ErrorTranslation error={error} />}
    </div>
  );
};

export default LoadEditCategoryForm;
