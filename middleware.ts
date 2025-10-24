import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register', '/profile', '/umkm', '/wisata', '/pembangunan', '/lapor'];
  
  // Admin-only routes
  const adminRoutes = ['/dashboard'];

  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  const isAuthPage = pathname === '/login' || pathname === '/register';

  // Redirect to login if accessing admin route without token
  if (isAdminRoute && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Redirect to home if logged in and trying to access auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};