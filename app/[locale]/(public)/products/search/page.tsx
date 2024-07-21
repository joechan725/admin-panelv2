import { Metadata } from 'next';
import ProductFilterButton from '../components/filter/ProductFilterButton';
import ProductFilter from '../components/filter/ProductFilter';
import SearchQueryBarSuspense from '@/components/search/SearchQueryBarSuspense';
import LoadProducts from '../components/list/LoadProducts';
import ProductSkeleton from '../components/list/ProductSkeleton';
import ProductGrid from '../components/list/ProductGrid';
import LoadingShimmer from '@/components/loading/LoadingShimmer';
import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import PublicPageContainer from '@/components/layout/container/PublicPageContainer';

interface ProductsProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'Products',
};

const Products = ({ params: { locale } }: ProductsProps) => {
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
              <LoadProducts mode="client-component" />
            </Suspense>
          </div>
        </div>
      </div>
    </PublicPageContainer>
  );
};

export default Products;
