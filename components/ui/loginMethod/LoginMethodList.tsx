import { UserInfo } from 'firebase/auth';
import LoginMethodItem from './LoginMethodItem';

interface LoginMethodListProps {
  userInfos?: UserInfo[];
  sizeClassName?: string;
}

const LoginMethodList = ({ userInfos, sizeClassName }: LoginMethodListProps) => {
  return (
    userInfos &&
    userInfos.length > 0 &&
    userInfos.map((userInfo) => (
      <LoginMethodItem userInfo={userInfo} key={userInfo.providerId} sizeClassName={sizeClassName} />
    ))
  );
};

export default LoginMethodList;
