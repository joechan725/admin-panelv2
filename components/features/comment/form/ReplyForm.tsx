import BoxButton from '@/components/form/BoxButton';
import DNDImagesUploader from '@/components/form/DNDImagesUploader';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import TextareaInput from '@/components/form/TextareaInput';
import TextInput from '@/components/form/TextInput';
import { ImageInput } from '@/models/ImageInput';
import { ReplySchema } from '@/schemas/replySchema';
import { useTranslations } from 'next-intl';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface ReplyFormProps {
  onSubmit: () => Promise<void>;
  register: UseFormRegister<ReplySchema>;
  mode: 'create' | 'edit';
  isPending: boolean;
  errors: FieldErrors<ReplySchema>;
  error?: string;
  images: ImageInput[];
  setImages: React.Dispatch<React.SetStateAction<ImageInput[]>>;
}

const ReplyForm = ({ errors, images, isPending, mode, onSubmit, register, setImages, error }: ReplyFormProps) => {
  const t = useTranslations('Reply.form');

  return (
    <form onSubmit={onSubmit}>
      <div>
        <div className="flex justify-between items-baseline mb-2">
          <h2 className="mb-4 text-lg font-semibold text-primary-text">
            {mode === 'create' && t('createTitle')}
            {mode === 'edit' && t('editTitle')}
          </h2>
          <BoxButton disabled={isPending} theme="primary" type="submit" fontSize="sm">
            {t('save')}
          </BoxButton>
        </div>
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

export default ReplyForm;
