import { Image } from '../Image';

export interface HeroBlock {
  type: 'HeroCover' | 'HeroLeft' | 'HeroRight';
  title?: string;
  content?: string;
  subContentBlocks?: undefined;
  list?: undefined;
  image?: Image;
  link?: string;
  linkDescription?: string;
}
