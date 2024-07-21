'use client';

import XMark from '@/components/icon/XMark';
import { useState } from 'react';

interface SmartBarContainerProps {
  children: React.ReactNode;
}

const SmartBarContainer = ({ children }: SmartBarContainerProps) => {
  const [isShow, setIsShow] = useState(true);

  return (
    isShow && (
      <div className="relative">
        {children}
        <button className="absolute top-1/2 right-2 -translate-y-1/2" onClick={() => setIsShow(false)}>
          <XMark sizeClassName="size-4" className="text-white" />
        </button>
      </div>
    )
  );
};

export default SmartBarContainer;
