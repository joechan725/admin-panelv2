import { searchObjectsAllKeys } from '@/lib/helpers/objects/searchObjectsAllKeys';
import { sliceObjectsByPage } from '@/lib/helpers/objects/sliceObjectsByPage';
import { sortObjectsByKey } from '@/lib/helpers/objects/sortObjectsByKey';
import { User } from '@/models/user/User';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface SearchAndOrderUsersParameters {
  searchParams: ReadonlyURLSearchParams;
  users: User[];
}

export const searchAndOrderUsers = ({ searchParams, users }: SearchAndOrderUsersParameters) => {
  const searchQuery = searchParams.get('search');
  const orderBy = searchParams.get('orderby');
  const currentPage = +(searchParams.get('page') ?? 1);
  const itemsPerPage = +(searchParams.get('limit') ?? 10);
  const role = searchParams.get('role');

  let displayUsers = users;

  // role
  if (displayUsers && role === 'anonymous') {
    displayUsers = displayUsers.filter((user) => user.role === 'anonymous');
  }
  if (displayUsers && role === 'user') {
    displayUsers = displayUsers.filter((user) => user.role === 'user');
  }
  if (displayUsers && role === 'admin') {
    displayUsers = displayUsers.filter((user) => user.role === 'admin');
  }

  // search by query
  if (displayUsers && searchQuery) {
    displayUsers = searchObjectsAllKeys(displayUsers, searchQuery);
  }

  // sort by user name
  if (displayUsers && orderBy === 'user-asc') {
    displayUsers = sortObjectsByKey(displayUsers, 'firstName', 'asc');
  }
  if (displayUsers && orderBy === 'user-desc') {
    displayUsers = sortObjectsByKey(displayUsers, 'firstName', 'desc');
  }

  // sort by createdAt
  if (displayUsers && orderBy === 'created-at-asc') {
    displayUsers = sortObjectsByKey(displayUsers, 'createdAt', 'asc');
  }
  if (displayUsers && orderBy === 'created-at-desc') {
    displayUsers = sortObjectsByKey(displayUsers, 'createdAt', 'desc');
  }

  // sort by registeredAt
  if (displayUsers && orderBy === 'registered-at-asc') {
    displayUsers = sortObjectsByKey(displayUsers, 'registeredAt', 'asc');
  }
  if (displayUsers && orderBy === 'registered-at-desc') {
    displayUsers = sortObjectsByKey(displayUsers, 'registeredAt', 'desc');
  }

  // sort by status
  if (displayUsers && orderBy === 'status-asc') {
    displayUsers = sortObjectsByKey(displayUsers, 'lastLoggedInAt', 'asc');
  }
  if (displayUsers && orderBy === 'status-desc') {
    displayUsers = sortObjectsByKey(displayUsers, 'lastLoggedInAt', 'desc');
  }

  // sort by role
  if (displayUsers && orderBy === 'role-asc') {
    displayUsers = sortObjectsByKey(displayUsers, 'role', 'asc');
  }
  if (displayUsers && orderBy === 'role-desc') {
    displayUsers = sortObjectsByKey(displayUsers, 'role', 'desc');
  }

  // sort by order count
  if (displayUsers && orderBy === 'order-asc') {
    displayUsers = sortObjectsByKey(displayUsers, 'orderCount', 'asc');
  }
  if (displayUsers && orderBy === 'order-desc') {
    displayUsers = sortObjectsByKey(displayUsers, 'orderCount', 'desc');
  }

  // sort by total spent
  if (displayUsers && orderBy === 'total-spent-asc') {
    displayUsers = sortObjectsByKey(displayUsers, 'totalSpent', 'asc');
  }
  if (displayUsers && orderBy === 'total-spent-desc') {
    displayUsers = sortObjectsByKey(displayUsers, 'totalSpent', 'desc');
  }

  // pagination
  if (displayUsers) {
    displayUsers = sliceObjectsByPage(displayUsers, currentPage, itemsPerPage);
  }

  return displayUsers;
};
