import { Link } from '@/navigation';
import LoadStoreInformation from './LoadStoreInformation';
import { Suspense } from 'react';
import CurrentYear from './CurrentYear';
import { useTranslations } from 'next-intl';

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  const tGeneral = useTranslations('General');
  const t = useTranslations('Footer');

  return (
    <div className="w-screen bg-slate-700 py-12 space-y-8">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-2 text-center">
            <div className="md:text-xl text-white font-semibold">{t('quickLinks')}</div>
            <div className="space-y-1">
              <div>
                <Link
                  href="/products/page/1"
                  className="text-xs md:text-base transition-all text-white font-medium hover:text-sky-500 active:text-sky-700"
                >
                  {t('products')}
                </Link>
              </div>
              <div>
                <Link
                  href="/my-account/orders"
                  className="text-xs md:text-base transition-all text-white font-medium hover:text-sky-500 active:text-sky-700"
                >
                  {t('myOrders')}
                </Link>
              </div>
              <div>
                <Link
                  href="/orders"
                  className="text-xs md:text-base transition-all text-white font-medium hover:text-sky-500 active:text-sky-700"
                >
                  {t('orderTracking')}
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-center">
            <div className="md:text-xl text-white font-semibold">{t('information')}</div>
            <div className="space-y-1">
              <div>
                <Link
                  href="/about-us"
                  className="text-xs md:text-base transition-all text-white font-medium hover:text-sky-500 active:text-sky-700"
                >
                  {t('aboutUs')}
                </Link>
              </div>
              <div>
                <Link
                  href="/privacy-policy"
                  className="text-xs md:text-base transition-all text-white font-medium hover:text-sky-500 active:text-sky-700"
                >
                  {t('privacyPolicy')}
                </Link>
              </div>
              <div>
                <Link
                  href="/terms-of-service"
                  className="text-xs md:text-base transition-all text-white font-medium hover:text-sky-500 active:text-sky-700"
                >
                  {t('termsOfService')}
                </Link>
              </div>
              <div>
                <Link
                  href="/return-and-exchange-policy"
                  className="text-xs md:text-base transition-all text-white font-medium hover:text-sky-500 active:text-sky-700"
                >
                  {t('returnAndExchangePolicy')}
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-center">
            <div className="md:text-xl text-white font-semibold">{t('customerService')}</div>
            <div className="space-y-1">
              <div>
                <Link
                  href="/faqs"
                  className="text-xs md:text-base transition-all text-white font-medium hover:text-sky-500 active:text-sky-700"
                >
                  {t('faqs')}
                </Link>
              </div>
              <div>
                <Link
                  href="/shipping-methods"
                  className="text-xs md:text-base transition-all text-white font-medium hover:text-sky-500 active:text-sky-700"
                >
                  {t('shippingMethods')}
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-2 text-center">
            <div className="md:text-xl text-white font-semibold">{t('connectWithUs')}</div>
            <div className="space-y-1">
              <Suspense>
                <LoadStoreInformation />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-xs md:text-sm text-white">
        <CurrentYear /> {t('copyRight', { year: undefined, companyName: tGeneral('companyName') })}
      </div>
    </div>
  );
};

export default Footer;
