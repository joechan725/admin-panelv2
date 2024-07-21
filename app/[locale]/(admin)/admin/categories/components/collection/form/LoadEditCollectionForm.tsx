'use client';

import { useEffect } from 'react';
import EditCollectionForm from './EditCollectionForm';
import { useParams } from 'next/navigation';
import { useCollection } from '@/lib/hooks/classification/useCollection';
import LoadingSpin from '@/components/loading/LoadingSpin';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface LoadEditCollectionFormProps {
  onSuccess?: () => void;
}

const LoadEditCollectionForm = ({ onSuccess }: LoadEditCollectionFormProps) => {
  const { loadCollection, collection, isLoading, error } = useCollection();

  const params = useParams<{ collectionId: string }>();

  const collectionId = params.collectionId;

  useEffect(() => {
    loadCollection(collectionId);
  }, [collectionId]);

  return (
    <div>
      {isLoading && <LoadingSpin theme="secondary" layout="global" />}
      {collection && <EditCollectionForm collection={collection} onSuccess={onSuccess} />}
      {error && <ErrorTranslation error={error} />}
    </div>
  );
};

export default LoadEditCollectionForm;
