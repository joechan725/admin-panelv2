import { UserInfo } from 'firebase/auth';
import { useTranslations } from 'next-intl';

interface ProviderVerifyStatementProps {
  userInfos: UserInfo[];
}
const ProviderVerifyStatement = ({ userInfos }: ProviderVerifyStatementProps) => {
  const t = useTranslations('UserAuth');

  const isGoogleLogin = userInfos.some((info) => info.providerId === 'google.com');
  const isAppleLogin = userInfos.some((info) => info.providerId === 'apple.com');
  const isFacebookLogin = userInfos.some((info) => info.providerId === 'facebook.com');
  const isTwitterLogin = userInfos.some((info) => info.providerId === 'twitter.com');
  const isGithubLogin = userInfos.some((info) => info.providerId === 'github.com');

  const verifyMethod = isGoogleLogin
    ? 'Google'
    : isAppleLogin
    ? 'Apple'
    : isFacebookLogin
    ? 'Facebook'
    : isTwitterLogin
    ? 'Twitter'
    : isGithubLogin
    ? 'GitHub'
    : undefined;

  return (
    <div className="text-sm mt-2 mb-4 font-medium text-tertiary-text ">
      {t('providerVerifyStatement', { verifyMethod })}
    </div>
  );
};
export default ProviderVerifyStatement;
