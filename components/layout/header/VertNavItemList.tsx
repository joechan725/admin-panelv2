import { NavLink } from '@/models/navLink/NavLink';
import VertNavItem from './VertNavItem';

interface VertNavItemListProps {
  navLinks: Omit<NavLink, 'nestedNavLinks' | 'icon' | 'ending'>[];
}

const VertNavItemList = ({ navLinks }: VertNavItemListProps) => {
  if (!navLinks || navLinks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 pb-20 pl-5 pr-3 max-h-full overflow-y-scroll scrollbar scrollbar-slate ">
      {navLinks &&
        navLinks.length > 0 &&
        navLinks.map((navLink) => (
          <VertNavItem key={navLink.title} navLink={navLink}>
            {navLink.title}
          </VertNavItem>
        ))}
    </div>
  );
};

export default VertNavItemList;
