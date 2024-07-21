import { ContentBlock } from '@/models/content/ContentBlock';
import ContentBlockItem from './ContentBlockItem';

interface ContentBlockListProps {
  contentBlocks: ContentBlock[];
}

const ContentBlockList = ({ contentBlocks }: ContentBlockListProps) => {
  return (
    contentBlocks &&
    contentBlocks.length > 0 && (
      <div className="space-y-8">
        {contentBlocks.map((contentBlock, index) => (
          <ContentBlockItem key={index} contentBlock={contentBlock} />
        ))}
      </div>
    )
  );
};

export default ContentBlockList;
