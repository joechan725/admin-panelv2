import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './i18n/config';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh|en)/:path*'],
};

const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const shouldHandle =
    pathname === '/' || !new RegExp(`^/(${locales.join('|')})(/.*)?$`).test(request.nextUrl.pathname);
  if (!shouldHandle) {
    return;
  }

  return intlMiddleware(request);
};

export default middleware;
