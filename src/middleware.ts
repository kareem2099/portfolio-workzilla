import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ru', 'ar'];
const defaultLocale = 'ru';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('/favicon.') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get('loggedIn');
  const loggedIn = cookie?.value === 'true';

  const url = request.nextUrl.clone();
  url.pathname = `/admin/login`;

  if (pathname.startsWith('/admin') && !loggedIn) {
    return NextResponse.redirect(url);
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
