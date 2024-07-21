import { useEffect } from 'react';
import styles from './BlockNoteViewerContainer.module.css';
import clsx from 'clsx/lite';

interface BlockNoteViewerContainerProps {
  children: React.ReactNode;
}

const colorMap: { [key: string]: string } = {
  gray: '#9B9A97',
  brown: '#64473A',
  red: '#E03E3E',
  orange: '#D9730D',
  yellow: '#DFAB01',
  green: '#4D6461',
  blue: '#0B6E99',
  purple: '#6940A5',
  pink: '#AD1A72',
};

const backgroundColorMap: { [key: string]: string } = {
  gray: '#EBECED',
  brown: '#E9E5E3',
  red: '#FBE4E4',
  orange: '#F6E9D9',
  yellow: '#FBF3DB',
  green: '#DDEDEA',
  blue: '#DDEBF1',
  purple: '#EAE4F2',
  pink: '#F4DFEB',
};

const BlockNoteViewerContainer = ({ children }: BlockNoteViewerContainerProps) => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const elements = document.querySelectorAll(
        '.blocknote-viewer [data-text-color], .blocknote-viewer [data-background-color]'
      );
      elements.forEach((element) => {
        const textColor = element.getAttribute('data-text-color');
        const backgroundColor = element.getAttribute('data-background-color');
        if (textColor && colorMap[textColor]) {
          (element as HTMLElement).style.color = colorMap[textColor];
        }
        if (backgroundColor && backgroundColorMap[backgroundColor]) {
          (element as HTMLElement).style.backgroundColor = backgroundColorMap[backgroundColor];
        }
      });
    }
  }, [children]);

  return <div className={clsx(styles['blocknote-viewer'], 'blocknote-viewer')}>{children}</div>;
};

export default BlockNoteViewerContainer;
