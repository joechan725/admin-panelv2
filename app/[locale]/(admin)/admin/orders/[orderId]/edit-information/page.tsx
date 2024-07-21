import EditOrderInformationModal from '../../components/modal/EditOrderInformationModal';
import { unstable_setRequestLocale } from 'next-intl/server';

interface Params {
  locale: string;
  orderId: string;
}

interface EditOrderInformationProps {
  params: Params;
}

const EditOrderInformation = ({ params: { locale } }: EditOrderInformationProps) => {
  unstable_setRequestLocale(locale);

  return <EditOrderInformationModal />;
};

export default EditOrderInformation;
