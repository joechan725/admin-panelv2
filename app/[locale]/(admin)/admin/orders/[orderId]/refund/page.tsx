import { unstable_setRequestLocale } from 'next-intl/server';
import RefundModal from '../../components/modal/RefundModal';

interface Params {
  locale: string;
  orderId: string;
}

interface RefundProps {
  params: Params;
}

const Refund = ({ params: { locale } }: RefundProps) => {
  unstable_setRequestLocale(locale);

  return <RefundModal />;
};

export default Refund;
