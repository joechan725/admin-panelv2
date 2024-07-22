import ChevronRight from '../icon/ChevronRight';
import Image from 'next/image';
import { Link } from '@/navigation';
import { HeroBlock } from '@/models/content/HeroBlock';

interface HeroCoverProps {
  heroBlock: HeroBlock;
}

const HeroCover = ({ heroBlock }: HeroCoverProps) => {
  const { title, content, image, link, linkDescription } = heroBlock;

  return (
    <div className="relative max-w-full min-h-[590px] max-h-[1080px] aspect-video flex justify-center items-center overflow-hidden">
      {image && <Image alt={image.alt} src={image.url} fill className="object-cover brightness-50" />}
      <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 space-y-8 max-w-screen-md">
        <div className="space-y-4">
          {title && (
            <div className="font-semibold text-white/80 text-4xl sm:text-5xl md:text-7xl text-center">{title}</div>
          )}
          {content && (
            <div className="font-semibold text-white/80 text-sm sm:text-base md:text-2xl text-center">{content}</div>
          )}
        </div>
        {link !== undefined && (
          <Link
            href={link}
            className="font-medium text-white/80 text-xs sm:text-base flex justify-center items-center gap-2 underline-offset-2 hover:opacity-85 hover:underline active:opacity-70 group-hover:opacity-85 group-hover:underline group-active:opacity-70"
          >
            {linkDescription ?? link} <ChevronRight sizeClassName="size-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeroCover;
