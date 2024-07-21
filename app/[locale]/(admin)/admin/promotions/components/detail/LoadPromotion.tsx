'use client';

import ErrorTranslation from '@/components/form/ErrorTranslation';
import { usePromotion } from '@/lib/hooks/promotion/usePromotion';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import PromotionDetail from './PromotionDetail';

interface LoadPromotionProps {}

const LoadPromotion = ({}: LoadPromotionProps) => {
  const params = useParams<{ promotionId: string }>();
  const { promotionId } = params;

  const { loadPromotion, promotion, isLoading, error } = usePromotion();

  useEffect(() => {
    loadPromotion(promotionId);
  }, []);

  if (isLoading) {
    return null;
  }

  if (error) {
    return <ErrorTranslation error={error} />;
  }

  if (!promotion) {
    notFound();
  }

  return <PromotionDetail promotion={promotion} />;
};

export default LoadPromotion;
