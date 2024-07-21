'use client';

import BoxButton from '@/components/form/BoxButton';
import BoxTickController from '@/components/form/BoxTickController';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import TextArrayInput from '@/components/form/TextArrayInput';
import TextButton from '@/components/form/TextButton';
import TextInput from '@/components/form/TextInput';
import ToggleSwitchController from '@/components/form/ToggleSwitchController';
import LeftArrow from '@/components/icon/LeftArrow';
import Widget from '@/components/layout/container/Widget';
import { Link } from '@/navigation';
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  useWatch,
} from 'react-hook-form';
import { promotionInitialContent } from './promotionInitialContent';
import { PromotionSchema } from '@/schemas/promotionSchema';
import { useTranslations } from 'next-intl';

import dynamic from 'next/dynamic';
const RichTextInput = dynamic(() => import('@/components/form/RichTextInput'), { ssr: false });

interface PromotionFormProps {
  onSubmit: () => Promise<void>;
  register: UseFormRegister<PromotionSchema>;
  mode: 'create';
  isPending: boolean;
  errors: FieldErrors<PromotionSchema>;
  emailError?: string;
  notificationError?: string;
  promotionError?: string;
  control: Control<PromotionSchema>;
  setError: UseFormSetError<PromotionSchema>;
  clearErrors: UseFormClearErrors<PromotionSchema>;
}

const PromotionForm = ({
  onSubmit,
  register,
  mode,
  isPending,
  errors,
  emailError,
  notificationError,
  promotionError,
  control,
  setError,
  clearErrors,
}: PromotionFormProps) => {
  const t = useTranslations('Promotion.form');

  const { promoteByEmail } = useWatch({ control });

  return (
    <div className="space-y-5">
      <Link href="/admin/promotions">
        <TextButton type="button" theme="primary" className="ml-4 flex items-center gap-2">
          <LeftArrow sizeClassName="size-4" />
          <span>{t('back')}</span>
        </TextButton>
      </Link>
      <div className="ml-4 flex justify-between items-center flex-wrap">
        <div className="text-2xl font-semibold text-primary-text">{mode === 'create' && t('createTitle')}</div>
        <BoxButton theme="primary" type="button" disabled={isPending} onClick={onSubmit}>
          {t('save')}
        </BoxButton>
      </div>
      <ErrorTranslation error={errors?.root?.message} align="right" />
      <ErrorTranslation error={emailError} align="right" />
      <ErrorTranslation error={notificationError} align="right" />
      <ErrorTranslation error={promotionError} align="right" />
      <Widget className="p-6 space-x-4">
        <div className="w-full">
          <div className="flex gap-8 flex-wrap">
            {/* Promote by email? */}
            <BoxTickController
              control={control}
              disabled={isPending}
              registerName="promoteByEmail"
              title={t('promoteByEmail')}
            />
            {/* Promote by notification? */}
            <BoxTickController
              control={control}
              disabled={isPending}
              registerName="promoteByNotification"
              title={t('promoteByWebsiteNotification')}
            />
          </div>
          <div className={promoteByEmail ? 'block' : 'hidden'}>
            {/* Additional Tos */}
            <TextArrayInput
              disabled={isPending}
              control={control}
              registerName="additionalBcc"
              title={t('receivers')}
              setError={setError}
              clearErrors={clearErrors}
              type="email"
              description={t('tagDescription')}
            />
            {/* To the subscribers? (toggle) */}
            <div className="mb-4 flex gap-4">
              <div className="text-sm font-semibold text-primary-text">{t('toSubscribers')}</div>
              <ToggleSwitchController
                disabled={isPending}
                control={control}
                registerName="toSubscribers"
                theme="success"
              />
            </div>
          </div>
          {/* Subject */}
          <TextInput
            disabled={isPending}
            register={register}
            registerName="subject"
            title={t('subject')}
            type="text"
            errors={errors}
          />
          {/* Main content */}
          <RichTextInput
            filePath="images/promotions"
            title={t('content')}
            disabled={isPending}
            control={control as unknown as Control<FieldValues>}
            registerName="htmlContent"
            noImage={false}
            initialContent={promotionInitialContent}
          />
        </div>
      </Widget>
    </div>
  );
};

export default PromotionForm;
