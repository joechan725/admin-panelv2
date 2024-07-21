import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import NotificationListListener from '@/components/listener/NotificationListListener';
import SessionListener from '@/components/listener/SessionListener';
import UserStoredListListener from '@/components/listener/UserStoredListListener';
import { Toaster } from 'react-hot-toast';
import { locales } from '@/i18n/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export const generateStaticParams = () => {
  return locales.map((locale) => ({ locale }));
};

const LocaleLayout = async ({ children, params: { locale } }: Readonly<LocaleLayoutProps>) => {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.className}>
      <body className="w-screen h-screen">
        <NextIntlClientProvider messages={messages}>
          <Toaster toastOptions={{ style: { zIndex: 9999 } }} />
          <SessionListener />
          <UserStoredListListener />
          <NotificationListListener />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
