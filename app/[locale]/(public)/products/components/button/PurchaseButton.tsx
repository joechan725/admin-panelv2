'use client';

import { Product } from '@/models/product/Product';
import { useState } from 'react';
import AddToCartButton from './AddToCartButton';
import AddToCartButtonContainer from './AddToCartButtonContainer';
import BuyNowButton from './BuyNowButton';
import BuyNowButtonContainer from './BuyNowButtonContainer';
import Plus from '@/components/icon/Plus';
import Minus from '@/components/icon/Minus';

interface PurchaseButtonProps {
  product: Product;
}

const PurchaseButton = ({ product }: PurchaseButtonProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(+event.target.value);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'e' || event.key === 'E') {
      event.preventDefault();
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLInputElement>) => {
    (event.target as HTMLElement).blur();
  };

  return (
    <div className="space-y-4">
      <div className="w-full flex justify-between bg-slate-300/50 rounded-md divide-x-2 divide-white border-2 border-transparent has-[:focus]:border-black/10">
        <button type="button" className="px-2 md:px-3 py-1.5 outline-none" onClick={handleDecrement}>
          <Minus sizeClassName="size-4" className="text-slate-700" />
        </button>
        <input
          type="number"
          className="max-w-full w-full py-1 number-input-no-scroll text-center bg-transparent outline-none font-medium text-slate-700"
          onChange={handleQuantityChange}
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
          value={quantity}
        />
        <button type="button" className="px-2 md:px-3 py-1.5 outline-none" onClick={handleIncrement}>
          <Plus sizeClassName="size-4" className="text-slate-700" />
        </button>
      </div>
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1">
          <AddToCartButtonContainer product={product} quantity={quantity}>
            <AddToCartButton />
          </AddToCartButtonContainer>
        </div>
        <div className="flex-1">
          <BuyNowButtonContainer product={product} quantity={quantity}>
            <BuyNowButton />
          </BuyNowButtonContainer>
        </div>
      </div>
    </div>
  );
};

export default PurchaseButton;
