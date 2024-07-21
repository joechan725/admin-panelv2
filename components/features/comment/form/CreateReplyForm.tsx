import { useReply } from '@/lib/hooks/reply/useReply';
import { Comment } from '@/models/comment/Comment';
import { ImageInput } from '@/models/ImageInput';
import { replySchema, ReplySchema } from '@/schemas/replySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ReplyForm from './ReplyForm';

interface CreateReplyFormProps {
  comment: Comment;
  onSuccess?: () => void;
}

const CreateReplyForm = ({ comment, onSuccess }: CreateReplyFormProps) => {
  const [images, setImages] = useState<ImageInput[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReplySchema>({
    resolver: zodResolver(replySchema),
  });

  const { isWriting, error, createReply } = useReply();

  const handleCreateComment: SubmitHandler<ReplySchema> = async (formData) => {
    const { id: commentId, productId } = comment;
    const res = await createReply({ productId, commentId, formData, images });
    if (res === true && onSuccess) {
      onSuccess();
    }
  };

  const isPending = isWriting || isSubmitting;

  return (
    <ReplyForm
      errors={errors}
      images={images}
      isPending={isPending}
      mode="create"
      onSubmit={handleSubmit(handleCreateComment)}
      register={register}
      setImages={setImages}
      error={error}
    />
  );
};

export default CreateReplyForm;
