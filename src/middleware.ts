import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ru', 'ar'];
const defaultLocale = 'ru';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is the admin route
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const loggedIn = request.cookies.get('loggedIn')?.value === 'true';
    if (!loggedIn) {
      const url = new URL(`/admin/login`, request.url);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Check if the path starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Check if the path is an API route
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Get the locale from the cookie or use the default locale
  const locale = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;

  // Redirect to the locale-prefixed path
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Match all paths except for the ones starting with:
    // - _next (Next.js internals)
    // - api (API routes)
    // - favicon.ico (favicon file)
    '/((?!_next|api|favicon.ico).*)',
  ],
};
