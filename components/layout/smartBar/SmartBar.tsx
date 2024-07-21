import { SmartBar as SmartBarModal } from '@/models/smartBar/SmartBar';
import { useLocale } from 'next-intl';
import Link from 'next/link';

interface SmartBarProps {
  smartBar: SmartBarModal;
}

const SmartBar = ({ smartBar }: SmartBarProps) => {
  const locale = useLocale();

  const {
    backgroundColor,
    textColor,
    titleZH,
    titleEN,
    messageZH,
    messageEN,
    link,
    linkDescriptionZH,
    linkDescriptionEN,
  } = smartBar;

  const title = locale === 'en' ? titleEN : titleZH;
  const message = locale === 'en' ? messageEN : messageZH;
  const linkDescription = locale === 'en' ? linkDescriptionEN : linkDescriptionZH;

  return (
    <div
      key={smartBar?.id}
      className="max-w-full w-full px-8 py-1 text-center"
      style={{ backgroundColor, color: textColor }}
    >
      {titleZH !== undefined && (
        <div className="text-sm md:text-base font-semibold line-clamp-1 text-ellipsis">{title}</div>
      )}
      <div className="text-xs md:text-sm font-medium line-clamp-1 text-ellipsis">{message}</div>
      {link !== undefined && (
        <Link
          className="text-xs md:text-sm font-medium underline underline-offset-2 hover:opacity-85 active:opacity-70 line-clamp-1 text-ellipsis"
          href={link}
        >
          {linkDescription ?? link}
        </Link>
      )}
    </div>
  );
};

export default SmartBar;
