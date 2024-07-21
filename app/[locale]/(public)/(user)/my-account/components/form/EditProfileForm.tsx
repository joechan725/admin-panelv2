import BoxButton from '@/components/form/BoxButton';
import BoxTickController from '@/components/form/BoxTickController';
import DateInput from '@/components/form/DateInput';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import ImageInput from '@/components/form/ImageInput';
import SelectInput from '@/components/form/SelectInput';
import TextButton from '@/components/form/TextButton';
import TextInput from '@/components/form/TextInput';
import LeftArrow from '@/components/icon/LeftArrow';
import LightBorder from '@/components/layout/container/LightBorder';
import { convertToDateTimeLocalString } from '@/lib/helpers/date/convertToDateTimeLocalString ';
import { ImageInput as ImageInputModal } from '@/models/ImageInput';
import { User } from '@/models/user/User';
import { ProfileSchema, profileSchema } from '@/schemas/user/profileSchema';
import { useSessionStore } from '@/stores/useSessionStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from '@/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

interface EditProfileFormProps {
  user: User;
}

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const tGeneral = useTranslations('General');
  const t = useTranslations('MyAccount.editProfileForm');

  const [avatar, setAvatar] = useState<ImageInputModal | undefined>(user.avatar);

  const { error, editUserProfile } = useSessionStore();

  const router = useRouter();

  const defaultDateOfBirth = user.dateOfBirth ? convertToDateTimeLocalString(new Date(user.dateOfBirth)) : undefined;

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      dateOfBirth: defaultDateOfBirth as unknown as Date,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      subscribeToPromotion: user.subscribeToPromotion ?? false,
    },
  });

  const isPending = isSubmitting;

  const handEditUserProfile: SubmitHandler<ProfileSchema> = async (formData) => {
    const res = await editUserProfile({
      formData,
      avatar,
    });

    if (res === true) {
      router.push('/my-account');
    }
  };

  return (
    <div className="space-y-2">
      <Link href="/my-account">
        <TextButton type="button" theme="primary" className="flex items-center gap-2">
          <LeftArrow sizeClassName="size-4" />
          <span>{t('back')}</span>
        </TextButton>
      </Link>
      <LightBorder className="p-6">
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <h2 className="mb-4 text-lg font-semibold text-primary-text">{t('title')}</h2>
            <BoxButton
              disabled={isPending}
              theme="primary"
              type="button"
              onClick={handleSubmit(handEditUserProfile)}
              fontSize="sm"
            >
              {t('save')}
            </BoxButton>
          </div>
          <ErrorTranslation error={errors.root?.message} align="right" />
          <ErrorTranslation error={error} align="right" />
          <div className="flex gap-4">
            <ImageInput sizeClassName="size-44" setImage={setAvatar} disabled={isPending} image={avatar} />
            <div>
              <div className="flex gap-2 flex-1">
                <TextInput
                  title={t('firstName')}
                  register={register}
                  disabled={isPending}
                  registerName="firstName"
                  type="text"
                  errors={errors}
                />
                <TextInput
                  title={t('lastName')}
                  register={register}
                  disabled={isPending}
                  registerName="lastName"
                  type="text"
                  errors={errors}
                />
              </div>
              <TextInput
                title={t('phoneNumber')}
                register={register}
                disabled={isPending}
                registerName="phoneNumber"
                type="text"
                errors={errors}
              />
            </div>
          </div>
          <div className="my-4">
            <label htmlFor="email" className="block text-sm font-semibold text-primary-text mb-2" id="email">
              {t('email')}
            </label>
            <div className="relative flex gap-4 items-center px-4 w-full py-2 rounded-md border has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1">
              <input
                type="email"
                disabled
                className="w-full focus:outline-none flex-1 font-medium text-primary-text disabled:bg-transparent disabled:text-opacity-60"
                value={user.email}
              />
            </div>
          </div>
          <DateInput
            title={t('birthday')}
            register={register}
            disabled={isPending}
            registerName="dateOfBirth"
            errors={errors}
            type="date"
          />
          <SelectInput
            title={t('gender')}
            register={register}
            disabled={isPending}
            registerName="gender"
            selectOptions={[
              { value: 'Men', option: t('men') },
              { value: 'Women', option: t('women') },
              { value: 'NotWilling', option: t('notWilling') },
            ]}
            errors={errors}
          />
          <BoxTickController
            control={control}
            disabled={isPending}
            registerName="subscribeToPromotion"
            title={t('promotionalStatement', { companyName: tGeneral('companyName') })}
          />
        </div>
      </LightBorder>
    </div>
  );
};

export default EditProfileForm;
