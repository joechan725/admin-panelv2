import LoginMethodList from '@/components/ui/loginMethod/LoginMethodList';
import { UserInfo } from 'firebase/auth';
import { useTranslations } from 'next-intl';

interface AddPasswordStatementProps {
  userInfos: UserInfo[];
}
const AddPasswordStatement = ({ userInfos }: AddPasswordStatementProps) => {
  const t = useTranslations('UserAuth');

  return (
    <div className="mb-4 text-sm font-medium text-tertiary-text ">
      {t('addPasswordStatement1')}
      <span className="inline-flex gap-2 items-center">
        <LoginMethodList userInfos={userInfos} sizeClassName="size-4" />
      </span>
      {t('addPasswordStatement2')}
      <span className="inline-flex gap-2 items-center">
        <LoginMethodList userInfos={userInfos} sizeClassName="size-4" />
      </span>{' '}
      {t('addPasswordStatement3')}
    </div>
  );
};
export default AddPasswordStatement;
