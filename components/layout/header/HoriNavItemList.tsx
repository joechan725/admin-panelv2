import { NavLink } from '@/models/navLink/NavLink';
import HoriNavItem from './HoriNavItem';

interface HoriNavItemListProps {
  navLinks: Omit<NavLink, 'nestedNavLinks' | 'icon' | 'ending'>[];
}

const HoriNavItemList = ({ navLinks }: HoriNavItemListProps) => {
  return (
    <div className="flex gap-6">
      {navLinks.map((navLink) => (
        <HoriNavItem key={navLink.title} navLink={navLink}>
          {navLink.title}
        </HoriNavItem>
      ))}
    </div>
  );
};

export default HoriNavItemList;
