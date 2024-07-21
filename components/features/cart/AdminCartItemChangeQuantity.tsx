'use client';

import { useAdminCartItem } from '@/lib/hooks/user/admin/cartItem/useAdminCartItem';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AdminCartItemChangeQuantityProps {
  cartItemId: string;
  existingQuantity: number;
}

const AdminCartItemChangeQuantity = ({ cartItemId, existingQuantity }: AdminCartItemChangeQuantityProps) => {
  const [newQuantity, setNewQuantity] = useState(existingQuantity);

  const params = useParams<{ userId: string }>();

  const { userId } = params;

  const { changeQuantity, error, clearError, isWriting } = useAdminCartItem();

  useEffect(() => {
    if (error) {
      setNewQuantity(existingQuantity);
      clearError();
    }
  }, [error]);

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
    changeQuantity({ userId, cartItemId, existingQuantity, quantity: +event.target.value });
  };

  const numberOfOptions = 99;

  return (
    <select
      className="px-2 w-20 py-0.5 rounded-md border has-[:focus]:border-gray-500 has-[:focus]:ring-gray-500/50 has-[:focus]:ring-1 border-gray-300 scrollbar scrollbar-slate"
      value={newQuantity}
      onChange={handleChange}
      disabled={isWriting}
    >
      {Array.from({ length: numberOfOptions }, (_, index) => (
        <option key={index + 1} value={index + 1}>
          {index + 1}
        </option>
      ))}
    </select>
  );
};

export default AdminCartItemChangeQuantity;
