import { useComment } from '@/lib/hooks/comment/useComment';
import { ImageInput } from '@/models/ImageInput';
import { commentSchema, CommentSchema } from '@/schemas/commentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CommentForm from './CommentForm';

interface CreateCommentFormProps {
  commentId: string;
  productId: string;
  onSuccess?: () => void;
}

const CreateCommentForm = ({ productId, commentId, onSuccess }: CreateCommentFormProps) => {
  const [images, setImages] = useState<ImageInput[]>([]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
  });

  const { isWriting, error, createComment } = useComment();

  const handleCreateComment: SubmitHandler<CommentSchema> = async (formData) => {
    const res = await createComment({
      formData,
      images,
      productId,
      commentId,
    });
    if (res && onSuccess) {
      onSuccess();
    }
  };

  const isPending = isWriting || isSubmitting;

  return (
    <CommentForm
      mode="create"
      control={control}
      errors={errors}
      error={error}
      images={images}
      isPending={isPending}
      setImages={setImages}
      onSubmit={handleSubmit(handleCreateComment)}
      register={register}
    />
  );
};

export default CreateCommentForm;
