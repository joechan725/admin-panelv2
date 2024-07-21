'use client';

import { useState } from 'react';
import clsx from 'clsx/lite';
import HoverPopup from '@/components/ui/popup/HoverPopup';
import Email from '@/components/icon/Email';
import Facebook from '@/components/icon/Facebook';
import Whatsapp from '@/components/icon/Whatsapp';
import TwitterX from '@/components/icon/TwitterX';
import Signal from '@/components/icon/Signal';
import Link from '@/components/icon/Link';
import ClipboardDocumentCheck from '@/components/icon/ClipboardDocumentCheck';
import ExclamationCircle from '@/components/icon/ExclamationCircle';
import IconCircleButton from '@/components/ui/button/IconCircleButton';

interface ShareButtonProps {
  url: string;
  className?: string;
  shareTo: 'facebook' | 'x' | 'whatsapp' | 'signal' | 'copyLink' | 'email';
}

const ShareButton = ({ url, shareTo }: ShareButtonProps) => {
  const [isCopied, setIsCopied] = useState<undefined | boolean>(undefined);

  if (shareTo === 'copyLink') {
    const handleCopyLink = async () => {
      try {
        await navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(undefined), 3000);
      } catch (error) {
        setIsCopied(false);
        setTimeout(() => setIsCopied(undefined), 3000);
      }
    };
    return (
      <HoverPopup
        message={
          isCopied === undefined
            ? 'Copy link'
            : isCopied === true
            ? 'Copied successfully'
            : isCopied === false
            ? 'Copied failed'
            : null
        }
      >
        <IconCircleButton
          onClick={handleCopyLink}
          theme={isCopied === false ? 'danger' : 'gray'}
          disabled={false}
          type="button"
        >
          {isCopied === undefined && <Link sizeClassName="size-4 md:size-5" className="text-white" />}
          {isCopied === true && <ClipboardDocumentCheck sizeClassName="size-4 md:size-5" className="text-white" />}
          {isCopied === false && <ExclamationCircle sizeClassName="size-4 md:size-5" className="text-white" />}
        </IconCircleButton>
      </HoverPopup>
    );
  }

  if (shareTo === 'email') {
    const shareUrl = `mailto:?subject=Check this out&body=${encodeURIComponent(url)}`;
    return (
      <HoverPopup message="Email">
        <a href={shareUrl} target="_blank" rel="noopener noreferrer">
          <IconCircleButton disabled={false} theme="gray" paddingClassName="p-1.5" type="button">
            <Email sizeClassName="size-4 md:size-5" />
          </IconCircleButton>
        </a>
      </HoverPopup>
    );
  }

  if (shareTo === 'facebook') {
    const shareUrl = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`;
    return (
      <HoverPopup message="Facebook">
        <a href={shareUrl} className="group" target="_blank" rel="noopener noreferrer">
          <Facebook
            sizeClassName="size-7 md:size-8"
            className="transition-all text-facebook group-hover:text-opacity-85 group-active:text-opacity-70"
          />
        </a>
      </HoverPopup>
    );
  }

  if (shareTo === 'signal') {
    const shareUrl = `https://signal.me/#p/${encodeURIComponent(url)}`;
    return (
      <HoverPopup message="Signal">
        <a href={shareUrl} target="_blank" rel="noopener noreferrer">
          <IconCircleButton disabled={false} theme="signal" paddingClassName="p-1.5" type="button">
            <Signal sizeClassName="size-4 md:size-5" />
          </IconCircleButton>
        </a>
      </HoverPopup>
    );
  }

  if (shareTo === 'whatsapp') {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
    return (
      <HoverPopup message="Whatsapp">
        <a href={shareUrl} target="_blank" rel="noopener noreferrer">
          <IconCircleButton disabled={false} theme="whatsapp" paddingClassName="p-1.5" type="button">
            <Whatsapp sizeClassName="size-4 md:size-5" />
          </IconCircleButton>
        </a>
      </HoverPopup>
    );
  }

  if (shareTo === 'x') {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
    return (
      <HoverPopup message="X">
        <a href={shareUrl} target="_blank" rel="noopener noreferrer">
          <IconCircleButton disabled={false} theme="black" paddingClassName="p-1.5" type="button">
            <TwitterX sizeClassName="size-4 md:size-5" className="text-white" />
          </IconCircleButton>
        </a>
      </HoverPopup>
    );
  }

  return null;
};

export default ShareButton;
