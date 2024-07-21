'use client';

import { useEffect } from 'react';
import EditBrandForm from './EditBrandForm';
import { notFound, useParams } from 'next/navigation';
import { useBrand } from '@/lib/hooks/classification/useBrand';
import LoadingSpin from '@/components/loading/LoadingSpin';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface LoadEditBrandFormProps {
  onSuccess?: () => void;
}

const LoadEditBrandForm = ({ onSuccess }: LoadEditBrandFormProps) => {
  const { loadBrand, brand, isLoading, error } = useBrand();

  const params = useParams<{ brandId: string }>();

  const brandId = params.brandId;

  useEffect(() => {
    loadBrand(brandId);
  }, [brandId]);

  if (!isLoading && !error && !brand) {
    notFound();
  }

  return (
    <div>
      {isLoading && <LoadingSpin theme="secondary" layout="global" />}
      {brand && <EditBrandForm brand={brand} onSuccess={onSuccess} />}
      {error && <ErrorTranslation error={error} />}
    </div>
  );
};

export default LoadEditBrandForm;
