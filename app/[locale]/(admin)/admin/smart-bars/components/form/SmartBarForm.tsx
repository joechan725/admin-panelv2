'use client';

import BoxButton from '@/components/form/BoxButton';
import ColorInput from '@/components/form/ColorInput';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import TextButton from '@/components/form/TextButton';
import TextInput from '@/components/form/TextInput';
import ToggleSwitchController from '@/components/form/ToggleSwitchController';
import LeftArrow from '@/components/icon/LeftArrow';
import Widget from '@/components/layout/container/Widget';
import SmartBar from '@/components/layout/smartBar/SmartBar';
import { SmartBarSchema } from '@/schemas/smartBarSchema';
import { Link } from '@/navigation';
import { UseFormRegister, FieldErrors, Control, useWatch } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { SmartBar as SmartBarModel } from '@/models/smartBar/SmartBar';

interface SmartBarFormProps {
  onSubmit: () => Promise<void>;
  register: UseFormRegister<SmartBarSchema>;
  mode: 'create' | 'edit';
  isPending: boolean;
  errors: FieldErrors<SmartBarSchema>;
  error?: string;
  control: Control<SmartBarSchema>;
}

const SmartBarForm = ({ control, errors, isPending, mode, onSubmit, register, error }: SmartBarFormProps) => {
  const t = useTranslations('SmartBar.form');

  const {
    link,
    linkDescriptionEN,
    linkDescriptionZH,
    messageZH,
    messageEN,
    titleZH,
    titleEN,
    backgroundColor,
    textColor,
  } = useWatch({ control });

  const smartBarPreview: SmartBarModel = {
    link,
    linkDescriptionZH: linkDescriptionZH !== '' ? linkDescriptionZH : undefined,
    linkDescriptionEN: linkDescriptionEN !== '' ? linkDescriptionEN : undefined,
    messageZH: messageZH ?? '',
    messageEN: messageEN ?? '',
    titleZH,
    titleEN,
    backgroundColor: backgroundColor ?? '#000000',
    textColor: textColor ?? '#ffffff',
    isPublic: true,
    id: crypto.randomUUID(),
    createdAt: new Date().getMilliseconds(),
    updatedAt: new Date().getMilliseconds(),
  };

  return (
    <div className="space-y-5">
      <Link href="/admin/smart-bars">
        <TextButton type="button" theme="primary" className="ml-4 flex items-center gap-2">
          <LeftArrow sizeClassName="size-4" />
          <span>{t('back')}</span>
        </TextButton>
      </Link>
      <div className="ml-4 flex justify-between items-center flex-wrap">
        <div className="text-2xl font-semibold text-primary-text">
          {mode === 'create' && t('createTitle')}
          {mode === 'edit' && t('editTitle')}
        </div>
        <BoxButton theme="primary" type="button" disabled={isPending} onClick={onSubmit}>
          {t('save')}
        </BoxButton>
      </div>
      <ErrorTranslation error={errors?.root?.message} align="right" />
      <ErrorTranslation error={error} align="right" />
      <div className="flex gap-6 flex-wrap">
        <div className="flex-1 max-w-96">
          <Widget className="min-w-96 p-6 max-h-min space-x-4">
            <div className="w-full">
              <div className="flex gap-4 flex-wrap justify-between items-center">
                <div className="text-lg font-semibold text-primary-text">{t('content')}</div>
                <div className="flex gap-4 flex-wrap items-center">
                  <span className="text-xs font-medium text-secondary-text">{t('published')}</span>
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
                registerName="titleZH"
                title={t('titleZH')}
                type="text"
                errors={errors}
              />
              <TextInput
                disabled={isPending}
                register={register}
                registerName="titleEN"
                title={t('titleEN')}
                type="text"
                errors={errors}
              />
              <TextInput
                disabled={isPending}
                register={register}
                registerName="messageZH"
                title={t('messageZH')}
                type="text"
                errors={errors}
              />
              <TextInput
                disabled={isPending}
                register={register}
                registerName="messageEN"
                title={t('messageEN')}
                type="text"
                errors={errors}
              />
              <TextInput
                disabled={isPending}
                register={register}
                registerName="link"
                title={t('link')}
                type="text"
                errors={errors}
              />
              <TextInput
                disabled={isPending}
                register={register}
                registerName="linkDescriptionZH"
                title={t('descriptionOfLinkZH')}
                type="text"
                errors={errors}
              />
              <TextInput
                disabled={isPending}
                register={register}
                registerName="linkDescriptionEN"
                title={t('descriptionOfLinkEN')}
                type="text"
                errors={errors}
              />
              <div className="flex items-center gap-4 mb-4">
                <div className="text-sm font-semibold text-primary-text">{t('textColor')}</div>
                <ColorInput disabled={isPending} register={register} registerName="textColor" />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-sm font-semibold text-primary-text">{t('backgroundColor')}</div>
                <ColorInput disabled={isPending} register={register} registerName="backgroundColor" />
              </div>
            </div>
          </Widget>
        </div>
        <div className="flex-[2]">
          <Widget className="min-w-[600px] p-6 space-y-4">
            <div className="text-lg font-semibold text-primary-text">{t('preview')}</div>
            <div className="w-full aspect-video rounded-lg border">
              <SmartBar smartBar={smartBarPreview} />
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
};

export default SmartBarForm;
