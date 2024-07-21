'use client';

import { usePromotionListsListener } from '@/lib/hooks/promotion/usePromotionListsListener';
import { useSearchParams } from 'next/navigation';
import { searchAndOrderPromotions } from './searchAndOrderPromotions';
import PromotionTable from './PromotionTable';

interface LoadPromotionsProps {}

const LoadPromotions = ({}: LoadPromotionsProps) => {
  const { promotions, isLoading, error } = usePromotionListsListener();
  const searchParams = useSearchParams();
  const displayPromotions = searchAndOrderPromotions({ searchParams, promotions });

  return (
    <PromotionTable promotions={promotions} displayPromotions={displayPromotions} isLoading={isLoading} error={error} />
  );
};

export default LoadPromotions;
