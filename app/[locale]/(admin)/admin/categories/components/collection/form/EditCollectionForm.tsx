'use client';

import { useCollection } from '@/lib/hooks/classification/useCollection';
import { Collection } from '@/models/classification/collection/Collection';
import { PrivateCollection } from '@/models/classification/collection/PrivateCollection';
import { CollectionSchema, collectionSchema } from '@/schemas/collectionSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import CollectionForm from './CollectionForm';

interface EditCollectionFormProps {
  collection: Collection | PrivateCollection;
  onSuccess?: () => void;
}

const EditCollectionForm = ({ collection, onSuccess }: EditCollectionFormProps) => {
  const { editCollection, isWriting, error } = useCollection();

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
  } = useForm<CollectionSchema>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      nameZH: collection.nameZH,
      nameEN: collection.nameEN,
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleEditCollection: SubmitHandler<CollectionSchema> = async (data) => {
    const res = await editCollection({
      formData: data,
      collectionId: collection.id,
    });

    if (res === true && onSuccess) {
      onSuccess();
    }
  };

  return (
    <CollectionForm
      errors={errors}
      isPending={isPending}
      mode="edit"
      onSubmit={handleSubmit(handleEditCollection)}
      register={register}
      error={error}
    />
  );
};
export default EditCollectionForm;
