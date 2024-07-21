import BoxButton from '@/components/form/BoxButton';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import TextInput from '@/components/form/TextInput';
import { CategorySchema } from '@/schemas/categorySchema';
import { useTranslations } from 'next-intl';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface CategoryFormProps {
  onSubmit: () => Promise<void>;
  register: UseFormRegister<CategorySchema>;
  mode: 'create' | 'edit';
  isPending: boolean;
  errors: FieldErrors<CategorySchema>;
  error?: string;
}

const CategoryForm = ({ errors, isPending, mode, onSubmit, register, error }: CategoryFormProps) => {
  const t = useTranslations('Category.form');

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold text-primary-text">
        {mode === 'create' && t('createCategoryTitle')}
        {mode === 'edit' && t('editCategoryTitle')}
      </h2>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-primary-text">{t('categorySubtitle')}</h3>
      </div>
      <div className="space-y-8">
        <div className="space-y-2">
          <TextInput
            title={t('nameZH')}
            register={register}
            disabled={isPending}
            registerName="nameZH"
            type="text"
            errors={errors}
          />
          <TextInput
            title={t('nameEN')}
            register={register}
            disabled={isPending}
            registerName="nameEN"
            type="text"
            errors={errors}
          />
        </div>
        <div className="flex justify-end">
          <BoxButton type="button" disabled={isPending} theme="primary" onClick={onSubmit} fontSize="sm">
            {t('save')}
          </BoxButton>
        </div>
        <ErrorTranslation error={error} align="right" />
      </div>
    </div>
  );
};

export default CategoryForm;
