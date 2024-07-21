'use client';

import ErrorTranslation from '@/components/form/ErrorTranslation';
import LoadingSpin from '@/components/loading/LoadingSpin';
import { useStoreInformation } from '@/lib/hooks/store/useStoreInformation';
import { useEffect } from 'react';
import EditStoreInfoForm from './EditStoreInfoForm';

interface LoadEditStoreInfoFormProps {}

const LoadEditStoreInfoForm = ({}: LoadEditStoreInfoFormProps) => {
  const { error, isLoading, storeInformation, loadStoreInformation } = useStoreInformation();

  useEffect(() => {
    loadStoreInformation();
  }, []);

  if (isLoading) {
    return <LoadingSpin theme="secondary" layout="global" />;
  }

  if (error) {
    return <ErrorTranslation error={error} />;
  }

  return <EditStoreInfoForm storeInformation={storeInformation} />;
};

export default LoadEditStoreInfoForm;
