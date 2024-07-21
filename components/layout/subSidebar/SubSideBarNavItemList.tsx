import { NavLink } from '@/models/navLink/NavLink';
import SubSideBarNavItem from './SubSideBarNavItem';

interface SubSideBarNavItemListProps {
  subNavLinks: Omit<NavLink, 'nestedNavLinks'>[];
}

const SubSideBarNavItemList = ({ subNavLinks }: SubSideBarNavItemListProps) => {
  if (!subNavLinks || subNavLinks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-0.5">
      {subNavLinks &&
        subNavLinks.length > 0 &&
        subNavLinks.map((subNavLink, index) => (
          <SubSideBarNavItem key={subNavLink.title} subNavLink={subNavLink} index={index} />
        ))}
    </div>
  );
};

export default SubSideBarNavItemList;
