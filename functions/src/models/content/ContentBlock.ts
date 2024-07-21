import { Image } from '../Image';
import { SubContentBlock } from './SubContentBlock';

export interface ContentBlock {
  title?: string;
  content?: string;
  subContentBlocks?: SubContentBlock[];
  list?: string[];
  list2?: string[];
  contactMethods?: string[];
  content2?: string;
  content3?: string;
  link?: string;
  image?: Image;
  linkDescription?: string;
}
