'use client';

import Widget from '@/components/layout/container/Widget';
import BestBrandCard from '../card/BestBrandCard';
import { SalesRecord } from '@/models/salesRecord/SalesRecord';

interface BestBrandProps {
  isLoading?: boolean;
  salesRecords: SalesRecord[];
}

const BestBrand = ({ isLoading, salesRecords }: BestBrandProps) => {
  return (
    <Widget sizeFull className="min-h-[200px] max-h-[420px] h-full">
      <BestBrandCard isLoading={isLoading} salesRecords={salesRecords} />
    </Widget>
  );
};

export default BestBrand;
