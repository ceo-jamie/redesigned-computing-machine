// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const authed = req.cookies.get('b2b_auth')?.value === '1';

  // Which routes need auth:
  const protectedPaths = [/^\/b2b(\/.*)?$/, /^\/product(\/.*)?$/];

  const isProtected = protectedPaths.some((re) => re.test(req.nextUrl.pathname));

  if (isProtected && !authed) {
    const url = new URL('/login', req.url);
    url.searchParams.set('from', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/b2b/:path*', '/product/:path*'],
};
