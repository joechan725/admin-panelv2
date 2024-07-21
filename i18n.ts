import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from './i18n/config';

const requestConfig = getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    messages: (await import(`./i18n/messages/${locale}.json`)).default,
    formats: {
      dateTime: {
        short: {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        },
        medium: {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          hour12: false,
          minute: '2-digit',
        },
        detail: {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          hour12: false,
          minute: '2-digit',
          second: '2-digit',
        },
      },
    },
    getMessageFallback({ key }) {
      return key;
    },
  };
});

export default requestConfig;
