'use client';

import { usePrivateSmartBarListsListener } from '@/lib/hooks/smartBar/usePrivateSmartBarListsListener';
import { useSearchParams } from 'next/navigation';
import { searchAndOrderSmartBars } from './searchAndOrderSmartBars';
import SmartBarTable from './SmartBarTable';
import { SmartBarIdAndIsPublic } from '@/lib/hooks/smartBar/useSmartBar';
import { useLocale } from 'next-intl';

interface LoadSmartBarsProps {
  onSelect?: ({}: SmartBarIdAndIsPublic) => void;
  selectedSmartBars?: SmartBarIdAndIsPublic[];
}

const LoadSmartBars = ({ onSelect, selectedSmartBars }: LoadSmartBarsProps) => {
  const locale = useLocale();

  const { smartBars, isLoading, error } = usePrivateSmartBarListsListener();
  const searchParams = useSearchParams();
  const displaySmartBars = searchAndOrderSmartBars({ searchParams, smartBars, locale });

  return (
    <SmartBarTable
      smartBars={smartBars}
      displaySmartBars={displaySmartBars}
      isLoading={isLoading}
      error={error}
      onSelect={onSelect}
      selectedSmartBars={selectedSmartBars}
    />
  );
};

export default LoadSmartBars;
