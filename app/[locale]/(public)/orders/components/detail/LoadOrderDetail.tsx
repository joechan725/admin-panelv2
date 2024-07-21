'use client';

import { useParams, useSearchParams } from 'next/navigation';
import LoadOrderDetailByListener from './LoadOrderDetailByListener';
import LoadOrderDetailByCallable from './LoadOrderDetailByCallable';

interface LoadOrderDetailProps {}

const LoadOrderDetail = ({}: LoadOrderDetailProps) => {
  const params = useParams<{ orderId: string }>();
  const searchParams = useSearchParams();

  const { orderId } = params;

  const queryCode = searchParams.get('queryCode');

  if (!queryCode) {
    return <LoadOrderDetailByListener orderId={orderId} />;
  }

  return <LoadOrderDetailByCallable orderId={orderId} queryCode={queryCode} />;
};

export default LoadOrderDetail;
