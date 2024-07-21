'use client';

import BoxButton from '@/components/form/BoxButton';
import DateInput from '@/components/form/DateInput';
import SelectInput from '@/components/form/SelectInput';
import TextInput from '@/components/form/TextInput';
import ToggleSwitchController from '@/components/form/ToggleSwitchController';
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, useWatch } from 'react-hook-form';
import GenerateRandomCodeButton from './GenerateRandomCodeButton';
import { CouponSchema } from '@/schemas/couponSchema';
import { useTranslations } from 'next-intl';
import BoxTickController from '@/components/form/BoxTickController';
import ErrorTranslation from '@/components/form/ErrorTranslation';

interface CouponFormProps {
  onSubmit: () => Promise<void>;
  register: UseFormRegister<CouponSchema>;
  mode: 'create' | 'edit';
  isPending: boolean;
  errors: FieldErrors<CouponSchema>;
  error?: string;
  control: Control<CouponSchema>;
  setValue: UseFormSetValue<CouponSchema>;
}

const CouponForm = ({ onSubmit, register, mode, isPending, errors, error, control, setValue }: CouponFormProps) => {
  const t = useTranslations('Coupon.form');

  const { discountType } = useWatch({ control });

  return (
    <div className="space-y-5">
      <div className="text-2xl font-semibold text-primary-text">
        {mode === 'create' && t('createTitle')}
        {mode === 'edit' && t('editTitle')}
      </div>
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-primary-text">{t('subTitle')}</div>
        <div className="flex gap-4 items-center justify-center">
          <div className="text-sm font-semibold text-primary-text">{t('published')}</div>
          <ToggleSwitchController theme="success" control={control} registerName="isPublic" disabled={isPending} />
        </div>
      </div>
      <div>
        <TextInput
          title={t('code')}
          register={register}
          disabled={isPending}
          registerName="code"
          type="text"
          errors={errors}
          ending={<GenerateRandomCodeButton setValue={setValue} />}
        />
        <div className="flex gap-2">
          <div>
            <SelectInput
              title={t('discountType')}
              disabled={isPending}
              register={register}
              registerName="discountType"
              blankOption={false}
              errors={errors}
              selectOptions={[
                { value: 'fixed', option: t('fixed') },
                { value: 'percentage', option: t('percentage') },
              ]}
            />
          </div>
          <div className="flex-1">
            <TextInput
              title={discountType === 'fixed' ? t('discountAmountDollar') : t('discountAmountPercent')}
              register={register}
              disabled={isPending}
              registerName="discountAmount"
              type="number"
              errors={errors}
            />
          </div>
        </div>
        <TextInput
          hidden={discountType !== 'percentage'}
          title={t('maximumDiscount')}
          description={t('maximumDiscountDescription')}
          register={register}
          disabled={isPending}
          registerName="maximumDiscount"
          type="number"
          errors={errors}
        />
        <TextInput
          title={t('minimumSpend')}
          description={t('minimumSpendDescription')}
          register={register}
          disabled={isPending}
          registerName="minimumSpend"
          type="number"
          errors={errors}
        />
        <TextInput
          title="Limit"
          description={t('limitDescription')}
          register={register}
          disabled={isPending}
          registerName="usageLimit"
          type="number"
          errors={errors}
        />
        <TextInput
          title={t('limitPerUser')}
          description={t('limitPerUserDescription')}
          register={register}
          disabled={isPending}
          registerName="usageLimitPerUser"
          type="number"
          errors={errors}
        />
        <DateInput
          disabled={isPending}
          title={t('startTime')}
          register={register}
          registerName="startDate"
          errors={errors}
          description={t('startTimeDescription')}
        />
        <DateInput
          disabled={isPending}
          title={t('endTime')}
          register={register}
          registerName="endDate"
          errors={errors}
          description={t('endTimeDescription')}
        />
        <div className="space-y-4 mt-4">
          <BoxTickController
            control={control}
            disabled={isPending}
            registerName="registeredUserOnly"
            title={t('registeredUserOnly')}
          />
          <BoxTickController
            control={control}
            disabled={isPending}
            registerName="canBeUsedTogether"
            title={t('canBeUsedTogether')}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <BoxButton type="button" disabled={isPending} theme="primary" onClick={onSubmit} fontSize="sm">
          {t('save')}
        </BoxButton>
      </div>
      <ErrorTranslation error={errors.root?.message} align="right" />
      <ErrorTranslation error={error} align="right" />
    </div>
  );
};

export default CouponForm;
