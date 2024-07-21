import { PlainTextBlock } from '@/models/content/PlainTextBlock';
import { Link } from '@/navigation';

interface PlainTextProps {
  plainTextBlock: PlainTextBlock;
}

const PlainText = ({ plainTextBlock }: PlainTextProps) => {
  const { title, content, list, subContentBlocks } = plainTextBlock;

  return (
    <div className="space-y-4">
      {title !== undefined && <div className="md:text-xl font-semibold text-primary-text">{title}</div>}
      {content !== undefined && <div className="text-xs md:text-base font-medium text-secondary-text">{content}</div>}
      {subContentBlocks &&
        subContentBlocks.map((subContentBlock, index) => {
          const { content, subTitle, linkDescription, href } = subContentBlock;
          return (
            <div key={index} className="pl-4 border-l-2 border-gray-300">
              <div className="text-sm md:text-lg font-semibold text-primary-text mb-2">{subTitle}</div>
              <div className="text-xs md:text-base font-medium text-secondary-text">
                {content}
                {href !== undefined && (
                  <Link
                    href={href}
                    className="text-link hover:text-opacity-85 active:text-opacity-70 underline underline-offset-1"
                  >
                    {linkDescription}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      {list && (
        <ul className="list-disc list-inside pl-4 space-y-2">
          {list.map((item, index) => (
            <li key={index} className="text-xs md:text-base font-medium text-secondary-text">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlainText;
