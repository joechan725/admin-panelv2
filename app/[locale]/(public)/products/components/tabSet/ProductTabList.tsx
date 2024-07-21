import { NavLink } from '@/models/navLink/NavLink';
import ProductTabItem from './ProductTabItem';

interface ProductTabListProps {
  navLinks: NavLink[];
}

const ProductTabList = ({ navLinks }: ProductTabListProps) => {
  return (
    navLinks &&
    navLinks.length > 0 &&
    navLinks.map((navLink) => (
      <ProductTabItem key={navLink.title} navLink={navLink}>
        {navLink.title}
      </ProductTabItem>
    ))
  );
};

export default ProductTabList;
