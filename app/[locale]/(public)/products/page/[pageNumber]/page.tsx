import { getProductLists } from '@/firebase/api/product/getProductLists';
import { Metadata } from 'next';
import { productsPerPage } from '../../components/list/productsPerPage';
import ProductFilterButton from '../../components/filter/ProductFilterButton';
import ProductFilter from '../../components/filter/ProductFilter';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import LoadProducts from '../../components/list/LoadProducts';
import { Suspense } from 'react';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import ProductGrid from '../../components/list/ProductGrid';
import ProductSkeleton from '../../components/list/ProductSkeleton';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import PublicPageContainer from '@/components/layout/container/PublicPageContainer';

interface Params {
  pageNumber: string;
}

interface ProductsProps {
  params: Params & { locale: string };
}

export const metadata: Metadata = {
  title: 'Products',
};

export const generateStaticParams = async (): Promise<Params[]> => {
  try {
    const products = await getProductLists();
    const totalPages = products.length / productsPerPage;

    return Array.from({ length: totalPages }).map((_, index): Params => ({ pageNumber: (index + 1).toString() }));
  } catch (error) {
    return [];
  }
};

const Products = ({ params: { locale, pageNumber } }: ProductsProps) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Product.searching');

  return (
    <PublicPageContainer>
      <ProductFilterButton hiddenBreakPoint="lg" href="/products/search" />
      <div className="grid gap-4 md:gap-8 grid-cols-12 mt-4">
        <div className="hidden lg:block lg:col-span-3">
          <ProductFilter href="/products/search" />
        </div>
        <div className="col-span-12 lg:col-span-9">
          <div className="space-y-4 md:space-y-8">
            <SearchQueryBarSuspense href="/products/search" placeholder={t('placeholder')} />
            <Suspense
              fallback={
                <div className="relative">
                  <LoadingShimmer gradient="white" />
                  <ProductGrid>
                    <ProductSkeleton />
                  </ProductGrid>
                </div>
              }
            >
              <LoadProducts mode="server-component" pageNumber={+pageNumber} />
            </Suspense>
          </div>
        </div>
      </div>
    </PublicPageContainer>
  );
};
export default Products;
