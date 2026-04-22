import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Admin route protection middleware
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { pathname } = url;

  // Allow static assets
  if (pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|css|js)$/)) {
    return NextResponse.next();
  }

  // Allow API calls unconditionally (proxying handled by backend)
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Allow admin login page
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // Check for session cookie
  const hasSession = request.cookies.has("connect.sid");
  const isAdminPath = pathname.startsWith("/admin");
  if (isAdminPath && !pathname.startsWith("/admin/login") && !hasSession) {
    // Redirect to admin login
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

// Matcher for middleware config (not strictly required here but keeps compatibility)
export const config = {
  matcher: ["/admin/:path*"],
};
