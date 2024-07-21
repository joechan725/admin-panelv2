import { Order } from '@/models/order/Order';
import OrderItem from './OrderItem';

interface OrderListProps {
  orders: Order[];
}
const OrderList = ({ orders }: OrderListProps) => {
  return orders && orders.length > 0 && orders.map((order) => <OrderItem key={order.id} order={order} />);
};
export default OrderList;
