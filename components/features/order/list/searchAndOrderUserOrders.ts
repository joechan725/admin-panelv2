import { searchObjectsAllKeys } from '@/lib/helpers/objects/searchObjectsAllKeys';
import { sliceObjectsByPage } from '@/lib/helpers/objects/sliceObjectsByPage';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { Order } from '@/models/order/Order';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface SearchAndOrderUserOrdersParameters {
  searchParams: ReadonlyURLSearchParams;
  orders: Order[];
}

export const searchAndOrderUserOrders = ({ searchParams, orders }: SearchAndOrderUserOrdersParameters) => {
  const searchQuery = searchParams.get('search');
  const orderBy = searchParams.get('orderby');
  const itemsPerPage = +(searchParams.get('limit') ?? 10);
  const currentPage = +(searchParams.get('page') ?? 1);

  let displayOrders = orders;
  // search by query
  if (displayOrders && searchQuery) {
    displayOrders = searchObjectsAllKeys(displayOrders, searchQuery);
  }

  // sort by id
  if (displayOrders && orderBy === 'id-asc') {
    displayOrders = sortObjectsByKey(displayOrders, 'id', 'asc');
  }
  if (displayOrders && orderBy === 'id-desc') {
    displayOrders = sortObjectsByKey(displayOrders, 'id', 'desc');
  }

  // sort by user name
  if (displayOrders && orderBy === 'user-asc') {
    displayOrders = sortObjectsByKey(displayOrders, 'userFirstName', 'asc');
  }
  if (displayOrders && orderBy === 'user-desc') {
    displayOrders = sortObjectsByKey(displayOrders, 'userFirstName', 'desc');
  }

  // sort by isPaid
  if (displayOrders && orderBy === 'isPaid-asc') {
    displayOrders = sortObjectsByKey(displayOrders, 'isPaid', 'asc');
  }
  if (displayOrders && orderBy === 'isPaid-desc') {
    displayOrders = sortObjectsByKey(displayOrders, 'isPaid', 'desc');
  }

  // sort by status
  if (displayOrders && orderBy === 'status-asc') {
    displayOrders = sortObjectsByKey(displayOrders, 'status', 'asc');
  }
  if (displayOrders && orderBy === 'status-desc') {
    displayOrders = sortObjectsByKey(displayOrders, 'status', 'desc');
  }

  // sort by price
  if (displayOrders && orderBy === 'price-asc') {
    displayOrders = sortObjectsByKey(displayOrders, 'totalPriceAfterDiscount', 'asc');
  }
  if (displayOrders && orderBy === 'price-desc') {
    displayOrders = sortObjectsByKey(displayOrders, 'totalPriceAfterDiscount', 'desc');
  }

  // sort by paidAt
  if (displayOrders && orderBy === 'paidAt-asc') {
    displayOrders = sortObjectsByKey(displayOrders, 'paidAt', 'asc');
  }
  if (displayOrders && orderBy === 'paidAt-desc') {
    displayOrders = sortObjectsByKey(displayOrders, 'paidAt', 'desc');
  }

  // pagination
  if (displayOrders) {
    displayOrders = sliceObjectsByPage(displayOrders, currentPage, itemsPerPage);
  }

  return displayOrders;
};
