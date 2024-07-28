import BoxButton from '@/components/form/BoxButton';
import DateInput from '@/components/form/DateInput';
import ErrorTranslation from '@/components/form/ErrorTranslation';
import ImageInput from '@/components/form/ImageInput';
import SelectInput from '@/components/form/SelectInput';
import TextButton from '@/components/form/TextButton';
import TextInput from '@/components/form/TextInput';
import LeftArrow from '@/components/icon/LeftArrow';
import Widget from '@/components/layout/container/Widget';
import { convertToDateTimeLocalString } from '@/lib/helpers/date/convertToDateTimeLocalString ';
import { useAdminUser } from '@/lib/hooks/user/admin/useAdminUser';
import { ImageInput as ImageInputModal } from '@/models/ImageInput';
import { User } from '@/models/user/User';
import { ProfileSchema, profileSchema } from '@/schemas/user/profileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from '@/navigation';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

interface EditUserProfileFormProps {
  user: User;
}

const EditUserProfileForm = ({ user }: EditUserProfileFormProps) => {
  const t = useTranslations('MyAccount.editProfileForm');

  const [avatar, setAvatar] = useState<ImageInputModal | undefined>(user.avatar);

  const { editUserProfile, error, isWriting } = useAdminUser();

  const params = useParams<{ userId: string }>();
  const router = useRouter();

  const { userId } = params;

  const defaultDateOfBirth = user.dateOfBirth ? convertToDateTimeLocalString(new Date(user.dateOfBirth)) : undefined;

  const {
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

  const isPending = isSubmitting || isWriting;

  const handEditUserProfile: SubmitHandler<ProfileSchema> = async (formData) => {
    const res = await editUserProfile({
      userId,
      formData,
      avatar,
    });

    if (res) {
      router.back();
    }
  };

  return (
    <div className="space-y-2">
      <Link href={`/admin/users/${userId}`}>
        <TextButton type="button" theme="primary" className="flex items-center gap-2">
          <LeftArrow sizeClassName="size-4" />
          <span>{t('back')}</span>
        </TextButton>
      </Link>

      <Widget>
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <h2 className="mb-4 text-lg font-semibold text-primary-text">{t('editUserTitle')}</h2>
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
            <div className="flex-1">
              <div className="flex gap-2">
                <div className="flex-1">
                  <TextInput
                    title={t('firstName')}
                    register={register}
                    disabled={isPending}
                    registerName="firstName"
                    type="text"
                    errors={errors}
                  />
                </div>
                <div className="flex-1">
                  <TextInput
                    title={t('lastName')}
                    register={register}
                    disabled={isPending}
                    registerName="lastName"
                    type="text"
                    errors={errors}
                  />
                </div>
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
            <label htmlFor="email" className="block text-sm text-slate-600 font-semibold mb-2" id="email">
              {t('email')}
            </label>
            <div className="relative flex gap-4 items-center px-4 w-full py-2 rounded-md border has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1">
              <input
                type="email"
                disabled
                className="w-full focus:outline-none flex-1 text-slate-600 disabled:bg-transparent disabled:text-opacity-60"
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
              { option: t('men'), value: 'Men' },
              { option: t('women'), value: 'Women' },
              { option: t('notWilling'), value: 'NotWilling' },
            ]}
            errors={errors}
          />
        </div>
      </Widget>
    </div>
  );
};

export default EditUserProfileForm;
