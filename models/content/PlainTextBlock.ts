import { SubContentBlock } from './SubContentBlock';

export interface PlainTextBlock {
  type: 'PlainText';
  title?: string;
  content?: string;
  subContentBlocks?: SubContentBlock[];
  list?: string[];
  image?: undefined;
  link?: undefined;
  linkDescription?: undefined;
}
