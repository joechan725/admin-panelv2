import { Order } from '@/models/order/Order';
import UserOrderItem from './UserOrderItem';

interface UserOrderListProps {
  orders: Order[];
  mode: 'admin' | 'user';
}

const UserOrderList = ({ orders, mode }: UserOrderListProps) => {
  return (
    orders && orders.length > 0 && orders.map((order) => <UserOrderItem order={order} key={order.id} mode={mode} />)
  );
};

export default UserOrderList;
