import { useComment } from '@/lib/hooks/comment/useComment';
import { Comment } from '@/models/comment/Comment';
import { ImageInput } from '@/models/ImageInput';
import { commentSchema, CommentSchema } from '@/schemas/commentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CommentForm from './CommentForm';

interface EditCommentFormProps {
  comment: Comment;
  onSuccess?: () => void;
}

const EditCommentForm = ({ comment, onSuccess }: EditCommentFormProps) => {
  const [images, setImages] = useState<ImageInput[]>(comment.images ?? []);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      title: comment.title,
      content: comment.content,
      rating: comment.rating,
    },
  });

  const { isWriting, error, editComment } = useComment();

  const handleEditComment: SubmitHandler<CommentSchema> = async (formData) => {
    const { id } = comment;
    const res = await editComment({ productId: comment.productId, commentId: id, formData, images });
    if (res && onSuccess) {
      onSuccess();
    }
  };

  const isPending = isWriting || isSubmitting;

  return (
    <CommentForm
      mode="edit"
      control={control}
      errors={errors}
      error={error}
      images={images}
      isPending={isPending}
      setImages={setImages}
      onSubmit={handleSubmit(handleEditComment)}
      register={register}
    />
  );
};

export default EditCommentForm;
