'use client';

import Widget from '@/components/layout/container/Widget';
import BestSellerCard from '../card/BestSellerCard';
import { SalesRecord } from '@/models/salesRecord/SalesRecord';

interface BestSellerProps {
  isLoading?: boolean;
  salesRecords: SalesRecord[];
}

const BestSeller = ({ isLoading, salesRecords }: BestSellerProps) => {
  return (
    <Widget sizeFull className="min-h-[200px] max-h-[420px] h-full">
      <BestSellerCard isLoading={isLoading} salesRecords={salesRecords} />
    </Widget>
  );
};

export default BestSeller;
