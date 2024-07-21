import { getProductLists } from '@/firebase/api/product/getProductLists';
import PaginateProductsServer from './PaginateProductsServer';
import SearchOrderAndPaginateProductsClient from './SearchOrderAndPaginateProductsClient';
import { Suspense } from 'react';
import { useTranslations } from 'next-intl';

interface ServerComponentProps {
  mode: 'server-component';
  pageNumber: number;
}

interface ClientComponentProps {
  mode: 'client-component';
  pageNumber?: undefined;
}

type LoadProductsProps = ServerComponentProps | ClientComponentProps;

const LoadProducts = async ({ pageNumber, mode }: LoadProductsProps) => {
  const tError = useTranslations('Error');

  try {
    const products = await getProductLists();

    return (
      <>
        {mode === 'server-component' && <PaginateProductsServer products={products} pageNumber={pageNumber} />}
        {mode === 'client-component' && (
          <Suspense>
            <SearchOrderAndPaginateProductsClient products={products} />
          </Suspense>
        )}
      </>
    );
  } catch (error) {
    return <div className="text-sm font-medium text-secondary-text">{tError('unexpectedError')}</div>;
  }
};

export default LoadProducts;
