import BoxButton from '@/components/form/BoxButton';
import DNDImagesUploader from '@/components/form/DNDImagesUploader';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import RatingSelector from '@/components/form/RatingSelector';
import TextareaInput from '@/components/form/TextareaInput';
import TextInput from '@/components/form/TextInput';
import { ImageInput } from '@/models/ImageInput';
import { CommentSchema } from '@/schemas/commentSchema';
import { useTranslations } from 'next-intl';
import { UseFormRegister, FieldErrors, Control } from 'react-hook-form';

interface CommentFormProps {
  onSubmit: () => Promise<void>;
  register: UseFormRegister<CommentSchema>;
  mode: 'create' | 'edit';
  isPending: boolean;
  errors: FieldErrors<CommentSchema>;
  error?: string;
  control: Control<CommentSchema>;
  images: ImageInput[];
  setImages: React.Dispatch<React.SetStateAction<ImageInput[]>>;
}

const CommentForm = ({
  control,
  errors,
  isPending,
  mode,
  onSubmit,
  register,
  error,
  images,
  setImages,
}: CommentFormProps) => {
  const t = useTranslations('Comment.form');

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div className="flex justify-between items-baseline mb-2">
          <h2 className="mb-4 text-lg text-slate-700 font-semibold">
            {mode === 'create' && t('createTitle')}
            {mode === 'edit' && t('editTitle')}
          </h2>
          <BoxButton disabled={isPending} theme="primary" type="submit" fontSize="sm">
            {t('save')}
          </BoxButton>
        </div>
        <RatingSelector control={control} title={t('rating')} disabled={isPending} registerName="rating" />
        <TextInput
          title={t('title')}
          register={register}
          disabled={isPending}
          registerName="title"
          type="text"
          errors={errors}
        />
        <TextareaInput
          title={t('content')}
          register={register}
          disabled={isPending}
          registerName="content"
          errors={errors}
          rows={3}
        />
        <DNDImagesUploader title={t('images')} images={images} setImages={setImages} disabled={isPending} />
        <ErrorTranslation error={errors.root?.message} />
        <ErrorTranslation error={error} />
      </div>
    </form>
  );
};

export default CommentForm;
