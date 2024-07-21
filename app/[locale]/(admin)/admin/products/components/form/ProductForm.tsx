import BoxButton from '@/components/form/BoxButton';
import DNDImagesUploader from '@/components/form/DNDImagesUploader';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import SelectInput from '@/components/form/SelectInput';
import TextareaInput from '@/components/form/TextareaInput';
import TextArrayInput from '@/components/form/TextArrayInput';
import TextArraySelector from '@/components/form/TextArraySelector';
import TextButton from '@/components/form/TextButton';
import TextInput from '@/components/form/TextInput';
import ToggleSwitchController from '@/components/form/ToggleSwitchController';
import LeftArrow from '@/components/icon/LeftArrow';
import Widget from '@/components/layout/container/Widget';
import { Brand } from '@/models/classification/brand/Brand';
import { Category } from '@/models/classification/category/Category';
import { Collection } from '@/models/classification/collection/Collection';
import { ImageInput } from '@/models/ImageInput';
import { Tag } from '@/models/tag/Tag';
import { Link } from '@/navigation';
import { ProductSchema } from '@/schemas/productSchema';
import { useLocale, useTranslations } from 'next-intl';
import { UseFormRegister, FieldErrors, Control, UseFormSetError, UseFormClearErrors } from 'react-hook-form';

interface ProductFormProps {
  onSubmit: () => Promise<void>;
  register: UseFormRegister<ProductSchema>;
  mode: 'create' | 'edit';
  isPending: boolean;
  errors: FieldErrors<ProductSchema>;
  error?: string;
  control: Control<ProductSchema>;
  images: ImageInput[];
  setImages: React.Dispatch<React.SetStateAction<ImageInput[]>>;
  detailImages: ImageInput[];
  setDetailImages: React.Dispatch<React.SetStateAction<ImageInput[]>>;
  setError: UseFormSetError<ProductSchema>;
  clearErrors: UseFormClearErrors<ProductSchema>;
  tags: Tag[];
  brands: Brand[];
  collections: Collection[];
  categories: Category[];
}

const ProductForm = ({
  control,
  errors,
  isPending,
  mode,
  onSubmit,
  register,
  error,
  images,
  setImages,
  detailImages,
  setDetailImages,
  setError,
  clearErrors,
  tags,
  collections,
  categories,
  brands,
}: ProductFormProps) => {
  const t = useTranslations('Product.form');
  const locale = useLocale();

  const tagsSelection = tags.map((tag) => tag.tag);

  const collectionSelectOptions = collections.map(({ id, nameEN, nameZH }) => ({
    option: locale === 'en' ? nameEN : nameZH,
    value: id,
  }));

  const categorySelectOptions = categories.map(({ id, nameEN, nameZH }) => ({
    option: locale === 'en' ? nameEN : nameZH,
    value: id,
  }));

  const brandSelectOptions = brands.map(({ id, nameEN, nameZH }) => ({
    option: locale === 'en' ? nameEN : nameZH,
    value: id,
  }));

  return (
    <div className="space-y-5 mb-24">
      <Link href="/admin/products">
        <TextButton type="button" theme="primary" className="ml-4 flex items-center gap-2">
          <LeftArrow sizeClassName="size-4" />
          <span>{t('back')}</span>
        </TextButton>
      </Link>
      <div className="flex justify-between items-center flex-wrap gap-8">
        <div className="ml-4 text-2xl font-semibold text-primary-text">
          {mode === 'create' && t('createTitle')}
          {mode === 'edit' && t('editTitle')}
        </div>
        <BoxButton theme="primary" type="button" disabled={isPending} onClick={onSubmit}>
          {t('save')}
        </BoxButton>
      </div>
      <ErrorTranslation error={errors.root?.message} align="right" />
      <ErrorTranslation error={error} align="right" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center">
        <div className="md:col-span-2 space-y-6">
          <Widget className="p-6 space-y-4" minContentWidth={false}>
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-primary-text">{t('subtitle')}</div>
              <div className="flex gap-4 items-center">
                <span className="text-sm font-semibold text-primary-text">{t('published')}</span>
                <ToggleSwitchController
                  theme="success"
                  control={control}
                  registerName="isPublic"
                  disabled={isPending}
                />
              </div>
            </div>
            <TextInput
              disabled={isPending}
              register={register}
              registerName="nameZH"
              type="text"
              errors={errors}
              title={t('nameZH')}
            />
            <TextInput
              disabled={isPending}
              register={register}
              registerName="nameEN"
              type="text"
              errors={errors}
              title={t('nameEN')}
            />
            <TextareaInput
              rows={3}
              disabled={isPending}
              register={register}
              registerName="descriptionZH"
              errors={errors}
              title={t('descriptionZH')}
            />
            <TextareaInput
              rows={3}
              disabled={isPending}
              register={register}
              registerName="descriptionEN"
              errors={errors}
              title={t('descriptionEN')}
            />
            <DNDImagesUploader title={t('images')} images={images} setImages={setImages} disabled={isPending} />
          </Widget>
          <Widget className="p-6 space-y-4">
            <div className="text-lg font-semibold text-primary-text">{t('productDetail')}</div>
            <TextareaInput
              rows={12}
              disabled={isPending}
              register={register}
              registerName="detailZH"
              errors={errors}
              title={t('detailZH')}
            />
            <TextareaInput
              rows={12}
              disabled={isPending}
              register={register}
              registerName="detailEN"
              errors={errors}
              title={t('detailEN')}
            />
            <DNDImagesUploader
              title={t('detailImages')}
              images={detailImages}
              setImages={setDetailImages}
              disabled={isPending}
            />
          </Widget>
        </div>
        <div className="space-y-6">
          <Widget className="p-6 space-y-4">
            <div className="text-lg font-semibold text-primary-text">{t('tags')}</div>
            <TextArraySelector
              title={t('chooseTags')}
              registerName="tags"
              availableTexts={tagsSelection}
              disabled={isPending}
              control={control}
            />
            <TextArrayInput
              title={t('newTags')}
              registerName="tags"
              disabled={isPending}
              control={control}
              description={t('tagDescription')}
              setError={setError}
              clearErrors={clearErrors}
            />
          </Widget>
          <Widget className="p-6 space-y-4">
            <div className="text-lg font-semibold text-primary-text">{t('pricing')}</div>
            <TextInput
              disabled={isPending}
              register={register}
              registerName="markedPrice"
              type="number"
              errors={errors}
              title={t('markedPrice')}
            />
            <TextInput
              disabled={isPending}
              register={register}
              registerName="sellingPrice"
              type="number"
              errors={errors}
              title={t('sellingPrice')}
            />
            <hr className="h-0.5 bg-slate-200" />
            <TextInput
              disabled={isPending}
              register={register}
              registerName="stock"
              type="number"
              errors={errors}
              title={t('stock')}
            />
          </Widget>
          <Widget className="p-6 space-y-4">
            <div className="text-lg font-semibold text-primary-text">{t('categories')}</div>
            <SelectInput
              disabled={isPending}
              register={register}
              registerName="collectionId"
              errors={errors}
              selectOptions={collectionSelectOptions}
              title={t('collection')}
            />
            <SelectInput
              disabled={isPending}
              register={register}
              registerName="categoryId"
              errors={errors}
              selectOptions={categorySelectOptions}
              title={t('category')}
            />
            <SelectInput
              disabled={isPending}
              register={register}
              registerName="brandId"
              errors={errors}
              selectOptions={brandSelectOptions}
              title={t('brand')}
            />
          </Widget>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
