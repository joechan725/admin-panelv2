import { useReply } from '@/lib/hooks/reply/useReply';
import { Reply } from '@/models/reply/Reply';
import { ImageInput } from '@/models/ImageInput';
import { replySchema, ReplySchema } from '@/schemas/replySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ReplyForm from './ReplyForm';

interface EditReplyFormProps {
  reply: Reply;
  onSuccess?: () => void;
}

const EditReplyForm = ({ reply, onSuccess }: EditReplyFormProps) => {
  const [images, setImages] = useState<ImageInput[]>(reply.images);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReplySchema>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      title: reply.title,
      content: reply.content,
    },
  });

  const { isWriting, error, editReply } = useReply();

  const handleEditComment: SubmitHandler<ReplySchema> = async (formData) => {
    const { id } = reply;
    const res = await editReply({ replyId: id, formData, images });
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
      mode="edit"
      onSubmit={handleSubmit(handleEditComment)}
      register={register}
      setImages={setImages}
      error={error}
    />
  );
};

export default EditReplyForm;
