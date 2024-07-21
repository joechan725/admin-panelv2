'use client';

import { useCartStore } from '@/stores/useCartStore';
import { useEffect, useState } from 'react';

interface UserCartItemChangeQuantityProps {
  cartItemId: string;
  existingQuantity: number;
}
const UserCartItemChangeQuantity = ({ cartItemId, existingQuantity }: UserCartItemChangeQuantityProps) => {
  const [newQuantity, setNewQuantity] = useState(existingQuantity);

  const { changeQuantity, writingError, clearWritingError } = useCartStore((state) => ({
    changeQuantity: state.changeQuantity,
    writingError: state.writingError,
    clearWritingError: state.clearWritingError,
  }));

  useEffect(() => {
    if (writingError) {
      setNewQuantity(existingQuantity);
      clearWritingError();
    }
  }, [writingError]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (isNaN(+event.target.value) && event.target.value !== '') {
      setNewQuantity(existingQuantity);
      return;
    }
    if (event.target.value === '') {
      setNewQuantity(1);
      return;
    }
    setNewQuantity(+event.target.value);
    changeQuantity(cartItemId, +event.target.value);
  };

  const numberOfOptions = 99;

  return (
    <select
      className="px-2 w-20 py-0.5 rounded-md border has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1 border-gray-300 scrollbar scrollbar-slate"
      value={newQuantity}
      onChange={handleChange}
    >
      {Array.from({ length: numberOfOptions }, (_, index) => (
        <option key={index + 1} value={index + 1}>
          {index + 1}
        </option>
      ))}
    </select>
  );
};
export default UserCartItemChangeQuantity;
