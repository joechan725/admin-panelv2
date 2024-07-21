'use client';

import EditSmartBarForm from './EditSmartBarForm';
import { useSmartBar } from '@/lib/hooks/smartBar/useSmartBar';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpin from '@/components/loading/LoadingSpin';

interface LoadEditSmartBarFormProps {}

const LoadEditSmartBarForm = ({}: LoadEditSmartBarFormProps) => {
  const params = useParams<{ smartBarId: string }>();

  const { smartBarId } = params;

  const { isLoading, smartBar, loadSmartBar } = useSmartBar();

  useEffect(() => {
    loadSmartBar(smartBarId);
  }, []);

  if (isLoading) {
    return <LoadingSpin layout="global" theme="secondary" />;
  }

  if (isLoading && !smartBar) {
    notFound();
  }

  return smartBar && <EditSmartBarForm smartBar={smartBar} />;
};

export default LoadEditSmartBarForm;
