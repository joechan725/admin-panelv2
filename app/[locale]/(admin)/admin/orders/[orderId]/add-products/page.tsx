import AddProductsModal from '../../components/modal/AddProductsModal';
import { unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
  orderId: string;
}

interface AddProductsProps {
  params: Params;
}

const AddProducts = ({ params: { locale } }: AddProductsProps) => {
  unstable_setRequestLocale(locale);

  return <AddProductsModal />;
};

export default AddProducts;
