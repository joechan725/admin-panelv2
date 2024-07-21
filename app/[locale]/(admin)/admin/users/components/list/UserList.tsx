import { User } from '@/models/user/User';
import UserItem from './UserItem';

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  return users && users.length > 0 && users.map((user) => <UserItem key={user.id} user={user} />);
};

export default UserList;
