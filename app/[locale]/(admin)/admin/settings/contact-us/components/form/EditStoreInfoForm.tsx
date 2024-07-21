'use client';

import BoxButton from '@/components/form/BoxButton';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import TextInput from '@/components/form/TextInput';
import Email from '@/components/icon/Email';
import Facebook from '@/components/icon/Facebook';
import Instagram from '@/components/icon/Instagram';
import Phone from '@/components/icon/Phone';
import TwitterX from '@/components/icon/TwitterX';
import Whatsapp from '@/components/icon/Whatsapp';
import Youtube from '@/components/icon/Youtube';
import Widget from '@/components/layout/container/Widget';
import { useStoreInformation } from '@/lib/hooks/store/useStoreInformation';
import { StoreInformation } from '@/models/store/StoreInformation';
import { storeInformationSchema, StoreInformationSchema } from '@/schemas/storeInformationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';

interface EditStoreInfoFormProps {
  storeInformation?: StoreInformation;
}

const EditStoreInfoForm = ({ storeInformation }: EditStoreInfoFormProps) => {
  const t = useTranslations('ContactUs');

  const { editStoreInformation, error, isWriting } = useStoreInformation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StoreInformationSchema>({
    resolver: zodResolver(storeInformationSchema),
    defaultValues: {
      facebookURL: storeInformation?.facebookURL,
      instagramURL: storeInformation?.instagramURL,
      twitterURL: storeInformation?.twitterURL,
      youtubeURL: storeInformation?.youtubeURL,
      phone: storeInformation?.phone,
      email: storeInformation?.email,
      whatsappNumber: storeInformation?.whatsappNumber,
    },
  });

  const isPending = isSubmitting || isWriting;

  const handleEditShopInfo: SubmitHandler<StoreInformationSchema> = async (formData) => {
    await editStoreInformation({ formData });
  };

  return (
    <Widget>
      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <h3 className="text-lg font-semibold text-primary-text">{t('socialMedia')}</h3>
          <div className="flex flex-col items-end">
            <BoxButton
              type="button"
              theme="primary"
              fontSize="sm"
              disabled={isPending}
              onClick={handleSubmit(handleEditShopInfo)}
            >
              {t('save')}
            </BoxButton>
            <ErrorTranslation error={error} />
          </div>
        </div>

        <TextInput
          disabled={isPending}
          register={register}
          registerName="facebookURL"
          starting={<Facebook sizeClassName="size-4" className="opacity-60" />}
          type="text"
          placeholder="Facebook"
          errors={errors}
        />
        <TextInput
          disabled={isPending}
          register={register}
          registerName="instagramURL"
          starting={<Instagram sizeClassName="size-4" className="opacity-60" />}
          type="text"
          placeholder="Instagram"
          errors={errors}
        />
        <TextInput
          disabled={isPending}
          register={register}
          registerName="twitterURL"
          starting={<TwitterX sizeClassName="size-4" className="opacity-60" />}
          type="text"
          placeholder="X"
          errors={errors}
        />
        <TextInput
          disabled={isPending}
          register={register}
          registerName="youtubeURL"
          starting={<Youtube sizeClassName="size-4" className="opacity-60" />}
          type="text"
          placeholder="Youtube"
          errors={errors}
        />
        <TextInput
          disabled={isPending}
          register={register}
          registerName="whatsappNumber"
          starting={<Whatsapp sizeClassName="size-4" className="opacity-60" />}
          type="text"
          placeholder="Whatsapp"
          errors={errors}
        />
        <TextInput
          disabled={isPending}
          register={register}
          registerName="phone"
          starting={<Phone sizeClassName="size-4" className="opacity-60" />}
          type="text"
          placeholder="Phone number"
          errors={errors}
        />
        <TextInput
          disabled={isPending}
          register={register}
          registerName="email"
          starting={<Email sizeClassName="size-4" className="opacity-60" />}
          type="text"
          placeholder="Email"
          errors={errors}
        />
      </div>
    </Widget>
  );
};
export default EditStoreInfoForm;
