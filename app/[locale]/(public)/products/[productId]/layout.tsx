import { getProduct } from '@/firebase/api/product/getProduct';
import ProductTabSet from '../components/tabSet/ProductTabSet';
import { Metadata } from 'next';
import { getProductLists } from '@/firebase/api/product/getProductLists';
import { unstable_setRequestLocale } from 'next-intl/server';
import PublicPageContainer from '@/components/layout/container/PublicPageContainer';
import RelatedProductRoot from '../components/relatedProduct/RelatedProductRoot';
import ProductDetailRoot from '../components/detail/ProductDetailRoot';

interface ProductParams {
  productId: string;
}

interface LocaleParams {
  locale: string;
}

interface GenerateMetadataParameters {
  params: ProductParams & LocaleParams;
}

interface ProductLayoutProps {
  params: ProductParams & LocaleParams;
  children: React.ReactNode;
}

export const generateStaticParams = async (): Promise<ProductParams[]> => {
  try {
    const products = await getProductLists();
    return products.map((product): ProductParams => ({ productId: product.id }));
  } catch (error) {
    return [];
  }
};

export const generateMetadata = async ({
  params: { productId, locale },
}: GenerateMetadataParameters): Promise<Metadata> => {
  try {
    const product = await getProduct(productId);
    if (!product) {
      return {
        title: 'Product detail',
      };
    }
    const { nameEN, nameZH } = product;
    return {
      title: locale === 'en' ? nameEN : nameZH,
    };
  } catch (error) {
    // if (error instanceof Error) {
    //   if (error.toString().includes("false for 'get'") || error.toString().includes('Null value error')) {
    //     notFound();
    //   }
    // }
    return {
      title: 'Product detail',
    };
  }
};

const ProductLayout = ({ params: { productId, locale }, children }: ProductLayoutProps) => {
  unstable_setRequestLocale(locale);

  return (
    <PublicPageContainer>
      <div className="container mx-auto px-4 py-8 space-y-12">
        <ProductDetailRoot productId={productId} />
        <div className="space-y-8">
          <ProductTabSet productId={productId} />
          {children}
          <RelatedProductRoot productId={productId} />
        </div>
      </div>
    </PublicPageContainer>
  );
};

export default ProductLayout;
