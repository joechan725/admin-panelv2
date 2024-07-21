'use client';

import clsx from 'clsx/lite';
import BadgeCount from '../../BadgeCount';

interface IconContainerWithBadgeCountProps {
  onClick?: () => void;
  children: React.ReactNode;
  badgeCount: number;
  theme: 'secondary' | 'heart';
}

const IconContainerWithBadgeCount = ({ onClick, children, badgeCount, theme }: IconContainerWithBadgeCountProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx('relative group', onClick && 'transition-all hover:cursor-pointer active:cursor-pointer')}
    >
      <div
        className={clsx(
          'text-primary-text transition-all',
          onClick &&
            ((theme === 'secondary' && 'hover:text-secondary-bg active:text-secondary-bg/70') ||
              (theme === 'heart' && 'group-hover:text-heart group-active:text-heart/70'))
        )}
      >
        {children}
      </div>
      <div className="absolute -top-2 -right-2">
        <BadgeCount
          badgeCount={badgeCount ?? 0}
          sizeClassName="size-5"
          maxBadgeCount={99}
          fontSizeClassName="text-[10px]"
        />
      </div>
    </div>
  );
};

export default IconContainerWithBadgeCount;
