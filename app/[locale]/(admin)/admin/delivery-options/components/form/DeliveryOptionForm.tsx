import BoxButton from '@/components/form/BoxButton';
import BoxTickController from '@/components/form/BoxTickController';
import TextareaInput from '@/components/form/TextareaInput';
import TextInput from '@/components/form/TextInput';
import ToggleSwitchController from '@/components/form/ToggleSwitchController';
import clsx from 'clsx/lite';
import StoreAddressSelector from './address/StoreAddressSelector';
import { useTranslations } from 'next-intl';
import { DeliveryOptionSchema } from '@/schemas/deliveryOptionSchema';
import { UseFormRegister, FieldErrors, Control, UseFormSetValue, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface DeliveryOptionFormProps {
  onSubmit: () => Promise<void>;
  register: UseFormRegister<DeliveryOptionSchema>;
  mode: 'create' | 'edit';
  isPending: boolean;
  errors: FieldErrors<DeliveryOptionSchema>;
  error?: string;
  control: Control<DeliveryOptionSchema>;
  setValue: UseFormSetValue<DeliveryOptionSchema>;
}

const DeliveryOptionForm = ({
  control,
  errors,
  isPending,
  mode,
  error,
  onSubmit,
  register,
  setValue,
}: DeliveryOptionFormProps) => {
  const t = useTranslations('DeliveryOption.form');

  const { deliveryCharge, freeDeliveryThreshold, isPickUp, storeAddressId } = useWatch({ control });

  useEffect(() => {
    if (isPickUp) {
      setValue('deliveryCharge', 0);
    }
    if (!isPickUp) {
      setValue('storeAddressId', undefined);
      setValue('storeAddressName', undefined);
      setValue('storeAddressRegion', undefined);
      setValue('storeAddressDistrict', undefined);
      setValue('storeAddressPhoneNumber', undefined);
      setValue('storeAddressDetailAddress', undefined);
      setValue('storeAddressBusinessHours', undefined);
    }
  }, [isPickUp]);

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="text-2xl font-semibold text-primary-text">
        {mode === 'create' && t('createTitle')}
        {mode === 'edit' && t('editTitle')}
      </div>
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-primary-text">{t('subTitle')}</div>
        <div className="flex gap-4 items-center justify-center">
          <div className="text-sm font-semibold text-primary-text">{t('published')}</div>
          <ToggleSwitchController control={control} disabled={isPending} registerName="isPublic" theme="success" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex gap-4 items-center mb-4">
          <div className="text-sm font-semibold text-primary-text">{t('isPickup')}</div>
          <ToggleSwitchController control={control} disabled={isPending} registerName="isPickUp" theme="success" />
        </div>
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
        <TextareaInput
          rows={3}
          title={t('descriptionZH')}
          register={register}
          disabled={isPending}
          registerName="descriptionZH"
          errors={errors}
        />
        <TextareaInput
          rows={3}
          title={t('descriptionEN')}
          register={register}
          disabled={isPending}
          registerName="descriptionEN"
          errors={errors}
        />
        <TextInput
          title={isPickUp ? t('estimatedPrepareTimeZH') : t('estimatedDeliveryTimeZH')}
          register={register}
          disabled={isPending}
          registerName="estimatedTimeZH"
          type="text"
          errors={errors}
        />
        <TextInput
          title={isPickUp ? t('estimatedPrepareTimeEN') : t('estimatedDeliveryTimeEN')}
          register={register}
          disabled={isPending}
          registerName="estimatedTimeEN"
          type="text"
          errors={errors}
        />
        <TextInput
          title={t('deliveryProviderZH')}
          hidden={isPickUp}
          register={register}
          disabled={isPending}
          registerName="deliveryProviderZH"
          type="text"
          errors={errors}
        />
        <TextInput
          title={t('deliveryProviderEN')}
          hidden={isPickUp}
          register={register}
          disabled={isPending}
          registerName="deliveryProviderEN"
          type="text"
          errors={errors}
        />
        <TextInput
          title={t('deliveryCharge')}
          description={t('deliveryChargeDescription')}
          hidden={isPickUp}
          register={register}
          disabled={isPending}
          registerName="deliveryCharge"
          type="number"
          errors={errors}
        />
        <TextInput
          title={t('freeDeliveryThreshold')}
          description={t('freeDeliveryThresholdDescription')}
          hidden={
            isPickUp ||
            deliveryCharge === undefined ||
            deliveryCharge.toString() === '' ||
            deliveryCharge.toString() === '0'
          }
          register={register}
          disabled={isPending}
          registerName="freeDeliveryThreshold"
          type="number"
          errors={errors}
        />
        <div
          className={clsx(
            'flex items-center gap-4',
            (freeDeliveryThreshold === undefined || freeDeliveryThreshold.toString() === '') && 'hidden'
          )}
        >
          <BoxTickController
            registerName="applyThresholdBeforeCoupons"
            control={control}
            disabled={isPending}
            title={t('applyThresholdBeforeCoupons')}
          />
        </div>
        <StoreAddressSelector selectedStoreAddressId={storeAddressId} setValue={setValue} hidden={!isPickUp} />
      </div>
      <div className="flex justify-end">
        <BoxButton type="submit" disabled={isPending} theme="primary" fontSize="sm">
          {t('save')}
        </BoxButton>
      </div>
      <ErrorTranslation error={errors.root?.message} align="right" />
      <ErrorTranslation error={errors.storeAddressRegion?.message} align="right" />
      <ErrorTranslation error={error} align="right" />
    </form>
  );
};

export default DeliveryOptionForm;
