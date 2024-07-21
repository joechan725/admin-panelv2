import { ContentBlock } from '@/models/content/ContentBlock';
import PlainText from './PlainText';
import HeroLeft from './HeroLeft';
import HeroCover from './HeroCover';
import HeroRight from './HeroRight';

interface ContentBlockItemProps {
  contentBlock: ContentBlock;
}

const ContentBlockItem = ({ contentBlock }: ContentBlockItemProps) => {
  const { type } = contentBlock;

  if (type === 'PlainText') {
    return <PlainText plainTextBlock={contentBlock} />;
  }

  if (type === 'HeroCover') {
    return <HeroCover heroBlock={contentBlock} />;
  }

  if (type === 'HeroLeft') {
    return <HeroLeft heroBlock={contentBlock} />;
  }

  if (type === 'HeroRight') {
    return <HeroRight heroBlock={contentBlock} />;
  }

  return null;
};

export default ContentBlockItem;
