import { Suspense } from 'react';
import PriceFilter from './PriceFilter';
import RatingFilter from './RatingFilter';
import LoadClassificationFilter from './LoadClassificationFilter';
import OrderbySelector from './OrderbySelector';
import MiscellaneousSelector from './MiscellaneousSelector';

interface ProductFilterProps {
  href?: string;
}

const ProductFilter = ({ href }: ProductFilterProps) => {
  return (
    <Suspense>
      <div className="space-y-4">
        <PriceFilter highestPrice={1000} lowestPrice={1} href={href} />
        <RatingFilter totalStars={5} href={href} />
        <OrderbySelector href={href} />
        <LoadClassificationFilter href={href} />
        <MiscellaneousSelector href={href} />
      </div>
    </Suspense>
  );
};

export default ProductFilter;
