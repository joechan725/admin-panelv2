import LoadAdminCart from '@/components/features/cart/LoadAdminCart';
import Widget from '@/components/layout/container/Widget';
import AddProductLink from '../link/AddProductLink';

interface CartRootProps {}

const CartRoot = ({}: CartRootProps) => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-screen-lg w-full">
        <Widget className="min-h-60">
          <div className="space-y-4">
            <LoadAdminCart />
            <AddProductLink />
          </div>
        </Widget>
      </div>
    </div>
  );
};

export default CartRoot;
