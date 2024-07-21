import Email from '@/components/icon/Email';
import Facebook from '@/components/icon/Facebook';
import Instagram from '@/components/icon/Instagram';
import Phone from '@/components/icon/Phone';
import TwitterX from '@/components/icon/TwitterX';
import Whatsapp from '@/components/icon/Whatsapp';
import Youtube from '@/components/icon/Youtube';
import { StoreInformation as StoreInformationModel } from '@/models/store/StoreInformation';

interface StoreInformationProps {
  storeInformation?: StoreInformationModel;
}

const StoreInformation = ({ storeInformation }: StoreInformationProps) => {
  if (!storeInformation) {
    return null;
  }

  const { facebookURL, instagramURL, twitterURL, youtubeURL, whatsappNumber, email, phone } = storeInformation;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {email !== undefined && (
          <a className="flex gap-2 justify-center items-center" href={`mailto: ${email}`} target="_blank">
            <Email sizeClassName="size-3 md:size-4" className="text-white" />
            <div className="text-xs md:text-sm font-medium text-white">{email}</div>
          </a>
        )}
        {phone !== undefined && (
          <div className="flex gap-2 justify-center items-center">
            <Phone sizeClassName="size-3 md:size-4" className="text-white" />
            <div className="text-xs md:text-sm font-medium text-white">{phone}</div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {facebookURL !== undefined && (
          <a
            href={facebookURL}
            className="transition-all text-white hover:text-secondary-bg active:text-secondary-bg/85"
            target="_blank"
          >
            <Facebook sizeClassName="size-3 md:size-4" />
          </a>
        )}
        {instagramURL !== undefined && (
          <a
            href={instagramURL}
            className="transition-all text-white hover:text-secondary-bg active:text-secondary-bg/85"
            target="_blank"
          >
            <Instagram sizeClassName="size-3 md:size-4" />
          </a>
        )}
        {twitterURL !== undefined && (
          <a
            href={twitterURL}
            className="transition-all text-white hover:text-secondary-bg active:text-secondary-bg/85"
            target="_blank"
          >
            <TwitterX sizeClassName="size-3 md:size-4" />
          </a>
        )}
        {youtubeURL !== undefined && (
          <a
            href={youtubeURL}
            className="transition-all text-white hover:text-secondary-bg active:text-secondary-bg/85"
            target="_blank"
          >
            <Youtube sizeClassName="size-3 md:size-4" />
          </a>
        )}
        {whatsappNumber !== undefined && (
          <a
            href={`https://wa.me/852${whatsappNumber}`}
            className="transition-all text-white hover:text-sky-500 active:text-sky-700"
            target="_blank"
          >
            <Whatsapp sizeClassName="size-3 md:size-4" />
          </a>
        )}
      </div>
    </div>
  );
};

export default StoreInformation;
