'use client';

import { useCollection } from '@/lib/hooks/classification/useCollection';
import { CollectionSchema, collectionSchema } from '@/schemas/collectionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import CollectionForm from './CollectionForm';

interface CreateCollectionFormProps {
  onSuccess?: () => void;
}

const CreateCollectionForm = ({ onSuccess }: CreateCollectionFormProps) => {
  const { createCollection, isWriting, error } = useCollection();

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
  } = useForm<CollectionSchema>({ resolver: zodResolver(collectionSchema) });

  const isPending = isSubmitting || isWriting;

  const handleCreateCollection: SubmitHandler<CollectionSchema> = async (data) => {
    const res = await createCollection({ formData: data });

    if (res === true && onSuccess) {
      onSuccess();
    }
  };

  return (
    <CollectionForm
      errors={errors}
      isPending={isPending}
      mode="create"
      onSubmit={handleSubmit(handleCreateCollection)}
      register={register}
      error={error}
    />
  );
};
export default CreateCollectionForm;
