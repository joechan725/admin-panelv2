import ChevronRight from '../icon/ChevronRight';
import Image from 'next/image';
import { Link } from '@/navigation';
import { HeroBlock } from '@/models/content/HeroBlock';

interface HeroRightProps {
  heroBlock: HeroBlock;
}

const HeroRight = ({ heroBlock }: HeroRightProps) => {
  const { title, content, image, link, linkDescription } = heroBlock;

  return (
    <div className="grid lg:grid-cols-2 max-w-screen-2xl px-4 mx-auto gap-8 md:gap-10 xl:gap-24 2xl:gap-40">
      {image && (
        <div className="relative aspect-video my-auto lg:order-last">
          <Image alt={image.alt} src={image.url} fill className="object-cover" />
        </div>
      )}
      <div className="space-y-4 lg:space-y-8 my-auto">
        <div className="space-y-4">
          <div className="font-semibold text-2xl sm:text-3xl lg:text-5xl text-left">{title}</div>
          <div className="font-semibold text-sm sm:text-base lg:text-2xl text-left">{content}</div>
        </div>
        {link !== undefined && (
          <Link
            href={link}
            className="font-medium text-xs sm:text-base flex justify-start items-center gap-2 hover:opacity-85 underline-offset-2 hover:underline active:opacity-70"
          >
            {linkDescription ?? link} <ChevronRight sizeClassName="size-4" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeroRight;
