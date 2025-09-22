import {NextResponse} from 'next/server';

const locales = ['en', 'ja'];

export function middleware(req) {
  const {pathname} = req.nextUrl;

  // Skip internal/static/admin/api
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.')
  ) return NextResponse.next();

  // Already localized?
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  // Redirect to default locale
  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|admin|.*\\..*).*)']
};