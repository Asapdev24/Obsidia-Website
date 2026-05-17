import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { type NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Silently redirect all /ar/* traffic to the /en equivalent.
  // Arabic files remain intact in the codebase; the route is simply unreachable.
  if (pathname === '/ar' || pathname.startsWith('/ar/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/ar/, '/en') || '/en';
    return NextResponse.redirect(url, { status: 308 });
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
