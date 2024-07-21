import Apple from '@/components/icon/Apple';
import Email from '@/components/icon/Email';
import Facebook from '@/components/icon/Facebook';
import GitHub from '@/components/icon/GitHub';
import GoogleColored from '@/components/icon/GoogleColored';
import Phone from '@/components/icon/Phone';
import TwitterX from '@/components/icon/TwitterX';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import { UserInfo } from 'firebase/auth';

interface LoginMethodItemProps {
  sizeClassName?: string;
  userInfo: UserInfo;
}

const LoginMethodItem = ({ userInfo, sizeClassName = 'size-5' }: LoginMethodItemProps) => {
  const { providerId } = userInfo;

  if (providerId === 'password' || providerId === 'emailLink') {
    return (
      <HoverPopup message="Email">
        <Email sizeClassName={sizeClassName} className="text-gray-700" />
      </HoverPopup>
    );
  }
  if (providerId === 'phone') {
    return (
      <HoverPopup message="Phone">
        <Phone sizeClassName={sizeClassName} className="text-gray-700" />
      </HoverPopup>
    );
  }
  if (providerId === 'google.com') {
    return (
      <HoverPopup message="Google">
        <GoogleColored sizeClassName={sizeClassName} />
      </HoverPopup>
    );
  }
  if (providerId === 'apple.com') {
    return (
      <HoverPopup message="Apple">
        <Apple sizeClassName={sizeClassName} className="text-black" />
      </HoverPopup>
    );
  }
  if (providerId === 'facebook.com') {
    return (
      <HoverPopup message="Facebook">
        <Facebook sizeClassName={sizeClassName} className="text-facebook" />;
      </HoverPopup>
    );
  }
  if (providerId === 'twitter.com') {
    return (
      <HoverPopup message="X">
        <TwitterX sizeClassName={sizeClassName} className="text-black" />
      </HoverPopup>
    );
  }

  if (providerId === 'github.com') {
    return (
      <HoverPopup message="Github">
        <GitHub sizeClassName={sizeClassName} className="text-black" />
      </HoverPopup>
    );
  }

  return null;
};

export default LoginMethodItem;
