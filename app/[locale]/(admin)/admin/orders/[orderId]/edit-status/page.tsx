import EditOrderStatusModal from '../../components/modal/EditOrderStatusModal';
import { unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
  orderId: string;
}

interface EditOrderStatusProps {
  params: Params;
}

const EditOrderStatus = ({ params: { locale } }: EditOrderStatusProps) => {
  unstable_setRequestLocale(locale);

  return <EditOrderStatusModal />;
};

export default EditOrderStatus;
