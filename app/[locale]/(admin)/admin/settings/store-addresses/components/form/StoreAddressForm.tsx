import BoxButton from '@/components/form/BoxButton';
import DNDImagesUploader from '@/components/form/DNDImagesUploader';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import SelectInput from '@/components/form/SelectInput';
import TextInput from '@/components/form/TextInput';
import { useLanguage } from '@/lib/hooks/language/useLanguage';
import { ImageInput } from '@/models/ImageInput';
import { StoreAddressSchema } from '@/schemas/storeAddressSchema';
import { useTranslations } from 'next-intl';
import { Control, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';

interface StoreAddressFormProps {
  onSubmit: () => Promise<void>;
  register: UseFormRegister<StoreAddressSchema>;
  mode: 'create' | 'edit';
  isPending: boolean;
  errors: FieldErrors<StoreAddressSchema>;
  error?: string;
  control: Control<StoreAddressSchema>;
  images: ImageInput[];
  setImages: React.Dispatch<React.SetStateAction<ImageInput[]>>;
}

const StoreAddressForm = ({
  isPending,
  onSubmit,
  register,
  mode,
  errors,
  error,
  control,
  images,
  setImages,
}: StoreAddressFormProps) => {
  const t = useTranslations('Address.addressForm');
  const { convertRegion, convertDistrict } = useLanguage();

  const { region } = useWatch({ control });

  const regionSelectOptions = [
    { value: 'Hong Kong Island', option: convertRegion('Hong Kong Island') },
    { value: 'Kowloon', option: convertRegion('Kowloon') },
    { value: 'New Territories', option: convertRegion('New Territories') },
  ];

  const isHongKongIsland = region === 'Hong Kong Island';
  const isKowloon = region === 'Kowloon';
  const isNewTerritories = region === 'New Territories';

  const districtSelectOptions = isHongKongIsland
    ? [
        { value: 'Central and Western District', option: convertDistrict('Central and Western District') },
        { value: 'Eastern District', option: convertDistrict('Eastern District') },
        { value: 'Southern District', option: convertDistrict('Southern District') },
        { value: 'Wan Chai District', option: convertDistrict('Wan Chai District') },
      ]
    : isKowloon
    ? [
        { value: 'Kowloon City District', option: convertDistrict('Kowloon City District') },
        { value: 'Kwun Tong District', option: convertDistrict('Kwun Tong District') },
        { value: 'Sham Shui Po District', option: convertDistrict('Sham Shui Po District') },
        { value: 'Wong Tai Sin District', option: convertDistrict('Wong Tai Sin District') },
        { value: 'Yau Tsim Mong District', option: convertDistrict('Yau Tsim Mong District') },
      ]
    : isNewTerritories
    ? [
        { value: 'Islands District', option: convertDistrict('Islands District') },
        { value: 'Kwai Tsing District', option: convertDistrict('Kwai Tsing District') },
        { value: 'North District', option: convertDistrict('North District') },
        { value: 'Sai Kung District', option: convertDistrict('Sai Kung District') },
        { value: 'Sha Tin District', option: convertDistrict('Sha Tin District') },
        { value: 'Tai Po District', option: convertDistrict('Tai Po District') },
        { value: 'Tsuen Wan District', option: convertDistrict('Tsuen Wan District') },
        { value: 'Tuen Mun District', option: convertDistrict('Tuen Mun District') },
        { value: 'Yuen Long District', option: convertDistrict('Yuen Long District') },
      ]
    : [];

  return (
    <form className="space-y-2">
      <div>
        <div className="flex justify-between items-baseline mb-2">
          <div className="mb-4 text-lg font-semibold text-primary-text">
            {mode === 'create' && t('createTitle')}
            {mode === 'edit' && t('editTitle')}
          </div>
          <BoxButton disabled={isPending} theme="primary" type="button" fontSize="sm" onClick={onSubmit}>
            {t('save')}
          </BoxButton>
        </div>
        <TextInput
          title={t('addressName')}
          register={register}
          disabled={isPending}
          registerName="name"
          type="text"
          errors={errors}
        />
        <SelectInput
          blankOption={false}
          title={t('region')}
          register={register}
          disabled={isPending}
          registerName="region"
          selectOptions={regionSelectOptions}
          errors={errors}
        />
        <SelectInput
          blankOption={false}
          title={t('district')}
          register={register}
          disabled={isPending}
          registerName="district"
          selectOptions={districtSelectOptions}
          errors={errors}
        />
        <TextInput
          title={t('detailAddress')}
          register={register}
          disabled={isPending}
          registerName="detailAddress"
          type="text"
          errors={errors}
        />
        <TextInput
          title={t('phoneNumber')}
          register={register}
          disabled={isPending}
          registerName="phoneNumber"
          type="text"
          errors={errors}
        />
        <TextInput
          title={t('businessHours')}
          register={register}
          disabled={isPending}
          registerName="businessHours"
          type="text"
          errors={errors}
        />
        <DNDImagesUploader title={t('images')} disabled={isPending} images={images} setImages={setImages} />
        <ErrorTranslation error={errors.root?.message} />
        <ErrorTranslation error={errors.region?.message} />
        <ErrorTranslation error={error} />
      </div>
    </form>
  );
};

export default StoreAddressForm;
