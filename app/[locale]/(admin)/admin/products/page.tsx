import { Metadata } from 'next';
import Widget from '@/components/layout/container/Widget';
import ProductFrame from './components/frame/ProductFrame';
import SalesSummary from './components/summary/SalesSummary';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

interface Params {
  locale: string;
}

interface GenerateMetadataProps {
  params: Params;
}

interface ProductsProps {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataProps): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('products'),
  };
};

const Products = ({ params: { locale } }: ProductsProps) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Product.list');

  return (
    <div className="space-y-5">
      <h2 className="ml-2 text-2xl text-slate-700 font-semibold">{t('title')}</h2>
      <div className="space-y-6">
        <Widget className="p-4">
          <SalesSummary />
        </Widget>
        <Widget className="p-4">
          <ProductFrame />
        </Widget>
      </div>
    </div>
  );
};

export default Products;
