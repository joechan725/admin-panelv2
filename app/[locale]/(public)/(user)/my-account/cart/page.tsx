import LoadUserCart from '@/components/features/cart/LoadUserCart';
import BarButton from '@/components/form/BarButton';
import LightBorder from '@/components/layout/container/LightBorder';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';

interface Params {
  locale: string;
}

interface CartProps {
  params: Params;
}

interface GenerateMetadataParameters {
  params: Params;
}

export const generateMetadata = async ({ params: { locale } }: GenerateMetadataParameters): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('cart'),
  };
};

const Cart = ({ params: { locale } }: CartProps) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('Cart');

  return (
    <LightBorder className="min-h-60 p-6 w-full">
      <div className="space-y-2">
        <LoadUserCart />
        <div>
          <Link href="/checkout">
            <BarButton theme="secondary" disabled={false} type="button">
              {t('checkout')}
            </BarButton>
          </Link>
        </div>
      </div>
    </LightBorder>
  );
};

export default Cart;
